import ReactFlow, {
  Background,
  Controls,
} from "reactflow";

import type {
  Node,
  Edge,
} from "reactflow";

import "reactflow/dist/style.css";

import type {
  RosPackage,
} from "../types/ros";

interface Props {
  packages: RosPackage[];
}

export default function DependencyGraph({
  packages,
}: Props) {

  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const workspacePackages =
  new Set(
    packages.map(
      (pkg) => pkg.name
    )
  );

  const addedNodes =
    new Set<string>();

  let x = 0;
  let y = 0;

  packages.forEach((pkg) => {

    if (!addedNodes.has(pkg.name)) {

      nodes.push({
        id: pkg.name,
        data: {
          label: pkg.name,
        },
        position: {
          x,
          y,
        },
      });

      addedNodes.add(
        pkg.name
      );

      y += 120;
    }

    pkg.dependencies.forEach(
      (dep) => {

        if (
          !addedNodes.has(dep)
        ) {

          nodes.push({
  id: dep,

  data: {
    label:
      workspacePackages.has(dep)
        ? dep
        : `${dep} (external)`,
  },

  position: {
    x: 400,
    y:
      Math.random() * 800,
  },
});

          addedNodes.add(
            dep
          );
        }

        edges.push({
          id:
            pkg.name +
            "-" +
            dep,
          source:
            pkg.name,
          target: dep,
        });
      }
    );
  });

  return (
    <div
      style={{
        height: "600px",
        marginTop: "2rem",
        border:
          "1px solid #ccc",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}