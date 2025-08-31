import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import type { Company } from "../types/database";

export default function DataPerusahaanList() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchCompanies() {
      const { data, error } = await supabase.from("companies").select("*");

      if (error) {
        console.error("Error fetching companies:", error);
      } else if (data) {
        setCompanies(data as Company[]);
      }
    }

    fetchCompanies();
  }, []);

  const handleCompanyClick = (id: number) => {
    navigate(`/company-detail/${id}`);
  };

  // filter sesuai input pencarian
  const filtered = companies.filter((c) =>
    c.nama_perusahaan.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md mt-6">
      <h2 className="text-lg font-semibold text-green-700">Data Perusahaan</h2>
      <input
        type="text"
        placeholder="Cari Perusahaan"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg px-3 py-2 mt-2 mb-4 bg-green-50 focus:outline-none"
      />
      <ul className="space-y-2">
        {filtered.map((company) => (
          <li
            key={company.id}
            className="p-3 rounded-xl bg-green-50 hover:bg-green-100 cursor-pointer transition-colors"
            onClick={() => handleCompanyClick(company.id)}
          >
            {company.id}. {company.nama_perusahaan}
          </li>
        ))}
      </ul>
    </div>
  );
}
