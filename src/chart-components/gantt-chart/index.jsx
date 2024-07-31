import React from 'react';
import ReactApexChart from 'react-apexcharts';
import moment from 'moment';

const GanttChart = ({
  title = 'Gantt Chart',
  backgroundColor = '#fff',
  barColors = ['#008FFB', '#00E396', '#775DD0', '#FEB019', '#FF4560'],
  borderRadius = 4,
  showLegend = true,
  legendPosition = 'bottom',
  height = 290,
  xaxisTitle = 'Dates',
  yaxisTitle = 'Tasks',
  showTooltip = true
}) => {
  const seriesData = [
    {
      x: 'Analysis',
      y: [
        new Date('2019-02-27').getTime(),
        new Date('2019-03-04').getTime()
      ],
      fillColor: barColors[0]
    },
    {
      x: 'Design',
      y: [
        new Date('2019-03-04').getTime(),
        new Date('2019-03-08').getTime()
      ],
      fillColor: barColors[1]
    },
    {
      x: 'Coding',
      y: [
        new Date('2019-03-07').getTime(),
        new Date('2019-03-10').getTime()
      ],
      fillColor: barColors[2]
    },
    {
      x: 'Testing',
      y: [
        new Date('2019-03-08').getTime(),
        new Date('2019-03-12').getTime()
      ],
      fillColor: barColors[3]
    },
    {
      x: 'Deployment',
      y: [
        new Date('2019-03-12').getTime(),
        new Date('2019-03-17').getTime()
      ],
      fillColor: barColors[4]
    }
  ];

  const options = {
    series: [{
      data: seriesData
    }],
    chart: {
      type: 'rangeBar',
      height: height,
      background: backgroundColor
    },
    plotOptions: {
      bar: {
        borderRadius: borderRadius,
        horizontal: true,
        distributed: true,
        dataLabels: {
          hideOverflowingLabels: false
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function(val, opts) {
        var label = opts.w.globals.labels[opts.dataPointIndex];
        var a = moment(val[0]);
        var b = moment(val[1]);
        var diff = b.diff(a, 'days');
        return label + ': ' + diff + (diff > 1 ? ' days' : ' day');
      },
      style: {
        colors: ['#f3f4f5', '#fff']
      }
    },
    xaxis: {
      type: 'datetime',
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
    grid: {
      row: {
        colors: ['#f3f4f5', '#fff'],
        opacity: 1
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
      <ReactApexChart options={options} series={options.series} type="rangeBar" height={height} />
    </div>
  );
};

export default GanttChart;
