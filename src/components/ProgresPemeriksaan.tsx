import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import type { Inspection } from "../types/database";

interface Props {
  inspections?: Inspection[];
}

export default function ProgresPemeriksaan({ inspections = [] }: Props) {
  // Handle empty inspections array
  if (!inspections || inspections.length === 0) {
    return (
      <div className="bg-white p-4 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold text-green-700">Progres Pemeriksaan</h2>
        <div className="h-72 flex items-center justify-center">
          <p className="text-gray-500">Tidak ada data pemeriksaan tersedia</p>
        </div>
      </div>
    );
  }

  // Hitung jumlah pemeriksaan normal vs abnormal per bulan
  const grouped = inspections.reduce<Record<string, { normal: number; abnormal: number }>>(
    (acc, insp) => {
      // Validate date
      const date = new Date(insp.tanggal_pemeriksaan);
      if (isNaN(date.getTime())) {
        console.warn("Invalid date found:", insp.tanggal_pemeriksaan);
        return acc;
      }

      const month = date.toLocaleString("id-ID", {
        month: "short",
        year: "numeric",
      });

      if (!acc[month]) acc[month] = { normal: 0, abnormal: 0 };
      
      // Handle case-insensitive status checking
      const status = insp.status_pemeriksaan?.toLowerCase();
      if (status === "normal") {
        acc[month].normal++;
      } else if (status === "abnormal" || status === "tidak normal") {
        acc[month].abnormal++;
      }

      return acc;
    },
    {}
  );

  // Sort data by date (month/year)
  const data = Object.entries(grouped)
    .map(([month, counts]) => ({
      bulan: month,
      Normal: counts.normal,
      Abnormal: counts.abnormal,
      total: counts.normal + counts.abnormal,
    }))
    .sort((a, b) => {
      // Parse the month/year for proper sorting
      const parseDate = (monthStr: string) => {
        const [month, year] = monthStr.split(' ');
        const monthMap: Record<string, number> = {
          'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'Mei': 4, 'Jun': 5,
          'Jul': 6, 'Agu': 7, 'Sep': 8, 'Okt': 9, 'Nov': 10, 'Des': 11
        };
        return new Date(parseInt(year), monthMap[month] || 0);
      };
      
      return parseDate(a.bulan).getTime() - parseDate(b.bulan).getTime();
    });

  // Calculate totals for summary
  const totalNormal = data.reduce((sum, item) => sum + item.Normal, 0);
  const totalAbnormal = data.reduce((sum, item) => sum + item.Abnormal, 0);
  const totalPemeriksaan = totalNormal + totalAbnormal;

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold text-green-700">Progres Pemeriksaan</h2>
      
      {/* Summary Statistics */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="p-2 bg-blue-50 rounded text-center">
          <div className="text-sm text-gray-600">Total Pemeriksaan</div>
          <div className="text-xl font-bold text-blue-600">{totalPemeriksaan}</div>
        </div>
        <div className="p-2 bg-green-50 rounded text-center">
          <div className="text-sm text-gray-600">Normal</div>
          <div className="text-xl font-bold text-green-600">{totalNormal}</div>
        </div>
        <div className="p-2 bg-red-50 rounded text-center">
          <div className="text-sm text-gray-600">Abnormal</div>
          <div className="text-xl font-bold text-red-600">{totalAbnormal}</div>
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis 
              dataKey="bulan" 
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              formatter={(value, name) => [value, name === "Normal" ? "Normal" : "Abnormal"]}
              labelFormatter={(label) => `Bulan: ${label}`}
              contentStyle={{
                backgroundColor: "#f9fafb",
                border: "1px solid #d1d5db",
                borderRadius: "8px"
              }}
            />
            <Legend />
            <Bar dataKey="Normal" fill="#22c55e" name="Normal" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Abnormal" fill="#ef4444" name="Abnormal" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}