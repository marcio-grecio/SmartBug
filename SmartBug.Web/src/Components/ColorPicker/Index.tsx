import Input from '../Input/Index';
import { HexColorPicker } from 'react-colorful';
import React, { useState, useRef, useEffect } from 'react';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange }) => {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  // Fecha o seletor de cor ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setPickerVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex items-center" ref={pickerRef}>
      <Input
        type="text"
        className="form-control"
        value={value}
        onClick={() => setPickerVisible(!isPickerVisible)}
        readOnly
      />
      <div className="w-6 h-9 border border-gray-300" style={{ backgroundColor: value }} onClick={() => setPickerVisible(!isPickerVisible)}></div>
      {isPickerVisible && (
        <div className="absolute z-10 mt-2">
          <HexColorPicker color={value} onChange={onChange} />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
