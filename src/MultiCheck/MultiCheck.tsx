import './MultiCheck.css';
import React, { useState, useEffect } from 'react';

export type Option = {
  label: string;
  value: string;
};

type Props = {
  label?: string;
  options: Option[];
  columns?: number;
  values?: string[];
  onChange?: (options: Option[]) => void;
};

const MultiCheck: React.FC<Props> = (props): JSX.Element => {
  const { label, options, columns = 1, values = [], onChange } = props;

  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  useEffect(() => {
    if (onChange) {
      onChange(selectedOptions);
    }
  }, [selectedOptions, onChange]);

  const toggleOption = (value: string): void => {
    const updatedOptions = selectedOptions.some((opt) => opt.value === value)
      ? selectedOptions.filter((opt) => opt.value !== value)
      : [...selectedOptions, options.find((opt) => opt.value === value)!];

    setSelectedOptions(updatedOptions);
  };

  const toggleAllOptions = (): void => {
    const allOptionsSelected = selectedOptions.length === options.length;
    const updatedOptions = allOptionsSelected ? [] : [...options];
    setSelectedOptions(updatedOptions);
  };

  return (
    <div className='MultiCheck'>
      {label && <label className='title'>{label}</label>}
      <div>
        <label>
          <input type='checkbox' checked={selectedOptions.length === options.length} onChange={toggleAllOptions} />
          Select All
        </label>
      </div>
      <div className='options-container' style={{ columns }}>
        {options.map((option) => (
          <label key={option.value}>
            <input
              type='checkbox'
              value={option.value}
              checked={selectedOptions.some((opt) => opt.value === option.value)}
              onChange={() => toggleOption(option.value)}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default MultiCheck;
