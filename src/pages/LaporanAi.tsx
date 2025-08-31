import DataPerusahaanList from "../components/DataPerusahaanList";

export default function LaporanAi() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold text-green-dark">Laporan AI</h1>
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">Rangkuman</h2>
        <p className="text-gray-700">
          Laporan ini menyajikan analisis mendalam mengenai data yang diperoleh
          dari sistem AI.
        </p>
        <DataPerusahaanList />
      </div>
    </div>
  );
}