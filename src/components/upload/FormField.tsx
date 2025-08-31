interface FormFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  multiline?: boolean;
  required?: boolean;
}

export default function FormField({ 
  label, 
  type = "text", 
  placeholder, 
  value = '',
  onChange,
  disabled = false,
  multiline = false,
  required = false
}: FormFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      
      {multiline ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          rows={3}
          className={`${baseClasses} ${disabledClasses} resize-none`}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          className={`${baseClasses} ${disabledClasses}`}
        />
      )}
    </div>
  );
}