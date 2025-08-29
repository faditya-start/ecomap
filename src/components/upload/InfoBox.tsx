import { FaInfoCircle } from "react-icons/fa";

export default function InfoBox() {
  return (
    <div className="p-4 border border-green-300 bg-green-50 rounded-lg text-sm flex gap-3">
      <FaInfoCircle className="text-green-normal mt-0.5" />
      <div>
        <p className="font-semibold text-green-700">Informasi Penting</p>
        <ul className="list-disc list-inside text-gray-600 mt-1 space-y-1">
          <li>Data harus sesuai dengan format sistem</li>
          <li>Pastikan ukuran file tidak lebih dari 10MB</li>
          <li>Proses analisis memerlukan waktu ± 5 detik</li>
        </ul>
      </div>
    </div>
  );
}
