import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import UploadDataPages from "./pages/UploadDataPages"
import DashboardAnalisis from "./pages/DashboardAnalisis";


export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/upload" element={<UploadDataPages />} />
          <Route path="/analisis" element={<DashboardAnalisis />} />
        </Routes>
      </Layout>
    </Router>
  );
}
