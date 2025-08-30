import type { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}

export default function DetailPerusahaanCard({ title, icon, children }: SectionCardProps) {
  return (
    <section className="rounded-xl shadow-sm bg-white mb-6">
      <header className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-t-xl">
        {icon && <span className="text-green-600">{icon}</span>}
        <h2 className="font-semibold text-gray-700">{title}</h2>
      </header>
      <div className="p-4 text-sm text-gray-700">{children}</div>
    </section>
  );
}
