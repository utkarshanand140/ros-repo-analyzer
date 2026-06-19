export type FileType =
  | "package"
  | "launch"
  | "urdf"
  | "xacro"
  | "unknown";

export function classifyFile(
  path: string,
  content: string
): FileType {

  const lowerPath = path.toLowerCase();

  // package.xml
  if (
    lowerPath.endsWith("package.xml") &&
    content.includes("<package")
  ) {
    return "package";
  }

  // launch xml
  if (
    content.match(/<launch[\s>]/)
  ) {
    return "launch";
  }

  // launch python
  if (
    content.includes("LaunchDescription") ||
    content.includes(
      "generate_launch_description"
    ) ||
    content.includes(
      "from launch import"
    ) ||
    content.includes(
      "from launch_ros.actions"
    )
  ) {
    return "launch";
  }

  // xacro
  if (
    content.includes("xmlns:xacro") ||
    content.includes("<xacro:")
  ) {
    return "xacro";
  }

  // urdf
  if (
    content.match(/<robot[\s>]/) &&
    content.includes("<link")
  ) {
    return "urdf";
  }

  return "unknown";
}