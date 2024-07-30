import React from 'react';
import "./dataset-III.scss";
import { useNavigate } from 'react-router-dom';
import Back from "../../assets/svg/Back.svg";
import Cross from '../../assets/svg/cross.svg';
import Three from '../../assets/png/3.png';
import DIII from "../../assets/svg/D3.svg";
import Polygon from '../../assets/svg/Polygon 3.svg';
import Line from '../../assets/svg/line.svg';
import Ring from "../../assets/svg/ringround.svg";
import Folder from "../../assets/svg/bluefolder.svg";
import Setting from "../../assets/svg/setting.svg";

const dataset = [
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

const DatasetIII = () => {
    const navigate = useNavigate();
    const handleDatasetII = () => {
        navigate("/create-dataset-II")
    };

    const handleDatasetIV = () => {
        navigate("/create-dataset-IV")
    };
  return (
    <div className='main-container-dataset-III'>
       <div className='header-dataset-III'>
        {/* Adding Header */}
      <div>
  <img src={Back} alt="logo" style={{cursor:"pointer"}} onClick={handleDatasetII}/>
 </div>
 <div>
  <img src={Cross} alt="logo"/>
 </div>
      </div>
        {/* Main container */}
        <div className='container-dataset-III'>
      {/* first row */}
      <div className='first-row-dataset-III'>
      <p>Create a Dataset</p>
      <img src={DIII} alt="logo"/>
      <div className='second-row-dataset-III'>
        <img src={Polygon} alt="logo"/>
      </div>
      <div className='ring-dataset-III'>
        <img src={Ring} alt="logo"/>
      </div>
      <div className='ring-i-dataset-III'>
        <img src={Ring} alt="logo"/>
      </div>
      </div>
      <div className='third-row-dataset-III'>
      <img src={Three} alt="logo"/>
      </div>
      <div className='header-dashboard-modals'>
          <p>Select Table / Data</p>
          <img src={Line} alt="logo"/>
        </div>
        {/* main container table */}
        <div className='container-table-dataset-III'>
             <div className='main-container-table-dataset-III'>
                {/* first row */}
                <div className='first-row-table-ds-III'>
                    {/* first column */}
                    <div className='first-column-ds-III'>
                    <img src={Folder} alt="logo"/>
                    <p>Sampledata.accdb [4]</p>
                    </div>
                    {/* second column */}
                    <div className='second-column-ds-III'>
                    <input type='checkbox' />
                    <label>sales_data</label>
                    </div>
                       {/* third column */}
                       <div className='second-column-ds-III'>
                    <input type='checkbox' />
                    <label>finance</label>
                    </div>
                         {/* fourth column */}
                         <div className='second-column-ds-III'>
                    <input type='checkbox' />
                    <label>users_meta</label>
                    </div>
                       {/* fifth column */}
                       <div className='second-column-ds-III'>
                    <input type='checkbox' />
                    <label>users_meta</label>
                    </div>
                </div>
                {/* second row Table */}
                <div className='second-row-table-ds-III'>
                      {/* first column */}
                <div>
                    <p>sales_data</p>
                </div>
                {/* second column (Table) */}
                <div>
                <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Title</th>
                  <th className='average-sale-container-dataset-III'>Average Sale
                  <div className='setting-dataset-III'>
                            <img src={Setting} alt='logo'/>
                        </div>
                  </th>
                  <th>Min Sale</th>
                  <th>Max Sale</th>
                  <th>Total Value</th>
                </tr>
              </thead>
              <tbody>
                {dataset.map((row, index) => (
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
                 <div className='button-dataset-III'>
          <button>Modify</button>
        </div>
        {/* Adding SQL Query */}
        <div className='sql-query-ds-III'>
             <div className='input-data-ds-III'>
                <input type='text' placeholder='Enter SQL Query' name='sql-query' className='input-details-ds-III' />
             </div>
        </div>
        <div className='second-column-sql-query-ds-III'>
                <p>SQL Query Executed Sucessfully!</p>
                <button>Execute</button>
             </div>
             <div className='load-data-btn-ds-III'>
                <button onClick={handleDatasetIV}>Load Data</button>
             </div>
        </div>
    </div>
  )
}

export default DatasetIII;
