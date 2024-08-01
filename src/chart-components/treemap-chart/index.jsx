import React from 'react';
import ReactApexChart from 'react-apexcharts';

const TreemapChart = ({
  title = 'Basic Treemap',
  barColors = ['#008FFB', '#00E396', '#775DD0', '#FEB019', '#FF4560'],
  showLegend = true,
  legendPosition = 'bottom',
  height = 290
}) => {
  const seriesData = [
    {
      data: [
        { x: 'New Delhi', y: 218, fillColor: barColors[0] },
        { x: 'Kolkata', y: 149, fillColor: barColors[1] },
        { x: 'Mumbai', y: 184, fillColor: barColors[2] },
        { x: 'Ahmedabad', y: 55, fillColor: barColors[3] },
        { x: 'Bangaluru', y: 84, fillColor: barColors[4] },
        { x: 'Pune', y: 31, fillColor: barColors[0] },
        { x: 'Chennai', y: 70, fillColor: barColors[1] },
        { x: 'Jaipur', y: 30, fillColor: barColors[2] },
        { x: 'Surat', y: 44, fillColor: barColors[3] },
        { x: 'Hyderabad', y: 68, fillColor: barColors[4] },
        { x: 'Lucknow', y: 28, fillColor: barColors[0] },
        { x: 'Indore', y: 19, fillColor: barColors[1] },
        { x: 'Kanpur', y: 29, fillColor: barColors[2] },
      ]
    }
  ];

  const options = {
    series: seriesData,
    legend: {
      show: showLegend,
      position: legendPosition
    },
    chart: {
      height: height,
      type: 'treemap'
    },
    title: {
      text: title
    }
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={options.series} type="treemap" height={height} />
    </div>
  );
};

export default TreemapChart;
