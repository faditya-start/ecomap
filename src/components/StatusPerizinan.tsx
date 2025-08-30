import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Disetujui", value: 1089 },
  { name: "Perlu Pemeriksaan", value: 96 },
  { name: "Tidak Disetujui", value: 63 },
];

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

export default function StatusPerizinan() {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold text-green-700">Status Perizinan</h2>
      <div className="flex gap-6 mt-4">
        <div className="w-1/2 h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-1/2 flex flex-col justify-center space-y-2">
          <div className="p-2 bg-green-50 rounded">Jumlah Perusahaan: <b>1,247</b></div>
          <div className="p-2 bg-green-50 rounded">Disetujui: <b>1,089</b></div>
          <div className="p-2 bg-green-50 rounded">Perlu Pemeriksaan: <b>96</b></div>
          <div className="p-2 bg-green-50 rounded">Tidak Disetujui: <b>63</b></div>
        </div>
      </div>
    </div>
  );
}
