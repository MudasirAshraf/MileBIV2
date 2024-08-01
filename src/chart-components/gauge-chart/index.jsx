import React from 'react';
import Chart from 'react-apexcharts';

const GaugeChart = ({
  title = 'Gauge Chart',
  backgroundColor = '#ffffff',
  barColor = '#008FFB',
  showLegend = true
}) => {
  const options = {
    chart: {
      type: 'radialBar',
      background: backgroundColor,
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: '#e7e7e7',
          strokeWidth: '97%',
          margin: 5, // margin is in pixels
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            offsetY: -2,
            fontSize: '22px',
            color: barColor
          }
        }
      }
    },
    fill: {
      colors: [barColor],
    },
    legend: {
      show: showLegend,
      position: 'top'
    },
    labels: [title],
  };

  const series = [76];

  return (
    <div id="chart">
      <Chart options={options} series={series} type="radialBar" height={290} />
    </div>
  );
}

export default GaugeChart;
