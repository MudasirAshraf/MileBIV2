import React from 'react';
import Chart from 'react-apexcharts';

const StackedVerticalBarChart = ({
  title = 'Stacked Vertical Bar Chart',
  backgroundColor = '#fff',
  height = 290,
  showLegend = true,
  legendPosition = 'right',
  xaxisTitle = 'Date',
  yaxisTitle = 'Values'
}) => {
  const series = [{
    name: 'PRODUCT A',
    data: [44, 55, 41, 67, 22, 43]
  }, {
    name: 'PRODUCT B',
    data: [13, 23, 20, 8, 13, 27]
  }, {
    name: 'PRODUCT C',
    data: [11, 17, 15, 15, 21, 14]
  }, {
    name: 'PRODUCT D',
    data: [21, 7, 25, 13, 22, 8]
  }];

  const options = {
    chart: {
      type: 'bar',
      height: height,
      stacked: true,
      background: backgroundColor,
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      }
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
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last',
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: '13px',
              fontWeight: 900
            }
          }
        }
      }
    },
    xaxis: {
      type: 'datetime',
      categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT', '01/05/2011 GMT', '01/06/2011 GMT'],
      title: {
        text: xaxisTitle
      }
    },
    yaxis: {
      title: {
        text: yaxisTitle
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
    legend: {
      show: showLegend,
      position: legendPosition,
      offsetY: 40
    },
    fill: {
      opacity: 1
    }
  };

  return (
    <div id="chart">
      <Chart options={options} series={series} type="bar" height={height} />
    </div>
  );
}

export default StackedVerticalBarChart;
