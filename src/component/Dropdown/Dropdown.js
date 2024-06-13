import React, { useState, useEffect } from "react";
import { UserCircle, Info, CaretDown } from "@phosphor-icons/react";
import "./Dropdown.css";

const Dropdown = ({
  label,
  labelVisibility = "Visible",
  status = "Unfilled",
  labelIconVisibility = "Hidden",
  leftIconVisibility = "Hidden",
  helperText,
  required = "No",
  text = "Select option",
  type = "SingleNoIcon",
  activeItemIndex,
  items = [],
  onSelectItem,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndices, setSelectedIndices] = useState([]);

  useEffect(() => {
    setSelectedIndices(
      type === "Multi" ? [] : activeItemIndex !== -1 ? [activeItemIndex] : []
    );
  }, [type, activeItemIndex]);

  const toggleDropdown = () => {
    if (status !== "Disabled") {
      setIsOpen(!isOpen);
    }
  };

  const handleItemClick = (index) => {
    if (type === "Multi") {
      setSelectedIndices((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    } else {
      setSelectedIndices([index]);
      setIsOpen(false);
      if (onSelectItem) {
        onSelectItem(index);
      }
    }
  };

  const clearSelection = () => {
    setSelectedIndices([]);
    if (onSelectItem) {
      onSelectItem(-1);
    }
  };

  const getInputValue = () => {
    if (type === "Multi") {
      return items
        .filter((_, index) => selectedIndices.includes(index))
        .join(", ");
    } else {
      return selectedIndices.length > 0 ? items[selectedIndices[0]] : "";
    }
  };

  const isPlaceholderVisible = selectedIndices.length === 0 && !text;

  return (
    <div className={`dropdown ${status.toLowerCase()}`}>
      {labelVisibility === "Visible" && (
        <label className="dropdown-label">
          {label} {required === "Yes" && "*"}
          {labelIconVisibility === "Visible" && <Info size={16} />}
        </label>
      )}
      <div
        className={`dropdown-container ${status.toLowerCase()}`}
        onClick={toggleDropdown}
      >
        {leftIconVisibility === "Visible" && <UserCircle size={20} />}
        <input
          type="text"
          value={isPlaceholderVisible ? "" : getInputValue()}
          readOnly
          disabled={status === "Disabled"}
          placeholder={text}
          className={isPlaceholderVisible ? "placeholder" : ""}
        />
        <CaretDown size={20} />
      </div>
      {selectedIndices.length > 0 && (
        <span className="clear-button" onClick={clearSelection}>
          Clear
        </span>
      )}
      {isOpen && (
        <ul className="dropdown-list">
          {items.map((item, index) => (
            <li
              key={index}
              className={selectedIndices.includes(index) ? "active" : ""}
              onClick={() => handleItemClick(index)}
            >
              {type === "SingleRadio" && (
                <input
                  type="radio"
                  name="dropdown"
                  checked={selectedIndices.includes(index)}
                  readOnly
                />
              )}
              {type === "Multi" && (
                <input
                  type="checkbox"
                  checked={selectedIndices.includes(index)}
                  readOnly
                />
              )}
              {item}
            </li>
          ))}
        </ul>
      )}
      {helperText && <div className="helper-text">{helperText}</div>}
    </div>
  );
};

export default Dropdown;
