import React, { useState } from "react"
import { CloudUpload } from "lucide-react"

interface DropZoneProps {
  id: string
  label: string
  onFileDrop: (file: File | null) => void
}

const DropZone: React.FC<DropZoneProps> = ({ id, label, onFileDrop }) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    const file = e.dataTransfer.files?.[0] || null;
    onFileDrop(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileDrop(file);
  }

  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-2">
        {label}
      </label>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative group w-full h-40 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition-all 
      ${isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-gray-50 hover:bg-gray-100"
          }`}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
          id={id}
        />
        <label htmlFor={id} className="cursor-pointer absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center text-gray-500">
            <CloudUpload className="w-10 h-10 mb-2" />
            <div className="text-sm font-medium">
              {isDragActive ? "Drop your file here" : (
                <div className='text-center'>
                  <div className='font-bold text-lg pb-2'>
                    Browse Files
                  </div>
                  <div className='text-xs'>
                    Drag and drop files here
                  </div>
                </div>
              )}
            </div>
          </div>
        </label>
      </div>
    </div >
  );
};

export default DropZone;
