import React, { useState, useEffect } from 'react';

const messages = [
  "Preparing your fitting room...",
  "The AI is styling your outfit...",
  "Hang tight, your new look is on its way...",
  "Working our magic...",
];

const ProcessingStep: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 h-full">
      <div className="w-16 h-16 border-4 border-t-blue-500 border-gray-700 rounded-full animate-spin"></div>
      <h2 className="text-2xl font-bold text-gray-100 mt-8">Please Wait</h2>
      <p className="text-gray-400 mt-2 transition-opacity duration-500">
        {messages[messageIndex]}
      </p>
    </div>
  );
};

export default ProcessingStep;