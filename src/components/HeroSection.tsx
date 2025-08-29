export default function HeroSection() {
  return (
    <header className="space-y-3">
      <h1 className="text-2xl font-bold text-green-700">
        Selamat Pagi, Meika 👋
      </h1>
      <p className="text-gray-600 text-sm">
        Lihat Perusahaan yang Ada di Kabupaten Bekasi
      </p>
      <div>
        <input
          type="text"
          placeholder="Cari Perusahaan..."
          className="mt-2 w-full p-3 bg-green-light rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
        />
      </div>
    </header>
  );
}
