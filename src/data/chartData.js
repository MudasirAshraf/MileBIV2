const options = [
  {
    chartType: "line",
    options: {
      chart: {
        type: "line",
        height: 380,
        background: "",
        zoom: {
          enabled: false,
        },
      },
      stroke: {
        curve: "straight",
        colors: ["red"],
      },
      title: {
        text: "Text",
        align: "center",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [],
        title: {
          text: "",
          style: {
            fontSize: "12px",
            fontWeight: "bold",
            color: "#263238",
          },
        },
      },
      yaxis: {
        title: {
          text: "Text",
          style: {
            fontSize: "12px",
            fontWeight: "bold",
            color: "#263238",
          },
        },
      },
      tooltip: {
        enabled: true,
      },
      legend: {
        show: true,
        // position: ,
      },
    },
  },
  {
    chartType: "verticalbarchart",
    options: {
      chart: {
        height: 380,
        type: "bar",
        background: "",
      },
      plotOptions: {
        bar: {
          borderRadius: 0,
          borderRadiusApplication: 0,
          dataLabels: {
            position: "top", // top, center, bottom
            colors: ["#263238"],
          },
          // horizontal: true,
        },
      },
      dataLabels: {
        enabled: true,
        // formatter: function (val) {
        //   return val + "%";
        // },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },
      xaxis: {
        // categories: [
        // ],
        position: "top",
        title: {
          text: "",
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        // axisTicks: {
        //   show: false,
        // },
        labels: {
          show: false,
        },
        title: {
          text: "",
        },
      },
      title: {
        text: "",
        align: "center",
        margin: 0,
        offsetY: 0,
        style: {
          fontSize: "15px",
          fontWeight: "bold",
          color: "#263238",
        },
      },
      fill: {
        colors: [],
      },
      legend: {
        show: true,
        position: "top",
      },
    },
  },
  {
    chartType: "horizontalbarchart",
    options: {
      chart: {
        height: 380,
        type: "bar",
        background: "",
      },
      plotOptions: {
        bar: {
          borderRadius: 0,
          borderRadiusApplication: 0,
          dataLabels: {
            position: "top", // top, center, bottom
            colors: ["#263238"],
          },
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: true,
        // formatter: function (val) {
        //   return val + "%";
        // },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },
      xaxis: {
        // categories: [
        // ],
        position: "top",
        title: {
          text: "",
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        // axisTicks: {
        //   show: false,
        // },
        labels: {
          show: false,
          formatter: function (val) {
            return val + "%";
          },
        },
        title: {
          text: "",
        },
      },
      title: {
        text: "",
        align: "center",
        margin: 0,
        offsetY: 0,
        style: {
          fontSize: "15px",
          fontWeight: "bold",
          color: "#263238",
        },
      },
      fill: {
        colors: [],
      },
      legend: {
        show: true,
        position: "top",
      },
    },
  },
  {
    chartType: "donut",
    options: {
      chart: {
        type: "donut",
        background: "",
        height: 380,
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 0,
            },
          },
        },
      ],
      title: {
        text: "",
        align: "center",
        margin: 0,
        offsetY: 0,
        style: {
          fontSize: "15px",
          fontWeight: "bold",
          color: "#263238",
        },
      },
    },
  },
  {
    chartType: "pie",
    options: {
      chart: {
        width: 380,
        type: "pie",
        background: "",
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 0,
            },
          },
        },
      ],
      title: {
        text: "pie",
        align: "center",
        margin: 0,
        offsetY: 0,
        style: {
          fontSize: "15px",
          fontWeight: "bold",
          color: "#263238",
        },
      },
    },
  },
  {
    chartType: "area",
    options: {
      chart: {
        type: "area",
        height: 380,
        zoom: {
          enabled: false,
        },
      },
      series: [],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },

      title: {
        text: "",
        align: "center",
      },
      // subtitle: {
      //   text: "Price Movements",
      //   align: "left",
      // },
      labels: [],
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        opposite: true,
      },
      legend: {
        horizontalAlign: "left",
      },
    },
  },
  {
    chartType: "stackedhorizontalbar",
    options: {
      chart: {
        type: "bar",
        height: 380,
        stacked: true,
        background: "",
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            total: {
              enabled: true,
              offsetX: 0,
              style: {
                fontSize: "13px",
                fontWeight: 900,
              },
            },
          },
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      title: {
        text: "",
        align: "center",
        margin: 0,
        offsetY: 0,
        style: {
          fontSize: "15px",
          fontWeight: "bold",
          color: "#263238",
        },
      },
      xaxis: {
        categories: [],
        title: {
          text: "x-axis",
        },
        labels: {
          // formatter: function (val) {
          //   return val + "K";
          // },
        },
      },
      yaxis: {
        title: {
          text: "y-axis",
        },
      },
      tooltip: {
        y: {
          // formatter: function (val) {
          //   return val + "K";
          // },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        show: false,
        // position: "top",
        horizontalAlign: "left",
        offsetX: 40,
      },
    },
  },
  {
    chartType: "stackedverticalbar",
    options: {
      chart: {
        type: "bar",
        height: 380,
        stacked: true,
        background: "",
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
          borderRadiusApplication: "end",
          borderRadiusWhenStacked: "last",
          color: ["#263238"],
          dataLabels: {
            total: {
              enabled: true,
              style: {
                fontSize: "13px",
                fontWeight: 900,
              },
            },
          },
        },
      },
      xaxis: {
        type: "",
        categories: [],
        title: {
          text: "x-axis",
        },
      },
      yaxis: {
        title: {
          text: "y-axis",
        },
      },
      title: {
        text: "",
        align: "center",
        margin: 0,
        offsetY: 0,
        style: {
          fontSize: "15px",
          fontWeight: "bold",
          color: "#263238",
        },
      },
      legend: {
        show: false,
        position: "top",
        offsetY: 40,
      },
      fill: {
        opacity: 1,
      },
    },
  },
  {
    chartType: "100stackedhorizontalbarchart",
    options: {
      chart: {
        type: "bar",
        height: 380,
        stacked: true,
        stackType: "100%",
        background: "",
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      title: {
        text: "",
        align: "center",
        margin: 0,
        offsetY: 0,
        style: {
          fontSize: "15px",
          fontWeight: "bold",
          color: "#263238",
        },
      },
      xaxis: {
        categories: [],
        title: {
          text: "",
        },
        labels: {
          // formatter: function (val) {
          //   return val + "K";
          // },
        },
      },
      yaxis: {
        title: {
          text: "",
        },
      },
      tooltip: {
        y: {
          // formatter: function (val) {
          //   return val + "K";
          // },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "left",
        offsetX: 40,
      },
    },
  },
  {
    chartType: "100stackedhorizontalbarchart",
    options: {
      chart: {
        type: "bar",
        height: 380,
        stacked: true,
        stackType: "100%",
        background: "",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      xaxis: {
        categories: [],
        title: {
          text: "x-axis",
        },
      },
      yaxis: {
        title: {
          text: "y-axis",
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        show: true,
        position: "top",
        offsetX: 0,
        offsetY: 50,
      },
      title: {
        text: "",
        align: "center",
        margin: 0,
        offsetY: 0,
        style: {
          fontSize: "15px",
          fontWeight: "bold",
          color: "#263238",
        },
      },
    },
  },
  {
    chartType: "100stackedverticalbarchart",
    options: {
      chart: {
        type: "bar",
        height: 380,
        stacked: true,
        stackType: "100%",
        background: "",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      xaxis: {
        categories: [],
        title: {
          text: "",
        },
      },
      yaxis: {
        title: {
          text: "",
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        show: true,
        // position: false,
        offsetX: 0,
        offsetY: 50,
      },
      title: {
        text: "",
        align: "center",
        margin: 0,
        offsetY: 0,
        style: {
          fontSize: "15px",
          fontWeight: "bold",
          color: "#263238",
        },
      },
    },
  },
  {
    chartType: "scatter",
    options: {
      chart: {
        height: 380,
        type: "scatter",
        background: "",
        zoom: {
          enabled: true,
          type: "xy",
        },
      },
      title: {
        text: "",
        align: "left",
      },
      xaxis: {
        tickAmount: 10,
        title: {
          text: "x-axis",
          style: {
            fontSize: "12px",
            fontWeight: "bold",
            color: "#263238",
          },
        },
        labels: {
          // formatter: function (val) {
          //   return parseFloat(val).toFixed(1);
          // },
        },
      },
      yaxis: {
        tickAmount: 7,
        title: {
          text: "y-axis",
          style: {
            fontSize: "12px",
            fontWeight: "bold",
            color: "#263238",
          },
        },
      },
      tooltip: {
        enabled: true,
      },
      legend: {
        show: true,
        position: "top",
      },
      colors: "",
    },
  },
  {
    chartType: "radialBar",
    options: {
      series: [],
      chart: {
        height: 350,
        type: "radialBar",
      },
      title: {
        text: "",
        align: "center",
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px",
            },
            value: {
              fontSize: "16px",
            },
            // total: {
            //   show: true,
            //   label: 'Total',
            //   formatter: function (w) {
            //     return 249
            //   }
            // }
          },
        },
      },
      labels: [],
    },
  },
  {
    chartType: "treemap",
    options: {
      series: [],
      legend: {
        show: false,
        position: "top",
      },
      chart: {
        height: 380,
        type: "treemap",
        background: "",
      },
      title: {
        text: "Tree map",
        align: "center",
      },
    },
  },
  {
    chartType: "mixed",
    options: {
      series: [],
      chart: {
        height: 380,
        type: "line",
      },
      stroke: {
        width: [0, 4],
      },
      title: {
        text: "",
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      labels: [],
      yaxis: [
        {
          title: {
            text: "",
          },
        },
        {
          opposite: true,
          title: {
            text: "",
          },
        },
      ],
    },
  },
  {
    chartType: "bubblechart",
    options: {
      chart: {
        height: 380,
        type: "bubble",
        background: "",
      },
      title: {
        text: "",
        align: "left",
      },
      xaxis: {
        tickAmount: 12,
        // type: "datetime",
        labels: {
          rotate: 0,
        },
      },
      yaxis: {
        max: 50,
      },
      fill: {
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      theme: {
        palette: "palette2",
      },
      legend: {
        show: true,
        position: "top",
      },
      colors: "",
    },
  },
  {
    chartType: "bubblechart3d",
    options: {
      chart: {
        height: 380,
        type: "bubble",
        background: "",
      },
      title: {
        text: "",
        align: "left",
      },
      xaxis: {
        title: {
          text: "X-Axis",
        },
      },
      yaxis: {
        title: {
          text: "Y-Axis",
        },
      },
      fill: {
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      theme: {
        palette: "palette2",
      },
      legend: {
        show: true,
        position: "top",
      },
      colors: "",
    },
  },
  {
    chartType: "scatter",
    options: {
      chart: {
        height: 385,
        type: "scatter",
        background: "",
        zoom: {
          enabled: true,
          type: "xy",
        },
      },
      title: {
        text: "",
        align: "left",
      },
      xaxis: {
        tickAmount: 10,
        title: {
          text: "",
          style: {
            fontSize: "12px",
            fontWeight: "bold",
            color: "#263238",
          },
        },
        labels: {},
      },
      yaxis: {
        tickAmount: 7,
        title: {
          text: "",
          style: {
            fontSize: "12px",
            fontWeight: "bold",
            color: "#263238",
          },
        },
      },
      tooltip: {
        enabled: false,
      },
      legend: {
        show: true,
        position: "top",
      },
      colors: [],
    },
  },
  {
    chartType: "card",
    options: {
      background: "",
      title: "",
      subtitle: "",
      value: "",
    },
  },
  {
    chartType: "table",
    options: {
      data: [],
      title:""
    },
  },
];

export const getChartOptions = (type) => {
  return options.find((c) => {
    return c.chartType == type;
  });
};

//  Chart Default Options Data
export const defaultChartOptions = {
  "Horizontal Bar Chart": {
    title: "",
    backgroundColor: "#ffffff",
    barColor: "#008FFB",
    borderRadius: 4,
    borderRadiusApplication: "end",
    showLegend: true,
    legendPosition: "bottom",
    xaxisTitle: "",
    yaxisTitle: "",
  },
  verticalbarchar: {
    title: "",
    backgroundColor: "#ffffff",
    showLegend: true,
    legendPosition: "top",
    xaxisTitle: "Months",
    yaxisTitle: "Percentage",
    barColor: "#008FFB",
    borderRadius: 10,
    borderRadiusApplication: "end",
    series: [],
  },
  "Stacked Horizontal Bar Chart": {
    title: "",
    backgroundColor: "#ffffff",
    showLegend: true,
    legendPosition: "top",
    xaxisTitle: "Years",
    yaxisTitle: "Values",
  },
  "Stacked Vertical Bar Chart": {
    title: "",
    backgroundColor: "#ffffff",
    showLegend: true,
    legendPosition: "top",
    xaxisTitle: "Years",
    yaxisTitle: "Values",
  },
  "100% Stacked Horizontal Bar Chart": {
    title: "",
    backgroundColor: "#ffffff",
    showLegend: true,
    legendPosition: "top",
    xaxisTitle: "Years",
    yaxisTitle: "Values",
  },
  "100% Stacked Vertical Bar Chart": {
    title: "",
    backgroundColor: "#ffffff",
    showLegend: true,
    legendPosition: "top",
    xaxisTitle: "Years",
    yaxisTitle: "Values",
  },
  "Pie Chart": {
    title: "",
    backgroundColor: "#ffffff",
    legendPosition: "bottom",
  },
  "Donut Chart": {
    title: "",
    backgroundColor: "#ffffff",
    legendPosition: "bottom",
  },
  line: {
    title: "",
    backgroundColor: "#ffffff",
    lineColor: "#008FFB",
    showLegend: true,
    legendPosition: "bottom",
    xaxisTitle: "",
    yaxisTitle: "",
  },
  "Area Chart": {
    title: "Area Chart",
    backgroundColor: "#ffffff",
    xaxisTitle: "Date Time",
    yaxisTitle: "Values",
    showLegend: true,
    legendPosition: "bottom",
  },
  "Scatter Chart": {
    title: "Scatter Chart",
    backgroundColor: "#ffffff",
    xaxisTitle: "",
    yaxisTitle: "",
    showLegend: true,
    legendPosition: "bottom",
  },
  "Bubble Chart": {
    title: "Bubble Chart",
    backgroundColor: "#ffffff",
    xaxisTitle: "",
    yaxisTitle: "",
    showLegend: true,
    legendPosition: "bottom",
  },
  "3D Bubble Chart": {
    title: "3D Bubble Chart",
    backgroundColor: "#ffffff",
    xaxisTitle: "",
    yaxisTitle: "",
    showLegend: true,
    legendPosition: "bottom",
  },
  "Gantt Chart": {
    title: "",
    backgroundColor: "#ffffff",
    borderRadius: 4,
    showLegend: true,
    legendPosition: "bottom",
    xaxisTitle: "",
    yaxisTitle: "",
  },
  "Treemap Chart": {
    title: "",
    showLegend: true,
    legendPosition: "bottom",
  },
  "Mixed Chart": {
    title: " ",
    backgroundColor: "#f0f0f0",
    columnColor: "#FF5733",
    lineColor: "#33FF57",
    showLegend: true,
    legendPosition: "bottom",
    xaxisTitle: "",
    yaxisTitle1: "",
    yaxisTitle2: "",
  },
  "Gauge Chart": {
    title: "",
    backgroundColor: "#ffffff",
    barColor: "#008FFB",
    showLegend: true,
  },
  Card: {
    title: "",
    subtitle: "",
  },
  Table: {
    title: "",
    headers: { text: "", sum: "", price: "", date: "" },
    data: [
      { text: "Item A", sum: 4, price: 40.0, date: "24-08-2000" },
      { text: "Item B", sum: 4, price: 40.0, date: "24-08-2000" },
      { text: "Item C", sum: 4, price: 40.0, date: "24-08-2000" },
      { text: "Item D", sum: 4, price: 40.0, date: "24-08-2000" },
    ],
  },
  Image: {
    title: "",
  },
  Typography: {
    title: "",
    subtitle: "",
    para: "",
    subtitleI: "",
    paraI: "",
    subtitleII: "",
    paraII: "",
  },
};

// const handleSubmit = (values) => {
//   let updatedOptions = { ...chartOptions };
//   const getAxisData = (axisColumn, groupBy, aggregateFunction, filters = []) => {
//     const dataset = chartOptions?.datasets

//     if (!dataset || !dataset.dataSourceData) return [];

//     // Apply filtering logic
//     let filteredData = dataset.dataSourceData;
//     if (filters.length > 0) {
//       filteredData = filteredData.filter((row) => {
//         return filters.every((filter) => {
//           const { column, operator, value } = filter;
//           switch (operator) {
//             case '=':
//               return row[column] === value;
//             case '!=':
//               return row[column] !== value;
//             case '>':
//               return row[column] > value;
//             case '<':
//               return row[column] < value;
//             case '>=':
//               return row[column] >= value;
//             case '<=':
//               return row[column] <= value;
//             default:
//               return true;
//           }
//         });
//       });
//     }

//     if (groupBy === "yes" && aggregateFunction) {
//       // Perform grouping and aggregation on filtered data
//       const groupedData = filteredData.reduce((acc, row) => {
//         const groupKey = row[values.category.column]; // Use the category column as the group key
//         if (!acc[groupKey]) acc[groupKey] = [];
//         acc[groupKey].push(row[axisColumn.column]);
//         return acc;
//       }, {});

//       // Apply aggregation function to each group
//       return Object.keys(groupedData).map((key) => ({
//         group: key,
//         value: aggregateFunctions[aggregateFunction](groupedData[key]),
//       }));
//     }

//     // Return raw filtered data if grouping is not applied
//     return filteredData.map((row) => row[axisColumn.column]);
//   };

//   switch (updatedOptions.chartType) {
//     case "bubblechart":
//     case "bubblechart3d":
//       const processedItems = values.datasets.map((item) => {
//         const xAxisData = getAxisData(item.data.x, "no", "");
//         const yAxisData = getAxisData(item.data.y, "no", "");
//         const zAxisData = getAxisData(item.data.z, "no", "");

//         return {
//           name: item.name,
//           xData: xAxisData,
//           yData: yAxisData,
//           zData: zAxisData,
//         };
//       });

//       const bubblechartData = processedItems.map((item) => ({
//         name: item.name,
//         data: item.xData.map((x, index) => ({
//           x,
//           y: item.yData[index],
//           z: item.zData[index],
//         })),
//       }));

//       updatedOptions = {
//         ...updatedOptions,
//         formValues: values,
//         options: {
//           ...updatedOptions.options,
//           series: [
//             ...bubblechartData
//           ],
//         },
//       };
//       break;
//     case "line":
//     case "bar":
//     case "stackedhorizontalbar":
//     case "100stackedhorizontalbarchart":
//     case "stackedverticalbar":
//     case "verticalbarchart":
//     case "horizontalbarchart":
//     case "100stackedverticalbarchart":
//     case "area":
//       const categories =
//         values.groupBy === "yes"
//           ? getAxisData(values.category, "yes", values.aggregateFunction).map(
//             (group) => group.group
//           )
//           : getAxisData(values.category);

//       // Process series
//       const series = values.series.map((item) => {
//         if (item.whereConditions) {
//           item.whereConditions = item.whereConditions.map(wh => {
//             return {
//               ...wh,
//               column: item.column
//             }
//           })
//         }

//         const groupedSeriesData =
//           values.groupBy === "yes"
//             ? getAxisData(item, "yes", values.aggregateFunction, item.whereConditions)
//             : getAxisData(item);

//         // Map series data to categories
//         if (values.groupBy === "yes") {
//           const dataMap = new Map(
//             groupedSeriesData.map((group) => [group.group, group.value])
//           );

//           const data = categories.map((category) =>
//             dataMap.has(category) ? dataMap.get(category) : null // Fill missing values with null
//           );

//           return {
//             name: `${item.name}=>(${item.datasetName})`,
//             type: item.type,
//             data: data,
//           };
//         }

//         return {
//           name: `${item.name}=>(${item.datasetName})`,
//           type: item.type,
//           data: groupedSeriesData,
//         };
//       });

//       updatedOptions = {
//         ...updatedOptions,
//         formValues: values,
//         options: {
//           ...updatedOptions.options,
//           xaxis: {
//             ...updatedOptions.options.xaxis,
//             categories: categories,
//           },
//           series: series,
//         },
//       };
//       break;
//     case "treemap":
//       const treeMapData = getAxisData(values.x, "no", "").map((m, index) => {
//         return {
//           x: m,
//           y: getAxisData(values.y, "no", "")[index]
//         }
//       })

//       updatedOptions = {
//         ...updatedOptions,
//         formValues: values,
//         options: {
//           ...updatedOptions.options,
//           series: [
//             {
//               data: [...treeMapData],
//             },
//           ],
//         },
//       };
//       break;
//     case "pie":
//     case "donut":
//     case "radialBar":
//       const labels2 =
//         values.groupBy === "yes"
//           ? getAxisData(values.category, "yes", values.aggregateFunction).map(
//             (group) => group.group
//           )
//           : getAxisData(values.category);

//       // Process series
//       let series2 = [];
//       if (values.series && values.series.whereConditions) {
//         values.series.whereConditions = values.series.whereConditions.map(wh => {
//           return {
//             ...wh,
//             column: item.column
//           }
//         })
//       }

//       const groupedSeriesData =
//         values.groupBy === "yes"
//           ? getAxisData(values.series, "yes", values.aggregateFunction, values.series.whereConditions)
//           : getAxisData(values.series);

//       // Map series data to categories
//       if (values.groupBy === "yes") {
//         const dataMap = new Map(
//           groupedSeriesData.map((group) => [group.group, group.value])
//         );

//         const data = labels2.map((category) =>
//           dataMap.has(category) ? dataMap.get(category) : null // Fill missing values with null
//         );

//         series2 = data;
//       } else {
//         series2 = groupedSeriesData
//       }

//       updatedOptions = {
//         ...updatedOptions,
//         formValues: values,
//         options: {
//           ...updatedOptions.options,
//           labels: labels2,
//           series: series2,
//         },
//       };
//       break;
//     case "mixed":
//       const labels =
//         values.groupBy === "yes"
//           ? getAxisData(values.category, "yes", values.aggregateFunction).map(
//             (group) => group.group
//           )
//           : getAxisData(values.category);

//       // Process series
//       const mixedSeries = values.series.map((item) => {
//         if (item.whereConditions) {
//           item.whereConditions = item.whereConditions.map(wh => {
//             return {
//               ...wh,
//               column: item.column
//             }
//           })
//         }

//         const groupedSeriesData =
//           values.groupBy === "yes"
//             ? getAxisData(item, "yes", values.aggregateFunction, item.whereConditions)
//             : getAxisData(item);

//         // Map series data to categories
//         if (values.groupBy === "yes") {
//           const dataMap = new Map(
//             groupedSeriesData.map((group) => [group.group, group.value])
//           );

//           const data = labels.map((category) =>
//             dataMap.has(category) ? dataMap.get(category) : null // Fill missing values with null
//           );

//           return {
//             name: `${item.name}=>(${item.datasetName})`,
//             type: item.type,
//             data: data,
//           };
//         }
//         return {
//           name: `${item.name}=>(${item.datasetName})`,
//           type: item.type,
//           data: data,
//         };
//       });

//       updatedOptions = {
//         ...updatedOptions,
//         options: {
//           ...updatedOptions.options,
//           labels: labels,
//           series: mixedSeries,
//         },
//       };

//       break;
//     default:
//       console.warn("Unsupported chart type:", updatedOptions.chartType);
//       break;
//   }
//   // Update chart options state
//   onUpdateChartOptions(updatedOptions);
// };
