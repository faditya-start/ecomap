import { FaInfoCircle, FaCheckCircle, FaClock, FaFileAlt } from "react-icons/fa";

export default function InfoBox() {
  return (
    <div className="p-4 border border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg text-sm">
      <div className="flex gap-3">
        <FaInfoCircle className="text-green-600 mt-0.5 w-5 h-5" />
        <div>
          <p className="font-semibold text-green-700 mb-2 flex items-center gap-2">
            <span>Informasi Penting</span>
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <FaFileAlt className="text-green-600 mt-0.5 w-3 h-3" />
              <span>Data harus sesuai dengan format sistem (CSV, Excel, atau PDF)</span>
            </li>
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-green-600 mt-0.5 w-3 h-3" />
              <span>Pastikan ukuran file tidak lebih dari 10MB</span>
            </li>
            <li className="flex items-start gap-2">
              <FaClock className="text-green-600 mt-0.5 w-3 h-3" />
              <span>Proses analisis AI memerlukan waktu ± 5 - 10 menit</span>
            </li>
            <li className="flex items-start gap-2">
              <FaInfoCircle className="text-green-600 mt-0.5 w-3 h-3" />
              <span>Hasil analisis akan tersedia di Dashboard setelah processing selesai</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}