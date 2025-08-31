import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import UploadDataPages from "./pages/UploadDataPages"
import DashboardAnalisis from "./pages/DashboardAnalisis";
import DetailPerusahaanMap from "./pages/DetailPerusahaan";
import LaporanAi from "./pages/LaporanAi"


export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/upload" element={<UploadDataPages />} />
          <Route path="/analisis" element={<DashboardAnalisis />} />
          <Route path="/company-detail/:id" element={<DetailPerusahaanMap />} />
          <Route path="/laporan-ai" element={<LaporanAi />} />
        </Routes>
      </Layout>
    </Router>
  );
}
