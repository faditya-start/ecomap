import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { bulan: "Jan", jumlah: 152 },
  { bulan: "Feb", jumlah: 180 },
  { bulan: "Mar", jumlah: 160 },
  { bulan: "Apr", jumlah: 170 },
  { bulan: "Mei", jumlah: 154 },
  { bulan: "Jun", jumlah: 169 },
  { bulan: "Jul", jumlah: 150 },
];

export default function ProgresPemeriksaan() {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md mt-6">
      <h2 className="text-lg font-semibold text-green-700">Progres Pemeriksaan per Bulan</h2>
      <div className="h-72">
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="bulan" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="jumlah" fill="#22c55e" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
