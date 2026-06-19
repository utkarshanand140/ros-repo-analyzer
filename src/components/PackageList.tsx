import type {
  RosPackage,
} from "../types/ros";

interface Props {
  packages: RosPackage[];
}

export default function PackageList({
  packages,
}: Props) {
  return (
    <div
      style={{
        marginTop: "2rem",
      }}
    >
      <h2>
        Parsed Packages
      </h2>

      {packages.length === 0 && (
        <p>
          No packages detected.
        </p>
      )}

      {packages.map((pkg) => (
        <div
          key={pkg.name}
          style={{
            border:
              "1px solid #ccc",
            padding: "1rem",
            marginBottom:
              "1rem",
            borderRadius:
              "8px",
          }}
        >
          <h3>
            {pkg.name}
          </h3>

          <p>
            Version:
            {" "}
            {pkg.version}
          </p>

          <strong>
            Dependencies:
          </strong>

          <ul>
            {pkg.dependencies.map(
              (dep) => (
                <li key={dep}>
                  {dep}
                </li>
              )
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}