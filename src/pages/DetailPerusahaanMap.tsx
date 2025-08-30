import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import DataLingkungan from "../components/DataLingkungan";
import StatusPemeriksaan from "../components/StatusPemeriksaanPerusahaan";
import InfoDasarPerusahaan from "../components/InfoDasarPerusahaan";

export default function DetailPerusahaanMap() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      {/* Tombol kembali */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-green-700 hover:text-green-900 mb-6"
      >
        <FaArrowLeft />
        Kembali
      </button>

      {/* Sections */}
      <InfoDasarPerusahaan />
      <StatusPemeriksaan />
      <DataLingkungan />
    </div>
  );
}
