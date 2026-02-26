"use client";

import * as React from "react";
import {
  MessageCircleHeart,
  Shuffle,
  Lightbulb,
  ChevronDown,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import {
  categories,
  generalTips,
  getRandomStarter,
  type ConversationCategory,
} from "@/lib/data/conversation-starters";

export default function VisitGuidePage() {
  const [randomStarter, setRandomStarter] = React.useState<ReturnType<
    typeof getRandomStarter
  > | null>(null);
  const [tipsOpen, setTipsOpen] = React.useState(false);
  const [openCategories, setOpenCategories] = React.useState<Set<string>>(
    new Set()
  );

  // Generate initial random starter on client only to avoid hydration mismatch
  React.useEffect(() => {
    setRandomStarter(getRandomStarter());
  }, []);

  function handleShuffle() {
    setRandomStarter(getRandomStarter());
  }

  function toggleCategory(id: string) {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center h-10 w-10 rounded-[var(--radius-md)] bg-[#2D5A8E18]">
          <MessageCircleHeart className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Visit Guide</h2>
          <p className="text-sm text-text-secondary">
            Conversation starters and tips for connecting with nursing home
            residents
          </p>
        </div>
      </div>

      {/* Random Starter Card */}
      <Card className="mb-6 border-2 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              {randomStarter ? (
                <>
                  <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: randomStarter.category.color }}>
                    {randomStarter.category.title}
                  </p>
                  <p className="text-lg font-medium text-text-primary leading-relaxed">
                    {randomStarter.text}
                  </p>
                </>
              ) : (
                <p className="text-lg font-medium text-text-secondary leading-relaxed">
                  Tap shuffle for a conversation starter
                </p>
              )}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleShuffle}
              aria-label="Get a new random conversation starter"
              className="shrink-0 h-12 w-12"
            >
              <Shuffle className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* General Tips */}
      <CollapsibleSection
        open={tipsOpen}
        onToggle={() => setTipsOpen(!tipsOpen)}
        icon={<Lightbulb className="h-5 w-5 text-[#B8860B]" />}
        title="General Tips"
        description="Practical guidance for every visit"
        accentColor="#B8860B"
      >
        <ol className="space-y-3 list-decimal list-inside">
          {generalTips.map((tip, i) => (
            <li
              key={i}
              className="text-base text-text-primary leading-relaxed pl-1"
            >
              {tip}
            </li>
          ))}
        </ol>
      </CollapsibleSection>

      {/* Category Cards */}
      <div className="space-y-3 mt-3">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            category={cat}
            open={openCategories.has(cat.id)}
            onToggle={() => toggleCategory(cat.id)}
          />
        ))}
      </div>
    </div>
  );
}

/* ——— Collapsible Section ——— */

function CollapsibleSection({
  open,
  onToggle,
  icon,
  title,
  description,
  accentColor,
  children,
}: {
  open: boolean;
  onToggle: () => void;
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="overflow-hidden">
      <button
        onClick={onToggle}
        className="flex items-center gap-3 w-full p-4 text-left hover:bg-bg-secondary/50 transition-colors"
        aria-expanded={open}
      >
        <div
          className="flex items-center justify-center h-10 w-10 rounded-[var(--radius-md)] shrink-0"
          style={{ backgroundColor: `${accentColor}18` }}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-base font-semibold text-text-primary">{title}</p>
          <p className="text-sm text-text-secondary">{description}</p>
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-text-tertiary shrink-0 transition-transform duration-300",
            open && "rotate-180"
          )}
        />
      </button>
      {open && (
        <div className="px-4 pb-4 pt-0">
          <div className="border-t border-border pt-4">{children}</div>
        </div>
      )}
    </Card>
  );
}

/* ——— Category Card ——— */

function CategoryCard({
  category,
  open,
  onToggle,
}: {
  category: ConversationCategory;
  open: boolean;
  onToggle: () => void;
}) {
  const Icon = category.icon;

  return (
    <Card
      className="overflow-hidden"
      style={{ borderLeft: `4px solid ${category.color}` }}
    >
      <button
        onClick={onToggle}
        className="flex items-center gap-3 w-full p-4 text-left hover:bg-bg-secondary/50 transition-colors"
        aria-expanded={open}
      >
        <div
          className="flex items-center justify-center h-10 w-10 rounded-[var(--radius-md)] shrink-0"
          style={{ backgroundColor: `${category.color}18` }}
        >
          <Icon className="h-5 w-5" style={{ color: category.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-base font-semibold text-text-primary">
            {category.title}
          </p>
          <p className="text-sm text-text-secondary">{category.description}</p>
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-text-tertiary shrink-0 transition-transform duration-300",
            open && "rotate-180"
          )}
        />
      </button>
      {open && (
        <div className="px-4 pb-4 pt-0">
          <div className="border-t border-border pt-4">
            <ul className="space-y-3">
              {category.starters.map((starter, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span
                    className="flex items-center justify-center h-6 w-6 rounded-full text-xs font-semibold text-white shrink-0 mt-0.5"
                    style={{ backgroundColor: category.color }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-base text-text-primary leading-relaxed">
                    {starter}
                  </p>
                </li>
              ))}
            </ul>

            {/* Extra tips for memory-loss category */}
            {category.tips && category.tips.length > 0 && (
              <div className="mt-5 pt-4 border-t border-border">
                <p className="text-sm font-semibold text-text-primary mb-3">
                  Approach Tips
                </p>
                <ul className="space-y-2">
                  {category.tips.map((tip, i) => (
                    <li
                      key={i}
                      className="flex gap-2 items-start text-sm text-text-secondary"
                    >
                      <span className="text-text-tertiary shrink-0">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
