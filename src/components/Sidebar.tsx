import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 font-medium h-screen bg-grey-light p-4 flex flex-col space-y-4">
      <div className="text-green-normal text-xl font-bold">Green Guard</div>
      <div className="text-grey-dark">DLH Central</div>
      <div className="mt-4 space-y-2">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `block p-2 rounded ${
              isActive
                ? "bg-green-light text-green-normal"
                : "bg-grey-light text-grey-dark hover:bg-grey-light-hover active:bg-grey-light-active"
            }`
          }
        >
          Dashboard Utama
        </NavLink>

        <NavLink
          to="/upload"
          className={({ isActive }) =>
            `block p-2 rounded ${
              isActive
                ? "bg-green-light text-green-normal"
                : "bg-grey-light text-grey-dark hover:bg-grey-light-hover active:bg-grey-light-active"
            }`
          }
        >
          Upload Data Perusahaan
        </NavLink>

        <NavLink
          to="/analisis"
          className={({ isActive }) =>
            `block p-2 rounded ${
              isActive
                ? "bg-green-light text-green-normal"
                : "bg-grey-light text-grey-dark hover:bg-grey-light-hover active:bg-grey-light-active"
            }`
          }
        >
          Dashboard Analisis
        </NavLink>

        <NavLink
          to="/laporan-ai"
          className={({ isActive }) =>
            `block p-2 rounded ${
              isActive
                ? "bg-green-light text-green-normal"
                : "bg-grey-light text-grey-dark hover:bg-grey-light-hover active:bg-grey-light-active"
            }`
          }
        >
          Laporan AI
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
