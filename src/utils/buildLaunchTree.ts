import type {
  LaunchFile,
  LaunchTreeNode,
} from "../types/ros";

export function buildLaunchTree(
  launchFile: LaunchFile
): LaunchTreeNode {

  return {
    name:
      launchFile.fileName,

    children:
      launchFile.includedLaunchFiles.map(
        (included) => ({
          name:
            included,

          children: [],
        })
      ),
  };
}