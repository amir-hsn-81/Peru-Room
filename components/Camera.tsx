import React, { useRef, useEffect, useState, useCallback } from 'react';
import CameraIcon from './icons/CameraIcon';

interface CameraProps {
  onCapture: (imageDataUrl: string) => void;
  aspectRatio?: number;
}

const Camera: React.FC<CameraProps> = ({ onCapture, aspectRatio = 9 / 16 }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Could not access the camera. Please grant permission.');
    }
  }, []);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        const videoWidth = video.videoWidth;
        const videoHeight = video.videoHeight;
        
        canvas.width = videoWidth;
        canvas.height = videoHeight;

        // Flip the image horizontally for a mirror effect
        context.translate(videoWidth, 0);
        context.scale(-1, 1);
        
        context.drawImage(video, 0, 0, videoWidth, videoHeight);
        
        const imageDataUrl = canvas.toDataURL('image/jpeg', 0.9);
        onCapture(imageDataUrl);
      }
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-4 bg-red-900/50 text-red-300 rounded-lg border border-red-700">
        <p>{error}</p>
        <button
          onClick={startCamera}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="w-full bg-black rounded-2xl overflow-hidden shadow-lg border border-gray-700" style={{ aspectRatio: `${aspectRatio}` }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover transform scaleX-[-1]" // Mirror effect
        ></video>
      </div>
      <button
        onClick={handleCapture}
        className="group relative w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition-all duration-300"
        aria-label="Capture photo"
      >
        <div className="absolute inset-0.5 rounded-full border-4 border-gray-600 group-hover:border-blue-500 transition-all duration-300"></div>
        <CameraIcon className="w-8 h-8 text-gray-400 group-hover:text-blue-400 transition-colors" />
      </button>
      <canvas ref={canvasRef} className="hidden"></canvas>
    </div>
  );
};

export default Camera;