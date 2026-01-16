"use client";

import { Controller, useFormContext } from "react-hook-form";

type THCIpunt = {
  name: string;
  type?: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
};

const HCInput = ({ name, type = 'text', placeholder, label, required = true, disabled = false, className }: THCIpunt) => {
  const { control } = useFormContext();
  return (
    <div className="w-full space-y-1.5">
      {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div>
            <input
              {...field}
              type={type}
              placeholder={placeholder}
              required={required}
              disabled={disabled}
              className={`h-11 w-full rounded-xl border border-slate-200 bg-white px-8 text-sm text-slate-900 transition-all placeholder:text-slate-400 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 disabled:bg-slate-50 disabled:cursor-not-allowed ${error ? 'border-rose-400 focus:ring-rose-50' : ''} ${className}`}
            />
            {error && <p className="text-[10px] text-rose-500 mt-1 ml-1">{error.message}</p>}
          </div>
        )}
      />
    </div>
  );
};

export default HCInput;