import type {
  UrdfModel,
} from "../types/ros";

import RobotTree
  from "./RobotTree";

import {
  buildRobotTree,
} from "../utils/buildRobotTree";

interface Props {
  models:
    UrdfModel[];
}

export default function
UrdfViewer({
  models,
}: Props) {

  return (
    <div
      style={{
        marginTop: "2rem",
      }}
    >
      <h2>
        URDF Models
      </h2>

      {models.map(
  (model) => {

    const tree =
      buildRobotTree(
        model
      );

    return (
          <div
            key={
              model.fileName
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
            <h3>{model.robotName}</h3>

<p>
  Source: {model.fileName}
</p>

            <p>
              Links:
              {" "}
              {
                model.links
                  .length
              }
            </p>

            <p>
              Joints:
              {" "}
              {
                model.joints
                  .length
              }
            </p>

            

            <h4>
  Robot Tree
</h4>

{tree ? (
  <RobotTree
    node={tree}
  />
) : (
  <p>
    No root link
    detected
  </p>
)}
          </div>
        );
})
}
    </div>
  );
}