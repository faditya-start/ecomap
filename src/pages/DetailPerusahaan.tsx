import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { supabase } from "../lib/supabaseClient";
import InfoDasarPerusahaan from "../components/InfoDasarPerusahaan";
import StatusPemeriksaan from "../components/StatusPemeriksaanPerusahaan";
import DataLingkungan from "../components/DataLingkungan";
import type { Company, Inspection, EnvironmentData } from "../types/database";

export default function DetailPerusahaanMap() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [company, setCompany] = useState<Company | null>(null);
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [environmentData, setEnvironmentData] = useState<EnvironmentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // ambil data perusahaan
      const { data: companyData, error: companyError } = await supabase
        .from("companies")
        .select("*")
        .eq("id", id)
        .single();

      if (companyError) {
        console.error(companyError);
      } else {
        setCompany(companyData);
      }

      // ambil data inspeksi
      const { data: inspectionsData, error: inspectionError } = await supabase
        .from("inspections")
        .select("*")
        .eq("perusahaan_id", id)
        .order("tanggal_pemeriksaan", { ascending: false });

      if (inspectionError) {
        console.error(inspectionError);
      } else {
        setInspections(inspectionsData || []);
      }

      // ambil data lingkungan
      const { data: envData, error: envError } = await supabase
        .from("environment_data")
        .select("*")
        .eq("perusahaan_id", id);

      if (envError) {
        console.error(envError);
      } else {
        setEnvironmentData(envData || []);
      }

      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!company) return <p className="p-6">Perusahaan tidak ditemukan</p>;

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-green-700 hover:text-green-900 mb-6"
      >
        <FaArrowLeft />
        Kembali
      </button>

      {/* Info Dasar */}
      <InfoDasarPerusahaan company={company} />

      {/* Status Pemeriksaan */}
      <StatusPemeriksaan inspections={inspections} />

      {/* Data Lingkungan */}
      <DataLingkungan data={environmentData} />
    </div>
  );
}
