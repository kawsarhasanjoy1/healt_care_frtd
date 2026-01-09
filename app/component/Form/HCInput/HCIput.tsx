import { Controller, useFormContext } from "react-hook-form";

type THCIpunt = {
    name: string,
    type: string,
    placeholder: string,
    defaults?: any,
    required?: boolean,
    disabled?: boolean,
    className?: string,
    min?: number,
    max?: number
}

const HCInput =  ({ name, type='text',placeholder , defaults,required=true,disabled=false,className,min, max }: THCIpunt) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaults}
      render={({ field }) => {
        return (
          
          <input
            {...field}
            type={type}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            className={`h-11 w-full rounded-md border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-400 focus:bg-white outline-none ${className}`}
          />
        );
      }}
    />
  );
};


export default HCInput