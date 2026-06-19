import type { WorkspaceSummary } from "../types/ros";

interface SummaryPanelProps {
  summary: WorkspaceSummary;
}

export default function SummaryPanel({
  summary,
}: SummaryPanelProps) {
  return (
    <div
      style={{
        marginTop: "1rem",
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2>Workspace Summary</h2>

      <p>Packages: {summary.packageCount}</p>
      <p>Launch Files: {summary.launchCount}</p>
      <p>URDF Files: {summary.urdfCount}</p>
    </div>
  );
}