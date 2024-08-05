import React, { useEffect, useRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  focus?: boolean;
}

const Input = ({ label, focus, ...props }: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focus]);

  return (
    <div>
      {label ? (
        <label className="block text-sm font-medium text-gray-200">{label}</label>
      ) : (
        <div className="" /> // espaço reservado para manter o layout
      )}
      <input
        {...props}
        ref={inputRef}
        className="w-full rounded-sm border border-stroke bg-gray py-1 px-4.5 text-black focus:border-[#cfebff] focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
      />
    </div>
  );
};

export default Input;


// className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"

// className="w-full block text-xs p-2 rounded-sm border-[1.5px] border-stroke bg-transparent py-2 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"