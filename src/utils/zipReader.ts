import JSZip from "jszip";

export interface ZipFileInfo {
  path: string;
  content: string;
}

export async function readZip(
  file: File
): Promise<ZipFileInfo[]> {
  const zip = await JSZip.loadAsync(file);

  const files: ZipFileInfo[] = [];

for (const key of Object.keys(zip.files)) {
const entry = zip.files[key];

if (!entry.dir) {
    let content = "";

try {
  content = await entry.async("text");
} catch {
  content = "";
}

    files.push({
    path: entry.name,
    content,
    });
}
}

  return files;
}