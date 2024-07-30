import React from 'react';
import Chart from 'react-apexcharts';

const VerticalBarChart = ({
  title = 'Monthly Inflation in Argentina, 2002',
  backgroundColor = '#ffffff',
  legendPosition = 'top',
  xaxisTitle = 'Months',
  yaxisTitle = 'Percentage',
  showLegend = true,
  barColor = '#008FFB',
  borderRadius = 10,
  borderRadiusApplication = 'end'
}) => {
  const options = {
    chart: {
      height: 350,
      type: 'bar',
      background: backgroundColor,
    },
    plotOptions: {
      bar: {
        borderRadius: borderRadius,
        borderRadiusApplication: borderRadiusApplication,
        dataLabels: {
          position: 'top', // top, center, bottom
          colors: [barColor]
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + "%";
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ["#304758"]
      }
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      position: 'top',
      title: {
        text: xaxisTitle
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          }
        }
      },
      tooltip: {
        enabled: true,
      }
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return val + "%";
        }
      },
      title: {
        text: yaxisTitle
      },
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
    fill: {
      colors: [barColor]
    },
    legend: {
      show: showLegend,
      position: legendPosition,
    }
  };

  const series = [{
    name: 'Inflation',
    data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
  }];

  return (
    <div id="chart">
      <Chart options={options} series={series} type="bar" height={290} />
    </div>
  );
}

export default VerticalBarChart;
