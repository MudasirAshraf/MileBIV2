import React from 'react';
import "./dataset-view.scss";
import Folder from "../../assets/svg/bluefolder.svg";

const DatasetView = () => {
    const data = [
        { date: '23-04-2022', title: 'Sale', avgSale: '50,000 SAR', minSale: '30,000 SAR', maxSale: '70,000 SAR', totalValue: '200,000 SAR', employeeId: 'AR912' },
        { date: '23-04-2022', title: 'Sale', avgSale: '50,000 SAR', minSale: '30,000 SAR', maxSale: '70,000 SAR', totalValue: '200,000 SAR', employeeId: 'AR913' },
        { date: '23-04-2022', title: 'Sale', avgSale: '50,000 SAR', minSale: '30,000 SAR', maxSale: '70,000 SAR', totalValue: '200,000 SAR', employeeId: 'AR914' },
        { date: '23-04-2022', title: 'Sale', avgSale: '50,000 SAR', minSale: '30,000 SAR', maxSale: '70,000 SAR', totalValue: '200,000 SAR', employeeId: 'AR915' },
        { date: '23-04-2022', title: 'Sale', avgSale: '50,000 SAR', minSale: '30,000 SAR', maxSale: '70,000 SAR', totalValue: '200,000 SAR', employeeId: 'AR916' },
        { date: '23-04-2022', title: 'Sale', avgSale: '50,000 SAR', minSale: '30,000 SAR', maxSale: '70,000 SAR', totalValue: '200,000 SAR', employeeId: 'AR917' },
        { date: '23-04-2022', title: 'Sale', avgSale: '50,000 SAR', minSale: '30,000 SAR', maxSale: '70,000 SAR', totalValue: '200,000 SAR', employeeId: 'AR918' },
        { date: '23-04-2022', title: 'Sale', avgSale: '50,000 SAR', minSale: '30,000 SAR', maxSale: '70,000 SAR', totalValue: '200,000 SAR', employeeId: 'AR919' },
        { date: '23-04-2022', title: 'Sale', avgSale: '50,000 SAR', minSale: '30,000 SAR', maxSale: '70,000 SAR', totalValue: '200,000 SAR', employeeId: 'AR920' },
        { date: '23-04-2022', title: 'Sale', avgSale: '50,000 SAR', minSale: '30,000 SAR', maxSale: '70,000 SAR', totalValue: '200,000 SAR', employeeId: 'AR921' },
        { date: '23-04-2022', title: 'Sale', avgSale: '50,000 SAR', minSale: '30,000 SAR', maxSale: '70,000 SAR', totalValue: '200,000 SAR', employeeId: 'AR922' },
        { date: '23-04-2022', title: 'Sale', avgSale: '50,000 SAR', minSale: '30,000 SAR', maxSale: '70,000 SAR', totalValue: '200,000 SAR', employeeId: 'AR923' },
        { date: '23-04-2022', title: 'Sale', avgSale: '50,000 SAR', minSale: '30,000 SAR', maxSale: '70,000 SAR', totalValue: '200,000 SAR', employeeId: 'AR912' },
        { date: '23-04-2022', title: 'Sale', avgSale: '50,000 SAR', minSale: '30,000 SAR', maxSale: '70,000 SAR', totalValue: '200,000 SAR', employeeId: 'AR912' },
        
    ];
  return (
    <div className='main-container-dataset-view'>
        <div className='container-dataset-view'>
            {/* first row */}
            <div className='first-row-dataset-view'>
            <div className='dataset-view-first-row'>
                <div className='dataset-view-first-column'>
                <img src={Folder} alt="logo"/>
                <select id="dataset-select">
        <option value="sampledata.accdb [4]">sampledata.accdb [4]</option>
        <option value="sales_data">sales_data</option>
        <option value="finance">finance</option>
    </select>
                </div>
            </div>
            </div>
            {/* second row */}
            <div className='dataset-table-container'>
                {/* Table Header */}
                <div className='dataset-table-header'>
                    <p>sales_data</p>
                </div>
                {/* Table Data */}
                <div className='data-set-table-container'>
                <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Average Sale</th>
                        <th>Min Sale</th>
                        <th>Max Sale</th>
                        <th>Total Value</th>
                        <th>Employee ID</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td>{row.date}</td>
                            <td>{row.title}</td>
                            <td>{row.avgSale}</td>
                            <td>{row.minSale}</td>
                            <td>{row.maxSale}</td>
                            <td>{row.totalValue}</td>
                            <td>{row.employeeId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DatasetView;