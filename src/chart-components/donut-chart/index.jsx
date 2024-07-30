import React from 'react';
import Chart from 'react-apexcharts';

const DonutChart = ({
  title = 'Donut Chart',
  backgroundColor = '#fff',
  legendPosition = 'bottom',
  series = [44, 55, 41, 17, 15]
}) => {
  const options = {
    chart: {
      type: 'donut',
      background: backgroundColor
    },
    labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: legendPosition
        }
      }
    }],
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
      <Chart options={options} series={series} type="donut"  width={380} />
    </div>
  );
};

export default DonutChart;
