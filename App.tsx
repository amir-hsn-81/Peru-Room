import React, { useState } from 'react';
import { AppStep, ClothingType } from './types';
import WelcomeStep from './components/WelcomeStep';
import CaptureUserPhotoStep from './components/CaptureUserPhotoStep';
import SelectClothingStep from './components/SelectClothingStep';
import ProcessingStep from './components/ProcessingStep';
import ResultStep from './components/ResultStep';
import { virtualTryOn } from './services/geminiService';

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
        </div>
    </main>
  );
};

export default App;