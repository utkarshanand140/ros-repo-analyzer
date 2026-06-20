import type {
  RobotTreeNode,
  UrdfModel,
} from "../types/ros";

export function buildRobotTree(
  model: UrdfModel
): RobotTreeNode | null {

  const childLinks =
    new Set<string>();

  const nodeMap =
    new Map<
      string,
      RobotTreeNode
    >();

  for (
    const link
    of model.links
  ) {

    nodeMap.set(
      link,
      {
        name: link,
        children: [],
      }
    );
  }

  for (
    const joint
    of model.joints
  ) {

    childLinks.add(
      joint.child
    );

    const parentNode =
      nodeMap.get(
        joint.parent
      );

    const childNode =
      nodeMap.get(
        joint.child
      );

    if (
      parentNode &&
      childNode
    ) {

      parentNode.children.push(
        childNode
      );
    }
  }

  const rootLink =
    model.links.find(
      (link) =>
        !childLinks.has(
          link
        )
    );

  if (!rootLink) {
    return null;
  }

  return (
    nodeMap.get(
      rootLink
    ) ?? null
  );
}