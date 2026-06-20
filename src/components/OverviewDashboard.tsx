import type {
  WorkspaceMetrics,
} from "../types/ros";

interface Props {
  metrics: WorkspaceMetrics;
}

export default function
OverviewDashboard({
  metrics,
}: Props) {

  const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "1rem",
    minWidth: "140px",
    textAlign: "center" as const,
  };

  return (
    <div
      style={{
        marginTop: "1rem",
        marginBottom: "2rem",
      }}
    >
      <h2>
        Workspace Overview
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div style={cardStyle}>
          <strong>
            Packages
          </strong>
          <p>
            {
              metrics.packageCount
            }
          </p>
        </div>

        <div style={cardStyle}>
          <strong>
            Launch Files
          </strong>
          <p>
            {
              metrics.launchFileCount
            }
          </p>
        </div>

        <div style={cardStyle}>
          <strong>
            URDF Models
          </strong>
          <p>
            {metrics.urdfCount}
          </p>
        </div>

        <div style={cardStyle}>
          <strong>
            Dependencies
          </strong>
          <p>
            {
              metrics.dependencyCount
            }
          </p>
        </div>

        <div style={cardStyle}>
          <strong>
            Launch Nodes
          </strong>
          <p>
            {
              metrics.launchNodeCount
            }
          </p>
        </div>

        <div style={cardStyle}>
          <strong>
            Links
          </strong>
          <p>
            {metrics.linkCount}
          </p>
        </div>

        <div style={cardStyle}>
          <strong>
            Joints
          </strong>
          <p>
            {metrics.jointCount}
          </p>
        </div>
      </div>
    </div>
  );
}