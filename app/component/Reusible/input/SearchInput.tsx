import * as React from "react";
import { FiSearch, FiX } from "react-icons/fi";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  onClear?: () => void;
  inputClassName?: string;
};

const ReusableSearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  inputClassName = "",
  onClear,
}: Props) => {
  const showClear = Boolean(value?.trim()?.length);

  const clear = () => {
    onChange("");
    onClear?.();
  };

  return (
    <div className={className}>
      <div className="relative w-full">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <FiSearch size={18} />
        </span>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape" && showClear) clear();
          }}
          placeholder={placeholder}
          className={[
            "w-full rounded-xl border border-slate-200 bg-white px-10 py-2.5",
            "text-sm text-slate-900 placeholder:text-slate-400",
            "shadow-sm outline-none transition",
            "hover:border-slate-300",
            "focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100",
            inputClassName,
          ].join(" ")}
        />

        {showClear && (
          <button
            type="button"
            onClick={clear}
            aria-label="Clear search"
            className={[
              "absolute right-2 top-1/2 -translate-y-1/2",
              "inline-flex h-8 w-8 items-center justify-center rounded-lg",
              "text-slate-500 hover:bg-slate-100 hover:text-slate-700",
              "focus:outline-none focus:ring-4 focus:ring-indigo-100",
            ].join(" ")}
          >
            <FiX size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ReusableSearchInput;