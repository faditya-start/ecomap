import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaBuilding } from "react-icons/fa";
import ReactDOMServer from 'react-dom/server';

// Custom icon untuk setiap status
const createCustomIcon = (color: string): L.DivIcon => {
  return L.divIcon({
    className: 'custom-icon',
    html: ReactDOMServer.renderToString(
      <FaBuilding style={{ 
        color: color,
        fontSize: '24px',
        filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.5))'
      }} />
    ),
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  });
};

// Icons berdasarkan status
const statusIcons = {
  "Disetujui": createCustomIcon("#22c55e"),       
  "Tidak Disetujui": createCustomIcon("#ef4444"), 
  "Perlu Pemeriksaan": createCustomIcon("#eab308") 
} as const;

// Data dummy perusahaan
const companies = [
  { id: 1, name: "PT Ciremai Jaya", lat: -6.9175, lng: 107.6191, status: "Disetujui" },
  { id: 2, name: "PT Mandiri Sejahtera", lat: -6.2, lng: 106.8166, status: "Tidak Disetujui" },
  { id: 3, name: "PT Harapan Baru", lat: -6.9, lng: 107.0, status: "Perlu Pemeriksaan" },
];

export default function MapSection() {
  const defaultCenter: LatLngExpression = [-6.9, 107.6];

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
                <div className="font-sans">
                  <div className="font-semibold">{c.name}</div>
                  <div className={`text-sm ${
                    c.status === "Disetujui" ? "text-green-600" :
                    c.status === "Tidak Disetujui" ? "text-red-600" :
                    "text-yellow-600"
                  }`}>
                    Status: {c.status}
                  </div>
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
