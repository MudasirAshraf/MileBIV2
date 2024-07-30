import React from 'react';
import Chart from 'react-apexcharts';

const PieChart = ({
  title = 'Pie Chart',
  backgroundColor = '#fff',
  legendPosition = 'bottom',
  series = [44, 55, 13, 43, 22]
}) => {
  const options = {
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: legendPosition,
          },
        },
      },
    ],
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
    chart: {
      background: backgroundColor
    }
  };

  return (
    <div id="chart">
      <Chart options={options} series={series} type="pie" width={380} />
    </div>
  );
};

export default PieChart;
