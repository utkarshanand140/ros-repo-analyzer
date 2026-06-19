import type { RosPackage } from "../types/ros";

export function parsePackageXml(
  xmlText: string
): RosPackage | null {
  try {
    const parser = new DOMParser();

    const xml = parser.parseFromString(
      xmlText,
      "application/xml"
    );

    const name =
      xml.querySelector("name")
        ?.textContent
        ?.trim() ?? "";

    const version =
      xml.querySelector("version")
        ?.textContent
        ?.trim() ?? "";

    const dependencyNodes = [
      ...xml.querySelectorAll("depend"),
      ...xml.querySelectorAll("exec_depend"),
      ...xml.querySelectorAll("build_depend"),
      ...xml.querySelectorAll("test_depend"),
    ];

    const dependencies = dependencyNodes
      .map(
        (node) =>
          node.textContent?.trim() ?? ""
      )
      .filter(Boolean);

    return {
      name,
      version,
      dependencies,
    };
  } catch {
    return null;
  }
}