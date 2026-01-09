"use client";
import { Controller, useFormContext } from "react-hook-form";
import { FiChevronDown } from "react-icons/fi";

type Option = {
  label: string;
  value: string;
  disabled?: boolean;
};

type Props = {
  name: string;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  defaultValue?: string;
};

const HCSelect = ({
  name,
  options,
  placeholder = "Select...",
  required = false,
  disabled = false,
  className = "",
  defaultValue = "",
}: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => {
        return (
          <div className="relative">
            <select
              {...field}
              value={field.value ?? ""}
              onChange={(e) => field.onChange(e.target.value)}
              required={required}
              disabled={disabled}
              className={[
                "h-11 w-full appearance-none rounded-md border border-slate-200 bg-slate-50 pl-4 pr-10",
                "text-sm text-slate-900 placeholder:text-slate-400 outline-none",
                "focus:border-teal-400 focus:bg-white",
                "disabled:cursor-not-allowed disabled:opacity-60",
                className,
              ].join(" ")}
            >
              <option value="" disabled>
                {placeholder}
              </option>

              {options.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </option>
              ))}
            </select>

            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              <FiChevronDown size={18} />
            </span>
          </div>
        );
      }}
    />
  );
};

export default HCSelect;