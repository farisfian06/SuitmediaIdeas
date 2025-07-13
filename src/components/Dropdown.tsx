import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

interface DropdownProps {
  placeholder?: string;
  options: Array<{
    value: string | number;
    label: string;
  }>;
  onChange?: (value: string | number) => void;
  defaultValue?: string | number;
  className?: string;
  disabled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  placeholder = "Select an option",
  options,
  onChange,
  defaultValue,
  className = "",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<
    string | number | undefined
  >(defaultValue);

  const handleSelect = (value: string | number) => {
    setSelectedValue(value);
    setIsOpen(false);
    if (onChange) {
      onChange(value);
    }
  };

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  return (
    <div className="relative min-w-32">
      <button
        type="button"
        className={`w-full px-4 py-2 text-left bg-white border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${
          disabled ? "bg-gray-100 cursor-not-allowed" : "cursor-pointer"
        } ${className}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <div className="flex items-center justify-between">
          <span className="block truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <MdKeyboardArrowDown
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                selectedValue === option.value ? "bg-blue-50 text-blue-600" : ""
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
