import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient"; 
import { FaExclamationTriangle, FaCheckCircle, FaChartLine, FaBuilding } from "react-icons/fa";

type Report = {
  title: string;
  value: string;
  subtitle: string;
  color: string;
  icon: React.ReactNode;
};

export default function ReportSection() {


  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      const { data, error } = await supabase.from("companies").select("*");

      if (error) {
        console.error("Error fetching companies:", error);
        setLoading(false);
        return;
      }

      if (data) {
        const total = data.length;
        const sudahDiproses = data.filter((c) => c.status_persetujuan).length;
        const patuh = data.filter((c) => c.status_patuh?.toLowerCase() === "patuh").length;
        const tidakDisetujui = data.filter((c) =>
          c.status_persetujuan?.toLowerCase().includes("belum")
        ).length;

        const reportsData = [
          {
            title: "Perusahaan Terdaftar",
            value: total.toString(),
            subtitle: "Total perusahaan di database",
            color: "text-green-600",
            icon: <FaBuilding className="inline ml-1" />,
          },
          {
            title: "Sudah Diproses",
            value: sudahDiproses.toString(),
            subtitle: `dari ${total} perusahaan`,
            color: "text-green-600",
            icon: <FaCheckCircle className="inline ml-1" />,
          },
          {
            title: "Tingkat Kepatuhan",
            value: total > 0 ? `${((patuh / total) * 100).toFixed(1)}%` : "0%",
            subtitle: `${patuh} Perusahaan Patuh`,
            color: "text-green-600",
            icon: <FaChartLine className="inline ml-1" />,
          },
          {
            title: "Perlu Tindak Lanjut",
            value: tidakDisetujui.toString(),
            subtitle: `${tidakDisetujui} Perusahaan Belum Disetujui`,
            color: "text-yellow-600",
            icon: <FaExclamationTriangle className="inline ml-1" />,
          },
        ];

        setReports(reportsData);
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) return <p>Loading laporan...</p>;

  return (
    <section className="space-y-6 gap-2 mb-10">
      <h2 className="text-xl font-bold text-green-700">Laporan di Bulan Agustus</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {reports.map((report, i) => (
          <div
            key={i}
            className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-600">{report.title}</p>
              <p className={`${report.color}`}>{report.icon}</p>
            </div>
            <h3 className={`text-2xl font-bold ${report.color}`}>{report.value}</h3>
            <p className="text-xs text-gray-500">{report.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
