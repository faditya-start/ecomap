import { IoIosNotifications } from "react-icons/io";

const Topbar = () => {
  return (
    <div className="h-16 font-medium bg-grey-light flex items-center justify-between px-4">
      <div className="flex flex-col">
        <div className="text-green-normal text-lg">Sistem Monitoring Lingkungan</div>
        <span className="text-grey-dark text-sm">Dinas Lingkungan Hidup</span>
      </div>
      <div className="flex items-center space-x-3">
        <IoIosNotifications className="text-2xl text-grey-dark hover:text-grey-normal cursor-pointer" />
        <span className="w-8 h-8 bg-grey-normal rounded-full"></span>
      </div>
    </div>
  );
};

export default Topbar;