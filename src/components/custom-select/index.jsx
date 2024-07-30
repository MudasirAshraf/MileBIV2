import React, { useState } from 'react';
import Tick from '../../assets/svg/tick.svg';
import SmallLine from '../../assets/svg/smallline.svg';
import "./custom-select.scss";

const CustomSelect = () => {
  const [selectedOption, setSelectedOption] = useState('Select Workspaces');
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="custom-select">
      <div className="selected-option" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption}
        {selectedOption === 'DASO' && <img src={Tick} alt="Tick" />}
      </div>
      {isOpen && (
        <div className="options">
          <div className="option" onClick={() => handleOptionClick('DASO')}>
            DASO <img src={Tick} alt="Tick" />
          </div>
          <div className="option" onClick={() => handleOptionClick('Mile BI')}>
            Mile BI
          </div>
          <div className="option" onClick={() => handleOptionClick('Workspace 2')}>
            Workspace 2
          </div>
          <div className="option" onClick={() => handleOptionClick('Workspace 3')}>
            Workspace 3
          </div>
          <img src={SmallLine} alt="SmallLine" className="small-line" />
          <p className='para-custom-select'>Create a new workspace</p>
          <div className='create-button'>
          <input onClick={() => handleOptionClick('Create a New Workspace')} type='text' placeholder='create a new workspace' className='input' required/>
          <button className='create-button-btn'>
            <p>+</p>
            <p>Create</p>
          </button>
          </div>
         <div className='alert-custom-select'><p>Work name already Exists!</p></div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
