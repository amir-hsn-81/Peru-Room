import React, { useState, useRef } from 'react';
import { ClothingType } from '../types';
import Camera from './Camera';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import ShirtIcon from './icons/ShirtIcon';
import PantsIcon from './icons/PantsIcon';
import ShoesIcon from './icons/ShoesIcon';
import UploadIcon from './icons/UploadIcon';
import SparklesIcon from './icons/SparklesIcon';

interface SelectClothingStepProps {
  onClothingPhotoTaken: (imageDataUrl: string, clothingType: ClothingType) => void;
  onBack: () => void;
  userImage: string;
}

const CategoryButton: React.FC<{
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  delay: number;
}> = ({ label, icon, onClick, delay }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center gap-3 p-6 bg-gray-900 rounded-2xl shadow-lg hover:shadow-blue-500/20 hover:bg-gray-800 transition-all transform hover:-translate-y-1 duration-300 border border-gray-700 hover:border-blue-500 animate-fade-in-up"
    style={{ animationDelay: `${delay}ms` }}
  >
    {icon}
    <span className="font-semibold text-gray-300">{label}</span>
  </button>
);


const SelectClothingStep: React.FC<SelectClothingStepProps> = ({ onClothingPhotoTaken, onBack, userImage }) => {
  const [selectedType, setSelectedType] = useState<ClothingType | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCapture = (imageDataUrl: string) => {
    if (selectedType) {
      onClothingPhotoTaken(imageDataUrl, selectedType);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && selectedType) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
            onClothingPhotoTaken(reader.result as string, selectedType);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  if (!selectedType) {
    return (
      <div className="flex flex-col items-center p-4 w-full max-w-lg mx-auto">
        <div className="text-center mb-8 animate-fade-in-down">
            <h2 className="text-2xl font-bold text-gray-100">Step 2: Select an Item</h2>
            <p className="text-gray-400 mt-2">
                First, choose the type of item, then provide an image of it.
            </p>
        </div>
        <div className="grid grid-cols-2 gap-6 w-full max-w-sm">
          <CategoryButton label="Top" icon={<ShirtIcon className="w-10 h-10 text-blue-400" />} onClick={() => setSelectedType('Top')} delay={100} />
          <CategoryButton label="Bottom" icon={<PantsIcon className="w-10 h-10 text-blue-400" />} onClick={() => setSelectedType('Bottom')} delay={200} />
          <CategoryButton label="Shoes" icon={<ShoesIcon className="w-10 h-10 text-blue-400" />} onClick={() => setSelectedType('Shoes')} delay={300} />
          <CategoryButton label="Hairstyle" icon={<SparklesIcon className="w-10 h-10 text-blue-400" />} onClick={() => setSelectedType('Hairstyle')} delay={400} />
        </div>
        <button onClick={onBack} className="mt-8 flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors animate-fade-in-up" style={{ animationDelay: '500ms' }}>
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Back to Previous Step</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4 w-full max-w-md mx-auto animate-scale-in">
      <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-100">Now, capture the item</h2>
          <p className="text-gray-400 mt-2">
            Place the item on a flat surface, or upload a clear picture of it.
          </p>
      </div>
      <div className="w-full">
        <Camera onCapture={handleCapture} aspectRatio={1} />
      </div>
      <div className="my-4 flex items-center w-full">
            <div className="flex-grow border-t border-gray-700"></div>
            <span className="flex-shrink mx-4 text-gray-500 font-semibold">OR</span>
            <div className="flex-grow border-t border-gray-700"></div>
      </div>
      <div className="w-full">
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
      <button onClick={() => setSelectedType(null)} className="mt-8 flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors">
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Change Item Type</span>
      </button>
    </div>
  );
};

export default SelectClothingStep;