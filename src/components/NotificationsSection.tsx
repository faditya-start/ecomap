import { FaClock, FaExclamationCircle, FaSyncAlt } from "react-icons/fa";

const notifications = [
  {
    title: "Izin Lingkungan Akan Berakhir",
    desc: "15 perusahaan memiliki izin yang akan berakhir dalam 30 hari",
    time: "2 jam yang lalu",
    color: "text-yellow-500",
    icon: <FaClock size={20} className="text-yellow-500" />,
  },
  {
    title: "Data Sensor Anomali",
    desc: "Terdeteksi data sensor anomali di PT Industri Jakarta",
    time: "2 jam yang lalu",
    color: "text-red-500",
    icon: <FaExclamationCircle size={20} className="text-red-500" />,
  },
  {
    title: "Rekomendasi Inspeksi AI",
    desc: "Sistem merekomendasikan 4 perusahaan untuk inspeksi mendadak",
    time: "2 jam yang lalu",
    color: "text-blue-500",
    icon: <FaSyncAlt size={20} className="text-blue-500" />,
  },
];

export default function NotificationsSection() {
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-green-700">Notifikasi Terbaru</h2>
        <button className="text-sm text-green-600 hover:underline">
          Lihat Semua
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((n, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition"
          >
            <div className="flex-shrink-0 mt-1">{n.icon}</div>
            <div className="flex flex-col">
              <h3 className="font-semibold text-gray-800">{n.title}</h3>
              <p className="text-sm text-gray-600">{n.desc}</p>
              <span className="text-xs text-gray-400 mt-1">{n.time}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
