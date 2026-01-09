"use client";

import Select, { components } from "react-select";
import { Controller, useFormContext } from "react-hook-form";

export type Option = { label: string; value: string };

type Props = {
  name: string;
  options: Option[];              
  lockedOptions?: Option[];      
  lockedIds?: string[];           
  className?: string;
  placeholder?: string;
};

const HCMultiSelect = ({
  name,
  options,
  lockedOptions = [],
  lockedIds = [],
  className = "",
  placeholder = "Select...",
}: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]} 
      render={({ field }) => {
        const currentIds: string[] = Array.isArray(field.value) ? field.value : [];
        const selectedFromAvailable = (options ?? []).filter((opt) =>
          currentIds.includes(opt.value)
        );

        const valueToShow: Option[] = [
          ...lockedOptions,
          ...selectedFromAvailable.filter((o) => !lockedIds.includes(o.value)),
        ];

        return (
          <Select
            className={className}
            isMulti
            closeMenuOnSelect={false}
            isClearable={false}
            placeholder={placeholder}
            options={options ?? []}      
            value={valueToShow}       
            onChange={(selected) => {
              const selectedIds = ((selected ?? []) as Option[]).map((s) => s.value);
              const finalIds = Array.from(new Set([...lockedIds, ...selectedIds]));
              field.onChange(finalIds);
            }}
            components={{
              MultiValueRemove: (props) => {
                const isLocked = lockedIds.includes((props.data as Option).value);
                if (isLocked) return null;
                return <components.MultiValueRemove {...props} />;
              },
            }}
          />
        );
      }}
    />
  );
};

export default HCMultiSelect;