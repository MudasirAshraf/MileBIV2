import React from 'react';
import Chart from 'react-apexcharts';

const StackedVerticalBarChartI = ({
  title = 'Stacked Vertical Bar Chart',
  backgroundColor = '#fff',
  showLegend = true,
  legendPosition = 'right',
  xaxisTitle = 'Date',
  yaxisTitle = 'Values',
  height = 290
}) => {
  const series = [{
    name: 'PRODUCT A',
    data: [44, 55, 41, 67, 22, 43, 21, 49]
  }, {
    name: 'PRODUCT B',
    data: [13, 23, 20, 8, 13, 27, 33, 12]
  }, {
    name: 'PRODUCT C',
    data: [11, 17, 15, 15, 21, 14, 15, 13]
  }];

  const options = {
    chart: {
      type: 'bar',
      height: height,
      stacked: true,
      stackType: '100%',
      background: backgroundColor
    },
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0
        }
      }
    }],
    xaxis: {
      categories: ['2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4', '2012 Q1', '2012 Q2', '2012 Q3', '2012 Q4'],
      title: {
        text: xaxisTitle
      }
    },
    yaxis: {
      title: {
        text: yaxisTitle
      }
    },
    fill: {
      opacity: 1
    },
    legend: {
      show: showLegend,
      position: legendPosition,
      offsetX: 0,
      offsetY: 50
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
    }
  };

  return (
    <div id="chart">
      <Chart options={options} series={series} type="bar" height={height} />
    </div>
  );
}

export default StackedVerticalBarChartI;
