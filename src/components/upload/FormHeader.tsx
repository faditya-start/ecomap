import { FaCloudUploadAlt, FaRobot, FaLeaf, FaChartLine } from "react-icons/fa";
import { MdAnalytics } from "react-icons/md";

interface FormHeaderProps {
  title: string;
  description: string;
  subtitle: string;
  subtitleDesc: string;
}

export default function FormHeader({ title, description, subtitle, subtitleDesc }: FormHeaderProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      {/* Main Title Section */}
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl">
          <FaCloudUploadAlt className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            {title}
          </h1>
          <p className="text-gray-600 mt-1 flex items-center gap-2">
            <FaRobot className="w-4 h-4 text-blue-500" />
            {description}
          </p>
        </div>
      </div>

      {/* Features Highlight */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
          <FaLeaf className="w-5 h-5 text-green-600" />
          <div>
            <p className="font-medium text-green-700 text-sm">Environmental Data</p>
            <p className="text-xs text-green-600">Real-time monitoring</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <MdAnalytics className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-blue-700 text-sm">AI Analysis</p>
            <p className="text-xs text-blue-600">Machine learning insights</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
          <FaChartLine className="w-5 h-5 text-purple-600" />
          <div>
            <p className="font-medium text-purple-700 text-sm">Predictive Reports</p>
            <p className="text-xs text-purple-600">Automated insights</p>
          </div>
        </div>
      </div>

      {/* Subtitle Section */}
      <div className="border-t border-gray-200 pt-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <FaLeaf className="w-5 h-5 text-green-600" />
          {subtitle}
        </h2>
        <p className="text-sm text-gray-600 mt-1">{subtitleDesc}</p>
      </div>
    </div>
  );
}