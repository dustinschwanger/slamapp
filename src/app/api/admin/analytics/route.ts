import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth/context";
import { handleApiError } from "@/lib/auth/api-utils";

export async function GET() {
  try {
    const auth = await requireRole("admin");
    const churchId = auth.churchId;

    if (!churchId) {
      return NextResponse.json({ error: "No church assigned" }, { status: 403 });
    }

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const [
      communitiesTotal,
      communitiesActive,
      volunteersTotal,
      servicesCompleted,
      servicesUpcoming,
      servicesThisMonth,
      prayerActive,
      prayerAnsweredThisMonth,
      prayerTotal,
      prayerThisWeek,
      groupsTotal,
      groupMembers,
      shiftsUpcoming,
      shiftsThisMonth,
    ] = await Promise.all([
      db.community.count({ where: { churchId } }),
      db.community.count({ where: { churchId, isActive: true } }),
      db.user.count({
        where: {
          churchId,
          role: { in: ["volunteer", "leader", "admin"] },
        },
      }),
      db.servicePlan.count({
        where: { churchId, status: "completed", isTemplate: false },
      }),
      db.servicePlan.count({
        where: {
          churchId,
          isTemplate: false,
          status: { in: ["draft", "ready"] },
          serviceDate: { gte: now },
        },
      }),
      db.servicePlan.count({
        where: {
          churchId,
          isTemplate: false,
          serviceDate: { gte: startOfMonth },
        },
      }),
      db.prayerRequest.count({
        where: { churchId, status: { in: ["active", "urgent"] } },
      }),
      db.prayerRequest.count({
        where: {
          churchId,
          status: "answered",
          updatedAt: { gte: startOfMonth },
        },
      }),
      db.prayerRequest.count({ where: { churchId } }),
      db.prayerRequest.count({
        where: { churchId, createdAt: { gte: startOfWeek } },
      }),
      db.group.count({ where: { churchId, isActive: true } }),
      db.groupMember.count({
        where: { group: { churchId } },
      }),
      db.volunteerShift.count({
        where: { churchId, shiftDate: { gte: now } },
      }),
      db.volunteerShift.count({
        where: {
          churchId,
          shiftDate: { gte: startOfMonth },
        },
      }),
    ]);

    return NextResponse.json({
      communities: { total: communitiesTotal, active: communitiesActive },
      volunteers: { total: volunteersTotal },
      services: {
        completed: servicesCompleted,
        upcoming: servicesUpcoming,
        thisMonth: servicesThisMonth,
      },
      prayerRequests: {
        active: prayerActive,
        answeredThisMonth: prayerAnsweredThisMonth,
        total: prayerTotal,
        thisWeek: prayerThisWeek,
      },
      groups: { total: groupsTotal, totalMembers: groupMembers },
      shifts: { upcoming: shiftsUpcoming, thisMonth: shiftsThisMonth },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
