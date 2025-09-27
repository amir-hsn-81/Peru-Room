import React from 'react';
import RedoIcon from './icons/RedoIcon';

interface ResultStepProps {
  originalImage: string;
  generatedImage: string;
  onRestart: () => void;
}

const ResultStep: React.FC<ResultStepProps> = ({ originalImage, generatedImage, onRestart }) => {
  return (
    <div className="flex flex-col items-center p-4 w-full max-w-4xl mx-auto">
      <div className="text-center mb-8 animate-fade-in-down">
        <h2 className="text-3xl font-bold text-gray-100">Here's Your New Style!</h2>
        <p className="text-gray-400 mt-2">
          What do you think of the result? You can always try again.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full">
        <div className="flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <h3 className="text-lg font-semibold text-gray-300 mb-3">Original Photo</h3>
          <img src={originalImage} alt="Original" className="rounded-2xl shadow-lg w-full border-2 border-gray-700" />
        </div>
        <div className="flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <h3 className="text-lg font-semibold text-gray-300 mb-3">AI Generated Result</h3>
          <img src={generatedImage} alt="Generated" className="rounded-2xl shadow-lg w-full border-2 border-blue-500/50" />
        </div>
      </div>

      <button
        onClick={onRestart}
        className="mt-10 bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center gap-2 animate-fade-in-up"
        style={{ animationDelay: '500ms' }}
      >
        <RedoIcon className="w-5 h-5" />
        <span>Try Again</span>
      </button>
    </div>
  );
};

export default ResultStep;