import { FaExclamationTriangle, FaCheckCircle, FaChartLine } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";

const reports = [
  {
    title: "Perusahaan Terdaftar",
    value: "1,247",
    subtitle: "+12% dari bulan lalu",
    color: "text-green-600",
    icon: <FaBuilding className="inline ml-1" />,
  },
  {
    title: "Sudah Diproses",
    value: "892",
    subtitle: "dari 1,247 perusahaan",
    color: "text-green-600",
    icon: <FaCheckCircle className="inline ml-1" />,
  },
  {
    title: "Tingkat Kepatuhan",
    value: "87,3%",
    subtitle: "778 Perusahaan Disetujui",
    color: "text-green-600",
    icon: <FaChartLine className="inline ml-1" />,
  },
  {
    title: "Perlu Tindak Lanjut",
    value: "113",
    subtitle: "113 Perusahaan Tidak Disetujui",
    color: "text-yellow-600",
    icon: <FaExclamationTriangle className="inline ml-1" />,
  },
];

export default function ReportSection() {
  return (
    <section className="space-y-6 gap-2 mb-10">
      <h2 className="text-xl font-bold text-green-700">
        Laporan di Bulan Agustus
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {reports.map((report, i) => (
          <div
            key={i}
            className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-600">{report.title}</p>
              <p className={`${report.color}`}>
              {report.icon}
              </p>
            </div>
            <h3 className={`text-2xl font-bold ${report.color}`}>
              {report.value}
            </h3>
            <p className="text-xs text-gray-500">{report.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
