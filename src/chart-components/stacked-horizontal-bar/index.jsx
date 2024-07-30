import React from 'react';
import Chart from 'react-apexcharts';

const StackedHorizontalBarChart = ({
  title = 'Stacked Horizontal Bar Chart',
  backgroundColor = '#fff',
  height = 290, // Default height added
  showLegend = true,
  legendPosition = 'top',
  xaxisTitle = 'Years',
  yaxisTitle = 'Values'
}) => {
  const series = [{
    name: 'Marine Sprite',
    data: [44, 55, 41, 37, 22, 43, 21]
  }, {
    name: 'Striking Calf',
    data: [53, 32, 33, 52, 13, 43, 32]
  }, {
    name: 'Tank Picture',
    data: [12, 17, 11, 9, 15, 11, 20]
  }, {
    name: 'Bucket Slope',
    data: [9, 7, 5, 8, 6, 9, 4]
  }, {
    name: 'Reborn Kid',
    data: [25, 12, 19, 32, 25, 24, 10]
  }];

  const options = {
    chart: {
      type: 'bar',
      height: height,
      stacked: true,
      background: backgroundColor
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          total: {
            enabled: true,
            offsetX: 0,
            style: {
              fontSize: '13px',
              fontWeight: 900
            }
          }
        }
      },
    },
    stroke: {
      width: 1,
      colors: ['#fff']
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
    xaxis: {
      categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
      title: {
        text: xaxisTitle
      },
      labels: {
        formatter: function (val) {
          return val + "K"
        }
      }
    },
    yaxis: {
      title: {
        text: yaxisTitle
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + "K"
        }
      }
    },
    fill: {
      opacity: 1
    },
    legend: {
      show: showLegend,
      position: legendPosition,
      horizontalAlign: 'left',
      offsetX: 40
    }
  };

  return (
    <div id="chart">
      <Chart options={options} series={series} type="bar" height={height} />
    </div>
  );
}

export default StackedHorizontalBarChart;
