import React from 'react';
import "./card-dashboard.scss";

const Card = ({
  option,
  gridHeight
}) => {
  return (
    <div style={{ backgroundColor: option?.options?.background || "#fff", height: gridHeight + "px" }} className='card-dashboard-cont'>
      <div>
        <h1 className="card-value" style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333', textAlign: 'center' }}>
          {option?.options?.value || 0}
        </h1>
        <p className="card-title" style={{ fontSize: '1.5rem', margin: '8px 0', color: '#555', textWrap: "wrap" }}>
          {option?.options?.title}
        </p>
      </div>
    </div>
  )
}

export default Card;
