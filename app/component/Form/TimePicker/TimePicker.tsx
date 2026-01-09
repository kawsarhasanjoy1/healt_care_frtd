"use client";

import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FiClock } from "react-icons/fi";

type Props = {
  name: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  step?: number;      // seconds (1800 = 30 min)
  min?: string;       // "09:00"
  max?: string;       // "18:00"
};

const HCTimeInput = ({
  name,
  className = "",
  disabled = false,
  required = false,
  step = 1800,
  min,
  max,
}: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""  // ✅ safe default (or keep defaultValues in useForm)
      render={({ field, fieldState }) => (
        <div className="relative">
          <FiClock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="time"
            step={step}
            min={min}
            max={max}
            disabled={disabled}
            required={required}
            value={field.value ?? ""}                 // ✅ avoid undefined
            onChange={(e) => field.onChange(e.target.value)}
            onBlur={field.onBlur}
            name={field.name}
            ref={field.ref}
            className={[
              "h-11 w-full rounded-md border bg-slate-50 pl-10 pr-3 text-sm text-slate-900 outline-none",
              "focus:border-teal-400 focus:bg-white",
              fieldState.error ? "border-rose-400" : "border-slate-200",
              className,
            ].join(" ")}
          />
        </div>
      )}
    />
  );
};

export default HCTimeInput;