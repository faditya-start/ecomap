import { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";

interface AnalysisPopupProps {
  isOpen: boolean;
  onClose?: () => void;
}

const messages = [
  "Ecomap AI sedang menganalisis inputan anda...",
  "Ecomap AI sedang menyimpulkan jawaban anda...",
  "Ecomap AI sedang menganalisis file...",
  "Ecomap AI sedang menganalisis database...",
  "Ecomap AI sedang memproses data lingkungan...",
  "Ecomap AI sedang memverifikasi informasi..."
];

export default function AnalysisPopup({ isOpen, onClose }: AnalysisPopupProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => 
        (prevIndex + 1) % messages.length
      );
    }, 2000); // Change message every 2 seconds

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full text-center shadow-xl">
        <div className="flex justify-center mb-4">
          <FaSpinner className="w-8 h-8 animate-spin text-green-600" />
        </div>
        <p className="text-lg font-semibold text-gray-700">
          {messages[currentMessageIndex]}
        </p>
        {onClose && (
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Tutup
          </button>
        )}
      </div>
    </div>
  );
}