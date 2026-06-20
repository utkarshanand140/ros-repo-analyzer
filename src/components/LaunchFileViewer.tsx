import type {
  LaunchFile,
} from "../types/ros";

import LaunchTree
  from "./LaunchTree";

import {
  buildLaunchTree,
} from "../utils/buildLaunchTree";

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
        (file) => {

  const tree =
    buildLaunchTree(
      file
    );

  return (
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

            <h4>
  Launch Hierarchy
</h4>

<LaunchTree
  node={tree}
/>

            {file.includedLaunchFiles
  .length > 0 && (

  <>
    <strong>
      Includes:
    </strong>

    <ul>
      {file.includedLaunchFiles.map(
        (
          included,
          index
        ) => (
          <li
            key={index}
          >
            {included}
          </li>
        )
      )}
    </ul>
  </>
)}

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
        );
})
}
    </div>
  );
}