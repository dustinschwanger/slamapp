"use client";

import { useCallback } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ListChecks } from "lucide-react";
import type { ServicePlanItem } from "@/lib/types";
import { ServiceTimelineItem } from "@/components/services/ServiceTimelineItem";
import { DurationEstimate } from "@/components/services/DurationEstimate";

interface ServiceTimelineProps {
  items: ServicePlanItem[];
  onReorder: (oldIndex: number, newIndex: number) => void;
  onRemove: (index: number) => void;
  onEdit: (index: number) => void;
}

export function ServiceTimeline({
  items,
  onReorder,
  onRemove,
  onEdit,
}: ServiceTimelineProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        onReorder(oldIndex, newIndex);
      }
    },
    [items, onReorder]
  );

  return (
    <div className="flex flex-col gap-3">
      {/* Header with duration estimate */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
          Service Order
        </h3>
        {items.length > 0 && <DurationEstimate items={items} />}
      </div>

      {/* Items */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <ListChecks className="h-10 w-10 mb-3 text-[var(--color-text-tertiary)]" />
          <p className="text-base text-[var(--color-text-secondary)]">
            No items yet. Add songs, scripture, lessons, or other items to build
            your service plan.
          </p>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-col gap-2">
              {items.map((item, index) => (
                <ServiceTimelineItem
                  key={item.id}
                  item={item}
                  index={index}
                  onRemove={() => onRemove(index)}
                  onEdit={() => onEdit(index)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
