import type {
  Diagnostic,
} from "../types/diagnostics";

interface Props {
  diagnostics:
    Diagnostic[];
}

export default function
DiagnosticsPanel({
  diagnostics,
}: Props) {

  return (
    <div
      style={{
        marginTop: "2rem",
      }}
    >
      <h2>
        Diagnostics
      </h2>

      {diagnostics
        .length === 0 && (
        <p>
          No issues
          detected.
        </p>
      )}

      {diagnostics.map(
        (
          diagnostic,
          index
        ) => (
          <div
            key={index}
            style={{
              padding:
                "0.75rem",
              marginBottom:
                "0.5rem",
              border:
                "1px solid #ccc",
              borderRadius:
                "8px",
              background:
                diagnostic.severity ===
                "error"
                  ? "#ffe5e5"
                  : "#fff8e5",
            }}
          >
            <strong>
              {diagnostic
                .severity
                .toUpperCase()}
            </strong>

            <br />

            {
              diagnostic.message
            }
          </div>
        )
      )}
    </div>
  );
}