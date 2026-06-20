import type {
  RobotTreeNode,
} from "../types/ros";

interface Props {
  node: RobotTreeNode;
}

export default function
RobotTree({
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
                <RobotTree
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