interface UploadPanelProps {
  onFileSelected: (file: File) => void;
}

export default function UploadPanel({
  onFileSelected,
}: UploadPanelProps) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-2">
        Upload Workspace
      </h2>

      <p className="text-slate-400 mb-6">
        Upload a ROS2 workspace as a ZIP file.
      </p>

      <label
        className="
          flex
          cursor-pointer
          flex-col
          items-center
          justify-center
          rounded-2xl
          border-2
          border-dashed
          border-slate-700
          p-10
          transition
          hover:border-blue-500
          hover:bg-slate-800
        "
      >
        

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