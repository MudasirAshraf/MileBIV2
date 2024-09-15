import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './DropdownMenu.scss';
import EDIT from '../../assets/svg/edit.svg';
import Trash from '../../assets/svg/trash.svg';
import Arrow from '../../assets/svg/arrow.svg';
import SmallArrow from '../../assets/svg/smallarrow.svg';

const DropdownMenu = ({ deleteDataset, datasetId }) => {
  const [showSubmenu, setShowSubmenu] = useState(false);

  const handleMoveToClick = (e) => {
    e.stopPropagation();
    setShowSubmenu(!showSubmenu);
  };

  const handleDelete = () => {
    deleteDataset(datasetId); 
  };

  return (
    <div className='dropdown-menu'>
      <ul>
        <li>
          <img src={EDIT} alt='Edit' /> Edit
        </li>
        <li onClick={handleDelete}>
          <img src={Trash} alt='Delete' /> Delete
        </li>
        <li className='list-dropdown' onClick={handleMoveToClick}>
          <div className='menu-item'>
            <img src={Arrow} alt='Move to' /> Move to
            <img src={SmallArrow} alt='Arrow' className='small-arrow' />
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

DropdownMenu.propTypes = {
  deleteDataset: PropTypes.func.isRequired,
  datasetId: PropTypes.string.isRequired,
};

export default DropdownMenu;
