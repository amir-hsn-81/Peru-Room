import React from 'react';

interface WelcomeStepProps {
  onNext: () => void;
}

const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 h-full">
      <div className="animate-fade-in-down">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4">Welcome to the Virtual Fitting Room</h1>
        <p className="text-lg text-gray-400 max-w-md mx-auto mb-10">
          Virtually try on clothes before you buy. Ready to discover your new style?
        </p>
      </div>
      <button
        onClick={onNext}
        className="animate-fade-in-up animate-pulse-glow bg-blue-600 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 ease-in-out"
      >
        Let's Get Started
      </button>
    </div>
  );
};

export default WelcomeStep;