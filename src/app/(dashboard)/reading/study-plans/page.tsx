"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Calendar, Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StudyPlanCard } from "@/components/reading/StudyPlanCard";
import { StudyPlanBuilder } from "@/components/reading/StudyPlanBuilder";
import { useRouter } from "next/navigation";
import type { StudyPlanSummary, LessonContent } from "@/lib/types";

type Lesson = LessonContent & {
  id: string;
  scheduledDate: string;
  isPublished: boolean;
  isTemplate?: boolean;
};

export default function StudyPlansPage() {
  const router = useRouter();
  const [plans, setPlans] = useState<StudyPlanSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBuilder, setShowBuilder] = useState(false);
  const [templates, setTemplates] = useState<Lesson[]>([]);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const res = await fetch("/api/study-plans");
        if (res.ok) {
          const data = await res.json();
          setPlans(data);
        }
      } catch {
        // API not available
      } finally {
        setLoading(false);
      }
    }
    fetchPlans();
  }, []);

  // Fetch templates for the builder
  useEffect(() => {
    async function fetchTemplates() {
      try {
        const res = await fetch("/api/lessons?tab=templates");
        if (res.ok) {
          const data = await res.json();
          setTemplates(data.lessons ?? []);
        }
      } catch {
        // API not available
      }
    }
    fetchTemplates();
  }, []);

  const handlePlanCreated = (studyPlanId: string) => {
    router.push(`/reading/study-plans/${studyPlanId}`);
  };

  return (
    <div>
      {/* Back link */}
      <Link
        href="/reading/lessons"
        className="inline-flex items-center gap-2 text-primary hover:text-primary-hover mb-6 min-h-[48px]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Lessons
      </Link>

      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-[var(--radius-md)] bg-[#2D5A8E18]">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary">Study Plans</h2>
        </div>
        <Button
          onClick={() => setShowBuilder(true)}
          className="gap-2 min-h-[48px]"
        >
          <Plus className="h-5 w-5" />
          Create Study Plan
        </Button>
      </div>

      {/* Plans list */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : plans.length === 0 ? (
        <div className="text-center py-12 text-text-secondary">
          <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p className="text-lg font-medium mb-2">No study plans yet</p>
          <p className="text-sm mb-6">
            Create a multi-week Bible study plan to organize your lessons into
            weekly services.
          </p>
          <Button
            onClick={() => setShowBuilder(true)}
            className="gap-2 min-h-[48px]"
          >
            <Plus className="h-5 w-5" />
            Create Your First Study Plan
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {plans.map((plan) => (
            <StudyPlanCard key={plan.studyPlanId} plan={plan} />
          ))}
        </div>
      )}

      {/* Study Plan Builder Modal */}
      <StudyPlanBuilder
        open={showBuilder}
        onClose={() => setShowBuilder(false)}
        lessons={templates}
        onPlanCreated={handlePlanCreated}
      />
    </div>
  );
}
