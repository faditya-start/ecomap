import { FaBuilding } from "react-icons/fa";

export default function MapSection() {
  return (
    <section className="rounded-xl border shadow bg-white p-4 mb-10">
      {/* Placeholder peta */}
      <div className="relative w-full h-[320px] bg-green-50 rounded-lg overflow-hidden">
        {/* Simulasi lokasi perusahaan */}
        <div className="absolute top-10 left-20 flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-lg shadow">
          <FaBuilding size={16} />
        </div>
        <div className="absolute top-20 left-40 flex items-center justify-center w-8 h-8 bg-red-600 text-white rounded-lg shadow">
          <FaBuilding size={16} />
        </div>
        <div className="absolute bottom-16 left-1/3 flex items-center justify-center w-8 h-8 bg-yellow-500 text-white rounded-lg shadow">
          <FaBuilding size={16} />
        </div>
        <div className="absolute top-1/2 right-20 flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-lg shadow">
          <FaBuilding size={16} />
        </div>
      </div>
    </section>
  );
}
