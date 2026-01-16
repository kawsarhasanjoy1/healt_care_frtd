"use client";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  name: string;
  placeholder?: string;
  className?: string;
  onValueChange?: (value: string) => void; // ✅ add
};

import './datepicker.css'

const pad2 = (n: number) => String(n).padStart(2, "0");
const formatDateOnly = (d: Date) =>
  `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

const parseDateOnly = (s: string) => {
  if (!s) return null;
  const [y, m, d] = s.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d, 12, 0, 0); 
};

const HCDatePicker = ({
  name,
  placeholder = "Select date",
  className = "",
  onValueChange,
}: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <DatePicker
          wrapperClassName="w-full"
          selected={field.value ? parseDateOnly(field.value) : null}
          onChange={(date: Date | null) => {
            const value = date ? formatDateOnly(date) : "";
            field.onChange(value);
            onValueChange?.(value); // ✅ parent state update
          }}
          calendarClassName="m"
          placeholderText={placeholder}
          dateFormat="yyyy-MM-dd"
          className={[
            "h-11 w-full rounded-md border border-slate-200 bg-slate-50 px-4 text-sm outline-none",
            "focus:border-teal-400 focus:bg-white",
            className,
          ].join(" ")}
        />
      )}
    />
  );
};

export default HCDatePicker;