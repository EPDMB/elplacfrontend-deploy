// components/Dropdown.tsx

import { DropdownProps, DropdownOption } from "@/types";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  value,
  onSelect,
  placeholder,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: DropdownOption) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        className={`flex items-center justify-between w-full p-2 rounded-md bg-secondary-lighter text-primary-dark shadow-md`}
        onClick={() => setIsOpen(!isOpen)}
        value={value}
      >
        <span>{label}</span>
        <div className="w-5 h-5 pt-1 text-primary-dark">
          <FaChevronDown />
        </div>
      </button>
      {isOpen && (
        <ul
          className={`absolute left-0 w-full overflow-hidden rounded-b-md bg-secondary-lighter shadow-md`}
        >
          {options?.map((option) => (
            <li
              key={option.id}
              className={`p-2 cursor-pointer text-[#9EAAAA] hover:text-primary-dark border-t border-primary-light`}
              onClick={() => handleSelect(option)}
            >
              {option.id} - {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
