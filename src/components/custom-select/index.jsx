import React, { useEffect, useState } from 'react';
import Tick from '../../assets/svg/tick.svg';
import SmallLine from '../../assets/svg/smallline.svg';
import './custom-select.scss';

const CustomSelect = ({ id, name, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Select Workspaces');

  // Sync internal state with the value prop
  useEffect(() => {
    setSelectedOption(value || 'Select Workspaces');
  }, [value]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange({ target: { name, value: option } }); // Propagate change to parent
  };

  return (
    <div className="custom-select">
      <div className="selected-option" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption}
        {selectedOption !== 'Select Workspaces' && <img src={Tick} alt="Tick" />}
      </div>
      {isOpen && (
        <div className="options">
          <div className="option" onClick={() => handleOptionClick('DASO')}>
            DASO {selectedOption === 'DASO' && <img src={Tick} alt="Tick" />}
          </div>
          <div className="option" onClick={() => handleOptionClick('Mile BI')}>
            Mile BI {selectedOption === 'Mile BI' && <img src={Tick} alt="Tick" />}
          </div>
          <div className="option" onClick={() => handleOptionClick('Workspace 2')}>
            Workspace 2 {selectedOption === 'Workspace 2' && <img src={Tick} alt="Tick" />}
          </div>
          <div className="option" onClick={() => handleOptionClick('Workspace 3')}>
            Workspace 3 {selectedOption === 'Workspace 3' && <img src={Tick} alt="Tick" />}
          </div>
          <img src={SmallLine} alt="SmallLine" className="small-line" />
          <p className="para-custom-select">Create a new workspace</p>
          <div className="create-button">
            <input
              type="text"
              placeholder="Create a new workspace"
              className="input"
              required
            />
            <button
              className="create-button-btn"
              onClick={() => handleOptionClick('Create a New Workspace')}
            >
              <p>+</p>
              <p>Create</p>
            </button>
          </div>
          <div className="alert-custom-select">
            <p>Work name already exists!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
