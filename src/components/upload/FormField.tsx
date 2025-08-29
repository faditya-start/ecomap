interface FormFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
}

export default function FormField({ label, type = "text", placeholder }: FormFieldProps) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-1 p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
      />
    </div>
  );
}
