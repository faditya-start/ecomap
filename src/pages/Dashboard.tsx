import MapSection from "../components/MapSection";
import FeatureSection from "../components/FeatureSection";
import NotificationsSection from "../components/NotificationsSection";
import HeroSection from "../components/HeroSection";
import ReportSection from "../components/ReportSection";

export default function Dashboard() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <HeroSection />
        <MapSection />
        <ReportSection />
        <FeatureSection />
        <NotificationsSection />
      </div>
    </div>
  );
}
