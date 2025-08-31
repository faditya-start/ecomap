import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaBuilding } from "react-icons/fa";
import ReactDOMServer from "react-dom/server";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

// 🔹 Buat custom icon dengan warna berbeda
const createCustomIcon = (color: string): L.DivIcon => {
  return L.divIcon({
    className: "custom-icon",
    html: ReactDOMServer.renderToString(
      <FaBuilding
        style={{
          color: color,
          fontSize: "24px",
          filter: "drop-shadow(2px 2px 2px rgba(0,0,0,0.5))",
        }}
      />
    ),
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  });
};

// 🔹 Mapping status ke icon
const statusIcons = {
  Disetujui: createCustomIcon("#22c55e"),
  "Tidak Disetujui": createCustomIcon("#ef4444"),
  "Perlu Pemeriksaan": createCustomIcon("#eab308"),
} as const;

// 🔹 Normalisasi agar tidak error case-sensitive
const normalizeStatus = (status: string) => {
  if (!status) return "Perlu Pemeriksaan";

  const lower = status.toLowerCase();

  if (lower.includes("telah")) return "Disetujui";
  if (lower.includes("belum")) return "Tidak Disetujui";

  return "Perlu Pemeriksaan";
};


type Company = {
  id: number;
  nama_perusahaan: string;
  status_persetujuan: string;
  tanggal_pendaftaran: string;
  nomor_izin_lingkungan: string;
  jenis_industri: string;
  alamat: string;
  lokasi_perusahaan: string;
};

export default function MapSection() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const navigate = useNavigate();

  // 🔹 Fetch data dari Supabase
  useEffect(() => {
    const fetchCompanies = async () => {
      const { data, error } = await supabase.from("companies").select("*");
      if (error) {
        console.error("Error fetch:", error.message);
      } else {
        console.log("Companies dari Supabase:", data);
        setCompanies(data || []);
      }
    };
    fetchCompanies();
  }, []);

  // 🔹 Tentukan center map (kalau ada data, pakai data pertama)
  const defaultCenter: LatLngExpression =
    companies.length > 0 && companies[0].lokasi_perusahaan
      ? companies[0].lokasi_perusahaan.split(",").map(Number) as [number, number]
      : [-6.9, 107.6]; // fallback Bandung

  return (
    
    <section className="rounded-xl shadow bg-white p-4 mb-10">
      <input
        type="text"
        placeholder="Cari Perusahaan..."
        className="my-2 w-full p-3 bg-green-light rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
      />

      <h2 className="text-lg font-semibold mb-3 text-green-700">
        Peta Perusahaan
      </h2>

      <div className="w-full h-[320px] rounded-lg overflow-hidden">
        <MapContainer center={defaultCenter} zoom={9} className="w-full h-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* 🔹 Render marker perusahaan */}
          {companies.map((c) => {
            // 🔹 Pecah lokasi_perusahaan "-6.512,106.828" jadi [lat, lng]
            let lat = null;
            let lng = null;
            if (c.lokasi_perusahaan) {
              const [latStr, lngStr] = c.lokasi_perusahaan.split(",");
              lat = parseFloat(latStr);
              lng = parseFloat(lngStr);
            }

            // 🔹 Kalau gagal parse, skip render marker
            if (!lat || !lng || isNaN(lat) || isNaN(lng)) return null;

            const statusKey = normalizeStatus(c.status_persetujuan);

            return (
              <Marker
                key={c.id}
                position={[lat, lng]}
                icon={statusIcons[statusKey] ?? statusIcons["Perlu Pemeriksaan"]}
              >
                <Popup>
                  <div className="text-sm bg-white rounded-lg shadow p-3 w-full font-sans">
                    <table className="w-full text-left">
                      <tbody>
                        <tr>
                          <td className="text-gray-600">Nama Perusahaan</td>
                          <td className="font-medium text-green-700">
                            : {c.nama_perusahaan}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-gray-600">Status Persetujuan</td>
                          <td
                            className={`font-medium ${
                              statusKey === "Disetujui"
                                ? "text-green-600"
                                : statusKey === "Tidak Disetujui"
                                ? "text-red-600"
                                : "text-yellow-600"
                            }`}
                          >
                            : {c.status_persetujuan}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-gray-600">Tanggal Daftar</td>
                          <td className="text-green-700">
                            : {c.tanggal_pendaftaran}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-gray-600">Nomor Izin</td>
                          <td className="text-green-700">
                            : {c.nomor_izin_lingkungan}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-gray-600">Jenis Industri</td>
                          <td className="text-green-700">
                            : {c.jenis_industri}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-gray-600">Alamat</td>
                          <td className="text-green-700">: {c.alamat}</td>
                        </tr>
                      </tbody>
                    </table>
                    <button
                      onClick={() => navigate(`/company-detail/${c.id}`)}
                      className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-1.5 rounded-md text-sm font-medium"
                    >
                      Lihat Selengkapnya
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      {/* Legend */}
      <div className="mt-4 flex gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span>Disetujui</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span>Tidak Disetujui</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span>Perlu Pemeriksaan</span>
        </div>
      </div>
    </section>
  );
}