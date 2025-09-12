import React, { useEffect, useRef } from "react";
import ReactApexChart from "react-apexcharts";

const Chart = ({ option, gridHeight, overflow }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && option) {
      const newOptions = { ...option.options }; 
      const newSeries = [...option.options.series]; 
      chartRef.current.chart.updateOptions(newOptions, true, true);
      chartRef.current.chart.updateSeries(newSeries, true);
    }
  }, [option]);

  const isValidOptions =
    option &&
    Array.isArray(option?.options?.series) &&
    option?.options?.series?.length > 0 &&
    option.chartType;

  return (
    <div
      id="chart-container"
      style={{
        width: "100%",
        margin: "0 auto",
        borderRadius: "8px",
      }}
    >
      {isValidOptions ? (
        <ReactApexChart
          ref={chartRef}
          options={option.options}
          series={option.options.series}
          type={option.options.chart.type}
          height={gridHeight}
        />
      ) : (
        <p style={{ color: "#777", textAlign: "center" }}>
          No data available to display the chart.
        </p>
      )}
    </div>
  );
};

export default Chart;
