import Link from "next/link";
import { BookOpen, Calendar, FileText, Library } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ReadingPage() {
  // TODO: Fetch lessons from API
  // const lessons = await fetch(...)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center h-10 w-10 rounded-[var(--radius-md)] bg-[#2D5A8E18]">
          <BookOpen className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary">Lessons</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Open Bible - primary action */}
        <Link href="/reading/bible" className="block group lg:col-span-2">
          <Card className="hover:shadow-[var(--shadow-lg)] transition-shadow group-hover:-translate-y-0.5 transition-transform">
            <CardContent className="p-6 flex items-center gap-5">
              <div className="flex items-center justify-center h-16 w-16 rounded-[var(--radius-lg)] bg-primary/10 shrink-0">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-text-primary">Open Bible</h3>
                <p className="text-text-secondary">
                  Read scripture with the built-in KJV Bible reader. Project passages for group reading.
                </p>
              </div>
              <Button variant="default" size="lg" className="shrink-0" tabIndex={-1}>
                Open
              </Button>
            </CardContent>
          </Card>
        </Link>

        {/* No upcoming lesson - empty state */}
        <Link href="/reading/lessons" className="block group">
          <Card className="hover:shadow-[var(--shadow-lg)] transition-shadow group-hover:-translate-y-0.5 transition-transform h-full">
            <CardHeader>
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Upcoming Lesson</span>
              </div>
              <CardTitle>No upcoming lessons</CardTitle>
              <CardDescription>Lessons will appear here once scheduled</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        {/* My Lessons */}
        <Link href="/reading/lessons?tab=my-lessons" className="block group">
          <Card className="hover:shadow-[var(--shadow-lg)] transition-shadow group-hover:-translate-y-0.5 transition-transform h-full">
            <CardHeader>
              <div className="flex items-center gap-2 mb-1">
                <FileText className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">My Lessons</span>
              </div>
              <CardTitle>My Lessons</CardTitle>
              <CardDescription>
                View and manage your customized lessons.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        {/* Lesson Templates */}
        <Link href="/reading/lessons" className="block group lg:col-span-2">
          <Card className="hover:shadow-[var(--shadow-lg)] transition-shadow group-hover:-translate-y-0.5 transition-transform h-full">
            <CardHeader>
              <div className="flex items-center gap-2 mb-1">
                <Library className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Templates</span>
              </div>
              <CardTitle>Lesson Templates</CardTitle>
              <CardDescription>
                Browse lesson templates to use or customize for your services.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-sm text-text-tertiary">
                20 templates available
              </span>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
