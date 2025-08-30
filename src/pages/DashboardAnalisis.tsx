import StatusPerizinan from "../components/StatusPerizinan";
import RangkumanAnalisis from "../components/RangkumanAnalisis";
import DataPerusahaanList from "../components/DataPerusahaanList";
import ProgresPemeriksaan from "../components/ProgresPemeriksaan";

export default function DashboardAnalisis() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold text-green-700">Dashboard Analisis</h1>
      <StatusPerizinan />
      <ProgresPemeriksaan />
      <RangkumanAnalisis />
      <DataPerusahaanList />
    </div>
  );
}
