import { useState } from "react";

import UploadPanel from "./components/UploadPanel";
import SummaryPanel from "./components/SummaryPanel";

import { readZip } from "./utils/zipReader";

import type { RosPackage, LaunchFile, UrdfModel } from "./types/ros";

import PackageList from "./components/PackageList";

import LaunchFileViewer from "./components/LaunchFileViewer";

import OverviewDashboard from "./components/OverviewDashboard";

import { parseLaunchFile } from "./parsers/launchParser";

import { parseUrdf } from "./parsers/urdfParser";

import DiagnosticsPanel
  from "./components/DiagnosticsPanel";

import {
  runDiagnostics,
} from "./diagnostics/diagnostics";

import type {
  Diagnostic,
} from "./types/diagnostics";

import UrdfViewer from "./components/UrdfViewer";

import DependencyGraph from "./components/DependencyGraph";

import { classifyFile, type FileType } from "./parsers/fileClassifier";

import type { WorkspaceSummary } from "./types/ros";

import { parsePackageXml } from "./parsers/packageParser";

interface ClassifiedFile {
  path: string;
  type: FileType;
}

function App() {
  const [summary, setSummary] = useState<WorkspaceSummary>({
    packageCount: 0,
    launchCount: 0,
    urdfCount: 0,
  });

  const [classifiedFiles, setClassifiedFiles] = useState<ClassifiedFile[]>([]);

  const [showDebug, setShowDebug] = useState(false);

  const [packages, setPackages] = useState<RosPackage[]>([]);

  const [launchFiles, setLaunchFiles] = useState<LaunchFile[]>([]);

  const [urdfModels, setUrdfModels] = useState<UrdfModel[]>([]);

  const [metrics, setMetrics] = useState({
    packageCount: 0,
    launchFileCount: 0,
    urdfCount: 0,

    dependencyCount: 0,
    launchNodeCount: 0,

    linkCount: 0,
    jointCount: 0,
  });

  const [diagnostics,
  setDiagnostics] =
  useState<
    Diagnostic[]
  >([]);

  async function handleUpload(file: File) {
    try {
      const files = await readZip(file);
      const parsedPackages: RosPackage[] = [];

      const parsedLaunchFiles: LaunchFile[] = [];

      const parsedUrdfs: UrdfModel[] = [];

      let packageCount = 0;
      let launchCount = 0;
      let urdfCount = 0;

      const classifications: ClassifiedFile[] = [];

      for (const file of files) {
        const type = classifyFile(file.path, file.content);

        if (type === "package") {
          const parsedPackage = parsePackageXml(file.content);

          if (parsedPackage) {
            parsedPackages.push(parsedPackage);
          }
        }

        if (type === "launch") {
          const parsedLaunch = parseLaunchFile(file.path, file.content);

          parsedLaunchFiles.push(parsedLaunch);
        }

        if (type === "urdf" || type === "xacro") {
          const parsedUrdf = parseUrdf(file.path, file.content);

          parsedUrdfs.push(parsedUrdf);
        }

        classifications.push({
          path: file.path,
          type,
        });

        switch (type) {
          case "package":
            packageCount++;
            break;

          case "launch":
            launchCount++;
            break;

          case "urdf":
          case "xacro":
            urdfCount++;
            break;

          default:
            break;
        }
      }

      setPackages(parsedPackages);

      setLaunchFiles(parsedLaunchFiles);

      setUrdfModels(parsedUrdfs);

      const dependencyCount = parsedPackages.reduce(
        (sum, pkg) => sum + pkg.dependencies.length,
        0
      );

      const launchNodeCount = parsedLaunchFiles.reduce(
        (sum, launch) => sum + launch.nodes.length,
        0
      );

      const linkCount = parsedUrdfs.reduce(
        (sum, model) => sum + model.links.length,
        0
      );

      const jointCount = parsedUrdfs.reduce(
        (sum, model) => sum + model.joints.length,
        0
      );

      const results =
  runDiagnostics(
    parsedPackages,
    parsedLaunchFiles,
    parsedUrdfs
  );

setDiagnostics(
  results
);
      
      
      setMetrics({
        packageCount: parsedPackages.length,

        launchFileCount: parsedLaunchFiles.length,

        urdfCount: parsedUrdfs.length,

        dependencyCount,

        launchNodeCount,

        linkCount,

        jointCount,
      });

      setClassifiedFiles(classifications);

      setSummary({
        packageCount,
        launchCount,
        urdfCount,
      });
    } catch (error) {
      console.error("Failed to parse ZIP:", error);

      setClassifiedFiles([]);
      setPackages([]);
      setLaunchFiles([]);
      setUrdfModels([]);
      setDiagnostics([]);

      setSummary({
        packageCount: 0,
        launchCount: 0,
        urdfCount: 0,
      });
    }
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "2rem",
      }}
    >
      <div className="mb-10 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 shadow-2xl">
  <h1 className="text-5xl font-bold text-white">
    ROS Workspace Analyzer
  </h1>

  <p className="mt-4 text-lg text-blue-100">
    Analyze ROS2 repositories, launch systems, package dependencies,
    robot descriptions and workspace health in seconds.
  </p>
</div>
<hr />
      <OverviewDashboard metrics={metrics} />
      
      <hr />
      <UploadPanel onFileSelected={handleUpload} />

      <SummaryPanel summary={summary} />

      <PackageList packages={packages} />

      <DependencyGraph packages={packages} />

      <LaunchFileViewer launchFiles={launchFiles} />
<hr />
      <UrdfViewer models={urdfModels} />
<hr />
      <DiagnosticsPanel
  diagnostics={
    diagnostics
  }
/>

      <div
        style={{
          marginTop: "2rem",
          marginBottom: "1rem",
        }}
      >
        <label>
          <input
            type="checkbox"
            checked={showDebug}
            onChange={(e) => setShowDebug(e.target.checked)}
          />{" "}
          Show Debug Information
        </label>
      </div>

      {showDebug && (
        <div
          style={{
            marginTop: "2rem",
          }}
        >
          <h2>Detected Files</h2>

          <table
            border={1}
            cellPadding={8}
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th>Path</th>
                <th>Detected Type</th>
              </tr>
            </thead>

            <tbody>
              {classifiedFiles.map((file) => (
                <tr key={file.path}>
                  <td>{file.path}</td>

                  <td
                    style={{
                      fontWeight: "bold",
                      color:
                        file.type === "package"
                          ? "green"
                          : file.type === "launch"
                          ? "blue"
                          : file.type === "urdf" || file.type === "xacro"
                          ? "orange"
                          : "gray",
                    }}
                  >
                    {file.type}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
