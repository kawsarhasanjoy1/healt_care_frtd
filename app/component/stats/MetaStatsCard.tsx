import { ReactNode } from "react";

type TProps = {
  item: {
    label: string;
    value: number | string;
    icon: ReactNode;
    color: string;
  };
};

const MetaStatsCard = ({item}: TProps) => {
  return (
    <div
      className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4"
    >
      <div className={`p-4 rounded-xl text-2xl ${item.color}`}>{item.icon}</div>
      <div>
        <p className="text-sm font-medium text-slate-500">{item.label}</p>
        <p className="text-2xl font-bold text-slate-900">{item.value}</p>
      </div>
    </div>
  );
};

export default MetaStatsCard