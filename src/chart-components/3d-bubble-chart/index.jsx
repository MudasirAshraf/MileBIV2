import React from 'react';
import ReactApexChart from 'react-apexcharts';

const generateData = (baseval, count, yrange) => {
  const series = [];
  let i = 0;
  while (i < count) {
    const x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
    const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
    const z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

    series.push([x, y, z]);
    baseval += 86400000;
    i++;
  }
  return series;
};

const BubbleChart3D = ({
  title = '3D Bubble Chart',
  backgroundColor = '#fff',
  bubbleColors = ['#008FFB', '#FF4560', '#00E396', '#775DD0'], // Default colors for each series
  showLegend = true,
  legendPosition = 'bottom',
  height = 290,
  maxYAxis = 70,
  series = [
    {
      name: 'Product1',
      data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, { min: 10, max: 60 })
    },
    {
      name: 'Product2',
      data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, { min: 10, max: 60 })
    },
    {
      name: 'Product3',
      data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, { min: 10, max: 60 })
    },
    {
      name: 'Product4',
      data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, { min: 10, max: 60 })
    }
  ]
}) => {
  const options = {
    chart: {
      height: height,
      type: 'bubble',
      background: backgroundColor,
    },
    title: {
      text: title,
      align: 'left',
    },
    xaxis: {
      tickAmount: 12,
      type: 'datetime',
      labels: {
        rotate: 0,
      },
    },
    yaxis: {
      max: maxYAxis,
    },
    fill: {
      type: 'gradient',
    },
    dataLabels: {
      enabled: false,
    },
    theme: {
      palette: 'palette2',
    },
    legend: {
      show: showLegend,
      position: legendPosition,
    },
    colors: bubbleColors,
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bubble" height={height} />
    </div>
  );
};

export default BubbleChart3D;
