import { FaRobot, FaChartBar, FaUpload } from "react-icons/fa";

const features = [
  {
    title: "Laporan AI",
    desc: "Generate Laporan Otomatis",
    icon: <FaRobot size={28} className="text-blue-500" />,
  },
  {
    title: "Dashboard Analisis",
    desc: "Visualisasi Data Tren",
    icon: <FaChartBar size={28} className="text-yellow-500" />,
  },
  {
    title: "Upload Data",
    desc: "Analisis Data Perusahaan",
    icon: <FaUpload size={28} className="text-green-normal" />,
  },
];

export default function FeatureSection() {
  return (
    <section className="space-y-4 mb-10">
      <h2 className="text-xl font-bold text-green-700">Fitur Lainnya</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((feature, i) => (
          <div
            key={i}
            className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition"
          >
            <div className="mb-3">{feature.icon}</div>
            <h3 className="font-semibold text-gray-800">{feature.title}</h3>
            <p className="text-sm text-gray-500 text-center">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
