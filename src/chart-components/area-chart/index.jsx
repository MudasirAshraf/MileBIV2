import React from 'react';
import ReactApexChart from 'react-apexcharts';

const AreaChart = ({
  title = 'Area Chart',
  backgroundColor = '#fff',
  lineColors = ['#008FFB', '#FF4560'], // Colors for each line
  showLegend = true,
  legendPosition = 'bottom',
  height = 290, // default height
  xaxisTitle = 'Date Time',
  yaxisTitle = 'Values',
  showTooltip = true,
  series = [
    {
      name: 'series1',
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: 'series2',
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ]
}) => {
  const options = {
    chart: {
      type: 'area',
      height: height,
      background: backgroundColor,
      zoom: {
        enabled: false
      }
    },
    stroke: {
      curve: 'smooth',
      colors: lineColors // Assign colors for each line
    },
    title: {
      text: title,
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5
      },
    },
    xaxis: {
      type: 'datetime',
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z"
      ],
      title: {
        text: xaxisTitle,
        style: {
          fontSize: '12px',
          fontWeight: 'bold',
          color: '#263238'
        }
      }
    },
    yaxis: {
      title: {
        text: yaxisTitle,
        style: {
          fontSize: '12px',
          fontWeight: 'bold',
          color: '#263238'
        }
      }
    },
    tooltip: {
      enabled: showTooltip,
      x: {
        format: 'dd/MM/yy HH:mm'
      }
    },
    legend: {
      show: showLegend,
      position: legendPosition
    }
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="area" height={height} />
    </div>
  );
};

export default AreaChart;
