import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaBuilding } from "react-icons/fa";
import ReactDOMServer from "react-dom/server";
import { useNavigate } from 'react-router-dom';

// Custom icon untuk setiap status
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

// Icons berdasarkan status
const statusIcons = {
  Disetujui: createCustomIcon("#22c55e"),
  "Tidak Disetujui": createCustomIcon("#ef4444"),
  "Perlu Pemeriksaan": createCustomIcon("#eab308"),
} as const;

// Data dummy perusahaan
const companies = [
  {
    id: 1,
    name: "PT Ciremai Jaya",
    status: "Disetujui",
    lastCheck: "29 Januari 2025",
    license: "KH80/AU/1281037166",
    lat: -6.9175,
    lng: 107.6191,
  },
  {
    id: 2,
    name: "PT Mandiri Sejahtera",
    status: "Tidak Disetujui",
    lastCheck: "12 Februari 2025",
    license: "KH77/AU/1281037000",
    lat: -6.2,
    lng: 106.8166,
  },
  {
    id: 3,
    name: "PT Harapan Baru",
    status: "Perlu Pemeriksaan",
    lastCheck: "20 Februari 2025",
    license: "KH66/AU/1281037999",
    lat: -6.9,
    lng: 107.0,
  },
];

export default function MapSection() {
  const defaultCenter: LatLngExpression = [-6.9, 107.6];
  const navigate = useNavigate();

  return (
    <section className="rounded-xl border shadow bg-white p-4 mb-10">
      <h2 className="text-lg font-semibold mb-3 text-green-700">Peta Perusahaan</h2>

      <div className="w-full h-[320px] rounded-lg overflow-hidden">
        <MapContainer center={defaultCenter} zoom={9} className="w-full h-full">
          {/* Basemap dari OSM */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Marker perusahaan */}
          {companies.map((c) => (
            <Marker
              key={c.id}
              position={[c.lat, c.lng]}
              icon={statusIcons[c.status as keyof typeof statusIcons]}
            >
              <Popup>
                <div className="text-sm bg-white rounded-lg shadow p-3 w-full font-sans">
                  <table className="w-full text-left">
                    <tbody>
                      <tr>
                        <td className="text-gray-600">Nama Perusahaan</td>
                        <td className="font-medium text-green-700">: {c.name}</td>
                      </tr>
                      <tr>
                        <td className="text-gray-600">Status Persetujuan</td>
                        <td
                          className={`font-medium ${
                            c.status === "Disetujui"
                              ? "text-green-600"
                              : c.status === "Tidak Disetujui"
                              ? "text-red-600"
                              : "text-yellow-600"
                          }`}
                        >
                          : {c.status}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-gray-600">Tanggal Pemeriksaan</td>
                        <td className="text-green-700">: {c.lastCheck}</td>
                      </tr>
                      <tr>
                        <td className="text-gray-600">Nomor Izin</td>
                        <td className="text-green-700">: {c.license}</td>
                      </tr>
                    </tbody>
                  </table>

                  <button 
                    onClick={() => navigate(`/company-detail`)}
                    className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-1.5 rounded-md text-sm font-medium">
                    Lihat Selengkapnya
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
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
