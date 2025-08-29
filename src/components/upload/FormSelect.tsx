interface FormSelectProps {
  label: string;
  placeholder: string;
}

export default function FormSelect({ label, placeholder }: FormSelectProps) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <select className="mt-1 p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:outline-none">
        <option>{placeholder}</option>
      </select>
    </div>
  );
}
