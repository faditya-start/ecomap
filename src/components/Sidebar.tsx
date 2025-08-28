const Sidebar = () => {
  return (
    <div className="w-64 font-medium h-screen bg-grey-light p-4 flex flex-col space-y-4">
      <div className="text-green-normal text-xl font-bold">Green Guard</div>
      <div className="text-grey-dark">DLH Central</div>
      <div className="mt-4 space-y-2">
        <a href="#" className="block p-2 bg-green-light hover:bg-green-light-hover active:bg-green-light-active text-green-normal rounded">
          Dashboard Utama
        </a>
        <a href="#" className="block p-2 bg-grey-light hover:bg-grey-light-hover active:bg-grey-light-active text-grey-dark rounded">
          Upload Data Perusahaan
        </a>
        <a href="#" className="block p-2 bg-grey-light hover:bg-grey-light-hover active:bg-grey-light-active text-grey-dark rounded">
          Dashboard Analisis
        </a>
        <a href="#" className="block p-2 bg-grey-light hover:bg-grey-light-hover active:bg-grey-light-active text-grey-dark rounded">
          Laporan AI
        </a>
      </div>
    </div>
  );
};

export default Sidebar;