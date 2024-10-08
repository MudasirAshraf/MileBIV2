import React from 'react';
import './grid.scss';
import HorizontalBarChart from '../../chart-components/horizontal-bar-chart';
import VerticalBarChart from '../../chart-components/vertical-bar-chart';
import StackedHorizontalBarChart from '../../chart-components/stacked-horizontal-bar';
import StackedVerticalBarChart from '../../chart-components/stacked-vertical-bar';
import StackedHorizontalBarChartI from '../../chart-components/stacked-horizontal-bar-chart-I';
import StackedVerticalBarChartI from '../../chart-components/stacked-vertical-bar-I';
import PieChart from '../../chart-components/pie-chart';
import DonutChart from '../../chart-components/donut-chart';
import LineChart from '../../chart-components/line-chart';
import AreaChart from '../../chart-components/area-chart';
import ScatterChart from '../../chart-components/scatter-chart';
import BubbleChart from '../../chart-components/bubble-chart';
import BubbleChart3D from '../../chart-components/3d-bubble-chart';
import GanttChart from '../../chart-components/gantt-chart';
import TreemapChart from '../../chart-components/treemap-chart';
import MixedChart from '../../chart-components/mixed-chart';
import GaugeChart from '../../chart-components/gauge-chart';
// Component Data
import Image from '../../chart-components/image';
import Card from '../../chart-components/card';
import SimpleTable from '../../chart-components/table';
// Typography 
import Typography from '../../chart-components/typography';


const Grid = ({ chart, chartOptions, onSelect, isSelected }) => {
  return (
    <div className={`grid-item ${isSelected ? 'selected-chart' : ''}`} onClick={onSelect}>
      <div className='grid-body'>
        {chart ? (
          <div className='uploaded-file-container'>
            {chart === 'Horizontal Bar Chart' && <HorizontalBarChart {...chartOptions} />}
            {chart === 'Vertical Bar Chart' && <VerticalBarChart {...chartOptions} />}
            {chart === 'Stacked Horizontal Bar Chart' && <StackedHorizontalBarChart {...chartOptions} />} 
            {chart === 'Stacked Vertical Bar Chart' && <StackedVerticalBarChart {...chartOptions}/>}
            {chart === '100% Stacked Horizontal Bar Chart' && <StackedHorizontalBarChartI {...chartOptions}/>}
            {chart === '100% Stacked Vertical Bar Chart' && <StackedVerticalBarChartI {...chartOptions}/>}
            {chart === 'Pie Chart' && <PieChart {...chartOptions} />}
            {chart === 'Donut Chart' && <DonutChart {...chartOptions} />}
            {chart === 'line chart' && <LineChart {...chartOptions}/>}
            {chart === 'Area Chart' && <AreaChart {...chartOptions}/>}
            {chart === 'Scatter Chart' && <ScatterChart {...chartOptions}/>}
            {chart === 'Bubble Chart' && <BubbleChart {...chartOptions}/>}
            {chart === '3D Bubble Chart' && <BubbleChart3D {...chartOptions}/>}
            {chart === 'Gantt Chart' && <GanttChart {...chartOptions}/>}
            {chart === 'Treemap Chart' && <TreemapChart{...chartOptions}/>}
            {chart === 'Mixed Chart' && <MixedChart {...chartOptions}/>}
            {chart === 'Gauge Chart' && <GaugeChart {...chartOptions}/>}
            {chart === 'Card' && <Card {...chartOptions}/>}
            {chart === 'Table' && <SimpleTable {...chartOptions}/>}
            {chart === 'Image' && <Image {...chartOptions}/>}
            {chart === 'Typography' && <Typography {...chartOptions}/>}
            
          </div>
        ) : (
          <div className='empty-grid'></div>
        )}
      </div>
    </div>
  );
};

export default Grid;
