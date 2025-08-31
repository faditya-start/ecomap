import { FaLeaf } from "react-icons/fa";
import DetailPerusahaanCard from "./DetailPerusahaanCard";
import type { EnvironmentData } from "../types/database";


interface Props {
  data: EnvironmentData[];
}

export default function DataLingkungan({ data }: Props) {
  const getStatusColor = (status: EnvironmentData["status"]) => {
    switch (status) {
      case "normal":
        return "bg-green-100 text-green-700";
      case "warning":
        return "bg-yellow-100 text-yellow-700";
      case "danger":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (!data || data.length === 0) {
    return (
      <DetailPerusahaanCard title="Data Lingkungan" icon={<FaLeaf />}>
        <p className="text-gray-500 text-sm">Belum ada data lingkungan.</p>
      </DetailPerusahaanCard>
    );
  }

  return (
    <DetailPerusahaanCard title="Data Lingkungan" icon={<FaLeaf />}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 rounded-lg flex items-start justify-between"
            >
              <div className="space-y-1">
                <span className="text-sm text-gray-500">{item.parameter}</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-semibold">{item.value}</span>
                  {item.unit && (
                    <span className="text-sm text-gray-500">{item.unit}</span>
                  )}
                </div>
              </div>
              <span
                className={`${getStatusColor(
                  item.status
                )} text-xs px-2 py-0.5 rounded`}
              >
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </span>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-4">
          <div className="text-sm text-gray-500 mb-2">Status Parameter</div>
          <div className="flex gap-4">
            <span className="flex items-center gap-1 text-xs">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              Normal
            </span>
            <span className="flex items-center gap-1 text-xs">
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              Warning
            </span>
            <span className="flex items-center gap-1 text-xs">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              Danger
            </span>
          </div>
        </div>
      </div>
    </DetailPerusahaanCard>
  );
}
