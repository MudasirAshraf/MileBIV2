import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./modal-IV.scss";
import Back from "../../assets/svg/Back.svg";
import Cross from '../../assets/svg/cross.svg';
import Five from '../../assets/png/5.png';
import PIV from '../../assets/svg/p4.svg';
import Polygon from '../../assets/svg/Polygon 3.svg';
import Ring from "../../assets/svg/ringround.svg";
import Line from '../../assets/svg/line.svg';
import Folder from "../../assets/svg/bluefolder.svg";
import Setting from "../../assets/svg/setting.svg";


const data = [
    { date: '23-04-2022', title: 'Sale', avgSale: "50,000 SAR", minSale: "30,000 SAR", maxSale: "70,000 SAR", totalValues: "200,000 SAR" },
    { date: '23-04-2022', title: 'Sale', avgSale:"50,000 SAR", minSale: "30,000 SAR", maxSale: "70,000 SAR", totalValues: "200,000 SAR" },
    { date: '23-04-2022', title: 'Sale', avgSale:"50,000 SAR", minSale: "30,000 SAR", maxSale: "70,000 SAR", totalValues: "200,000 SAR" },
    { date: '23-04-2022', title: 'Sale', avgSale:"50,000 SAR", minSale: "30,000 SAR", maxSale: "70,000 SAR", totalValues: "200,000 SAR" },
    { date: '23-04-2022', title: 'Sale', avgSale: "50,000 SAR", minSale: "30,000 SAR", maxSale: "70,000 SAR", totalValues: "200,000 SAR" },
    { date: "23-04-2022", title: 'Sale', avgSale: "50,000 SAR", minSale: "30,000 SAR", maxSale: "70,000 SAR", totalValues: "200,000 SAR" },
    { date: '23-04-2022', title: 'Sale', avgSale: "50,000 SAR", minSale: "30,000 SAR", maxSale: "70,000 SAR", totalValues: "200,000 SAR" },
    { date: '23-04-2022', title: 'Sale', avgSale: "50,000 SAR", minSale: "30,000 SAR", maxSale: "70,000 SAR", totalValues: "200,000 SAR" },
    { date: '23-04-2022', title: 'Sale', avgSale: "50,000 SAR", minSale: "30,000 SAR", maxSale: "70,000 SAR", totalValues: "200,000 SAR" },
    { date: '23-04-2022', title: 'Sale', avgSale: "50,000 SAR", minSale: "30,000 SAR", maxSale: "70,000 SAR", totalValues: "200,000 SAR" },
    { date: '23-04-2022', title: 'Sale', avgSale: "50,000 SAR", minSale: "30,000 SAR", maxSale: "70,000 SAR", totalValues: "200,000 SAR" },
    { date: '23-04-2022', title: 'Sale', avgSale: "50,000 SAR", minSale: "30,000 SAR", maxSale: "70,000 SAR", totalValues: "200,000 SAR" },
    { date: '23-04-2022', title: 'Sale', avgSale: "50,000 SAR", minSale: "30,000 SAR", maxSale: "70,000 SAR", totalValues: "200,000 SAR" },
  ];

const CreateDashboardModalIV = () => {

  const navigate = useNavigate();

  const handleDashboardV = () => {
    navigate('/create-dashboard-V');
  };

  const handleDashboardIII = () => {
    navigate('/create-dashboard-III');
  };
  return (
    <div className='main-container-create-dashboard-modals-IV'>
        <div className='header-create-dashboard-IV'>
 <div>
  <img src={Back} alt="logo"style={{cursor:"pointer"}} onClick={handleDashboardIII}/>
 </div>
 <div>
  <img src={Cross} alt="logo"/>
 </div>
</div>
{/* Adding Header */}
<div className='container-dashboard-modals-IV'>
   <div className='first-row-dashboard-modals-IV'>
   <p>Create a Dashboard</p>
          <img src={PIV} alt="logo"/>
          <div className='third-row-dashboard-modals-IV'>
            <img src={Polygon} alt="logo"/>
          </div>
          <div className='fourth-row-dashboard-modals-IV'>
            <img src={Ring} alt="logo"/>
          </div>
          <div className='fifth-row-dashboard-modals-IV'>
            <img src={Ring} alt="logo"/>
          </div>
          <div className='sixth-row-dashboard-modals-IV'>
            <img src={Ring} alt="logo"/>
          </div>
          <div className='seventh-row-dashboard-modals-IV'>
            <img src={Ring} alt="logo"/>
          </div>
   </div>
   <div className='second-row-dashboard-modals-I'>
          <img src={Five} alt="logo"/>
        </div>
        <div className='header-dashboard-modals'>
          <p>Select Table / Data</p>
          <img src={Line} alt="logo"/>
        </div>
        {/* Adding Table  */}
        <div className='container-dashboard-four'>
        <div className='main-container-table-dashboard-IV'>
            {/* first row */}
            <div className='first-row-table-dashboard-IV'>
            {/* first column */}
            <div className='first-column-dashboard-IV'>
                <img src={Folder} alt="logo"/>
                <p>Sampledata.accdb [4]</p>
            </div>
            {/* second column */}
            <div className='second-column-dashboard-IV'>
                <input type='checkbox' />
                <label>sales_data</label>
            </div>
              {/* third column */}
              <div className='third-column-dashboard-IV'>
                <input type='checkbox' />
                <label>finance</label>
            </div>
              {/* fourth column */}
              <div className='fourth-column-dashboard-IV'>
                <input type='checkbox' />
                <label>Users_meta</label>
            </div>
                {/* fifth column */}
                <div className='fifth-column-dashboard-IV'>
                <input type='checkbox' />
                <label>Users_meta</label>
            </div>
            </div>
            <div className='second-row-table-dashboard-IV'>
                {/* first column */}
                <div>
                    <p>sales_data</p>
                </div>
                {/* Second column */}
                <div>
                <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Title</th>
                  <th className='average-sale-container-dashboard-IV'>Average Sale
                  <div className='setting-dashboard-IV'>
                            <img src={Setting} alt='logo'/>
                        </div>
                  </th>
                  <th>Min Sale</th>
                  <th>Max Sale</th>
                  <th>Total Value</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    <td>{row.date}</td>
                    <td>{row.title}</td>
                    <td>
                        {row.avgSale}
                        </td>
                    <td>{row.minSale}</td>
                    <td>{row.maxSale}</td>
                    <td>{row.totalValues}</td>
                  </tr>
                ))}
              </tbody>
            </table>
                </div>
            </div>        
        </div> 
        </div>
          {/* Adding Button */}
          <div className='button-dashboard-modal-IV'>
          <button>Modify</button>
        </div>
        {/* Adding Database Query */}
        <div className='db-IV'>
        <div className='input-group-sign-in-row-I-dm-VV'>
          <input type="text" placeholder='Enter SQL Query' name='sql-query' className='input-details-sign-in-row-I-dm-VV' />
        </div>
        </div>
        {/* adding another div */}
        <div className='another-column-dashboard-IV'>
          <p>SQL Query Executed Secessfully!</p>
          <button>Execute</button>
        </div>
        {/* adding another button */}
        <div className='another-button-dashboard-IV'>
          <button onClick={handleDashboardV}>Load Data</button>
        </div>
        </div>
    </div>
  )
}

export default CreateDashboardModalIV;