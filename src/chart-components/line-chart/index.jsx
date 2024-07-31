import React from 'react';
import ReactApexChart from 'react-apexcharts';

const LineChart = ({
  title = 'Line Chart',
  backgroundColor = '#fff',
  lineColor = '#008FFB',
  showLegend = true,
  legendPosition = 'bottom',
  height = 290, // default height
  xaxisTitle = 'Categories',
  yaxisTitle = 'Values',
  showTooltip = true,
  series = [{
    name: 'Desktops',
    data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
  }]
}) => {
  const options = {
    chart: {
      type: 'line',
      height: height,
      background: backgroundColor,
      zoom: {
        enabled: false
      }
    },
    stroke: {
      curve: 'straight',
      colors: [lineColor]
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
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
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
    },
    legend: {
      show: showLegend,
      position: legendPosition
    }
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="line" height={height} />
    </div>
  );
};

export default LineChart;
