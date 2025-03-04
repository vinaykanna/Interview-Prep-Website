import { uploadAsset } from "@/utils/services";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { twJoin } from "tailwind-merge";

function FileInput() {
  const [file, setFile] = useState<any>(null);
  const { mutate } = useMutation({
    mutationKey: ["uploadAsset"],
    mutationFn: uploadAsset,
    onSuccess: (response) => {
      alert(response?.data?.url);
      setFile(null);
    },
  });

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleUpload = () => {
    console.log("Uploading file:", file);
    const formData = new FormData();
    formData.append("file", file);
    mutate(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-xl transform transition-all hover:shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Upload Your File
        </h2>

        {/* Hidden Input + Custom Upload Area */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="relative flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
        >
          <input
            type="file"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <svg
            className="w-12 h-12 text-gray-400 mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16V8m0 0l-3 3m3-3l3 3m6-9v12m0 0l-3-3m3 3l3-3"
            />
          </svg>
          <p className="text-gray-600 text-center">
            Drag & drop a file here or{" "}
            <span className="text-blue-500 font-medium hover:underline">
              click to browse
            </span>
          </p>
        </div>

        {/* File Preview */}
        {file && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <svg
                className="w-8 h-8 text-blue-500 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="text-gray-800 font-medium ">{file.name}</span>
            </div>
            <button
              onClick={() => setFile(null)}
              className="text-red-500 hover:text-red-700 font-medium cursor-pointer"
            >
              Remove
            </button>
          </div>
        )}

        <button
          disabled={!file}
          onClick={handleUpload}
          className={twJoin(
            "mt-6 cursor-pointer w-full py-2 px-4 bg-blue-500 text-white",
            "font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          Upload
        </button>
      </div>
    </div>
  );
}

export default FileInput;
