interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  label: string;
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
  options?: string[] | SelectOption[];
  disabled?: boolean;
  required?: boolean;
}

export default function FormSelect({ 
  label, 
  placeholder, 
  value = '',
  onChange,
  options = [],
  disabled = false,
  required = false
}: FormSelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const baseClasses = "mt-1 p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:outline-none transition-colors";
  const disabledClasses = disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-white";

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select 
        value={value}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        className={`${baseClasses} ${disabledClasses}`}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option, index) => {
          if (typeof option === 'string') {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          } else {
            return (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            );
          }
        })}
      </select>
    </div>
  );
}