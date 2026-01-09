
export type SelectOption<T extends string = string> = {
  label: string;
  value: T;
  disabled?: boolean;
};

type Props<T extends string = string> = {
  value: T;
  onChange: (value: T) => void;
  options: SelectOption<T>[];
  className?: string;
  selectClassName?: string;
  placeholder?: string; 
  disabled?: boolean;
  name?: string;
  id?: string;
};

const ReusableSelect = <T extends string = string>({
  value,
  onChange,
  options,
  className = "",
  selectClassName = "",
  placeholder,
  disabled,
  name,
  id,
}: Props<T>) => {
  return (
    <div className={className}>
      <select
        id={id}
        name={name}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value as T)}
        className={[
          "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5",
          "text-sm text-slate-700 shadow-sm outline-none transition",
          "hover:border-slate-300",
          "focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100",
          "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400",
          selectClassName,
        ].join(" ")}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}

        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ReusableSelect;