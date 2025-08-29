interface FormHeaderProps {
  title: string;
  description: string;
  subtitle: string;
  subtitleDesc: string;
}

export default function FormHeader({ title, description, subtitle, subtitleDesc }: FormHeaderProps) {
  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-bold text-green-700">{title}</h1>
      <p className="text-gray-600">{description}</p>
      <h2 className="mt-4 text-lg font-semibold text-gray-800">{subtitle}</h2>
      <p className="text-sm text-gray-500">{subtitleDesc}</p>
    </div>
  );
}
