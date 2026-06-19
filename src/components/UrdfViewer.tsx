import type {
  UrdfModel,
} from "../types/ros";

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
        (model) => (
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

            <ul>
              {model.joints.map(
                (
                  joint,
                  index
                ) => (
                  <li
                    key={
                      index
                    }
                  >
                    {
                      joint.parent
                    }

                    {" → "}

                    {
                      joint.child
                    }
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