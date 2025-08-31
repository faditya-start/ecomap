import { FaClipboardCheck, FaUserTie, FaCalendarAlt, FaStickyNote } from "react-icons/fa";
import DetailPerusahaanCard from "./DetailPerusahaanCard";
import type { Inspection } from "../types/database";

interface StatusPemeriksaanProps {
  inspections: Inspection[];
}

export default function StatusPemeriksaanPerusahaan({ inspections }: StatusPemeriksaanProps) {
  return (
    <DetailPerusahaanCard title="Status Pemeriksaan" icon={<FaClipboardCheck />}>
      <div className="space-y-4">
        {inspections.length === 0 ? (
          <p className="text-gray-500 text-sm">Belum ada data pemeriksaan.</p>
        ) : (
          inspections.map((insp) => (
            <div
              key={insp.id}
              className="rounded-lg p-3 bg-gray-50 shadow-sm space-y-2"
            >
              {/* Tanggal Pemeriksaan */}
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-gray-400" />
                <span className="font-medium">
                  {new Date(insp.tanggal_pemeriksaan).toLocaleDateString("id-ID")}
                </span>
              </div>

              {/* Petugas Pemeriksa */}
              <div className="flex items-center gap-2">
                <FaUserTie className="text-gray-400" />
                <span>{insp.petugas_pemeriksa}</span>
              </div>

              {/* Status Pemeriksaan */}
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs px-2 py-0.5 rounded ${
                    insp.status_pemeriksaan === "Normal"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {insp.status_pemeriksaan}
                </span>
              </div>

              {/* Catatan Pemeriksaan */}
              {insp.catatan_pemeriksaan && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaStickyNote className="text-gray-400" />
                  <span>{insp.catatan_pemeriksaan}</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </DetailPerusahaanCard>
  );
}
