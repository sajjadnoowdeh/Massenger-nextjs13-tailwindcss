"use client";
import React from "react";
import ReactSelect from "react-select";
interface ISelect {
  name: string;
  disabled?: boolean;
  value: Record<string, any>;
  onChange: (value: Record<string, any>) => void;
  isMulti: boolean;
  options: Record<string, any>[] | undefined;
}
const Select: React.FC<ISelect> = ({
  name,
  disabled,
  value,
  onChange,
  isMulti,
  options,
}) => {
  return(

    <div className="z-[100]">
      <ReactSelect
        name={name}
        isMulti={isMulti}
        options={options}
        isDisabled={disabled}
        value={value}
        menuPortalTarget={document.body}
        onChange={onChange}
        styles={{
          menuPortal:(base)=>({
            ...base,
            zIndex:9999
          })
        }}

        classNames={{
          control:()=> "text-sm"
        }}
      />
    </div>
  )
};

export default Select;
