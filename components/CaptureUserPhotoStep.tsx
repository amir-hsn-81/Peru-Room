import React, { useRef } from 'react';
import Camera from './Camera';
import UploadIcon from './icons/UploadIcon';

interface CaptureUserPhotoStepProps {
  onPhotoTaken: (imageDataUrl: string) => void;
}

const CaptureUserPhotoStep: React.FC<CaptureUserPhotoStepProps> = ({ onPhotoTaken }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          onPhotoTaken(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center p-4 w-full max-w-md mx-auto">
        <div className="text-center mb-6 animate-fade-in-down">
            <h2 className="text-2xl font-bold text-gray-100">Step 1: Your Photo</h2>
            <p className="text-gray-400 mt-2">
                Use your camera or upload a photo. Stand in a well-lit area and fit your whole body in the frame.
            </p>
        </div>
        <div className="w-full animate-fade-in-up" style={{ animationDelay: '150ms' }}>
            <Camera onCapture={onPhotoTaken} />
        </div>
        <div className="my-4 flex items-center w-full animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <div className="flex-grow border-t border-gray-700"></div>
            <span className="flex-shrink mx-4 text-gray-500 font-semibold">OR</span>
            <div className="flex-grow border-t border-gray-700"></div>
        </div>
        <div className="w-full animate-fade-in-up" style={{ animationDelay: '450ms' }}>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
            />
            <button
                onClick={handleUploadClick}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-gray-800 text-gray-300 font-semibold rounded-lg shadow-md hover:bg-gray-700 hover:text-white transition-all duration-300 border border-gray-600"
            >
                <UploadIcon className="w-6 h-6" />
                Upload from Gallery
            </button>
        </div>
    </div>
  );
};

export default CaptureUserPhotoStep;