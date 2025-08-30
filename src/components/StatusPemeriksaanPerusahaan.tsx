import { FaClipboardCheck, FaRegBuilding } from "react-icons/fa";
import DetailPerusahaanCard from "./DetailPerusahaanCard";

interface RiwayatPemeriksaan {
  tanggal: string;
  petugas: string;
}

const riwayatPemeriksaan: RiwayatPemeriksaan[] = [
  { tanggal: "15/7/2025", petugas: "Budi Santoso" },
  { tanggal: "15/7/2025", petugas: "Budi Santoso" },
  { tanggal: "15/7/2025", petugas: "Budi Santoso" },
];

export default function StatusPemeriksaan() {
  return (
    <DetailPerusahaanCard title="Status & Pemeriksaan" icon={<FaClipboardCheck />}>
      <div className="space-y-3">
        <div className="flex flex-col">
          <span className="text-green-normal font-medium">Status Persetujuan</span>
          <div className="flex items-center gap-2">
            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded">
              Telah Disetujui
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-green-normal font-medium">Pemeriksaan Terakhir</span>
          <div className="flex items-center gap-2">
            <span className="font-medium">15/7/2025</span>
            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded">
              Punya
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-green-normal font-medium">Petugas Pemeriksa</span>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              
              <span>Budi Santoso</span>
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-green-normal font-medium">Catatan Pemeriksaan</span>
          <p className="text-sm mt-1">
            Semua parameter lingkungan dalam batas normal. Sistem pengolahan limbah berfungsi dengan baik.
          </p>
        </div>

        <div className="flex flex-col mt-4">
          <span className="text-green-normal font-medium mb-2">Riwayat Pemeriksaan</span>
          <div className="space-y-2">
            {riwayatPemeriksaan.map((riwayat, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
              >
                <FaRegBuilding className="text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm">{riwayat.tanggal}</p>
                  <p className="text-xs text-gray-500">{riwayat.petugas}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DetailPerusahaanCard>
  );
}
