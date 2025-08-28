import { IoIosNotifications } from "react-icons/io";

const Topbar = () => {
  return (
    <div className="h-16 font-medium bg-grey-light flex items-center justify-between px-4">
      <div className="text-green-normal text-lg">Sistem Monitoring Lingkungan</div>
      <div className="flex items-center space-x-3">
        <span className="text-grey-dark">Dinas Lingkungan Hidup</span>
        <IoIosNotifications className="text-2xl text-grey-dark hover:text-grey-normal cursor-pointer" />
        <span className="w-8 h-8 bg-grey-normal rounded-full"></span>
      </div>
    </div>
  );
};

export default Topbar;