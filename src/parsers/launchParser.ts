import type {
  LaunchFile,
  LaunchNode,
} from "../types/ros";

export function parseLaunchFile(
  fileName: string,
  content: string
): LaunchFile {

  const nodes: LaunchNode[] = [];

  const nodeRegex =
    /Node\s*\([\s\S]*?package\s*=\s*["']([^"']+)["'][\s\S]*?executable\s*=\s*["']([^"']+)["'][\s\S]*?\)/g;

  let match;

  while (
    (match =
      nodeRegex.exec(
        content
      )) !== null
  ) {

    nodes.push({
      package: match[1],
      executable: match[2],
    });
  }

  return {
    fileName,
    nodes,
  };
}