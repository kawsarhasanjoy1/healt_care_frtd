"use client";

import { Controller, useFormContext } from "react-hook-form";

type TOption = {
  label: string;
  value: string;
};

type THCRadioGroup = {
  name: string;
  label?: string;
  options: TOption[];
  cols?: number; 
};

const HCRadioGroup = ({ name, label, options, cols = 4 }: THCRadioGroup) => {
  const { control } = useFormContext();

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-slate-700 mb-3">
          {label}
        </label>
      )}
      
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div>
            <div 
              className="grid gap-2" 
              style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
            >
              {options.map((option) => (
                <label key={option.value} className="cursor-pointer">
                  <input
                    type="radio"
                    {...field}
                    value={option.value}
                    checked={field.value === option.value}
                    onChange={() => field.onChange(option.value)}
                    className="peer sr-only"
                  />
                  <div className="flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-600 transition-all peer-checked:border-rose-500 peer-checked:bg-rose-500 peer-checked:text-white hover:text-black hover:bg-slate-50 shadow-sm">
                    {option.label}
                  </div>
                </label>
              ))}
            </div>
            {error && (
              <p className="text-[10px] text-rose-500 mt-2 ml-1">
                {error.message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default HCRadioGroup;