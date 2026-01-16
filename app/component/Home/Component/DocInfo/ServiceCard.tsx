const ServiceCard = ({
  title,
  desc,
  icon,
  accent,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
  accent: "blue" | "amber" | "indigo" | "slate";
}) => {
  const accentMap: Record<typeof accent, string> = {
    blue: "text-blue-600 bg-blue-50 border-blue-100",
    amber: "text-amber-600 bg-amber-50 border-amber-100",
    indigo: "text-indigo-600 bg-indigo-50 border-indigo-100",
    slate: "text-slate-700 bg-slate-50 border-slate-200",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div
          className={`grid h-12 w-12 place-items-center rounded-2xl border ${accentMap[accent]} text-xl`}
        >
          {icon}
        </div>

        <div className="h-12 w-12 rounded-2xl bg-slate-100" />
      </div>

      <h3 className="mt-5 text-lg font-extrabold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{desc}</p>
    </div>
  );
};


export default ServiceCard