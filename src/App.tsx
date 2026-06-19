import { useState } from "react";

import UploadPanel from "./components/UploadPanel";
import SummaryPanel from "./components/SummaryPanel";

import { readZip } from "./utils/zipReader";
import type { RosPackage } from "./types/ros";

import PackageList
  from "./components/PackageList";

import DependencyGraph
  from "./components/DependencyGraph";

import {
  classifyFile,
  type FileType,
} from "./parsers/fileClassifier";

import type { WorkspaceSummary } from "./types/ros";

import { parsePackageXml }
  from "./parsers/packageParser";

interface ClassifiedFile {
  path: string;
  type: FileType;
}

function App() {
  const [summary, setSummary] =
    useState<WorkspaceSummary>({
      packageCount: 0,
      launchCount: 0,
      urdfCount: 0,
    });

  const [classifiedFiles, setClassifiedFiles] =
    useState<ClassifiedFile[]>([]);

  const [packages, setPackages] =
  useState<RosPackage[]>([]);

  async function handleUpload(file: File) {
    try {
      const files = await readZip(file);
      const parsedPackages: RosPackage[] = [];

      let packageCount = 0;
      let launchCount = 0;
      let urdfCount = 0;

      const classifications: ClassifiedFile[] = [];

      for (const file of files) {
        const type = classifyFile(
          file.path,
          file.content
        );

        if (type === "package") {

  const parsedPackage =
    parsePackageXml(
      file.content
    );

  if (parsedPackage) {
    parsedPackages.push(
      parsedPackage
    );
  }
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
      <h1>ROS Repository Analyzer</h1>

      <UploadPanel
        onFileSelected={handleUpload}
      />

      <SummaryPanel
  summary={summary}
/>

<PackageList
  packages={packages}
/>

<DependencyGraph
  packages={packages}
/>

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
            {classifiedFiles.map(
              (file) => (
                <tr key={file.path}>
                  <td>{file.path}</td>

                  <td
                    style={{
                      fontWeight:
                        "bold",
                      color:
                        file.type ===
                        "package"
                          ? "green"
                          : file.type ===
                            "launch"
                          ? "blue"
                          : file.type ===
                              "urdf" ||
                            file.type ===
                              "xacro"
                          ? "orange"
                          : "gray",
                    }}
                  >
                    {file.type}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;