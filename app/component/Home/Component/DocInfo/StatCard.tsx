const StatCard = ({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-white text-2xl text-blue-700 shadow-sm ring-1 ring-slate-200">
        {icon}
      </div>
      <div className="mt-4 text-2xl font-extrabold text-slate-900">{value}</div>
      <div className="mt-2 text-sm leading-6 text-slate-600">{label}</div>
    </div>
  );
};

export default StatCard;
