"use client";
import Select from "react-select";
import { Controller, useFormContext } from "react-hook-form";

const HCMultiSelect = ({ name, options, label, placeholder = "একাধিক নির্বাচন করুন..." }: any) => {
  const { control } = useFormContext();

  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      borderRadius: '12px',
      minHeight: '44px',
      borderColor: state.isFocused ? '#818cf8' : '#e2e8f0',
      boxShadow: state.isFocused ? '0 0 0 4px #eef2ff' : 'none',
      '&:hover': { borderColor: '#818cf8' }
    }),
    multiValue: (base: any) => ({
      ...base,
      backgroundColor: '#eef2ff',
      borderRadius: '6px',
      color: '#4f46e5',
    }),
    multiValueLabel: (base: any) => ({ ...base, color: '#4f46e5', fontWeight: '500' }),
  };

  return (
    <div className="w-full space-y-1.5">
      {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            isMulti
            options={options}
            placeholder={placeholder}
            styles={customStyles}
            value={options.filter((obj: any) => field.value?.includes(obj.value))}
            onChange={(val: any) => field.onChange(val.map((c: any) => c.value))}
          />
        )}
      />
    </div>
  );
};

export default HCMultiSelect;