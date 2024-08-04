import React from 'react';
import "./typography.scss";

const Typography = ({
 title="H1 Text",
 subtitle="H2",
 para='xbuyejhcvudbjkniucyvdbjsxsiouyvcuds',
 subtitleI="H2",
 paraI='xbuyejhcvudbjkniucyvdbjsxsiouyvcu',
 subtitleII="H2",
 paraII='xbuyejhcvudbjkniucyvdbjsxsiouyvcud',
}) => {
  return (
    <div className='main-container-typography'>
      {/* First Column */}
      <div>
        <h1>{title}</h1>
      </div>
      {/* Second Column */}
      <div className='sc-container-typography'>
        <h2>{subtitle}</h2>
        <p>{para}</p>
      </div>
       {/* Third Column */}
       <div className='sc-container-typography'>
        <h3>{subtitleI}</h3>
        <p>{paraI}</p>
      </div>
      {/* Fourth Column */}
      <div className='sc-container-typography'>
        <h4>{subtitleII}</h4>
        <p>{paraII}</p>
      </div>
    </div>
  )
}

export default Typography;