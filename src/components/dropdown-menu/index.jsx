import React, { useState } from 'react';
import './DropdownMenu.scss';
import EDIT from '../../assets/svg/edit.svg';
import Trash from '../../assets/svg/trash.svg';
import Arrow from '../../assets/svg/arrow.svg';
import SmallArrow from '../../assets/svg/smallarrow.svg';

const DropdownMenu = () => {
  const [showSubmenu, setShowSubmenu] = useState(false);

  const handleMoveToClick = (e) => {
    e.stopPropagation()
    setShowSubmenu(!showSubmenu);
  };

  return (
    <div className='dropdown-menu'>
      <ul>
        <li>
          <img src={EDIT} alt="Edit" /> Edit
        </li>
        <li>
          <img src={Trash} alt="Delete" /> Delete
        </li>
        <li className='list-dropdown' onClick={handleMoveToClick}>
          <div className='menu-item'>
            <img src={Arrow} alt="Move to" /> Move to
            <img src={SmallArrow} alt="Arrow" className='small-arrow' />
          </div>
          {showSubmenu && (
            <div className='submenu'>
              <ul>
                <li>Workspaces</li>
                <li>Arrow DT</li>
              </ul>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default DropdownMenu;
