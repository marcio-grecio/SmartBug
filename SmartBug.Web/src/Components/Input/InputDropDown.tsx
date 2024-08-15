import React, { useContext } from 'react';
import Select from 'react-select';
import { ThemeContext } from '../../Contexts/ThemeContext';

interface InputDropDownProps {
  label?: string;
  name: string;
  value: any; // o react-select usa um tipo diferente de valor
  options: { label: string; value: string }[];
  onChange: (selectedOption: any) => void;
  multiple?: boolean;
  height?: string; // Adicionado prop para altura customizada
}

const InputDropDown: React.FC<InputDropDownProps> = ({ label, name, value, options, onChange, multiple = false }) => {
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
        classNamePrefix="react-select"
        className="react-select-container"
        styles={{
          control: (provided, state) => ({
            ...provided,
            backgroundColor: isDarkMode ? '#313d4b' : '#eff4f9',
            color: isDarkMode ? 'white' : 'black',
            border: state.isFocused ? '1px solid #1d4ed8' : `1px solid ${isDarkMode ? '#313d4b' : '#e2e8f0'}`, // Borda azul no modo claro
            boxShadow: 'none', // Remove a sombra de foco
            '&:hover': {
              border: state.isFocused ? '1px solid #1d4ed8' : `1px solid ${isDarkMode ? '#313d4b' : '#1d4ed8'}`, // Desabilita a borda ao passar o mouse
            },
            height: 34, // Define a altura do componente
            minHeight: 34, // Garante que a altura mínima seja respeitada
            borderRadius: 2, // Adiciona bordas arredondadas
          }),
          singleValue: (provided) => ({
            ...provided,
            color: isDarkMode ? 'white' : 'black',
          }),
          multiValue: (provided) => ({
            ...provided,
            backgroundColor: isDarkMode ? '#313d4b' : '#eff4f9',
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
            backgroundColor: state.isSelected ? '#1d4ed8' : isDarkMode ? '#313d4b' : '#eff4f9',
            color: isDarkMode ? 'white' : 'black',
            border: state.isSelected ? '1px solid #1d4ed8' : '1px solid transparent',
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
            height: 34, // Define a altura do value container para alinhar os textos
            minHeight: 34, // Garante que a altura mínima seja respeitada
            borderRadius: 2, // Adiciona bordas arredondadas   
            marginTop: -5
          }),
          menu: (provided) => ({
            ...provided,
            backgroundColor: isDarkMode ? '#313d4b' : '#eff4f9',
            color: isDarkMode ? 'white' : 'black',
          }),
        }}
      />
    </div>
  );
};

export default InputDropDown;
