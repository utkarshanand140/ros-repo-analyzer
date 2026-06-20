import type {
  RosPackage,
  LaunchFile,
  UrdfModel,
} from "../types/ros";

import type {
  Diagnostic,
} from "../types/diagnostics";

export function runDiagnostics(
  packages: RosPackage[],
  launchFiles: LaunchFile[],
  urdfModels: UrdfModel[]
): Diagnostic[] {

  const diagnostics:
    Diagnostic[] = [];

  // ----------------------------------
  // Duplicate Packages
  // ----------------------------------

  const packageNames =
    new Set<string>();

  for (const pkg of packages) {

    if (
      packageNames.has(
        pkg.name
      )
    ) {

      diagnostics.push({
        severity:
          "error",

        message:
          `Duplicate package detected: ${pkg.name}`,
      });
    }

    packageNames.add(
      pkg.name
    );
  }

  // ----------------------------------
  // Missing Dependencies
  // ----------------------------------

  for (const pkg of packages) {

    for (const dep of pkg.dependencies) {

      const exists =
        packages.some(
          (p) =>
            p.name === dep
        );

      if (!exists) {

        diagnostics.push({
          severity:
            "warning",

          message:
            `Package ${pkg.name} depends on ${dep}, which is not present in the workspace`,
        });
      }
    }
  }

  // ----------------------------------
  // Launch Files
  // ----------------------------------

  for (
    const launchFile
    of launchFiles
  ) {

    if (
      launchFile.nodes
        .length === 0
    ) {

      diagnostics.push({
        severity:
          "warning",

        message:
          `Launch file ${launchFile.fileName} contains no nodes`,
      });
    }
  }

  // ----------------------------------
  // URDF
  // ----------------------------------

  for (
    const model
    of urdfModels
  ) {

    if (
      model.joints
        .length === 0
    ) {

      diagnostics.push({
        severity:
          "warning",

        message:
          `URDF ${model.fileName} contains no joints`,
      });
    }
  }

  return diagnostics;
}