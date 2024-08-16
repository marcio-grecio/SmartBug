import React, { useContext } from 'react';
import Select from 'react-select';
import { ThemeContext } from '../../Contexts/ThemeContext';

interface InputDropDownProps {
  label?: string;
  name: string;
  value: any;
  options: { label: string; value: string }[];
  onChange: (selectedOption: any) => void;
  multiple?: boolean;
  placeholder?: string; // Adicionada prop para placeholder
  height?: string;
}

const InputDropDown: React.FC<InputDropDownProps> = ({ label, name, value, options, onChange, multiple = false, placeholder }) => {
  const { colorMode } = useContext(ThemeContext) || {};

  const isDarkMode = colorMode === 'dark';

  const handleChange = (selectedOption: any) => {
    if (multiple) {
      const selectedValues = selectedOption ? selectedOption.map((option: any) => option.value) : [];
      onChange({
        target: {
          name,
          value: selectedValues,
        },
      });
    } else {
      onChange({
        target: {
          name,
          value: selectedOption ? selectedOption.value : '',
        },
      });
    }
  };

  return (
    <div>
      {label && (
        <label className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>{label}</label>
      )}
      <Select
        name={name}
        value={options.filter(option => multiple ? value.includes(option.value) : option.value === value)}
        onChange={handleChange}
        options={options}
        isMulti={multiple}
        placeholder={placeholder} // Adicionado placeholder
        classNamePrefix="react-select"
        className="react-select-container"
        styles={{
          control: (provided, state) => ({
            ...provided,
            backgroundColor: isDarkMode ? '#313d4a' : '#eff4f9',
            color: isDarkMode ? 'white' : 'black',
            border: state.isFocused ? `1px solid ${isDarkMode ? '#1d4ed8' : '#d3eefc'}` : `1px solid ${isDarkMode ? '#313d4a' : '#e2e8f0'}`,
            boxShadow: 'none',
            '&:hover': {
              border: state.isFocused ? `1px solid  ${isDarkMode ? '#1d4ed8' : '#d3eefc'}` : `1px solid ${isDarkMode ? '#313d4a' : '#d3eefc'}`,
            },
            height: 34,
            minHeight: 34,
            borderRadius: 2,
          }),
          singleValue: (provided) => ({
            ...provided,
            color: isDarkMode ? 'white' : 'black',
          }),
          multiValue: (provided) => ({
            ...provided,
            backgroundColor: isDarkMode ? '#313d4a' : '#eff4f9',
            color: isDarkMode ? 'white' : 'black',
          }),
          multiValueLabel: (provided) => ({
            ...provided,
            color: isDarkMode ? 'white' : 'black',
          }),
          multiValueRemove: (provided) => ({
            ...provided,
            color: isDarkMode ? 'white' : 'black',
            ':hover': {
              backgroundColor: isDarkMode ? 'white' : 'black',
              color: isDarkMode ? 'black' : 'white',
            },
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ?  `${isDarkMode ? '#1d4ed8' : '#d3eefc'}` : isDarkMode ? '#313d4a' : '#eff4f9',
            color: isDarkMode ? 'white' : 'black',
            border: state.isSelected ? `1px solid  ${isDarkMode ? '#1d4ed8' : '#d3eefc'}` : '1px solid transparent',
          }),
          input: (provided) => ({
            ...provided,
            color: isDarkMode ? 'white' : 'black',
          }),
          placeholder: (provided) => ({
            ...provided,
            color: isDarkMode ? 'white' : 'black',
          }),
          dropdownIndicator: (provided) => ({
            ...provided,
            color: isDarkMode ? 'white' : 'black',
          }),
          indicatorSeparator: (provided) => ({
            ...provided,
            backgroundColor: isDarkMode ? 'white' : 'black',
          }),
          clearIndicator: (provided) => ({
            ...provided,
            color: isDarkMode ? 'white' : 'black',
          }),
          valueContainer: (provided) => ({
            ...provided,
            color: isDarkMode ? 'white' : 'black',
            height: 34,
            minHeight: 34,
            borderRadius: 2,
            marginTop: -6
          }),
          menu: (provided) => ({
            ...provided,
            backgroundColor: isDarkMode ? '#313d4a' : '#eff4f9',
            color: isDarkMode ? 'white' : 'black',
          }),
        }}
      />
    </div>
  );
};

export default InputDropDown;
