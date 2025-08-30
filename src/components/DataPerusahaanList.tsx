const perusahaan = [
  "Perusahaan Ciremai Jaya",
  "Perusahaan Tanjung",
  "Perusahaan Dima",
];

export default function DataPerusahaanList() {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md mt-6">
      <h2 className="text-lg font-semibold text-green-700">Data Perusahaan</h2>
      <input
        type="text"
        placeholder="Cari Perusahaan"
        className="w-full rounded-lg px-3 py-2 mt-2 mb-4 bg-green-light focus:outline-none"
      />
      <ul className="space-y-2">
        {perusahaan.map((nama, i) => (
          <li
            key={i}
            className="p-3 rounded-xl bg-green-50 hover:bg-green-100 cursor-pointer"
          >
            {i + 1}. {nama}
          </li>
        ))}
      </ul>
    </div>
  );
}
