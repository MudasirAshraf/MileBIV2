import React from 'react';
import ReactApexChart from 'react-apexcharts';

const HorizontalBarChart = ({
  title = 'Horizontal Bar Chart',
  backgroundColor = '#fff',
  barColor = '#008FFB',
  borderRadius = 4,
  borderRadiusApplication = 'end',
  showLegend = true,
  legendPosition = 'bottom',
  height = 290,
  xaxisTitle = 'Values',
  yaxisTitle = 'Categories',
  showTooltip = true
}) => {
  const options = {
    series: [{
      data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
      color: barColor // Set bar color
    }],
    chart: {
      type: 'bar',
      height: height, // Use height from props
      background: backgroundColor // Set background color
    },
    plotOptions: {
      bar: {
        borderRadius: borderRadius,
        borderRadiusApplication: borderRadiusApplication,
        horizontal: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan', 'United States', 'China', 'Germany'],
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
    title: {
      text: title,
      align: 'center',
      margin: 0,
      offsetY: 0,
      style: {
        fontSize: '15px',
        fontWeight: 'bold',
        color: '#263238'
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
      <ReactApexChart options={options} series={options.series} type="bar" height={height} />
    </div>
  );
};

export default HorizontalBarChart;
