import { ServicePlanBuilder } from "@/components/services/ServicePlanBuilder";

export default function CreateServicePlanPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
          Create Service Plan
        </h2>
        <p className="text-base text-[var(--color-text-secondary)] mt-1">
          Build a new service plan with songs, scripture, lessons, and more.
        </p>
      </div>

      <ServicePlanBuilder />
    </div>
  );
}
