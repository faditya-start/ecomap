import { FaBuilding, FaEnvelope, FaCalendar, FaIndustry, FaMapMarkerAlt, FaFileAlt } from "react-icons/fa";
import DetailPerusahaanCard from "./DetailPerusahaanCard";

export default function InfoDasarPerusahaan() {
  return (
    <DetailPerusahaanCard title="Informasi Dasar" icon={<FaBuilding />}>
      <div className="space-y-3">
        <div className="flex flex-col">
          <span className="text-green-normal font-medium">Nama Perusahaan</span>
          <div className="flex items-center gap-2">
            <FaBuilding className="text-gray-400" />
            <span className="font-medium">PT Ciremai Jaya</span>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-green-normal font-medium">Nomor Izin Lingkungan</span>
          <div className="flex items-center gap-2">
            <FaFileAlt className="text-gray-400" />
            <span className="font-medium">LH/001/2023</span>
            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded">Punya</span>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-green-normal font-medium">Jenis Industri</span>
          <div className="flex items-center gap-2">
            <FaIndustry className="text-gray-400" />
            <span className="font-medium">Manufaktur Tekstil</span>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-green-normal font-medium">Alamat</span>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-gray-400" />
            <span>Jl. Industri Raya No 123, Kawasan Industri Cikarang</span>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-green-normal font-medium">Email</span>
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-gray-400" />
            <span className="text-green-700">environmental@ciremaijaya.co.id</span>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-green-normal font-medium">Tanggal Pendaftaran</span>
          <div className="flex items-center gap-2">
            <FaCalendar className="text-gray-400" />
            <span>15/1/2023</span>
          </div>
        </div>
      </div>
    </DetailPerusahaanCard>
  );
}