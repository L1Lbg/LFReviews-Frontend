import React, { useState } from 'react';
import '../assets/CustomSelect.css'; // Assuming you save your CSS in this file.
import { useTranslation } from 'react-i18next';

const CustomSelect = (props) => {
  const [isOpened, setIsOpened] = useState(false);
  const [hover, setHover] = useState(false);
  const [t] = useTranslation('global')
  const [selectedOption, setSelectedOption] = useState(t('Global.yes'));
  
  const options = [
    { value: true, label: t('Global.yes') },
    { value: false, label: t('Global.no') },
  ];

  const handleTriggerClick = (event) => {
    event.stopPropagation();
    setIsOpened((prevState) => !prevState);
  };

  const handleOptionClick = (value, label) => {
    setSelectedOption(label);
    setIsOpened(false);
  };

  const handleDocumentClick = () => {
    setIsOpened(false);
  };

  React.useEffect(() => {
    if (isOpened) {
      document.addEventListener('click', handleDocumentClick);
    } else {
      document.removeEventListener('click', handleDocumentClick);
    }
    return () => document.removeEventListener('click', handleDocumentClick);
  }, [isOpened]);

  return (
    <div className="custom-select-wrapper">
      <div
        className={`custom-select ${isOpened ? 'opened' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="custom-select-trigger" onClick={handleTriggerClick}>
          {selectedOption}
        </span>
        <input type="hidden" name={props.name} value={options.find((option)=> option.label == selectedOption).value} />
        <div className="custom-options">
          {options.map((option) => (
            <span
              key={option.value}
              className={`custom-option ${hover ? 'option-hover' : ''}`}
              data-value={option.value}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              onClick={() => handleOptionClick(option.value, option.label)}
            >
              {option.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomSelect;
