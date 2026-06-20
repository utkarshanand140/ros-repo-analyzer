interface UploadPanelProps {
  onFileSelected: (file: File) => void;
}

export default function UploadPanel({
  onFileSelected,
}: UploadPanelProps) {
  return (
    <div
      className="
        rounded-[32px]
        border
        border-slate-800
        bg-slate-900
        p-10
        shadow-2xl
      "
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white">
          Upload Workspace
        </h2>

        <p className="mt-2 text-slate-400">
          Upload a ROS2 workspace ZIP archive and
          automatically analyze packages,
          launch files, dependencies,
          URDF models and diagnostics.
        </p>
      </div>

      <label
        className="
          flex
          min-h-[280px]
          cursor-pointer
          flex-col
          items-center
          justify-center
          rounded-[28px]
          border-2
          border-dashed
          border-slate-700
          transition-all
          hover:border-blue-500
          hover:bg-slate-800
        "
      >
        <div className="text-7xl mb-4">
          📦
        </div>

        <div className="text-2xl font-semibold text-white">
          Drop ZIP File Here
        </div>

        <div className="mt-3 text-slate-400">
          or click to browse
        </div>

        <input
          type="file"
          accept=".zip"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (file) {
              onFileSelected(file);
            }
          }}
        />
      </label>
    </div>
  );
}