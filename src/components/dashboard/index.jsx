import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.scss';
import Logo from '../../assets/svg/Header.svg';
import Workspace from '../../assets/svg/workspace.svg';
import USER from '../../assets/svg/UP.svg';
import DS from '../../assets/svg/DS.svg';
import Dataset from '../../assets/svg/dataset.svg';
import Bell from '../../assets/svg/bell.svg';
import Pen from '../../assets/svg/pen.svg';
import S1 from '../../assets/svg/s1.svg';
import S2 from '../../assets/svg/s2.svg';
import S3 from '../../assets/svg/s3.svg';
import S4 from '../../assets/svg/s4.svg';
import S5 from '../../assets/svg/s5.svg';
import S6 from '../../assets/svg/s6.svg';
import S7 from '../../assets/svg/s7.svg';
import L1 from '../../assets/svg/l1.svg';
import Ver from '../../assets/svg/Snap Horizontal.svg';
import Slider from '../../assets/svg/Expand Sidebar.svg';
import Rarrow from '../../assets/svg/rarrow.svg';
import C1 from '../../assets/svg/C1.svg';
import C2 from '../../assets/svg/C2.svg';
import C3 from '../../assets/svg/C3.svg';
import C4 from '../../assets/svg/C4.svg';
import C5 from '../../assets/svg/C5.svg';
import C6 from '../../assets/svg/C6.svg';
import CustomGrid from '../custom-grid';
import W1 from '../../assets/svg/W1.svg';
import W2 from '../../assets/svg/W2.svg';
import W3 from '../../assets/svg/W3.svg';
import Treemap from "../../assets/svg/treemap.svg";
import ScatterChart from "../../assets/svg/scatter-chart.svg";
import GanttChart from "../../assets/svg/gantt-chart.svg";
import BubbleChart from "../../assets/svg/bubble-chart.svg";
import Table from "../../assets/svg/table.svg";
import Typo from "../../assets/svg/typography.svg";
import GaugeChart from "../../assets/svg/gauge-chart.svg";
import BubbleChart3D from "../../assets/svg/3d-bubble-chart.svg";
import Piechart from "../../assets/svg/pie-chart.svg";
import SVB from "../../assets/svg/s-v-bar.svg";
import SHB from "../../assets/svg/stacked-h-bar.svg";
import SHBI from "../../assets/svg/SHB-I.svg";
import MC from "../../assets/svg/mixed-chart.svg";
import SVBI from "../../assets/svg/SVBI.svg";
import AC from "../../assets/svg/area-chart.svg";
import M1 from "../../assets/svg/m1.svg";
import M2 from "../../assets/svg/m2.svg";
import M3 from "../../assets/svg/m3.svg";
import M4 from "../../assets/svg/m4.svg";
import M5 from "../../assets/svg/m5.svg";
import M6 from "../../assets/svg/m6.svg";

//  Chart Default Options Data
const defaultChartOptions = {
  'Horizontal Bar Chart': {
    title: '',
    backgroundColor: '#ffffff',
    barColor: '#008FFB',
    borderRadius: 4,
    borderRadiusApplication: 'end',
    showLegend: true,
    legendPosition: 'bottom',
    xaxisTitle: '',
    yaxisTitle: '',
  },
  'Vertical Bar Chart': {
    title: '',
    backgroundColor: '#ffffff',
    showLegend: true,
    legendPosition: 'top', 
    xaxisTitle: 'Months',
    yaxisTitle: 'Percentage',
    barColor: '#008FFB',
    borderRadius: 10,
    borderRadiusApplication: 'end',
  },
  'Stacked Horizontal Bar Chart': {
    title: '',
    backgroundColor: '#ffffff',
    showLegend: true,
    legendPosition: 'top',
    xaxisTitle: 'Years',
    yaxisTitle: 'Values',
  },
  'Stacked Vertical Bar Chart':{
    title: '',
    backgroundColor: '#ffffff',
    showLegend: true,
    legendPosition: 'top',
    xaxisTitle: 'Years',
    yaxisTitle: 'Values',
  },
  '100% Stacked Horizontal Bar Chart':{
    title: '',
    backgroundColor: '#ffffff',
    showLegend: true,
    legendPosition: 'top',
    xaxisTitle: 'Years',
    yaxisTitle: 'Values',
  },
  '100% Stacked Vertical Bar Chart':{
    title: '',
    backgroundColor: '#ffffff',
    showLegend: true,
    legendPosition: 'top',
    xaxisTitle: 'Years',
    yaxisTitle: 'Values',
  },
  'Pie Chart': {
    title: '',
    backgroundColor: '#ffffff',
    legendPosition: 'bottom',
  },
  'Donut Chart': {
    title: '',
    backgroundColor: '#ffffff',
    legendPosition: 'bottom',
  },
  'line chart' : {
    title: '',
    backgroundColor: '#ffffff',
    lineColor: '#008FFB',
    showLegend: true,
    legendPosition: 'bottom',
    xaxisTitle: '',
    yaxisTitle: '',
  },
  'Area Chart' : {
    title: 'Area Chart',
    backgroundColor: '#ffffff',
    xaxisTitle: 'Date Time',
    yaxisTitle: 'Values',
    showLegend: true,
    legendPosition: 'bottom'
  },
  'Scatter Chart' : {
    title: 'Scatter Chart',
    backgroundColor: '#ffffff',
    xaxisTitle: '',
    yaxisTitle: '',
    showLegend: true,
    legendPosition: 'bottom'
  },
  'Bubble Chart' : {
    title: 'Bubble Chart',
    backgroundColor: '#ffffff',
    xaxisTitle: '',
    yaxisTitle: '',
    showLegend: true,
    legendPosition: 'bottom'
  },
  '3D Bubble Chart' : {
    title: '3D Bubble Chart',
    backgroundColor: '#ffffff',
    xaxisTitle: '',
    yaxisTitle: '',
    showLegend: true,
    legendPosition: 'bottom'
  },
  'Gantt Chart': {
    title: '',
    backgroundColor: '#ffffff',
    borderRadius: 4,
    showLegend: true,
    legendPosition: 'bottom',
    xaxisTitle: '',
    yaxisTitle: '',
  },
  'Treemap Chart':{
    title: '',
    showLegend: true,
    legendPosition: 'bottom',
  },
  'Mixed Chart': {
    title:" ",
    backgroundColor:"#f0f0f0",
    columnColor: "#FF5733",
    lineColor: "#33FF57",
    showLegend: true,
    legendPosition:"bottom",
    xaxisTitle: "",
    yaxisTitle1: "",
    yaxisTitle2: "",
  },
  'Gauge Chart' : {
    title: '',
    backgroundColor: '#ffffff',
    barColor: '#008FFB',
    showLegend: true,
  },
  'Card': {
    title:"",
    subtitle:"",
  },
  'Table': {
    title: '',
    headers: { text: '', sum: '', price: '', date: '' },
    data: [
      { text: 'Item A', sum: 4, price: 40.00, date: '24-08-2000' },
      { text: 'Item B', sum: 4, price: 40.00, date: '24-08-2000' },
      { text: 'Item C', sum: 4, price: 40.00, date: '24-08-2000' },
      { text: 'Item D', sum: 4, price: 40.00, date: '24-08-2000' },
    ],
  },
  'Image':{
    title:"",
  },
  'Typography':{
    title:"",
    subtitle:"",
    para:"",
    subtitleI:"",
    paraI:"",
    subtitleII:"",
    paraII:"",
  },
};

const Dashboard = ({ children, onCreateGrid, onSelectChart, selectedChart, onDeleteChart, onUpdateChartOptions, handleShuffleCharts,
  selectedGridIndex, gridToMoveIndex}) => {
  const [activeTab, setActiveTab] = useState('Grids');
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [showChartList, setShowChartList] = useState(false);
  const [chartOptions, setChartOptions] = useState(defaultChartOptions);
  const navigate = useNavigate();

  const handleCreateDashboard = () => {
    navigate("/create-dashboard-modals");
  };

  const handleCreateDataset = () => {
    navigate("/create-dataset-I");
  };
  

  const handleSaveChart = () => {
    // Access updated chart options from state
    const updatedOptions = chartOptions[selectedChart];
    if (selectedChart === 'Horizontal Bar Chart') {
      // Pass updatedOptions to HorizontalBarChart component (logic for other charts)
    } else if (selectedChart === 'Vertical Bar Chart') {
      // Pass updatedOptions to VerticalBarChart component
    } // ... handle other chart types
  
    // (Optional) Persist changes to external storage (API call or local storage)
  };

  // Update chartOptions when selectedChart changes
  useEffect(() => {
    if (selectedChart) {
      setChartOptions(prevOptions => ({
        ...prevOptions,
        [selectedChart]: prevOptions[selectedChart] || defaultChartOptions[selectedChart],
      }));
    }
  }, [selectedChart]);
// Handle Selection of Charts
  const handleChartSelection = (chartName) => {
    onSelectChart(chartName);
    setShowChartList(false);
  };
//  Delete Charts
  const handleDeleteChart = () => {
    onDeleteChart();
  };  
  // Change Chart Properties
  const handlePropertyChange = (e) => {
    const { name, value } = e.target;
    const updatedOptions = {
      ...chartOptions,
      [selectedChart]: {
        ...chartOptions[selectedChart],
        [name]: value
      }
    };
    setChartOptions(updatedOptions);
    onUpdateChartOptions(updatedOptions);
  };
  // Render Charts
  const renderProperties = () => {
    if (!selectedChart) return null;

    const properties = chartOptions[selectedChart] || {};

    return (
      <div className='chart-properties'>
        {/* Horizontal Bar Chart */}
        {selectedChart === 'Horizontal Bar Chart' && (
          <>
          {/* Title */}
            <label className='chart-properties-labels'>
              Title:
              <input
                type='text'
                name='title'
                value={properties.title || ''}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Background-color */}
            <label className='chart-properties-labels'>
              Background Color:
              <input
                type='color'
                name='backgroundColor'
                value={properties.backgroundColor || '#ffffff'}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Bar Color */}
            <label className='chart-properties-labels'>
              Bar Color:
              <input
                type='color'
                name='barColor'
                value={properties.barColor || '#008FFB'}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Border-Radius */}
            <label className='chart-properties-labels'>
              Border Radius:
              <input
                type='number'
                name='borderRadius'
                value={properties.borderRadius || 4}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Border-Radius-Applications */}
            <label className='chart-properties-labels'>
              Border Radius Application:
              <select
                name='borderRadiusApplication'
                value={properties.borderRadiusApplication || 'end'}
                onChange={handlePropertyChange}
              >
                <option value='end'>End</option>
                <option value='start'>Start</option>
                <option value='both'>Both</option>
              </select>
            </label>
            {/* X-axis */}
            <label className='chart-properties-labels'>
          X-Axis Title:
          <input
            type='text'
            name='xaxisTitle'
            value={properties.xaxisTitle || ''}
            onChange={handlePropertyChange}
          />
        </label>
        {/* Y-axis */}
        <label className='chart-properties-labels'>
          Y-Axis Title:
          <input
            type='text'
            name='yaxisTitle'
            value={properties.yaxisTitle || ''}
            onChange={handlePropertyChange}
          />
        </label>
            {/* Show-Legends */}
            <label className='chart-properties-labels'>
              Show Legend:
              <input
                type='checkbox'
                name='showLegend'
                checked={properties.showLegend || true}
                onChange={e => handlePropertyChange({ target: { name: 'showLegend', value: e.target.checked } })}
              />
            </label>
            {/* Legend-Position */}
            <label className='chart-properties-labels'>
              Legend Position:
              <select
                name='legendPosition'
                value={properties.legendPosition || 'bottom'}
                onChange={handlePropertyChange}
              >
                <option value='top'>Top</option>
                <option value='bottom'>Bottom</option>
                <option value='left'>Left</option>
                <option value='right'>Right</option>
              </select>
            </label>
          </>
        )}
    {/* VERTICAL BAR CHART */}
    {selectedChart === "Vertical Bar Chart" && (
          <>
           {/* Title */}
        <label className='chart-properties-labels'>
          Title:
          <input
            type='text'
            name='title'
            value={properties.title || ''}
            onChange={handlePropertyChange}
          />
        </label>
        {/* Background-color */}
        <label className='chart-properties-labels'>
          Background Color:
          <input
            type='color'
            name='backgroundColor'
            value={properties.backgroundColor || '#ffffff'}
            onChange={handlePropertyChange}
          />
        </label>
           {/* Bar Color */}
           <label className='chart-properties-labels'>
              Bar Color:
              <input
                type='color'
                name='barColor'
                value={properties.barColor || '#008FFB'}
                onChange={handlePropertyChange}
              />
            </label>
              {/* Border-Radius */}
              <label className='chart-properties-labels'>
              Border Radius:
              <input
                type='number'
                name='borderRadius'
                value={properties.borderRadius || 4}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Border-Radius-Applications */}
            <label className='chart-properties-labels'>
              Border Radius Application:
              <select
                name='borderRadiusApplication'
                value={properties.borderRadiusApplication || 'end'}
                onChange={handlePropertyChange}
              >
                <option value='end'>End</option>
                <option value='start'>Start</option>
                <option value='both'>Both</option>
              </select>
            </label>
        {/* Show-legends */}
        <label className='chart-properties-labels'>
          Show Legend:
          <input
            type='checkbox'
            name='showLegend'
            checked={properties.showLegend || true}
            onChange={handlePropertyChange}
          />
        </label>
        {/* Legend-position */}
        <label className='chart-properties-labels'>
          Legend Position:
          <select
            name='legendPosition'
            value={properties.legendPosition || 'top'}
            onChange={handlePropertyChange}
          >
            <option value='top'>Top</option>
            <option value='bottom'>Bottom</option>
            <option value='left'>Left</option>
            <option value='right'>Right</option>
          </select>
        </label>
        {/* X-axis-Title */}
        <label className='chart-properties-labels'>
          X-Axis Title:
          <input
            type='text'
            name='xaxisTitle'
            value={properties.xaxisTitle || ''}
            onChange={handlePropertyChange}
          />
        </label>
        {/* Y-axis-Title */}
        <label className='chart-properties-labels'>
          Y-Axis Title:
          <input
            type='text'
            name='yaxisTitle'
            value={properties.yaxisTitle || ''}
            onChange={handlePropertyChange}
          />
        </label>
          </>
        )}
        {/* STACKED Horizontal BAR CHART */}
        {selectedChart === "Stacked Horizontal Bar Chart" && (
          <>
        {/* Title */}
        <label className='chart-properties-labels'>
          Title:
          <input
            type='text'
            name='title'
            value={properties.title || ''}
            onChange={handlePropertyChange}
          />
        </label>
        {/* Background-color */}
        <label className='chart-properties-labels'>
          Background Color:
          <input
            type='color'
            name='backgroundColor'
            value={properties.backgroundColor || '#ffffff'}
            onChange={handlePropertyChange}
          />
        </label>
        {/* Show-legends */}
        <label className='chart-properties-labels'>
          Show Legend:
          <input
            type='checkbox'
            name='showLegend'
            checked={properties.showLegend || true}
            onChange={handlePropertyChange}
          />
        </label>
        {/* Legend-position */}
        <label className='chart-properties-labels'>
          Legend Position:
          <select
            name='legendPosition'
            value={properties.legendPosition || 'top'}
            onChange={handlePropertyChange}
          >
            <option value='top'>Top</option>
            <option value='bottom'>Bottom</option>
            <option value='left'>Left</option>
            <option value='right'>Right</option>
          </select>
        </label>
        {/* X-axis-Title */}
        <label className='chart-properties-labels'>
          X-Axis Title:
          <input
            type='text'
            name='xaxisTitle'
            value={properties.xaxisTitle || ''}
            onChange={handlePropertyChange}
          />
        </label>
        {/* Y-axis-Title */}
        <label className='chart-properties-labels'>
          Y-Axis Title:
          <input
            type='text'
            name='yaxisTitle'
            value={properties.yaxisTitle || ''}
            onChange={handlePropertyChange}
          />
        </label>
          </>
        )}
            {/* STACKED Vertical BAR CHART */}
            {selectedChart === "Stacked Vertical Bar Chart" && (
          <>
        {/* Title */}
        <label className='chart-properties-labels'>
          Title:
          <input
            type='text'
            name='title'
            value={properties.title || ''}
            onChange={handlePropertyChange}
          />
        </label>
        {/* Background-color */}
        <label className='chart-properties-labels'>
          Background Color:
          <input
            type='color'
            name='backgroundColor'
            value={properties.backgroundColor || '#ffffff'}
            onChange={handlePropertyChange}
          />
        </label>
        {/* Show-legends */}
        <label className='chart-properties-labels'>
          Show Legend:
          <input
            type='checkbox'
            name='showLegend'
            checked={properties.showLegend || true}
            onChange={handlePropertyChange}
          />
        </label>
        {/* Legend-position */}
        <label className='chart-properties-labels'>
          Legend Position:
          <select
            name='legendPosition'
            value={properties.legendPosition || 'top'}
            onChange={handlePropertyChange}
          >
            <option value='top'>Top</option>
            <option value='bottom'>Bottom</option>
            <option value='left'>Left</option>
            <option value='right'>Right</option>
          </select>
        </label>
        {/* X-axis-Title */}
        <label className='chart-properties-labels'>
          X-Axis Title:
          <input
            type='text'
            name='xaxisTitle'
            value={properties.xaxisTitle || ''}
            onChange={handlePropertyChange}
          />
        </label>
        {/* Y-axis-Title */}
        <label className='chart-properties-labels'>
          Y-Axis Title:
          <input
            type='text'
            name='yaxisTitle'
            value={properties.yaxisTitle || ''}
            onChange={handlePropertyChange}
          />
        </label>
          </>
        )}
         {/* STACKED Horizontal BAR CHART I */}
         {selectedChart === "100% Stacked Horizontal Bar Chart" && (
          <>
        {/* Title */}
        <label className='chart-properties-labels'>
          Title:
          <input
            type='text'
            name='title'
            value={properties.title || ''}
            onChange={handlePropertyChange}
          />
        </label>
        {/* Background-color */}
        <label className='chart-properties-labels'>
          Background Color:
          <input
            type='color'
            name='backgroundColor'
            value={properties.backgroundColor || '#ffffff'}
            onChange={handlePropertyChange}
          />
        </label>
        {/* Show-legends */}
        <label className='chart-properties-labels'>
          Show Legend:
          <input
            type='checkbox'
            name='showLegend'
            checked={properties.showLegend || true}
            onChange={handlePropertyChange}
          />
        </label>
        {/* Legend-position */}
        <label className='chart-properties-labels'>
          Legend Position:
          <select
            name='legendPosition'
            value={properties.legendPosition || 'top'}
            onChange={handlePropertyChange}
          >
            <option value='top'>Top</option>
            <option value='bottom'>Bottom</option>
            <option value='left'>Left</option>
            <option value='right'>Right</option>
          </select>
        </label>
        {/* X-axis-Title */}
        <label className='chart-properties-labels'>
          X-Axis Title:
          <input
            type='text'
            name='xaxisTitle'
            value={properties.xaxisTitle || ''}
            onChange={handlePropertyChange}
          />
        </label>
        {/* Y-axis-Title */}
        <label className='chart-properties-labels'>
          Y-Axis Title:
          <input
            type='text'
            name='yaxisTitle'
            value={properties.yaxisTitle || ''}
            onChange={handlePropertyChange}
          />
        </label>
          </>
        )}
         {/* STACKED Vertical BAR CHART I */}
         {selectedChart === "100% Stacked Vertical Bar Chart" && (
          <>
        {/* Title */}
        <label className='chart-properties-labels'>
          Title:
          <input
            type='text'
            name='title'
            value={properties.title || ''}
            onChange={handlePropertyChange}
          />
        </label>
        {/* Background-color */}
        <label className='chart-properties-labels'>
          Background Color:
          <input
            type='color'
            name='backgroundColor'
            value={properties.backgroundColor || '#ffffff'}
            onChange={handlePropertyChange}
          />
        </label>
        {/* Show-legends */}
        <label className='chart-properties-labels'>
          Show Legend:
          <input
            type='checkbox'
            name='showLegend'
            checked={properties.showLegend || true}
            onChange={handlePropertyChange}
          />
        </label>
        {/* Legend-position */}
        <label className='chart-properties-labels'>
          Legend Position:
          <select
            name='legendPosition'
            value={properties.legendPosition || 'top'}
            onChange={handlePropertyChange}
          >
            <option value='top'>Top</option>
            <option value='bottom'>Bottom</option>
            <option value='left'>Left</option>
            <option value='right'>Right</option>
          </select>
        </label>
        {/* X-axis-Title */}
        <label className='chart-properties-labels'>
          X-Axis Title:
          <input
            type='text'
            name='xaxisTitle'
            value={properties.xaxisTitle || ''}
            onChange={handlePropertyChange}
          />
        </label>
        {/* Y-axis-Title */}
        <label className='chart-properties-labels'>
          Y-Axis Title:
          <input
            type='text'
            name='yaxisTitle'
            value={properties.yaxisTitle || ''}
            onChange={handlePropertyChange}
          />
        </label>
          </>
        )}
        {/* PIE CHART */}
        {selectedChart === 'Pie Chart' && ( 
          <>
          {/* Title */}
            <label className='chart-properties-labels'>
              Title:
              <input
                type='text'
                name='title'
                value={properties.title || ''}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Background-color */}
            <label className='chart-properties-labels'>
              Background Color:
              <input
                type='color'
                name='backgroundColor'
                value={properties.backgroundColor || '#ffffff'}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Legend-position */}
            <label className='chart-properties-labels'>
              Legend Position:
              <select
                name='legendPosition'
                value={properties.legendPosition || 'bottom'}
                onChange={handlePropertyChange}
              >
                <option value='top'>Top</option>
                <option value='bottom'>Bottom</option>
                <option value='left'>Left</option>
                <option value='right'>Right</option>
              </select>
            </label>
          </>
        )}
         {/* Donut CHART */}
         {selectedChart === 'Donut Chart' && ( 
          <>
          {/* Title */}
            <label className='chart-properties-labels'>
              Title:
              <input
                type='text'
                name='title'
                value={properties.title || ''}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Background-color */}
            <label className='chart-properties-labels'>
              Background Color:
              <input
                type='color'
                name='backgroundColor'
                value={properties.backgroundColor || '#ffffff'}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Legend-position */}
            <label className='chart-properties-labels'>
              Legend Position:
              <select
                name='legendPosition'
                value={properties.legendPosition || 'bottom'}
                onChange={handlePropertyChange}
              >
                <option value='top'>Top</option>
                <option value='bottom'>Bottom</option>
                <option value='left'>Left</option>
                <option value='right'>Right</option>
              </select>
            </label>
          </>
        )}
         {/* Line Chart */}
         {selectedChart === 'line chart' && (
          <>
          {/* Title */}
            <label className='chart-properties-labels'>
              Title:
              <input
                type='text'
                name='title'
                value={properties.title || ''}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Background-color */}
            <label className='chart-properties-labels'>
              Background Color:
              <input
                type='color'
                name='backgroundColor'
                value={properties.backgroundColor || '#ffffff'}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Line Color */}
            <label className='chart-properties-labels'>
              Line Color:
              <input
                type='color'
                name='lineColor'
                value={properties.lineColor || '#008FFB'}
                onChange={handlePropertyChange}
              />
            </label>
            {/* X-axis */}
            <label className='chart-properties-labels'>
          X-Axis Title:
          <input
            type='text'
            name='xaxisTitle'
            value={properties.xaxisTitle || ''}
            onChange={handlePropertyChange}
          />
        </label>
        {/* Y-axis */}
        <label className='chart-properties-labels'>
          Y-Axis Title:
          <input
            type='text'
            name='yaxisTitle'
            value={properties.yaxisTitle || ''}
            onChange={handlePropertyChange}
          />
        </label>
            {/* Show-Legends */}
            <label className='chart-properties-labels'>
              Show Legend:
              <input
                type='checkbox'
                name='showLegend'
                checked={properties.showLegend || true}
                onChange={e => handlePropertyChange({ target: { name: 'showLegend', value: e.target.checked } })}
              />
            </label>
            {/* Legend-Position */}
            <label className='chart-properties-labels'>
              Legend Position:
              <select
                name='legendPosition'
                value={properties.legendPosition || 'bottom'}
                onChange={handlePropertyChange}
              >
                <option value='top'>Top</option>
                <option value='bottom'>Bottom</option>
                <option value='left'>Left</option>
                <option value='right'>Right</option>
              </select>
            </label>
          </>
        )}
        {selectedChart === 'Area Chart' && (
             <>
             {/* Title */}
             <label className='chart-properties-labels'>
               Title:
               <input
                 type='text'
                 name='title'
                 value={properties.title || ''}
                 onChange={handlePropertyChange}
               />
             </label>
             
             {/* Background Color */}
             <label className='chart-properties-labels'>
               Background Color:
               <input
                 type='color'
                 name='backgroundColor'
                 value={properties.backgroundColor || '#ffffff'}
                 onChange={handlePropertyChange}
               />
             </label>
             {/* Line Colors */}
             <label className='chart-properties-labels'>
  Line Colors:
  <input
    type='color'
    name='lineColors1'
    value={properties.lineColors ? properties.lineColors[0] : '#008FFB'}
    onChange={e => handlePropertyChange({ target: { name: 'lineColors', value: [e.target.value, properties.lineColors ? properties.lineColors[1] : '#FF4560'] } })}
  />
  <input
    type='color'
    name='lineColors2'
    value={properties.lineColors ? properties.lineColors[1] : '#FF4560'}
    onChange={e => handlePropertyChange({ target: { name: 'lineColors', value: [properties.lineColors ? properties.lineColors[0] : '#008FFB', e.target.value] } })}
  />
</label>
             {/* X-axis Title */}
             <label className='chart-properties-labels'>
               X-Axis Title:
               <input
                 type='text'
                 name='xaxisTitle'
                 value={properties.xaxisTitle || ''}
                 onChange={handlePropertyChange}
               />
             </label>
             
             {/* Y-axis Title */}
             <label className='chart-properties-labels'>
               Y-Axis Title:
               <input
                 type='text'
                 name='yaxisTitle'
                 value={properties.yaxisTitle || ''}
                 onChange={handlePropertyChange}
               />
             </label>
             {/* Show Legend */}
             <label className='chart-properties-labels'>
               Show Legend:
               <input
                 type='checkbox'
                 name='showLegend'
                 checked={properties.showLegend || true}
                 onChange={e => handlePropertyChange({ target: { name: 'showLegend', value: e.target.checked } })}
               />
             </label>
             {/* Legend Position */}
             <label className='chart-properties-labels'>
               Legend Position:
               <select
                 name='legendPosition'
                 value={properties.legendPosition || 'bottom'}
                 onChange={handlePropertyChange}
               >
                 <option value='top'>Top</option>
                 <option value='bottom'>Bottom</option>
                 <option value='left'>Left</option>
                 <option value='right'>Right</option>
               </select>
             </label>
           </>
        )}
        {/* Scatter Chart */}
        {selectedChart === 'Scatter Chart' && (
  <>
    {/* Title */}
    <label className='chart-properties-labels'>
      Title:
      <input
        type='text'
        name='title'
        value={properties.title || ''}
        onChange={handlePropertyChange}
      />
    </label>

    {/* Background Color */}
    <label className='chart-properties-labels'>
      Background Color:
      <input
        type='color'
        name='backgroundColor'
        value={properties.backgroundColor || '#ffffff'}
        onChange={handlePropertyChange}
      />
    </label>
    {/* Scatter Colors */}
    <label className='chart-properties-labels'>
      Scatter Colors:
      <input
        type='color'
        name='scatterColors1'
        value={properties.scatterColors ? properties.scatterColors[0] : '#008FFB'}
        onChange={e => handlePropertyChange({ target: { name: 'scatterColors', value: [e.target.value, properties.scatterColors ? properties.scatterColors[1] : '#FF4560', properties.scatterColors ? properties.scatterColors[2] : '#00E396'] } })}
      />
      <input
        type='color'
        name='scatterColors2'
        value={properties.scatterColors ? properties.scatterColors[1] : '#FF4560'}
        onChange={e => handlePropertyChange({ target: { name: 'scatterColors', value: [properties.scatterColors ? properties.scatterColors[0] : '#008FFB', e.target.value, properties.scatterColors ? properties.scatterColors[2] : '#00E396'] } })}
      />
      <input
        type='color'
        name='scatterColors3'
        value={properties.scatterColors ? properties.scatterColors[2] : '#00E396'}
        onChange={e => handlePropertyChange({ target: { name: 'scatterColors', value: [properties.scatterColors ? properties.scatterColors[0] : '#008FFB', properties.scatterColors ? properties.scatterColors[1] : '#FF4560', e.target.value] } })}
      />
    </label>

    {/* X-axis Title */}
    <label className='chart-properties-labels'>
      X-Axis Title:
      <input
        type='text'
        name='xaxisTitle'
        value={properties.xaxisTitle || ''}
        onChange={handlePropertyChange}
      />
    </label>

    {/* Y-axis Title */}
    <label className='chart-properties-labels'>
      Y-Axis Title:
      <input
        type='text'
        name='yaxisTitle'
        value={properties.yaxisTitle || ''}
        onChange={handlePropertyChange}
      />
    </label>

    {/* Show Legend */}
    <label className='chart-properties-labels'>
      Show Legend:
      <input
        type='checkbox'
        name='showLegend'
        checked={properties.showLegend || true}
        onChange={e => handlePropertyChange({ target: { name: 'showLegend', value: e.target.checked } })}
      />
    </label>

    {/* Legend Position */}
    <label className='chart-properties-labels'>
      Legend Position:
      <select
        name='legendPosition'
        value={properties.legendPosition || 'bottom'}
        onChange={handlePropertyChange}
      >
        <option value='top'>Top</option>
        <option value='bottom'>Bottom</option>
        <option value='left'>Left</option>
        <option value='right'>Right</option>
      </select>
    </label>
  </>
)}
{/* Bubble Chart */}
{selectedChart === 'Bubble Chart' && (
  <>
    {/* Title */}
    <label className='chart-properties-labels'>
      Title:
      <input
        type='text'
        name='title'
        value={properties.title || ''}
        onChange={handlePropertyChange}
      />
    </label>

    {/* Background Color */}
    <label className='chart-properties-labels'>
      Background Color:
      <input
        type='color'
        name='backgroundColor'
        value={properties.backgroundColor || '#ffffff'}
        onChange={handlePropertyChange}
      />
    </label>

    {/* Bubble Colors */}
    <label className='chart-properties-labels'>
      Bubble Colors:
      <input
        type='color'
        name='bubbleColors1'
        value={properties.bubbleColors ? properties.bubbleColors[0] : '#008FFB'}
        onChange={e => handlePropertyChange({ target: { name: 'bubbleColors', value: [e.target.value, properties.bubbleColors ? properties.bubbleColors[1] : '#FF4560', properties.bubbleColors ? properties.bubbleColors[2] : '#00E396', properties.bubbleColors ? properties.bubbleColors[3] : '#775DD0'] } })}
      />
      <input
        type='color'
        name='bubbleColors2'
        value={properties.bubbleColors ? properties.bubbleColors[1] : '#FF4560'}
        onChange={e => handlePropertyChange({ target: { name: 'bubbleColors', value: [properties.bubbleColors ? properties.bubbleColors[0] : '#008FFB', e.target.value, properties.bubbleColors ? properties.bubbleColors[2] : '#00E396', properties.bubbleColors ? properties.bubbleColors[3] : '#775DD0'] } })}
      />
      <input
        type='color'
        name='bubbleColors3'
        value={properties.bubbleColors ? properties.bubbleColors[2] : '#00E396'}
        onChange={e => handlePropertyChange({ target: { name: 'bubbleColors', value: [properties.bubbleColors ? properties.bubbleColors[0] : '#008FFB', properties.bubbleColors ? properties.bubbleColors[1] : '#FF4560', e.target.value, properties.bubbleColors ? properties.bubbleColors[3] : '#775DD0'] } })}
      />
      <input
        type='color'
        name='bubbleColors4'
        value={properties.bubbleColors ? properties.bubbleColors[3] : '#775DD0'}
        onChange={e => handlePropertyChange({ target: { name: 'bubbleColors', value: [properties.bubbleColors ? properties.bubbleColors[0] : '#008FFB', properties.bubbleColors ? properties.bubbleColors[1] : '#FF4560', properties.bubbleColors ? properties.bubbleColors[2] : '#00E396', e.target.value] } })}
      />
    </label>

    {/* X-axis Title */}
    <label className='chart-properties-labels'>
      X-Axis Title:
      <input
        type='text'
        name='xaxisTitle'
        value={properties.xaxisTitle || ''}
        onChange={handlePropertyChange}
      />
    </label>

    {/* Y-axis Title */}
    <label className='chart-properties-labels'>
      Y-Axis Title:
      <input
        type='text'
        name='yaxisTitle'
        value={properties.yaxisTitle || ''}
        onChange={handlePropertyChange}
      />
    </label>

    {/* Max Y-axis */}
    <label className='chart-properties-labels'>
      Max Y-Axis:
      <input
        type='number'
        name='maxYAxis'
        value={properties.maxYAxis || 70}
        onChange={handlePropertyChange}
      />
    </label>

    {/* Show Legend */}
    <label className='chart-properties-labels'>
      Show Legend:
      <input
        type='checkbox'
        name='showLegend'
        checked={properties.showLegend !== undefined ? properties.showLegend : true}
        onChange={e => handlePropertyChange({ target: { name: 'showLegend', value: e.target.checked } })}
      />
    </label>

    {/* Legend Position */}
    <label className='chart-properties-labels'>
      Legend Position:
      <select
        name='legendPosition'
        value={properties.legendPosition || 'bottom'}
        onChange={handlePropertyChange}
      >
        <option value='top'>Top</option>
        <option value='bottom'>Bottom</option>
        <option value='left'>Left</option>
        <option value='right'>Right</option>
      </select>
    </label>
  </>
)}
{/* 3D Bubble Chart */}
{selectedChart === '3D Bubble Chart' && (
  <>
    {/* Title */}
    <label className='chart-properties-labels'>
      Title:
      <input
        type='text'
        name='title'
        value={properties.title || ''}
        onChange={handlePropertyChange}
      />
    </label>

    {/* Background Color */}
    <label className='chart-properties-labels'>
      Background Color:
      <input
        type='color'
        name='backgroundColor'
        value={properties.backgroundColor || '#ffffff'}
        onChange={handlePropertyChange}
      />
    </label>

    {/* Bubble Colors */}
    <label className='chart-properties-labels'>
      Bubble Colors:
      <input
        type='color'
        name='bubbleColors1'
        value={properties.bubbleColors ? properties.bubbleColors[0] : '#008FFB'}
        onChange={e => handlePropertyChange({ target: { name: 'bubbleColors', value: [e.target.value, properties.bubbleColors ? properties.bubbleColors[1] : '#FF4560', properties.bubbleColors ? properties.bubbleColors[2] : '#00E396', properties.bubbleColors ? properties.bubbleColors[3] : '#775DD0'] } })}
      />
      <input
        type='color'
        name='bubbleColors2'
        value={properties.bubbleColors ? properties.bubbleColors[1] : '#FF4560'}
        onChange={e => handlePropertyChange({ target: { name: 'bubbleColors', value: [properties.bubbleColors ? properties.bubbleColors[0] : '#008FFB', e.target.value, properties.bubbleColors ? properties.bubbleColors[2] : '#00E396', properties.bubbleColors ? properties.bubbleColors[3] : '#775DD0'] } })}
      />
      <input
        type='color'
        name='bubbleColors3'
        value={properties.bubbleColors ? properties.bubbleColors[2] : '#00E396'}
        onChange={e => handlePropertyChange({ target: { name: 'bubbleColors', value: [properties.bubbleColors ? properties.bubbleColors[0] : '#008FFB', properties.bubbleColors ? properties.bubbleColors[1] : '#FF4560', e.target.value, properties.bubbleColors ? properties.bubbleColors[3] : '#775DD0'] } })}
      />
      <input
        type='color'
        name='bubbleColors4'
        value={properties.bubbleColors ? properties.bubbleColors[3] : '#775DD0'}
        onChange={e => handlePropertyChange({ target: { name: 'bubbleColors', value: [properties.bubbleColors ? properties.bubbleColors[0] : '#008FFB', properties.bubbleColors ? properties.bubbleColors[1] : '#FF4560', properties.bubbleColors ? properties.bubbleColors[2] : '#00E396', e.target.value] } })}
      />
    </label>

    {/* X-axis Title */}
    <label className='chart-properties-labels'>
      X-Axis Title:
      <input
        type='text'
        name='xaxisTitle'
        value={properties.xaxisTitle || ''}
        onChange={handlePropertyChange}
      />
    </label>

    {/* Y-axis Title */}
    <label className='chart-properties-labels'>
      Y-Axis Title:
      <input
        type='text'
        name='yaxisTitle'
        value={properties.yaxisTitle || ''}
        onChange={handlePropertyChange}
      />
    </label>

    {/* Max Y-axis */}
    <label className='chart-properties-labels'>
      Max Y-Axis:
      <input
        type='number'
        name='maxYAxis'
        value={properties.maxYAxis || 70}
        onChange={handlePropertyChange}
      />
    </label>

    {/* Show Legend */}
    <label className='chart-properties-labels'>
      Show Legend:
      <input
        type='checkbox'
        name='showLegend'
        checked={properties.showLegend !== undefined ? properties.showLegend : true}
        onChange={e => handlePropertyChange({ target: { name: 'showLegend', value: e.target.checked } })}
      />
    </label>

    {/* Legend Position */}
    <label className='chart-properties-labels'>
      Legend Position:
      <select
        name='legendPosition'
        value={properties.legendPosition || 'bottom'}
        onChange={handlePropertyChange}
      >
        <option value='top'>Top</option>
        <option value='bottom'>Bottom</option>
        <option value='left'>Left</option>
        <option value='right'>Right</option>
      </select>
    </label>
  </>
)}
{selectedChart === 'Gantt Chart' && (
  <>
    {/* Title */}
    <label className='chart-properties-labels'>
      Title:
      <input
        type='text'
        name='title'
        value={properties.title || ''}
        onChange={handlePropertyChange}
      />
    </label>
    {/* Background Color */}
    <label className='chart-properties-labels'>
      Background Color:
      <input
        type='color'
        name='backgroundColor'
        value={properties.backgroundColor || '#ffffff'}
        onChange={handlePropertyChange}
      />
    </label>
  {/* Bar Colors */}
  <label className='chart-properties-labels'>
      Bar Colors:
      <input
        type='color'
        name='barColors1'
        value={properties.barColors ? properties.barColors[0] : '#008FFB'}
        onChange={e => handlePropertyChange({ target: { name: 'barColors', value: [e.target.value, properties.barColors ? properties.barColors[1] : '#00E396', properties.barColors ? properties.barColors[2] : '#775DD0', properties.barColors ? properties.barColors[3] : '#FEB019', properties.barColors ? properties.barColors[4] : '#FF4560'] } })}
      />
      <input
        type='color'
        name='barColors2'
        value={properties.barColors ? properties.barColors[1] : '#00E396'}
        onChange={e => handlePropertyChange({ target: { name: 'barColors', value: [properties.barColors ? properties.barColors[0] : '#008FFB', e.target.value, properties.barColors ? properties.barColors[2] : '#775DD0', properties.barColors ? properties.barColors[3] : '#FEB019', properties.barColors ? properties.barColors[4] : '#FF4560'] } })}
      />
      <input
        type='color'
        name='barColors3'
        value={properties.barColors ? properties.barColors[2] : '#775DD0'}
        onChange={e => handlePropertyChange({ target: { name: 'barColors', value: [properties.barColors ? properties.barColors[0] : '#008FFB', properties.barColors ? properties.barColors[1] : '#00E396', e.target.value, properties.barColors ? properties.barColors[3] : '#FEB019', properties.barColors ? properties.barColors[4] : '#FF4560'] } })}
      />
      <input
        type='color'
        name='barColors4'
        value={properties.barColors ? properties.barColors[3] : '#FEB019'}
        onChange={e => handlePropertyChange({ target: { name: 'barColors', value: [properties.barColors ? properties.barColors[0] : '#008FFB', properties.barColors ? properties.barColors[1] : '#00E396', properties.barColors ? properties.barColors[2] : '#775DD0', e.target.value, properties.barColors ? properties.barColors[4] : '#FF4560'] } })}
      />
      <input
        type='color'
        name='barColors5'
        value={properties.barColors ? properties.barColors[4] : '#FF4560'}
        onChange={e => handlePropertyChange({ target: { name: 'barColors', value: [properties.barColors ? properties.barColors[0] : '#008FFB', properties.barColors ? properties.barColors[1] : '#00E396', properties.barColors ? properties.barColors[2] : '#775DD0', properties.barColors ? properties.barColors[3] : '#FEB019', e.target.value] } })}
      />
    </label>
    {/* Border Radius */}
    <label className='chart-properties-labels'>
      Border Radius:
      <input
        type='number'
        name='borderRadius'
        value={properties.borderRadius || 4}
        onChange={handlePropertyChange}
      />
    </label>
    {/* Show Legend */}
    <label className='chart-properties-labels'>
      Show Legend:
      <input
        type='checkbox'
        name='showLegend'
        checked={properties.showLegend || true}
        onChange={e => handlePropertyChange({ target: { name: 'showLegend', value: e.target.checked } })}
      />
    </label>
    {/* Legend Position */}
    <label className='chart-properties-labels'>
      Legend Position:
      <select
        name='legendPosition'
        value={properties.legendPosition || 'bottom'}
        onChange={handlePropertyChange}
      >
        <option value='top'>Top</option>
        <option value='bottom'>Bottom</option>
        <option value='left'>Left</option>
        <option value='right'>Right</option>
      </select>
    </label>
    {/* X-Axis Title */}
    <label className='chart-properties-labels'>
      X-Axis Title:
      <input
        type='text'
        name='xaxisTitle'
        value={properties.xaxisTitle || 'Dates'}
        onChange={handlePropertyChange}
      />
    </label>
    {/* Y-Axis Title */}
    <label className='chart-properties-labels'>
      Y-Axis Title:
      <input
        type='text'
        name='yaxisTitle'
        value={properties.yaxisTitle || 'Tasks'}
        onChange={handlePropertyChange}
      />
    </label>
    {/* Show Tooltip */}
    <label className='chart-properties-labels'>
      Show Tooltip:
      <input
        type='checkbox'
        name='showTooltip'
        checked={properties.showTooltip || true}
        onChange={e => handlePropertyChange({ target: { name: 'showTooltip', value: e.target.checked } })}
      />
    </label>
  </>
)}
{/* TREEMAP CHART */}
{selectedChart === 'Treemap Chart' && (
  <>
    {/* Title */}
    <label className='chart-properties-labels'>
      Title:
      <input
        type='text'
        name='title'
        value={properties.title || ''}
        onChange={handlePropertyChange}
      />
    </label>
    {/* Bar Colors */}
    <label className='chart-properties-labels'>
      Bar Colors:
      <input
        type='color'
        name='barColors1'
        value={properties.barColors ? properties.barColors[0] : '#008FFB'}
        onChange={e => handlePropertyChange({ target: { name: 'barColors', value: [e.target.value, properties.barColors ? properties.barColors[1] : '#00E396', properties.barColors ? properties.barColors[2] : '#775DD0', properties.barColors ? properties.barColors[3] : '#FEB019', properties.barColors ? properties.barColors[4] : '#FF4560'] } })}
      />
      <input
        type='color'
        name='barColors2'
        value={properties.barColors ? properties.barColors[1] : '#00E396'}
        onChange={e => handlePropertyChange({ target: { name: 'barColors', value: [properties.barColors ? properties.barColors[0] : '#008FFB', e.target.value, properties.barColors ? properties.barColors[2] : '#775DD0', properties.barColors ? properties.barColors[3] : '#FEB019', properties.barColors ? properties.barColors[4] : '#FF4560'] } })}
      />
      <input
        type='color'
        name='barColors3'
        value={properties.barColors ? properties.barColors[2] : '#775DD0'}
        onChange={e => handlePropertyChange({ target: { name: 'barColors', value: [properties.barColors ? properties.barColors[0] : '#008FFB', properties.barColors ? properties.barColors[1] : '#00E396', e.target.value, properties.barColors ? properties.barColors[3] : '#FEB019', properties.barColors ? properties.barColors[4] : '#FF4560'] } })}
      />
      <input
        type='color'
        name='barColors4'
        value={properties.barColors ? properties.barColors[3] : '#FEB019'}
        onChange={e => handlePropertyChange({ target: { name: 'barColors', value: [properties.barColors ? properties.barColors[0] : '#008FFB', properties.barColors ? properties.barColors[1] : '#00E396', properties.barColors ? properties.barColors[2] : '#775DD0', e.target.value, properties.barColors ? properties.barColors[4] : '#FF4560'] } })}
      />
      <input
        type='color'
        name='barColors5'
        value={properties.barColors ? properties.barColors[4] : '#FF4560'}
        onChange={e => handlePropertyChange({ target: { name: 'barColors', value: [properties.barColors ? properties.barColors[0] : '#008FFB', properties.barColors ? properties.barColors[1] : '#00E396', properties.barColors ? properties.barColors[2] : '#775DD0', properties.barColors ? properties.barColors[3] : '#FEB019', e.target.value] } })}
      />
    </label>
    {/* Show Legend */}
    <label className='chart-properties-labels'>
      Show Legend:
      <input
        type='checkbox'
        name='showLegend'
        checked={properties.showLegend !== undefined ? properties.showLegend : true}
        onChange={e => handlePropertyChange({ target: { name: 'showLegend', value: e.target.checked } })}
      />
    </label>
    {/* Legend Position */}
    <label className='chart-properties-labels'>
      Legend Position:
      <select
        name='legendPosition'
        value={properties.legendPosition || 'bottom'}
        onChange={handlePropertyChange}
      >
        <option value='top'>Top</option>
        <option value='bottom'>Bottom</option>
        <option value='left'>Left</option>
        <option value='right'>Right</option>
      </select>
    </label>
  </>
)}
{/* Mixed Chart */}
{selectedChart === 'Mixed Chart' && (
  <>
    {/* Title */}
    <label className='chart-properties-labels'>
      Title:
      <input
        type='text'
        name='title'
        value={properties.title || ''}
        onChange={handlePropertyChange}
      />
    </label>

    {/* Background Color */}
    <label className='chart-properties-labels'>
      Background Color:
      <input
        type='color'
        name='backgroundColor'
        value={properties.backgroundColor || '#ffffff'}
        onChange={handlePropertyChange}
      />
    </label>

    {/* Column Color */}
    <label className='chart-properties-labels'>
      Column Color:
      <input
        type='color'
        name='columnColor'
        value={properties.columnColor || '#008FFB'}
        onChange={handlePropertyChange}
      />
    </label>

    {/* Line Color */}
    <label className='chart-properties-labels'>
      Line Color:
      <input
        type='color'
        name='lineColor'
        value={properties.lineColor || '#00E396'}
        onChange={handlePropertyChange}
      />
    </label>

    {/* Show Legend */}
    <label className='chart-properties-labels'>
      Show Legend:
      <input
        type='checkbox'
        name='showLegend'
        checked={properties.showLegend !== undefined ? properties.showLegend : true}
        onChange={e => handlePropertyChange({ target: { name: 'showLegend', value: e.target.checked } })}
      />
    </label>

    {/* Legend Position */}
    <label className='chart-properties-labels'>
      Legend Position:
      <select
        name='legendPosition'
        value={properties.legendPosition || 'bottom'}
        onChange={handlePropertyChange}
      >
        <option value='top'>Top</option>
        <option value='bottom'>Bottom</option>
        <option value='left'>Left</option>
        <option value='right'>Right</option>
      </select>
    </label>

    {/* X-Axis Title */}
    <label className='chart-properties-labels'>
      X-Axis Title:
      <input
        type='text'
        name='xaxisTitle'
        value={properties.xaxisTitle || ''}
        onChange={handlePropertyChange}
      />
    </label>

    {/* Y-Axis Title (Column) */}
    <label className='chart-properties-labels'>
      Y-Axis Title (Column):
      <input
        type='text'
        name='yaxisTitle1'
        value={properties.yaxisTitle1 || ''}
        onChange={handlePropertyChange}
      />
    </label>

    {/* Y-Axis Title (Line) */}
    <label className='chart-properties-labels'>
      Y-Axis Title (Line):
      <input
        type='text'
        name='yaxisTitle2'
        value={properties.yaxisTitle2 || ''}
        onChange={handlePropertyChange}
      />
    </label>
  </>
)}
{/* Gauge Chart */}
{selectedChart === "Gauge Chart" && (
  <>
    {/* Title */}
    <label className='chart-properties-labels'>
      Title:
      <input
        type='text'
        name='title'
        value={properties.title || ''}
        onChange={handlePropertyChange}
      />
    </label>
    {/* Background Color */}
    <label className='chart-properties-labels'>
      Background Color:
      <input
        type='color'
        name='backgroundColor'
        value={properties.backgroundColor || '#ffffff'}
        onChange={handlePropertyChange}
      />
    </label>
    {/* Bar Color */}
    <label className='chart-properties-labels'>
      Bar Color:
      <input
        type='color'
        name='barColor'
        value={properties.barColor || '#008FFB'}
        onChange={handlePropertyChange}
      />
    </label>
    {/* Show Legends */}
    <label className='chart-properties-labels'>
      Show Legend:
      <input
        type='checkbox'
        name='showLegend'
        checked={properties.showLegend || true}
        onChange={handlePropertyChange}
      />
    </label>
  </>
)}
{selectedChart === "Card" && (
  <>
    {/* Title */}
    <label className='chart-properties-labels'>
              Title:
              <input
                type='text'
                name='title'
                value={properties.title || ''}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Subtitle */}
            <label className='chart-properties-labels'>
              Subtitle:
              <input
                type='text'
                name='subtitle'
                value={properties.subtitle || ''}
                onChange={handlePropertyChange}
              />
            </label>
             </>
)}
                {/* TABLE */}
{selectedChart === 'Table' && (
  <>
    {/* Title */}
    <label className='chart-properties-labels'>
      Title:
      <input
        type='text'
        name='title'
        value={properties.title || ''}
        onChange={handlePropertyChange}
      />
    </label>

    {/* Header Labels */}
    <label className='chart-properties-labels'>
      Text Header:
      <input
        type='text'
        name='headerText'
        value={properties.headers ? properties.headers.text : 'Text'}
        onChange={e => handlePropertyChange({ target: { name: 'headers', value: { ...properties.headers, text: e.target.value } } })}
      />
    </label>
    <label className='chart-properties-labels'>
      Sum Header:
      <input
        type='text'
        name='headerSum'
        value={properties.headers ? properties.headers.sum : 'Sum'}
        onChange={e => handlePropertyChange({ target: { name: 'headers', value: { ...properties.headers, sum: e.target.value } } })}
      />
    </label>
    <label className='chart-properties-labels'>
      Price Header:
      <input
        type='text'
        name='headerPrice'
        value={properties.headers ? properties.headers.price : 'Price'}
        onChange={e => handlePropertyChange({ target: { name: 'headers', value: { ...properties.headers, price: e.target.value } } })}
      />
    </label>
    <label className='chart-properties-labels'>
      Date Header:
      <input
        type='text'
        name='headerDate'
        value={properties.headers ? properties.headers.date : 'Date'}
        onChange={e => handlePropertyChange({ target: { name: 'headers', value: { ...properties.headers, date: e.target.value } } })}
      />
    </label>
  </>
)}
{/* Image */}
{selectedChart === 'Image' && (
  <>
    {/* Title */}
    <label className='chart-properties-labels'>
              Title:
              <input
                type='text'
                name='title'
                value={properties.title || ''}
                onChange={handlePropertyChange}
              />
            </label>
  </>
)}
{/* Typography */}
{selectedChart === 'Typography' && (
  <>
   {/* Title */}
   <label className='chart-properties-labels'>
        Title:
        <input
          type='text'
          name='title'
          value={properties.title || ''}
          onChange={handlePropertyChange}
        />
      </label>
      
      {/* Subtitle */}
      <label className='chart-properties-labels'>
        Subtitle:
        <input
          type='text'
          name='subtitle'
          value={properties.subtitle || ''}
          onChange={handlePropertyChange}
        />
      </label>
      
      {/* Paragraph */}
      <label className='chart-properties-labels'>
        Paragraph:
        <textarea
          name='para'
          value={properties.para || ''}
          onChange={handlePropertyChange}
        />
      </label>
      
      {/* Subtitle I */}
      <label className='chart-properties-labels'>
        Subtitle I:
        <input
          type='text'
          name='subtitleI'
          value={properties.subtitleI || ''}
          onChange={handlePropertyChange}
        />
      </label>
      
      {/* Paragraph I */}
      <label className='chart-properties-labels'>
        Paragraph I:
        <textarea
          name='paraI'
          value={properties.paraI || ''}
          onChange={handlePropertyChange}
        />
      </label>
      
      {/* Subtitle II */}
      <label className='chart-properties-labels'>
        Subtitle II:
        <input
          type='text'
          name='subtitleII'
          value={properties.subtitleII || ''}
          onChange={handlePropertyChange}
        />
      </label>
      
      {/* Paragraph II */}
      <label className='chart-properties-labels'>
        Paragraph II:
        <textarea
          name='paraII'
          value={properties.paraII || ''}
          onChange={handlePropertyChange}
        />
      </label>
  </>
)}
{/* Add More Charts here */}
      </div>
    );
  };
  const renderContent = () => {
    switch (activeTab) {
      case 'Grids':
        return (
          <div className='container-grid-data'>
            <div className='grid-data'>
              <img src={Rarrow} alt='logo' />
              <p>Grids</p>
              <div className='grid-data-circle'>7</div>
            </div>
            <div className='another-container-grid-data'>
              <div className='c1'>
                <img src={C1} alt='logo' />
              </div>
              <div className='c1'>
                <img src={C2} alt='logo' />
              </div>
              <div className='c1'>
                <img src={C3} alt='logo' />
              </div>
              <div className='c1'>
                <img src={C4} alt='logo' />
              </div>
              <div className='c1'>
                <img src={C5} alt='logo' />
              </div>
              <div className='c1'>
                <img src={C6} alt='logo' />
              </div>
              <div className='c1'>
                <CustomGrid onCreate={onCreateGrid} />
              </div>
            </div>
          </div>
        );
      case 'Components':
        return (
          <div className='component-data'>
            <div className='charts-cd-main'>
              <div
                className='cd-I'
                onClick={() => {
                  setSelectedComponent('Charts');
                  setShowChartList(!showChartList);
                }}
              >
                <img src={Rarrow} alt='logo' />
                <p>Charts</p>
                <div className='grid-data-circle'>17</div>
              </div>
              {selectedComponent === 'Charts' && showChartList && (
                <div className='chart-list'>
                  {/* Horizontal Bar Chart */}
                  <div
                    onClick={() => handleChartSelection('Horizontal Bar Chart')}
                    className='b-chart'
                  >
                    <img src={W2} alt='logo' className='image-w2' />
                    <p>Horizontal Bar Chart</p>
                  </div>
                   {/* Vertical Bar Chart */}
                   <div
                    className='b-chart'
                    onClick={() => handleChartSelection('Vertical Bar Chart')}
                  >
                    <img src={W2} alt='logo' />
                    <p>Vertical Bar Chart</p>
                  </div>
                     {/* Stacked Horizontal Bar Chart */}
                     <div
                    className='b-chart'
                    onClick={() => handleChartSelection('Stacked Horizontal Bar Chart')}
                  >
                    <img src={SHBI} alt='logo' />
                    <p>Stacked Horizontal Bar</p>
                  </div>
                  {/* Stacked Vertical Bar Chart */}
                  <div
                    className='b-chart'
                    onClick={() => handleChartSelection('Stacked Vertical Bar Chart')}
                  >
                    <img src={SVB} alt='logo' />
                    <p>Stacked Vertical Bar</p>
                  </div>
                      {/* Stacked Horizontal Bar Chart I */}
                      <div
                    className='b-chart'
                    onClick={() => handleChartSelection('100% Stacked Horizontal Bar Chart')}
                  >
                    <img src={SHB} alt='logo' />
                    <p>100% Stacked Horizontal</p>
                  </div>
                  {/* Stacked Vertical Bar Chart I */}
                  <div
                  className='b-chart'
                    onClick={() => handleChartSelection('100% Stacked Vertical Bar Chart')}
                  >
                    <img src={SVBI} alt='logo' />
                    <p>100% Stacked Vertical</p>
                  </div>
                  {/* Pie Chart */}
                  <div
                    className='b-chart'
                    onClick={() => handleChartSelection('Pie Chart')}
                  >
                    <img src={W1} alt='logo' />
                    <p>Pie Chart</p>
                  </div>
                         {/* Donut Chart */}
                         <div
                    className='b-chart'
                    onClick={() => handleChartSelection('Donut Chart')}
                  >
                    <img src={Piechart} alt='logo' />
                    <p>Donut Chart</p>
                  </div>
                  {/* Line Chart */}
                  <div
                    className='b-chart'
                    onClick={() => handleChartSelection('line chart')}
                  >
                    <img src={W3} alt='logo' />
                    <p>Line Chart</p>
                  </div>
                   {/* Area Chart */}
                   <div
                    className='b-chart'
                    onClick={() => handleChartSelection('Area Chart')}
                  >
                    <img src={AC} alt='logo' />
                    <p>Area Chart</p>
                  </div>
                     {/* Scatter Chart */}
                     <div
                    className='b-chart'
                    onClick={() => handleChartSelection('Scatter Chart')}
                  >
                    <img src={ScatterChart} alt='logo' />
                    <p>Scatter Chart</p>
                  </div>
                   {/* Bubble Chart */}
                   <div
                    className='b-chart'
                    onClick={() => handleChartSelection('Bubble Chart')}
                  >
                    <img src={BubbleChart} alt='logo' />
                    <p>Bubble Chart</p>
                  </div>
                    {/* 3D Bubble Chart */}
                    <div
                    className='b-chart'
                    onClick={() => handleChartSelection('3D Bubble Chart')}
                  >
                    <img src={BubbleChart3D} alt='logo' />
                    <p>3D Bubble Chart</p>
                  </div>
                    {/* Gantt Chart */}
                    <div
                    className='b-chart'
                    onClick={() => handleChartSelection('Gantt Chart')}
                  >
                    <img src={GanttChart} alt='logo' />
                    <p>Gantt Chart</p>
                  </div>
                    {/* TreeMap Chart */}
                    <div
                    className='b-chart'
                    onClick={() => handleChartSelection('Treemap Chart')}
                  >
                    <img src={Treemap} alt='logo' />
                    <p>Treemap Chart</p>
                  </div>
                    {/* Mixed Chart */}
                    <div
                    className='b-chart'
                    onClick={() => handleChartSelection('Mixed Chart')}
                  >
                    <img src={MC} alt='logo' />
                    <p>Mixed Chart</p>
                  </div>
                         {/* Gauge Chart */}
                         <div
                    className='b-chart'
                    onClick={() => handleChartSelection('Gauge Chart')}
                  >
                    <img src={GaugeChart} alt='logo' />
                    <p>Gauge Chart</p>
                  </div>
                  {/* Add more charts */}
                </div>
              )}
            </div>
            <div
              className='cd-I'
              onClick={() => setSelectedComponent(selectedComponent === 'Components' ? null : 'Components')}
            >
              <img src={Rarrow} alt='logo' />
              <p>Components</p>
              <div className='grid-data-circle'>4</div>
            </div>
            {selectedComponent === 'Components' && <div className='chart-list'>
                {/* Image*/}
                <div
                    className='b-chart'
                    onClick={() => handleChartSelection('Image')}
                  >
                    <img src={W1} alt='logo' />
                    <p>Image</p>
                  </div>
                {/* Simple Card */}
                <div
                    className='b-chart'
                    onClick={() => handleChartSelection('Card')}
                  >
                    <img src={W1} alt='logo' />
                    <p>Card</p>
                  </div>
                    {/* Table */}
                    <div
                    className='b-chart'
                    onClick={() => handleChartSelection('Table')}
                  >
                    <img src={Table} alt='logo' />
                    <p>Table</p>
                  </div>
              </div>
              }
            <div
              className='cd-I'
              onClick={() => setSelectedComponent(selectedComponent === 'Typography' ? null : 'Typography')}
            >
              <img src={Rarrow} alt='logo' />
              <p>Typography</p>
              <div className='grid-data-circle'>10</div>
            </div>
            {selectedComponent === 'Typography' && <div className='chart-list'>
               {/* Typography */}
               <div
                    className='b-chart'
                    onClick={() => handleChartSelection('Typography')}
                  >
                    <img src={Typo} alt='logo' />
                    <p>Typography</p>
                  </div>
              </div>}
          </div>
        );
        case 'Editor':
        return (
          <div className='editor-data'>
            <div className='editor-data-c-1'>
              <h4>Selected:</h4>
              <p>{selectedChart}</p>
            </div>
            {renderProperties()}
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div className='main-container-navbar-wrapper'>
      <div className='container-navbar'>
        <div className='first-row-navbar'>
          <div>
            <img src={Logo} alt='logo' />
          </div>
          <div className='first-row-navbar-I'>
            <div className='fr-navbar-I'>
              <img src={Workspace} alt='logo' />
            </div>
            <div className='fr-navbar-II'>
              <p>Selected Workspace</p>
              <select>
                <option>DASO</option>
                <option>PASO</option>
              </select>
            </div>
          </div>
        </div>
        <div className='second-row-navbar'>
          <div className='user-permission'>
            <div className='DS'>
              <img src={USER} alt='logo' />
            </div>
            <div>
              <p>User Permissions</p>
            </div>
          </div>
          <div className='user-permission'>
            <div className='DS'>
              <img src={DS} alt='logo' />
            </div>
            <div onClick={handleCreateDataset}>
              <p>Create a Dataset</p>
            </div>
          </div>
          <div className='Dashboard'>
            <div className='DS'>
              <img src={DS} alt='logo' />
            </div>
            <div onClick={handleCreateDashboard}>
              <p>Create a Dashboard</p>
            </div>
          </div>
          <div className='first-div-second-row-btn-IV-nav'>
            <img src={Dataset} alt='logo' />
            <select className='first-div-second-row-btn-IV-select-nav'>
            <option>Account Settings</option>
                  <option>Logout</option>
            </select>
          </div>
          <div className='bell'>
            <img src={Bell} alt='logo' />
            <div className='alert-bell'>10</div>
          </div>
        </div>
      </div>
      <div className='CDB'>
        <div className='CDB-column'>
          <div className='main-container-CDB'>
            <div className='fr-CDB'>
              <p>Dashboard title</p>
              <img src={Pen} alt='logo' />
            </div>
            <div className='sr-CDB'>
              <div className='sr-CDB-I'>
                <img src={S1} alt='logo' />
              </div>
              <div>
                <img src={L1} alt='logo' />
              </div>
              <div className='sr-CDB-III'>
                <div className='sr-CDB-I'>
                  <img src={S2} alt='logo' />
                </div>
                <div className='sr-CDB-I'>
                  <img src={S3} alt='logo' />
                </div>
                <div className='sr-CDB-I'>
                  <img src={S4} alt='logo' />
                </div>
                <div className='sr-CDB-I' onClick={handleDeleteChart}>
                  <img src={S5} alt='logo' />
                </div>
              </div>
              <div>
                <img src={L1} alt='logo' />
              </div>
              <div className='sr-CDB-III'>
                <div className='sr-CDB-I'>
                  <img src={M2} alt='logo' />
                </div>
                <div className='sr-CDB-I'>
                  <img src={M1} alt='logo' />
                </div>
              </div>
              <div>
                <img src={L1} alt='logo' />
              </div>
              <div className='sr-CDB-III'>
                <div className='sr-CDB-I'>
                  <img src={M3} alt='logo' />
                </div>
                <div className='sr-CDB-I'>
                  <img src={S6} alt='logo' />
                </div>
              </div>
              <div>
                <img src={L1} alt='logo' />
              </div>
              <div className='sr-CDB-III'>
                <div className='sr-CDB-I'>
                  <img src={M4} alt='logo' />
                </div>
                <div className='sr-CDB-I'>
                  <img src={M5} alt='logo' />
                </div>
              </div>
              <div>
                <img src={L1} alt='logo' />
              </div>
              <div className='sr-CDB-III'>
              <button  className='sr-btn' onClick={handleShuffleCharts} disabled={selectedGridIndex === null || gridToMoveIndex === null}>Shuffle Charts</button>
                <div>
                  <button className='sr-btn' onClick={handleSaveChart}>Save Changes</button>
                </div>
                <div className='sr-btn-I'>
                  <img src={S7} alt='logo' />
                </div>
                <div className='sr-btn-I'>
                  <img src={M6} alt='logo' className='sr-img' />
                </div>
              </div>
            </div>
          </div>
          <div className='parent-container-CDB'>
            {children}
          </div>
        </div>
        <div className='content-CDB-I'>
          <div className='main-container-CDB-I'>
            <div
              className={`CDB-I-i ${activeTab === 'Grids' ? 'active' : ''}`}
              onClick={() => setActiveTab('Grids')}
            >
              Grids
            </div>
            <div
              className={`CDB-I-i ${activeTab === 'Components' ? 'active' : ''}`}
              onClick={() => setActiveTab('Components')}
            >
              Components
            </div>
            <div
              className={`CDB-I-i ${activeTab === 'Editor' ? 'active' : ''}`}
              onClick={() => setActiveTab('Editor')}
            >
              Editor
            </div>
          </div>
          {renderContent()}
        </div>
        <div className='main-container-CDB-II'>
          {/* Horizontal Slider */}
          <div>
            <img src={Slider} alt='logo' />
          </div>
          {/* Vertical Slider */}
          <div>
            <img src={Ver} alt='logo' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
