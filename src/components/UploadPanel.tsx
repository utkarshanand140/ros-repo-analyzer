interface UploadPanelProps {
  onFileSelected: (file: File) => void;
}

export default function UploadPanel({
  onFileSelected,
}: UploadPanelProps) {
  return (
    <div
      style={{
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2>Upload ROS Workspace ZIP</h2>

      <input
        type="file"
        accept=".zip"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) {
            onFileSelected(file);
          }
        }}
      />
    </div>
  );
}