export interface RosPackage {
  name: string;
  version: string;
  dependencies: string[];
}

export interface WorkspaceSummary {
  packageCount: number;
  launchCount: number;
  urdfCount: number;
}

export interface ParsedWorkspace {
  packages: RosPackage[];
}

export interface LaunchNode {
  package: string;
  executable: string;
}

export interface LaunchFile {
  fileName: string;
  nodes: LaunchNode[];
  includedLaunchFiles:
    string[];
}

export interface UrdfJoint {
  parent: string;
  child: string;
}

export interface UrdfModel {
  fileName: string;
  robotName: string;
  links: string[];
  joints: UrdfJoint[];
}

export interface WorkspaceMetrics {
  packageCount: number;
  launchFileCount: number;
  urdfCount: number;

  dependencyCount: number;
  launchNodeCount: number;

  linkCount: number;
  jointCount: number;
}

export interface RobotTreeNode {
  name: string;
  children: RobotTreeNode[];
}

export interface LaunchTreeNode {
  name: string;
  children: LaunchTreeNode[];
}