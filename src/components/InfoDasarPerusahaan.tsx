import {
  FaBuilding,
  FaEnvelope,
  FaCalendar,
  FaIndustry,
  FaMapMarkerAlt,
  FaFileAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import DetailPerusahaanCard from "./DetailPerusahaanCard";
import type { Company } from "../types/database"; 

interface InfoDasarPerusahaanProps {
  company: Company;
}

export default function InfoDasarPerusahaan({ company }: InfoDasarPerusahaanProps) {
  return (
    <DetailPerusahaanCard title="Informasi Dasar" icon={<FaBuilding />}>
      <div className="space-y-3">

        {/* Nama Perusahaan */}
        <div className="flex flex-col">
          <span className="text-green-normal font-medium">Nama Perusahaan</span>
          <div className="flex items-center gap-2">
            <FaBuilding className="text-gray-400" />
            <span className="font-medium">{company.nama_perusahaan}</span>
          </div>
        </div>

        {/* Nomor Izin Lingkungan */}
        <div className="flex flex-col">
          <span className="text-green-normal font-medium">Nomor Izin Lingkungan</span>
          <div className="flex items-center gap-2 flex-wrap">
            <FaFileAlt className="text-gray-400" />
            <span className="font-medium">{company.nomor_izin_lingkungan || "-"}</span>
            <span
              className={`text-xs px-2 py-0.5 rounded ${
                company.status_persetujuan === "Telah Disetujui"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {company.status_persetujuan}
            </span>
          </div>
        </div>

        {/* Jenis Industri */}
        <div className="flex flex-col">
          <span className="text-green-normal font-medium">Jenis Industri</span>
          <div className="flex items-center gap-2">
            <FaIndustry className="text-gray-400" />
            <span className="font-medium">{company.jenis_industri}</span>
          </div>
        </div>

        {/* Alamat */}
        {company.alamat && (
          <div className="flex flex-col">
            <span className="text-green-normal font-medium">Alamat</span>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-gray-400" />
              <span>{company.alamat}</span>
            </div>
          </div>
        )}

        {/* Email */}
        {company.email && (
          <div className="flex flex-col">
            <span className="text-green-normal font-medium">Email</span>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-gray-400" />
              <span className="text-green-700">{company.email}</span>
            </div>
          </div>
        )}

        {/* Tanggal Pendaftaran */}
        <div className="flex flex-col">
          <span className="text-green-normal font-medium">Tanggal Pendaftaran</span>
          <div className="flex items-center gap-2">
            <FaCalendar className="text-gray-400" />
            <span>
              {company.tanggal_pendaftaran
                ? new Date(company.tanggal_pendaftaran).toLocaleDateString("id-ID")
                : "-"}
            </span>
          </div>
        </div>

        {/* Status Kepatuhan */}
        <div className="flex flex-col">
          <span className="text-green-normal font-medium">Status Kepatuhan</span>
          <div className="flex items-center gap-2">
            {company.status_patuh === "Patuh" ? (
              <FaCheckCircle className="text-green-500" />
            ) : (
              <FaTimesCircle className="text-red-500" />
            )}
            <span
              className={`text-xs px-2 py-0.5 rounded ${
                company.status_patuh === "Patuh"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {company.status_patuh}
            </span>
          </div>
        </div>
      </div>
    </DetailPerusahaanCard>
  );
}
