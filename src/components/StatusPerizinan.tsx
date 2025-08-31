import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import type { CompanySummary } from "../types/database";

interface Props {
  companies: CompanySummary[];
}

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

export default function StatusPerizinan({ companies }: Props) {
  // Handle empty companies array
  if (!companies || companies.length === 0) {
    return (
      <div className="bg-white p-4 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold text-green-700">Status Perizinan</h2>
        <p className="text-gray-500 mt-4">Tidak ada data perusahaan tersedia</p>
      </div>
    );
  }

  const total = companies.length;

  const disetujui = companies.filter(
    (c) => c.status_persetujuan === "Telah Disetujui"
  ).length;
  const belum = companies.filter(
    (c) => c.status_persetujuan === "Belum Disetujui"
  ).length;

  // hitung status patuh
  const patuh = companies.filter((c) => c.status_patuh === "Patuh").length;
  const tidakPatuh = companies.filter(
    (c) => c.status_patuh === "Tidak Patuh"
  ).length;

  // Filter out data with zero values to avoid empty pie slices
  const data = [
    { name: "Disetujui", value: disetujui },
    { name: "Belum Disetujui", value: belum },
    { name: "Tidak Patuh", value: tidakPatuh },
  ].filter(item => item.value > 0);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold text-green-700">Status Perizinan</h2>
      <div className="flex gap-6 mt-4">
        <div className="w-1/2 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={(entry) => `${entry.name}: ${entry.value}`}
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value, "Jumlah"]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-1/2 flex flex-col justify-center space-y-2">
          <div className="p-2 bg-green-50 rounded">
            Jumlah Perusahaan: <b>{total}</b>
          </div>
          <div className="p-2 bg-green-50 rounded">
            Disetujui: <b>{disetujui}</b>
          </div>
          <div className="p-2 bg-green-50 rounded">
            Belum Disetujui: <b>{belum}</b>
          </div>
          <div className="p-2 bg-green-50 rounded">
            Patuh: <b>{patuh}</b>
          </div>
          <div className="p-2 bg-green-50 rounded">
            Tidak Patuh: <b>{tidakPatuh}</b>
          </div>
        </div>
      </div>
    </div>
  );
}