import React from 'react';

interface InputDropDownProps {
  label?: string;
  name: string;
  value: string | number | readonly string[] | string[];
  options: { label: string; value: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  multiple?: boolean;
}

const InputDropDown: React.FC<InputDropDownProps> = ({ label, name, value, options, onChange, multiple = false }) => {

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (multiple) {
      const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
      const event = {
        ...e,
        target: {
          ...e.target,
          value: selectedOptions,
        },
      } as unknown as React.ChangeEvent<HTMLSelectElement>;
      onChange(event);
    } else {
      onChange(e);
    }
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-200 dark:text-white">{label}</label>
      )}
      <select
        name={name}
        value={value}
        onChange={handleChange}
        multiple={multiple}
        className="w-full border border-stroke bg-gray py-1 px-2 text-black focus:border-[#cfebff] focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary rounded-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="rounded-xs">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputDropDown;
