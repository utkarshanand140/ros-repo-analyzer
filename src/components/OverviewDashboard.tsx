import type { WorkspaceMetrics } from "../types/ros";

interface Props {
  metrics: WorkspaceMetrics;
}

function MetricCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: string;
}) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-800
        bg-slate-900
        p-6
        shadow-lg
        transition-all
        hover:-translate-y-1
        hover:border-blue-500
      "
    >
      <div className="text-3xl mb-3">{icon}</div>

      <div className="text-3xl font-bold text-white">
        {value}
      </div>

      <div className="text-slate-400 mt-2">
        {title}
      </div>
    </div>
  );
}

export default function OverviewDashboard({
  metrics,
}: Props) {
  return (
    <div className="mb-10">
      <div
        className="
          grid
          gap-4
          sm:grid-cols-2
          lg:grid-cols-4
        "
      >
        <MetricCard
          title="Packages"
          value={metrics.packageCount}
          icon="📦"
        />

        <MetricCard
          title="Launch Files"
          value={metrics.launchFileCount}
          icon="🚀"
        />

        <MetricCard
          title="URDF Models"
          value={metrics.urdfCount}
          icon="🤖"
        />

        <MetricCard
          title="Dependencies"
          value={metrics.dependencyCount}
          icon="🔗"
        />

        <MetricCard
          title="Launch Nodes"
          value={metrics.launchNodeCount}
          icon="⚙️"
        />

        <MetricCard
          title="Links"
          value={metrics.linkCount}
          icon="🦾"
        />

        <MetricCard
          title="Joints"
          value={metrics.jointCount}
          icon="🔩"
        />
      </div>
    </div>
  );
}