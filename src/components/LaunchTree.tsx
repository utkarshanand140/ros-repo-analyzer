import type {
  LaunchTreeNode,
} from "../types/ros";

interface Props {
  node:
    LaunchTreeNode;
}

export default function
LaunchTree({
  node,
}: Props) {

  return (
    <ul>
      <li>
        {node.name}

        {node.children
          .length > 0 && (

          <ul>
            {node.children.map(
              (
                child
              ) => (
                <LaunchTree
                  key={
                    child.name
                  }
                  node={
                    child
                  }
                />
              )
            )}
          </ul>
        )}
      </li>
    </ul>
  );
}