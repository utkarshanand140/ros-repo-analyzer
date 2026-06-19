import type {
  LaunchFile,
} from "../types/ros";

interface Props {
  launchFiles:
    LaunchFile[];
}

export default function
LaunchFileViewer({
  launchFiles,
}: Props) {

  return (
    <div
      style={{
        marginTop: "2rem",
      }}
    >
      <h2>
        Launch Files
      </h2>

      {launchFiles.map(
        (file) => (
          <div
            key={
              file.fileName
            }
            style={{
              border:
                "1px solid #ccc",
              padding:
                "1rem",
              marginBottom:
                "1rem",
              borderRadius:
                "8px",
            }}
          >
            <h3>
              {
                file.fileName
              }
            </h3>

            {file.nodes
              .length ===
              0 && (
              <p>
                No nodes
                detected
              </p>
            )}

            <ul>
              {file.nodes.map(
                (
                  node,
                  index
                ) => (
                  <li
                    key={
                      index
                    }
                  >
                    {
                      node.executable
                    }

                    {" ("}

                    {
                      node.package
                    }

                    {")"}
                  </li>
                )
              )}
            </ul>
          </div>
        )
      )}
    </div>
  );
}