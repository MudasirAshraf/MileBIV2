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
         
          </div>
        ) : (
          <div className='empty-grid'></div>
        )}
      </div>
    </div>
  );
};

export default Grid;
