import type {
  Diagnostic,
} from "../types/diagnostics";

interface Props {
  diagnostics: Diagnostic[];
}

export default function DiagnosticsPanel({
  diagnostics,
}: Props) {
  return (
    <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        Diagnostics
      </h2>

      {diagnostics.length === 0 && (
        <div
          className="
            rounded-2xl
            border
            border-green-700
            bg-green-950
            p-4
            text-green-300
          "
        >
          ✅ No issues detected
        </div>
      )}

      <div className="space-y-3">
        {diagnostics.map(
          (diagnostic, index) => (
            <div
              key={index}
              className={`
                rounded-2xl
                p-4
                border
                ${
                  diagnostic.severity === "error"
                    ? "bg-red-950 border-red-700"
                    : "bg-yellow-950 border-yellow-700"
                }
              `}
            >
              <div className="font-bold text-white mb-2">
                {diagnostic.severity.toUpperCase()}
              </div>

              <div className="text-slate-300">
                {diagnostic.message}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}