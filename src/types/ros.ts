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