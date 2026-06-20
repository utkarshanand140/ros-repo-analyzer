# ROS Workspace Analyzer

A web-based tool for analyzing ROS 2 workspaces without installing ROS.

Upload a ROS workspace ZIP archive and instantly explore:

* ROS packages
* Package dependencies
* Launch files
* URDF/Xacro robot descriptions
* Robot kinematic trees
* Workspace diagnostics
* Dependency graphs
* Workspace statistics

Built with React, TypeScript, Vite, and Tailwind CSS.

---

## Features

### Workspace Overview Dashboard

Get an instant summary of your workspace:

* Number of packages
* Launch files
* URDF/Xacro files
* Dependencies
* Robot links
* Robot joints

Perfect for quickly understanding an unfamiliar ROS repository.

---

### Package Discovery

Automatically detects ROS packages by parsing:

* package.xml
* CMakeLists.txt
* setup.py

Displays:

* Package names
* Build types
* Dependencies
* Package locations

---

### Dependency Graph Visualization

Visualize package relationships using an interactive dependency graph.

Features:

* Zoom and pan
* Package-to-package dependencies
* Large workspace support
* Interactive graph exploration

Useful for:

* Architecture reviews
* Dependency audits
* Understanding large projects

---

### Launch File Detection

Automatically identifies ROS launch files.

Supports:

* `.launch.py`
* `.launch.xml`
* `.launch.yaml`

Displays:

* Launch file paths
* Referenced nodes
* Launch hierarchy information

---

### URDF / Xacro Analysis

Detects robot description files and extracts:

* Robot name
* Links
* Joints
* Tree structure

Useful for:

* Robot architecture inspection
* Quickly understanding robot models
* Educational purposes

---

### Robot Tree Visualization

Visualize robot kinematic structures.

Displays:

* Parent-child relationships
* Joint connections
* Link hierarchy

Similar to viewing a simplified URDF tree.

---

### Diagnostics Engine

Automatically checks workspaces for common issues.

Examples:

* Missing dependencies
* Missing package metadata
* Empty launch folders
* Incomplete package definitions

Helps identify problems before building or deploying.

---

### Workspace Statistics

Generate quick metrics including:

* Total packages
* Dependency count
* Launch count
* Robot description count

Useful for reporting and documentation.

---

## Why This Project?

Understanding a new ROS workspace can be difficult.

Typical challenges include:

* Hundreds of files
* Complex package dependencies
* Multiple launch configurations
* Large robot descriptions
* Inconsistent repository structures

ROS Workspace Analyzer helps developers understand a workspace within seconds instead of manually exploring directories.

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS

### Visualization

* React Flow

### Parsing

* XML Parser
* JSZip

### Deployment

* GitHub Pages

---

## Usage

### Upload a Workspace

1. Export or compress your ROS workspace.
2. Open the application.
3. Upload the ZIP archive.
4. Wait for analysis to complete.

The tool will automatically:

* Parse packages
* Extract dependencies
* Detect launch files
* Analyze robot descriptions
* Generate graphs and diagnostics

---

## Example Workflow

Upload:

```text
my_robot_ws.zip
```

The analyzer will generate:

```text
Workspace Overview
├── 12 Packages
├── 5 Launch Files
├── 1 URDF
└── 38 Dependencies

Dependency Graph

Robot Tree

Diagnostics
```

---

## Project Structure

```text
src/
├── components/
│   ├── DependencyGraph.tsx
│   ├── DiagnosticsPanel.tsx
│   ├── LaunchFileViewer.tsx
│   ├── OverviewDashboard.tsx
│   ├── PackageList.tsx
│   ├── RobotTreeViewer.tsx
│   ├── SummaryPanel.tsx
│   └── UploadPanel.tsx
│
├── parsers/
│   ├── packageParser.ts
│   ├── launchParser.ts
│   ├── urdfParser.ts
│   └── diagnostics.ts
│
├── utils/
│   ├── zipReader.ts
│   └── graphBuilder.ts
│
├── types/
│   └── ros.ts
│
└── App.tsx
```

---

## Local Development

Clone the repository:

```bash
git clone https://github.com/your-username/ros-workspace-analyzer.git
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

---

## Production Build

Build the project:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```


## Current Limitations

* Client-side analysis only
* ZIP upload required
* No direct GitHub repository import
* Does not execute ROS code
* Does not require ROS installation

---

## Future Improvements

Planned features:

* Workspace health scoring
* Report export (Markdown/PDF)
* Advanced launch hierarchy analysis
* Package architecture diagrams
* Better Xacro support
* Search and filtering
* Workspace comparison

---

## Target Users

* Robotics students
* ROS developers
* Research labs
* Robotics startups
* Open-source maintainers
* Educators

---

## License

MIT License

---

## Author

Utkarsh Anand

MS Robotics Systems Engineering
RWTH Aachen University

Interested in robotics software, autonomous systems, perception, ROS 2, and developer tooling.
