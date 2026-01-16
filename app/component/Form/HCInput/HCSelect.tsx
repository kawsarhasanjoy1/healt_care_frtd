"use client";
import { Controller, useFormContext } from "react-hook-form";
import { FiChevronDown } from "react-icons/fi";

const HCSelect = ({ name, options, label, placeholder = "নির্বাচন করুন...", disabled = false, className = "" }: any) => {
  const { control } = useFormContext();
  return (
    <div className="w-full space-y-1.5">
      {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="relative group">
            <select
              {...field}
              disabled={disabled}
              className={`h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-4 pr-10 text-sm transition-all outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 disabled:opacity-60 ${className}`}
            >
              <option value="" disabled>{placeholder}</option>
              {options.map((opt: any) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-indigo-500 transition-colors" />
          </div>
        )}
      />
    </div>
  );
};

export default HCSelect;