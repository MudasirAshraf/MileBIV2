import React from 'react';
import "./card-dashboard.scss";

const Card = ({
    title="Hello",
    subtitle="Hello",
}) => {
  return (
    <div className='card-dashboard-cont'>
      {/* first column */}
      <div>
        <h1>{title}</h1>
      </div>
        {/* Second column */}
        <div>
            <h4>{subtitle}</h4>
        </div>
    </div>
  )
}

export default Card;
