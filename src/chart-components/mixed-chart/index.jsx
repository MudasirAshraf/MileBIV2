import React from 'react';
import ReactApexChart from 'react-apexcharts';

const MixedChart = ({
  title = 'Traffic Sources',
  backgroundColor = '#ffffff',
  columnColor = '#008FFB',
  lineColor = '#00E396',
  showLegend = true,
  legendPosition = 'bottom',
  height = 290,
  xaxisTitle = 'Date',
  yaxisTitle1 = 'Website Blog',
  yaxisTitle2 = 'Social Media',
  showDataLabels = true
}) => {
  const options = {
    series: [{
      name: 'Website Blog',
      type: 'column',
      data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160]
    }, {
      name: 'Social Media',
      type: 'line',
      data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]
    }],
    chart: {
      height: height,
      type: 'line',
      background: backgroundColor
    },
    colors: [columnColor, lineColor],
    stroke: {
      width: [0, 4]
    },
    title: {
      text: title,
      align: 'center',
      style: {
        fontSize: '15px',
        fontWeight: 'bold',
        color: '#263238'
      }
    },
    dataLabels: {
      enabled: showDataLabels,
      enabledOnSeries: [1]
    },
    labels: ['01 Jan 2001', '02 Jan 2001', '03 Jan 2001', '04 Jan 2001', '05 Jan 2001', '06 Jan 2001', '07 Jan 2001', '08 Jan 2001', '09 Jan 2001', '10 Jan 2001', '11 Jan 2001', '12 Jan 2001'],
    xaxis: {
      title: {
        text: xaxisTitle,
        style: {
          fontSize: '12px',
          fontWeight: 'bold',
          color: '#263238'
        }
      }
    },
    yaxis: [{
      title: {
        text: yaxisTitle1,
        style: {
          fontSize: '12px',
          fontWeight: 'bold',
          color: '#263238'
        }
      },
    }, {
      opposite: true,
      title: {
        text: yaxisTitle2,
        style: {
          fontSize: '12px',
          fontWeight: 'bold',
          color: '#263238'
        }
      }
    }],
    legend: {
      show: showLegend,
      position: legendPosition
    }
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={options.series} type="line" height={height} />
    </div>
  );
};

export default MixedChart;
