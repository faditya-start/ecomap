import { FaLeaf } from "react-icons/fa";
import DetailPerusahaanCard from "./DetailPerusahaanCard";

export default function DataLingkungan() {
  return (
    <DetailPerusahaanCard title="Data Lingkungan" icon={<FaLeaf />}>
      <p>Data lingkungan akan ditampilkan di sini (placeholder).</p>
    </DetailPerusahaanCard>
  );
}
