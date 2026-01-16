import { FiCheck } from "react-icons/fi";

const FeatureItem = ({
  title,
  desc,
  color,
}: {
  title: string;
  desc: string;
  color: "blue" | "green" | "purple";
}) => {
  const styles = {
    blue: "bg-blue-600 shadow-blue-200",
    green: "bg-emerald-500 shadow-emerald-200",
    purple: "bg-violet-600 shadow-violet-200",
  } as const;

  return (
    <div className="group flex gap-5">
      <div className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${styles[color]} text-white shadow-lg transition-transform group-hover:rotate-6`}>
        <FiCheck size={24} strokeWidth={3} />
      </div>
      <div>
        <h4 className="text-lg font-bold text-slate-900">{title}</h4>
        <p className="mt-1 text-[15px] leading-relaxed text-slate-500">{desc}</p>
      </div>
    </div>
  );
}


export default FeatureItem