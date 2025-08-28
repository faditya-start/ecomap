import Sidebar from "./Sidebar";
import Topbar from "./TopBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <Topbar />

        {/* Halaman */}
        <main className="flex-1 p-4 bg-grey-light overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
