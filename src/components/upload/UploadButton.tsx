import { FaSpinner, FaRobot } from "react-icons/fa";

interface UploadButtonProps {
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export default function UploadButton({ loading = false, disabled = false, onClick }: UploadButtonProps) {
  return (
    <button 
      type="submit"
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        w-full py-3 px-4 font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2
        ${disabled || loading 
          ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
          : 'bg-green-600 hover:bg-green-700 text-white hover:shadow-lg transform hover:-translate-y-0.5'
        }
      `}
    >
      {loading ? (
        <>
          <FaSpinner className="w-4 h-4 animate-spin" />
          Menganalisis Data...
        </>
      ) : (
        <>
          <FaRobot className="w-4 h-4" />
          Upload File dan Analisis AI
        </>
      )}
    </button>
  );
}