import React, { useState } from 'react';
import { AppStep, ClothingType } from './types';
import WelcomeStep from './components/WelcomeStep';
import CaptureUserPhotoStep from './components/CaptureUserPhotoStep';
import SelectClothingStep from './components/SelectClothingStep';
import ProcessingStep from './components/ProcessingStep';
import ResultStep from './components/ResultStep';
import { virtualTryOn } from './services/geminiService';

// Check if the API key is provided through environment variables.
const isApiKeyConfigured = process.env.API_KEY && process.env.API_KEY.length > 0;

const ApiKeyNotConfigured: React.FC = () => (
    <div className="flex flex-col items-center justify-center text-center p-8 h-full animate-fade-in-down">
        <div className="w-16 h-16 mb-6 text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-100 mb-4">Configuration Required</h1>
        <p className="text-lg text-gray-400 max-w-lg mx-auto">
            This application cannot connect to the AI service. The <code className="bg-gray-800 text-yellow-400 px-2 py-1 rounded">API_KEY</code> is missing.
        </p>
        <p className="text-md text-gray-500 max-w-lg mx-auto mt-4">
            Please configure this in your hosting environment's variables to enable the app.
        </p>
    </div>
);


const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.Welcome);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [clothingImage, setClothingImage] = useState<string | null>(null);
  const [clothingType, setClothingType] = useState<ClothingType | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRestart = () => {
    setUserImage(null);
    setClothingImage(null);
    setClothingType(null);
    setGeneratedImage(null);
    setError(null);
    setStep(AppStep.Welcome);
  };

  const handleUserPhotoTaken = (imageDataUrl: string) => {
    setUserImage(imageDataUrl);
    setStep(AppStep.SelectClothing);
  };
  
  const handleBackToUserCapture = () => {
      setUserImage(null);
      setStep(AppStep.CaptureUser);
  };

  const handleClothingPhotoTaken = async (imageDataUrl: string, type: ClothingType) => {
    setClothingImage(imageDataUrl);
    setClothingType(type);
    setStep(AppStep.Processing);
    setError(null);

    if (userImage) {
      try {
        const result = await virtualTryOn(userImage, imageDataUrl, type);
        if (result) {
          setGeneratedImage(result);
          setStep(AppStep.Result);
        } else {
          throw new Error('AI model did not return an image.');
        }
      } catch (e) {
        console.error(e);
        setError('Sorry, an error occurred while processing the image. Please try again.');
        setStep(AppStep.SelectClothing); // Go back to allow retry
      }
    }
  };

  const renderStep = () => {
    switch (step) {
      case AppStep.Welcome:
        return <WelcomeStep onNext={() => setStep(AppStep.CaptureUser)} />;
      case AppStep.CaptureUser:
        return <CaptureUserPhotoStep onPhotoTaken={handleUserPhotoTaken} />;
      case AppStep.SelectClothing:
        return (
          <SelectClothingStep
            onClothingPhotoTaken={handleClothingPhotoTaken}
            onBack={handleBackToUserCapture}
            userImage={userImage!}
          />
        );
      case AppStep.Processing:
        return <ProcessingStep />;
      case AppStep.Result:
        if (userImage && generatedImage) {
          return (
            <ResultStep
              originalImage={userImage}
              generatedImage={generatedImage}
              onRestart={handleRestart}
            />
          );
        }
        // Fallback if images are missing
        handleRestart();
        return null;
      default:
        return <WelcomeStep onNext={() => setStep(AppStep.CaptureUser)} />;
    }
  };

  return (
    <main className="bg-black min-h-screen w-full flex flex-col items-center justify-center transition-all duration-500 text-gray-200">
        <div className="w-full h-full flex-grow flex items-center justify-center p-4">
            {!isApiKeyConfigured ? (
                <ApiKeyNotConfigured />
            ) : (
                <>
                    {error && (
                        <div 
                            className="absolute top-5 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg shadow-md z-10 animate-fade-in-down"
                            role="alert"
                        >
                            <strong className="font-bold">Error: </strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    {renderStep()}
                </>
            )}
        </div>
    </main>
  );
};

export default App;