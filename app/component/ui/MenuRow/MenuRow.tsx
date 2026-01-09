const MenuRow = ({
  title,
  icon: Icon,
  active,
  right,
}: {
  title: string;
  icon: any;
  active: boolean;
  right?: React.ReactNode;
}) => {
    
const cn = (...c: Array<string | false | undefined | null>) =>
  c.filter(Boolean).join(" ");
  return (
    <div
      className={cn(
        "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
        "border border-slate-200/60",
        active
          ? "bg-indigo-600 text-white shadow-sm"
          : "bg-white/60 text-slate-700 hover:bg-white hover:shadow-sm"
      )}
    >
      {/* left indicator */}
      <span
        className={cn(
          "absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full transition",
          active ? "bg-white/90" : "bg-transparent group-hover:bg-indigo-200"
        )}
      />

      {/* icon bubble */}
      <span
        className={cn(
          "grid h-9 w-9 place-items-center rounded-xl transition",
          active
            ? "bg-white/15"
            : "bg-slate-100 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-700"
        )}
      >
        <Icon className="h-5 w-5" />
      </span>

      <span className="flex-1 truncate font-medium">{title}</span>
      {right}
    </div>
  );
}


export default MenuRow