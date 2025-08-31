import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import StatusPerizinan from "../components/StatusPerizinan";
import RangkumanAnalisis from "../components/RangkumanAnalisis";
import ProgresPemeriksaan from "../components/ProgresPemeriksaan";
import type { CompanySummary, Inspection } from "../types/database";

export default function DashboardAnalisis() {
  const [izinData, setIzinData] = useState<CompanySummary[]>([]);
  const [inspectionData, setInspectionData] = useState<Inspection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch companies data
        const { data: companies, error: companiesError } = await supabase
          .from("companies")
          .select("id, nama_perusahaan, status_patuh, status_persetujuan");

        if (companiesError) {
          throw new Error(`Error fetching companies: ${companiesError.message}`);
        }

        // Fetch inspections data
        const { data: inspections, error: inspectionsError } = await supabase
          .from("inspections")
          .select("id, perusahaan_id, tanggal_pemeriksaan, petugas_pemeriksa, status_pemeriksaan")
          .order("tanggal_pemeriksaan", { ascending: false });

        if (inspectionsError) {
          throw new Error(`Error fetching inspections: ${inspectionsError.message}`);
        }

        setIzinData(companies ?? []);
        setInspectionData(inspections ?? []);

      } catch (err) {
        console.error("Error in fetchData:", err);
        setError(err instanceof Error ? err.message : "Terjadi kesalahan yang tidak terduga");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="h-80 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-red-600 mb-2">Terjadi Kesalahan</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Muat Ulang Halaman
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold text-green-700">Dashboard Analisis</h1>

      {/* Status Perizinan */}
      <StatusPerizinan companies={izinData} />
      
      {/* Progres Pemeriksaan - sekarang dengan data */}
      <ProgresPemeriksaan inspections={inspectionData} />
      
      {/* Rangkuman Analisis - dengan data untuk AI analysis */}
      <RangkumanAnalisis companies={izinData} inspections={inspectionData} />
    </div>
  );
}