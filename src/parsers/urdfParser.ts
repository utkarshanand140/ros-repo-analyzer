import type {
  UrdfModel,
  UrdfJoint,
} from "../types/ros";

export function parseUrdf(
  fileName: string,
  content: string
): UrdfModel {

  const parser =
    new DOMParser();

  const xml =
    parser.parseFromString(
      content,
      "application/xml"
    );

  const links: string[] = [];

  const robotName =
  xml
    .querySelector("robot")
    ?.getAttribute("name")
    ?? "Unknown Robot";

  const joints:
    UrdfJoint[] = [];

  xml
    .querySelectorAll("link")
    .forEach((link) => {

      const name =
        link.getAttribute(
          "name"
        );

      if (name) {
        links.push(name);
      }
    });

  xml
    .querySelectorAll("joint")
    .forEach((joint) => {

      const parent =
        joint
          .querySelector(
            "parent"
          )
          ?.getAttribute(
            "link"
          );

      const child =
        joint
          .querySelector(
            "child"
          )
          ?.getAttribute(
            "link"
          );

      if (
        parent &&
        child
      ) {

        joints.push({
          parent,
          child,
        });
      }
    });

  return {
  fileName,
  robotName,
  links,
  joints,
};
}