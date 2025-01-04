import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { TextField, MenuItem, Box, Chip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faPlus, faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./dashboard.scss";
import Logo from "../../assets/svg/Header.svg";
import Workspace from "../../assets/svg/workspace.svg";
import USER from "../../assets/svg/UP.svg";
import DS from "../../assets/svg/DS.svg";
import Dataset from "../../assets/svg/dataset.svg";
import Bell from "../../assets/svg/bell.svg";
import Pen from "../../assets/svg/pen.svg";
import S1 from "../../assets/svg/s1.svg";
import S2 from "../../assets/svg/s2.svg";
import S3 from "../../assets/svg/s3.svg";
import S4 from "../../assets/svg/s4.svg";
import S5 from "../../assets/svg/s5.svg";
import S6 from "../../assets/svg/s6.svg";
import S7 from "../../assets/svg/s7.svg";
import L1 from "../../assets/svg/l1.svg";
import Ver from "../../assets/svg/Snap Horizontal.svg";
import Slider from "../../assets/svg/Expand Sidebar.svg";
import Rarrow from "../../assets/svg/rarrow.svg";
import C1 from "../../assets/svg/C1.svg";
import C2 from "../../assets/svg/C2.svg";
import C3 from "../../assets/svg/C3.svg";
import C4 from "../../assets/svg/C4.svg";
import C5 from "../../assets/svg/C5.svg";
import C6 from "../../assets/svg/C6.svg";
import CustomGrid from "../custom-grid";
import W1 from "../../assets/svg/W1.svg";
import W2 from "../../assets/svg/W2.svg";
import W3 from "../../assets/svg/W3.svg";
import Treemap from "../../assets/svg/treemap.svg";
import ScatterChart from "../../assets/svg/scatter-chart.svg";
import GanttChart from "../../assets/svg/gantt-chart.svg";
import BubbleChart from "../../assets/svg/bubble-chart.svg";
import Table from "../../assets/svg/table.svg";
import Typo from "../../assets/svg/typography.svg";
import GaugeChart from "../../assets/svg/gauge-chart.svg";
import BubbleChart3D from "../../assets/svg/3d-bubble-chart.svg";
import Piechart from "../../assets/svg/pie-chart.svg";
import SVB from "../../assets/svg/s-v-bar.svg";
import SHB from "../../assets/svg/stacked-h-bar.svg";
import SHBI from "../../assets/svg/SHB-I.svg";
import MC from "../../assets/svg/mixed-chart.svg";
import SVBI from "../../assets/svg/SVBI.svg";
import AC from "../../assets/svg/area-chart.svg";
import M1 from "../../assets/svg/m1.svg";
import M2 from "../../assets/svg/m2.svg";
import M3 from "../../assets/svg/m3.svg";
import M4 from "../../assets/svg/m4.svg";
import M5 from "../../assets/svg/m5.svg";
import M6 from "../../assets/svg/m6.svg";
import { getDatasets } from "../../actions/datasetActions";
import { connect } from "react-redux";
import debounce from "lodash/debounce";
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import {
  addDashboard,
  updateDashboard,
  saveDashboardChanges,
} from "../../actions/dashboardActions";
import { toast } from "react-toastify";
import { defaultChartOptions } from "../../data/chartData";
import { Debounce } from "react-lodash";

const Dashboard = ({
  children,
  onCreateGrid,
  onSelectChart,
  selectedChart,
  onDeleteChart,
  onUpdateChartOptions,
  handleShuffleCharts,
  selectedGridIndex,
  gridToMoveIndex,
  getDatasets,
  datasets,
  dashboard,
  updateDashboard,
  addDashboard,
  saveDashboardChanges,
  chartOptions,
}) => {
  const [activeTab, setActiveTab] = useState("Grids");
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [showChartList, setShowChartList] = useState(false);
  // const [chartOptions, setChartOptions] = useState({});
  const [selectedDatasets, setSelectedDatasets] = useState([]);
  const [columns, setColumns] = useState([]);
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [xAxisColumn, setXAxisColumn] = useState({});
  const [zAxisColumn, setZAxisColumn] = useState({});
  const [series, setSeries] = useState([]);
  const [yAxisColumn, setYAxisColumn] = useState({});
  const [dashboardName, setDashboardName] = useState("");
  const [selectedSeries, setSelectedSeries] = useState({});

  const handleSubmit = (values) => {
    let updatedOptions = { ...chartOptions };
    const getAxisData = (axisColumn) => {
      const dataset = selectedDatasets.find((dataset) =>
        dataset.dataSourceData.some((row) =>
          row.hasOwnProperty(axisColumn.column)
        )
      );

      if (dataset && dataset.dataSourceData) {
        return dataset.dataSourceData.map((row) => row[axisColumn.column]);
      }
      return [];
    };

    switch (updatedOptions.chartType) {
      case "bubblechart":
      case "bubblechart3d":
        const processedItems = values.datasets.map((item) => {
          const xAxisData = getAxisData(item.data.x);
          const yAxisData = getAxisData(item.data.y);
          const zAxisData = getAxisData(item.data.z);

          return {
            name: item.name,
            xData: xAxisData,
            yData: yAxisData,
            zData: zAxisData,
          };
        });
        const bubblechartData = processedItems.map((item) => ({
          name: item.name,
          data: item.xData.map((x, index) => ({
            x,
            y: item.yData[index],
            z: item.zData[index],
          })),
        }));

        updatedOptions = {
          ...updatedOptions,
          formValues: values,
          options: {
            ...updatedOptions.options,
            series: [
              ...bubblechartData
            ],
          },
        };
        break;
      case "line":
      case "bar":
      case "stackedhorizontalbar":
      case "100stackedhorizontalbarchart":
      case "stackedverticalbar":
      case "verticalbarchart":
      case "horizontalbarchart":
      case "100stackedverticalbarchart":
      case "area":
        const categories = getAxisData(values.category);
        const series = values.series.map((item) => {
          return {
            name: `${item.name}=>(${item.datasetName})`,
            type: item.type,
            data: getAxisData(item)
          }
        });

        updatedOptions = {
          ...updatedOptions,
          formValues: values,
          options: {
            ...updatedOptions.options,
            xaxis: {
              ...updatedOptions.options.xaxis,
              categories: categories,
            },
            series: series,
          },
        };
        break;
      case "treemap":
        const treeMapData = getAxisData(values.x).map((m, index) => {
          return {
            x: m,
            y: getAxisData(values.y)[index]
          }
        })
        updatedOptions = {
          ...updatedOptions,
          formValues: values,
          options: {
            ...updatedOptions.options,
            series: [
              {
                data: [...treeMapData],
              },
            ],
          },
        };
        break;
      case "pie":
      case "donut":
      case "radialBar":
        updatedOptions = {
          ...updatedOptions,
          formValues: values,
          options: {
            ...updatedOptions.options,
            labels: getAxisData(values.category),
            series: getAxisData(values.series),
          },
        };
        break;
      default:
        console.warn("Unsupported chart type:", updatedOptions.chartType);
        break;
    }
    // Update chart options state
    onUpdateChartOptions(updatedOptions);
  };


  const handleDashboardName = async (value) => {
    setDashboardName(value);
  };

  const seriesOptions = columns.flatMap((col) =>
    col.columns.map((columnName) => ({
      value: JSON.stringify({
        column: columnName,
        datasetName: col.datasetName,
      }),
      label: `${col.datasetName}: ${columnName}`,
    }))
  );

  const categoriesOptions = columns.flatMap((col) =>
    col.columns.map((columnName) => ({
      value: JSON.stringify({
        column: columnName,
        datasetName: col.datasetName,
      }),
      label: `${col.datasetName}: ${columnName}`,
    }))
  );

  const handleCreateDashboard = () => {
    navigate("/create-dashboard-modals");
  };

  const handleSeriesChange = (e) => {
    const selectedValue = e.value
    const { column, datasetName } = JSON.parse(selectedValue);
    setSelectedSeries({ column, datasetName });
  };

  const addSeries = () => {
    if (
      selectedSeries &&
      !series.some((cat) => cat.columnName === selectedSeries.column)
    ) {
      setSeries((prevSeries) => [
        ...prevSeries,
        {
          columnName: selectedSeries.column,
          datasetName: selectedSeries.datasetName,
        },
      ]);
    }
    // setSelectedSeries(null);
  };

  const deleteSeries = (columnName) => {
    if (columnName) {
      setSeries((prevSeries) =>
        prevSeries.filter((s) => s.columnName !== columnName.split("=>")[0].trim())
      );
    }
  };

  const updateSeriesType = (index, newType) => {
    const updatedSeries = series.map((s, i) =>
      i === index ? { ...s, type: newType } : s
    );
    setSeries(updatedSeries); // Update the series state
  };

  const handleXAxisChange = (e) => {
    const selectedValue = e.value;
    const { column, datasetName } = JSON.parse(selectedValue);
    setXAxisColumn({ column, datasetName });
  };

  const handleCategories = (e) => {
    const selectedValue = e.value;
    const { column, datasetName } = JSON.parse(selectedValue);
    setXAxisColumn({ column, datasetName });
  };

  // Handle Y-Axis Column Selection
  const handleYAxisChange = (e) => {
    const selectedValue = e.value;
    const { column, datasetName } = JSON.parse(selectedValue);
    setYAxisColumn({ column, datasetName });
  };

  const handleChange = (event) => {
    const items = event.target.value;
    setSelectedDatasets(items);
    const newColumns = items
      .map((item) => {
        if (item && item.dataSourceData && item.dataSourceData.length > 0) {
          const firstItem = item.dataSourceData[0];
          if (firstItem) {
            return {
              datasetName: item.datasetTitle,
              datasetId: firstItem.datasetId,
              columns: Object.keys(firstItem),
            };
          }
        }
        return null;
      })
      .filter((obj) => obj !== null);
    setColumns(newColumns);
  };


  useEffect(() => {
    if (!xAxisColumn || !yAxisColumn) return;
    // Find the dataset corresponding to the selected x-axis column
    const xDataset = selectedDatasets.find((dataset) =>
      dataset.dataSourceData.some((row) =>
        row.hasOwnProperty(xAxisColumn.column)
      )
    );


    // Extract x-axis data (categories)
    let xAxisData = [];
    if (xDataset && xDataset.dataSourceData) {
      xAxisData = xDataset.dataSourceData.map(
        (row) => row[xAxisColumn.column]
      );
    }

    // Generate series data
    const seriesData = series
      .map((seriesItem) => {
        const dataset = selectedDatasets.find(
          (ds) => ds.datasetTitle === seriesItem.datasetName
        );

        if (dataset) {
          const data = xAxisData.map((category) => {
            const row = dataset.dataSourceData.find(
              (r) => r[xAxisColumn.column] === category
            );
            return row ? row[seriesItem.columnName] : null;
          });

          return {
            name: `${seriesItem.columnName}=>(${seriesItem.datasetName})`,
            type: seriesItem.type,
            data,
          };
        }
        return null;
      })
      .filter(Boolean);

    // Find the dataset corresponding to the selected y-axis column
    const yDataset = selectedDatasets.find((dataset) =>
      dataset.dataSourceData.some((row) =>
        row.hasOwnProperty(yAxisColumn.column)
      )
    );

    // Extract y-axis data
    let yAxisData = [];
    if (yDataset && yDataset.dataSourceData) {
      yAxisData = yDataset.dataSourceData.map(
        (row) => row[yAxisColumn.column]
      );
    }

    // Configure chart options
    let updatedOptions = { ...chartOptions };

    switch (updatedOptions.chartType) {
      case "pie":
      case "donut":
      case "radialBar":
        updatedOptions = {
          ...updatedOptions,
          options: {
            ...updatedOptions.options,
            labels: xAxisData,
            series: yAxisData,
          },
        };
        break;
      case "treemap":
        const treeMapData = xAxisData.map((x, index) => ({
          x,
          y: yAxisData[index],
        }));
        updatedOptions = {
          ...updatedOptions,
          options: {
            ...updatedOptions.options,
            series: [
              {
                data: [...treeMapData],
              },
            ],
          },
        };
        break;
      case "bubblechart":
        const bubblechart = xAxisData.map((x, index) => ({
          x,
          y: yAxisData[index],
          z: yAxisData[index],
        }));
        updatedOptions = {
          ...updatedOptions,
          options: {
            ...updatedOptions.options,
            series: [
              {
                data: [...bubblechart],
              },
            ],
          },
        };
        break;
      case "mixed":
        updatedOptions = {
          ...updatedOptions,
          options: {
            ...updatedOptions.options,
            labels: xAxisData,
            series: seriesData,
          },
        };
        break;
      case "scatter":
        const scatterData = xAxisData.map((x, index) => ({
          x,
          y: yAxisData[index],
        }));

        updatedOptions = {
          ...updatedOptions,
          options: {
            ...updatedOptions.options,
            series: [
              {
                name: `${yAxisColumn.column} vs ${xAxisColumn.column}`,
                data: scatterData,
              },
            ],
          },
        };
        break;
      case "radialBar":
        updatedOptions = {
          ...updatedOptions,
          options: {
            ...updatedOptions.options,
            labels: [...xAxisData],
            series: [...yAxisData],
          },
        };
        break;
      case "line":
      case "bar":
      case "stackedhorizontalbar":
      case "100stackedhorizontalbarchart":
      case "stackedverticalbar":
      case "verticalbarchart":
      case "horizontalbarchart":
      case "100stackedverticalbarchart":
      case "area":
        updatedOptions = {
          ...updatedOptions,
          options: {
            ...updatedOptions.options,
            xaxis: {
              ...updatedOptions.options.xaxis,
              categories: xAxisData, // Set categories for x-axis
            },
            series: seriesData, // Set dynamic series data
          },
        };
        break;
      default:
        console.warn("Unsupported chart type:", updatedOptions.chartType);
        break;
    }

    // Update chart options state
    onUpdateChartOptions(updatedOptions);
  }, [xAxisColumn, yAxisColumn, selectedDatasets, series]);

  const handleCreateDataset = () => {
    navigate("/create-dataset-I");
  };

  const handleSaveChart = async (event) => {
    try {
      // Prevent default form submission if applicable
      event?.preventDefault();

      // Validate the dashboard title
      if (!dashboardName || dashboardName.trim() === "") {
        toast.warn("Dashboard name is required!!");
        return;
      }
      // Create updated dashboard object
      const updatedDashboard = {
        ...dashboard,
        dashboardTitle: dashboardName,
      };

      // Determine whether to update or add
      if (dashboard && dashboard.dashboardId != null) {
        console.log("Updating dashboard...");
        await updateDashboard(updatedDashboard);
      } else {
        console.log("Adding new dashboard...");
        await addDashboard(updatedDashboard);
      }

      console.log("Dashboard saved successfully!");
    } catch (error) {
      console.error("Error saving the dashboard:", error);
    }
  };

  useEffect(() => {
    getDatasets();
  }, []);

  // Handle Selection of Charts
  const handleChartSelection = (chartName) => {
    onSelectChart(chartName);
    setShowChartList(false);
  };

  //  Delete Charts
  const handleDeleteChart = () => {
    onDeleteChart();
  };

  const handlePropertyChange = async (e) => {
    const { name, value } = e.target;

    // Clone the chartOptions object to avoid mutating the original state
    const updatedOptions = {
      ...chartOptions,
      properties: {
        ...chartOptions.properties,
        [name]: value,
      },
    };

    // Recursive function to search and update the key
    const searchAndUpdateKey = (obj, keyToFind, value) => {
      for (const key in obj) {
        if (key === keyToFind) {
          // Key found, update its value
          obj[key] = value;
          return true; // Exit after updating
        } else if (typeof obj[key] === "object" && obj[key] !== null) {
          // Recursively search in nested objects
          const found = searchAndUpdateKey(obj[key], keyToFind, value);
          if (found) return true; // Stop searching once key is found
        }
      }
      return false; // Key not found
    };

    // Handle deep update for nested properties like xaxis.title.text
    if (name.includes(".")) {
      const keys = name.split(".");
      const lastKey = keys.pop();
      let nestedObj = updatedOptions;

      // Navigate through nested keys to reach the target object
      for (const key of keys) {
        nestedObj = nestedObj[key] = nestedObj[key] || {};
      }
      // Update the nested property
      nestedObj[lastKey] = value;
    } else {
      // Start the recursive search and update if no dot notation is used
      const keyFound = searchAndUpdateKey(updatedOptions.options, name, value);

      if (!keyFound) {
        console.warn(`Key "${name}" not found in options.`);
      }
    }
    onUpdateChartOptions(updatedOptions);
  };

  // Render Charts
  const renderProperties = () => {
    const properties = chartOptions.properties || {};
    if (!chartOptions) return null;
    return (
      <div className="chart-properties">
        {/* Horizontal Bar Chart */}
        {selectedChart === "horizontalbarchart" && (
          <>
            {/* Title */}
            <label className="chart-properties-labels">
              Title:
              <input
                type="text"
                name="options.title.text"
                value={properties["options.title.text"] || ""}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Background-color */}
            <label className="chart-properties-labels">
              Background Color:
              <input
                type="color"
                name="background"
                value={properties.background || "#ffffff"}
                onChange={handlePropertyChange}
              />
            </label>

            {/* Bar Color */}
            <label className="chart-properties-labels">
              Bar Color:
              <input
                type="color"
                name="options.fill.colors"
                value={properties["options.fill.colors"] || "#008FFB"}
                onChange={handlePropertyChange}
              />
            </label>

            {/* Border-Radius */}
            <label className="chart-properties-labels">
              Border Radius:
              <input
                type="number"
                name="options.plotOptions.bar.borderRadius"
                value={properties["options.plotOptions.bar.borderRadius"] || 4}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Border-Radius-Applications */}
            <label className="chart-properties-labels">
              Border Radius Application:
              <select
                name="options.plotOptions.bar.borderRadiusApplication"
                value={
                  properties[
                  "options.plotOptions.bar.borderRadiusApplication"
                  ] || "end"
                }
                onChange={handlePropertyChange}
              >
                <option value="end">End</option>
                <option value="start">Start</option>
                <option value="both">Both</option>
              </select>
            </label>
            {/* Show-legends */}
            <label className="chart-properties-labels">
              Show Legend:
              <div>
                <label className="me-2">
                  <input
                    type="radio"
                    name="options.legend.show"
                    data-value={true} // Custom attribute to store the boolean
                    checked={properties["options.legend.show"] === true}
                    onChange={(e) =>
                      handlePropertyChange({
                        target: { name: e.target.name, value: e.target.dataset.value === "true" },
                      })
                    }
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="options.legend.show"
                    data-value={false} // Custom attribute to store the boolean
                    checked={properties["options.legend.show"] === false}
                    onChange={(e) =>
                      handlePropertyChange({
                        target: { name: e.target.name, value: e.target.dataset.value === "true" },
                      })
                    }
                  />
                  No
                </label>
              </div>
            </label>
            {/* Legend-position */}
            <label className="chart-properties-labels">
              Legend Position:
              <select
                name="options.legend.position"
                value={properties["options.legend.position"] || "top"}
                onChange={handlePropertyChange}
              >
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </label>
            {/* X-axis-Title */}
            <label className="chart-properties-labels">
              X-Axis Title:
              <input
                placeholder="Enter X-Axis title"
                type="text"
                name="options.xaxis.title.text"
                value={properties["options.xaxis.title.text"] || ""}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Y-axis-Title */}
            <label className="chart-properties-labels">
              Y-Axis Title:
              <input
                type="text"
                placeholder="Enter Y-Axis title"
                name="options.yaxis.title.text"
                value={properties["options.yaxis.title.text"] || ""}
                onChange={handlePropertyChange}
              />
            </label>
          </>
        )}
        {/* VERTICAL BAR CHART */}
        {selectedChart === "verticalbarchart" && (
          <>
            {/* Title */}
            <label className="chart-properties-labels">
              Title:
              <input
                type="text"
                name="options.title.text"
                value={properties["options.title.text"] || ""}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Background-color */}
            <label className="chart-properties-labels">
              Background Color:
              <input
                type="color"
                name="background"
                value={properties.background || "#ffffff"}
                onChange={handlePropertyChange}
              />
            </label>

            {/* Bar Color */}
            <label className="chart-properties-labels">
              Bar Color:
              <input
                type="color"
                name="options.fill.colors"
                value={properties["options.fill.colors"] || "#008FFB"}
                onChange={handlePropertyChange}
              />
            </label>

            {/* Border-Radius */}
            <label className="chart-properties-labels">
              Border Radius:
              <input
                type="number"
                name="options.plotOptions.bar.borderRadius"
                value={properties["options.plotOptions.bar.borderRadius"] || 4}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Border-Radius-Applications */}
            <label className="chart-properties-labels">
              Border Radius Application:
              <select
                name="options.plotOptions.bar.borderRadiusApplication"
                value={
                  properties[
                  "options.plotOptions.bar.borderRadiusApplication"
                  ] || "end"
                }
                onChange={handlePropertyChange}
              >
                <option value="end">End</option>
                <option value="start">Start</option>
                <option value="both">Both</option>
              </select>
            </label>
            {/* Show-legends */}
            <label className="chart-properties-labels">
              Show Legend:
              <div>
                <label className="me-2">
                  <input
                    type="radio"
                    name="options.legend.show"
                    data-value={true} // Custom attribute to store the boolean
                    checked={properties["options.legend.show"] === true}
                    onChange={(e) =>
                      handlePropertyChange({
                        target: { name: e.target.name, value: e.target.dataset.value === "true" },
                      })
                    }
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="options.legend.show"
                    data-value={false} // Custom attribute to store the boolean
                    checked={properties["options.legend.show"] === false}
                    onChange={(e) =>
                      handlePropertyChange({
                        target: { name: e.target.name, value: e.target.dataset.value === "true" },
                      })
                    }
                  />
                  No
                </label>
              </div>
            </label>
            {/* Legend-position */}
            <label className="chart-properties-labels">
              Legend Position:
              <select
                name="options.legend.position"
                value={properties["options.legend.position"] || "top"}
                onChange={handlePropertyChange}
              >
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </label>
            {/* X-axis-Title */}
            <label className="chart-properties-labels">
              X-Axis Title:
              <input
                placeholder="Enter X-Axis title"
                type="text"
                name="options.xaxis.title.text"
                value={properties["options.xaxis.title.text"] || ""}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Y-axis-Title */}
            <label className="chart-properties-labels">
              Y-Axis Title:
              <input
                type="text"
                placeholder="Enter Y-Axis title"
                name="options.yaxis.title.text"
                value={properties["options.yaxis.title.text"] || ""}
                onChange={handlePropertyChange}
              />
            </label>
          </>
        )}
        {/* STACKED Horizontal BAR CHART */}
        {selectedChart === "stackedhorizontalbar" && (
          <>
            {/* Title */}
            <label className="chart-properties-labels">
              Title:
              <input
                type="text"
                name="options.title.text"
                value={properties["options.title.text"] || ""}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Background-color */}
            <label className="chart-properties-labels">
              Background Color:
              <input
                type="color"
                name="options.chart.background"
                value={properties["options.chart.background"] || "#ffffff"}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Show-legends */}
            <label className="chart-properties-labels">
              Show Legend:
              <div>
                <label className="me-2">
                  <input
                    type="radio"
                    name="options.legend.show"
                    data-value={true} // Custom attribute to store the boolean
                    checked={properties["options.legend.show"] === true}
                    onChange={(e) =>
                      handlePropertyChange({
                        target: { name: e.target.name, value: e.target.dataset.value === "true" },
                      })
                    }
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="options.legend.show"
                    data-value={false} // Custom attribute to store the boolean
                    checked={properties["options.legend.show"] === false}
                    onChange={(e) =>
                      handlePropertyChange({
                        target: { name: e.target.name, value: e.target.dataset.value === "true" },
                      })
                    }
                  />
                  No
                </label>
              </div>
            </label>
            {/* Legend-position */}
            {/* <label className="chart-properties-labels">
              Legend Position:
              <select
                name="options.legend.position"
                value={properties["options.legend.position"] || "top"}
                onChange={handlePropertyChange}
              >
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </label> */}
            {/* X-axis-Title */}
            <label className="chart-properties-labels">
              X-Axis Title:
              <input
                type="text"
                name="options.xaxis.title.text"
                value={properties["options.xaxis.title.text"] || ""}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Y-axis-Title */}
            <label className="chart-properties-labels">
              Y-Axis Title:
              <input
                type="text"
                name="options.yaxis.title.text"
                value={properties["options.yaxis.title.text"] || ""}
                onChange={handlePropertyChange}
              />
            </label>
          </>
        )}
        {/* STACKED Vertical BAR CHART */}
        {selectedChart === "stackedverticalbar" && (
          <>
            {/* Title */}
            <label className="chart-properties-labels">
              Title:
              <input
                type="text"
                name="options.title.text"
                value={properties["options.title.text"] || ""}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Background-color */}
            <label className="chart-properties-labels">
              Background Color:
              <input
                type="color"
                name="options.chart.background"
                value={properties["options.chart.background"] || "#ffffff"}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Show-legends */}
            <label className="chart-properties-labels">
              Show Legend:
              <div>
                <label className="me-2">
                  <input
                    type="radio"
                    name="options.legend.show"
                    data-value={true} // Custom attribute to store the boolean
                    checked={properties["options.legend.show"] === true}
                    onChange={(e) =>
                      handlePropertyChange({
                        target: { name: e.target.name, value: e.target.dataset.value === "true" },
                      })
                    }
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="options.legend.show"
                    data-value={false} // Custom attribute to store the boolean
                    checked={properties["options.legend.show"] === false}
                    onChange={(e) =>
                      handlePropertyChange({
                        target: { name: e.target.name, value: e.target.dataset.value === "true" },
                      })
                    }
                  />
                  No
                </label>
              </div>
            </label>
            {/* Legend-position */}
            <label className="chart-properties-labels">
              Legend Position:
              <select
                name="options.legend.position"
                value={properties["options.legend.position"] || "top"}
                onChange={handlePropertyChange}
              >
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </label>
            {/* X-axis-Title */}
            <label className="chart-properties-labels">
              X-Axis Title:
              <input
                type="text"
                name="options.xaxis.title.text"
                value={properties["options.xaxis.title.text"] || ""}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Y-axis-Title */}
            <label className="chart-properties-labels">
              Y-Axis Title:
              <input
                type="text"
                name="options.yaxis.title.text"
                value={properties["options.yaxis.title.text"] || ""}
                onChange={handlePropertyChange}
              />
            </label>
          </>
        )}
        {/* STACKED Horizontal BAR CHART I */}
        {selectedChart === "100stackedhorizontalbarchart" && (
          <>
            {/* Title */}
            <label className="chart-properties-labels">
              Title:
              <input
                type="text"
                name="options.title.text"
                value={properties["options.title.text"] || ""}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Background-color */}
            <label className="chart-properties-labels">
              Background Color:
              <input
                type="color"
                name="options.chart.background"
                value={properties["options.chart.background"] || "#ffffff"}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Show-legends */}
            <label className="chart-properties-labels">
              Show Legend:
              <div>
                <label className="me-2">
                  <input
                    type="radio"
                    name="options.legend.show"
                    data-value={true} // Custom attribute to store the boolean
                    checked={properties["options.legend.show"] === true}
                    onChange={(e) =>
                      handlePropertyChange({
                        target: { name: e.target.name, value: e.target.dataset.value === "true" },
                      })
                    }
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="options.legend.show"
                    data-value={false} // Custom attribute to store the boolean
                    checked={properties["options.legend.show"] === false}
                    onChange={(e) =>
                      handlePropertyChange({
                        target: { name: e.target.name, value: e.target.dataset.value === "true" },
                      })
                    }
                  />
                  No
                </label>
              </div>
            </label>
            {/* Legend-position */}
            {/* <label className="chart-properties-labels">
              Legend Position:
              <select
                name="options.legend.position"
                value={properties["options.legend.position"] || "top"}
                onChange={handlePropertyChange}
              >
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </label> */}
            {/* X-axis-Title */}
            <label className="chart-properties-labels">
              X-Axis Title:
              <input
                type="text"
                name="options.xaxis.title.text"
                value={properties["options.xaxis.title.text"] || ""}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Y-axis-Title */}
            <label className="chart-properties-labels">
              Y-Axis Title:
              <input
                type="text"
                name="options.yaxis.title.text"
                value={properties["options.yaxis.title.text"] || ""}
                onChange={handlePropertyChange}
              />
            </label>
          </>
        )}
        {/* STACKED Vertical BAR CHART I */}
        {selectedChart === "100stackedverticalbarchart" && (
          <>
            {/* Title */}
            <label className="chart-properties-labels">
              Title:
              <input
                type="text"
                name="options.title.text"
                value={properties["options.title.text"] || ""}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Background-color */}
            <label className="chart-properties-labels">
              Background Color:
              <input
                type="color"
                name="options.chart.background"
                value={properties["options.chart.background"] || "#ffffff"}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Show-legends */}
            <label className="chart-properties-labels">
              Show Legend:
              <div>
                <label className="me-2">
                  <input
                    type="radio"
                    name="options.legend.show"
                    data-value={true} // Custom attribute to store the boolean
                    checked={properties["options.legend.show"] === true}
                    onChange={(e) =>
                      handlePropertyChange({
                        target: { name: e.target.name, value: e.target.dataset.value === "true" },
                      })
                    }
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="options.legend.show"
                    data-value={false} // Custom attribute to store the boolean
                    checked={properties["options.legend.show"] === false}
                    onChange={(e) =>
                      handlePropertyChange({
                        target: { name: e.target.name, value: e.target.dataset.value === "true" },
                      })
                    }
                  />
                  No
                </label>
              </div>
            </label>
            {/* Legend-position */}
            {/* <label className="chart-properties-labels">
            Legend Position:
            <select
              name="options.legend.position"
              value={properties["options.legend.position"] || "top"}
              onChange={handlePropertyChange}
            >
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </label> */}
            {/* X-axis-Title */}
            <label className="chart-properties-labels">
              X-Axis Title:
              <input
                type="text"
                name="options.xaxis.title.text"
                value={properties["options.xaxis.title.text"] || ""}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Y-axis-Title */}
            <label className="chart-properties-labels">
              Y-Axis Title:
              <input
                type="text"
                name="options.yaxis.title.text"
                value={properties["options.yaxis.title.text"] || ""}
                onChange={handlePropertyChange}
              />
            </label>
          </>
        )}
        {/* PIE CHART */}
        {selectedChart === "pie" && (
          <>
            {/* Title */}
            <label className="chart-properties-labels">
              Title:
              <input
                type="text"
                name="options.title.text"
                value={properties["options.title.text"] || ""}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Background-color */}
            <label className="chart-properties-labels">
              Background Color:
              <input
                type="color"
                name="options.chart.background"
                value={properties["options.chart.background"] || "#ffffff"}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Legend-position */}
            <label className="chart-properties-labels">
              Legend Position:
              <select
                name="options.responsive.legend.position"
                value={
                  properties["options.responsive.legend.position"] || "bottom"
                }
                onChange={handlePropertyChange}
              >
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </label>
          </>
        )}
        {/* Donut CHART */}
        {selectedChart === "donut" && (
          <>
            {/* Title */}
            <label className="chart-properties-labels">
              Title:
              <input
                type="text"
                name="options.title.text"
                value={properties["options.title.text"] || ""}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Background-color */}
            <label className="chart-properties-labels">
              Background Color:
              <input
                type="color"
                name="options.chart.background"
                value={properties["options.chart.background"] || "#ffffff"}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Legend-position */}
            <label className="chart-properties-labels">
              Legend Position:
              <select
                name="options.responsive.options.legend"
                value={
                  properties["options.responsive.options.legend"] || "bottom"
                }
                onChange={handlePropertyChange}
              >
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </label>
          </>
        )}
        {/* Line Chart */}
        {selectedChart === "line" && (
          <>
            {/* Title */}
            <label className="chart-properties-labels">
              Title:
              <input
                type="text"
                name="options.title.text"
                value={properties["options.title.text"]}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Background-color */}
            <label className="chart-properties-labels">
              Background Color:
              <input
                type="color"
                name="background"
                value={properties.background || "#ffffff"}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Line Color */}
            <label className="chart-properties-labels">
              Line Color:
              <input
                type="color"
                name="options.stroke.colors"
                value={properties["options.stroke.colors"] || ["#008FFB"]}
                onChange={handlePropertyChange}
              />
            </label>
            {/* X-axis */}
            <label className="chart-properties-labels">
              X-Axis Title:
              <input
                type="text"
                name="options.xaxis.title.text"
                value={properties["options.xaxis.title.text"] || ""}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Y-axis */}
            <label className="chart-properties-labels">
              Y-Axis Title:
              <input
                type="text"
                name="options.yaxis.title.text"
                value={properties["options.yaxis.title.text"] || ""}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Show-Legends */}
            <label className="chart-properties-labels">
              Show Legend:
              <div>
                <label className="me-2">
                  <input
                    type="radio"
                    name="options.legend.show"
                    data-value={true} // Custom attribute to store the boolean
                    checked={properties["options.legend.show"] === true}
                    onChange={(e) =>
                      handlePropertyChange({
                        target: { name: e.target.name, value: e.target.dataset.value === "true" },
                      })
                    }
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="options.legend.show"
                    data-value={false} // Custom attribute to store the boolean
                    checked={properties["options.legend.show"] === false}
                    onChange={(e) =>
                      handlePropertyChange({
                        target: { name: e.target.name, value: e.target.dataset.value === "true" },
                      })
                    }
                  />
                  No
                </label>
              </div>
            </label>
            {/* Legend-Position */}
            <label className="chart-properties-labels">
              Legend Position:
              <select
                name="options.legend.position"
                value={properties["options.legend.position"] || "bottom"}
                onChange={handlePropertyChange}
              >
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </label>
          </>
        )}
        {selectedChart === "area" && (
          <>
            {/* Title */}
            <label className="chart-properties-labels">
              Title:
              <input
                type="text"
                name="options.title.text"
                value={properties["options.title.text"] || ""}
                onChange={handlePropertyChange}
              />
            </label>

            {/* Background Color */}
            <label className="chart-properties-labels">
              Background Color:
              <input
                type="color"
                name="options.chart.background"
                value={properties["options.chart.background"] || "#ffffff"}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Line Colors */}
            {/* <label className="chart-properties-labels">
              Line Colors:
              <input
                type="color"
                name="lineColors1"
                value={
                  properties.lineColors ? properties.lineColors[0] : "#008FFB"
                }
                onChange={(e) =>
                  handlePropertyChange({
                    target: {
                      name: "lineColors",
                      value: [
                        e.target.value,
                        properties.lineColors
                          ? properties.lineColors[1]
                          : "#FF4560",
                      ],
                    },
                  })
                }
              />
              <input
                type="color"
                name="lineColors2"
                value={
                  properties.lineColors ? properties.lineColors[1] : "#FF4560"
                }
                onChange={(e) =>
                  handlePropertyChange({
                    target: {
                      name: "lineColors",
                      value: [
                        properties.lineColors
                          ? properties.lineColors[0]
                          : "#008FFB",
                        e.target.value,
                      ],
                    },
                  })
                }
              />
            </label> */}
            {/* X-axis Title */}
            <label className="chart-properties-labels">
              X-Axis Title:
              <input
                type="text"
                name="options.xaxis.title.text"
                value={properties["options.xaxis.title.text"] || ""}
                onChange={handlePropertyChange}
              />
            </label>

            {/* Y-axis Title */}
            <label className="chart-properties-labels">
              Y-Axis Title:
              <input
                type="text"
                name="options.yaxis.title.text"
                value={properties["options.yaxis.title.text"] || ""}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Show Legend */}
            <label className="chart-properties-labels">
              Show Legend:
              <div>
                <label className="me-2">
                  <input
                    type="radio"
                    name="options.legend.show"
                    data-value={true} // Custom attribute to store the boolean
                    checked={properties["options.legend.show"] === true}
                    onChange={(e) =>
                      handlePropertyChange({
                        target: { name: e.target.name, value: e.target.dataset.value === "true" },
                      })
                    }
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="options.legend.show"
                    data-value={false} // Custom attribute to store the boolean
                    checked={properties["options.legend.show"] === false}
                    onChange={(e) =>
                      handlePropertyChange({
                        target: { name: e.target.name, value: e.target.dataset.value === "true" },
                      })
                    }
                  />
                  No
                </label>
              </div>
            </label>
            {/* Legend Position */}
            <label className="chart-properties-labels">
              Legend Position:
              <select
                name="options.legend.show"
                value={properties["options.legend.show"] || "bottom"}
                onChange={handlePropertyChange}
              >
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </label>
          </>
        )}
        {/* Scatter Chart */}
        {selectedChart === "scatter" && (
          <>
            {/* Title */}
            <label className="chart-properties-labels">
              Title:
              <input
                type="text"
                name="options.title.text"
                value={properties["options.title.text"] || ""}
                onChange={handlePropertyChange}
              />
            </label>

            {/* Background Color */}
            <label className="chart-properties-labels">
              Background Color:
              <input
                type="color"
                name="options.chart.background"
                value={properties["options.chart.background"] || "#ffffff"}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Scatter Colors */}
            {/* <label className="chart-properties-labels">
              Scatter Colors:
              <input
                type="color"
                name="scatterColors1"
                value={
                  properties.scatterColors
                    ? properties.scatterColors[0]
                    : "#008FFB"
                }
                onChange={(e) =>
                  handlePropertyChange({
                    target: {
                      name: "scatterColors",
                      value: [
                        e.target.value,
                        properties.scatterColors
                          ? properties.scatterColors[1]
                          : "#FF4560",
                        properties.scatterColors
                          ? properties.scatterColors[2]
                          : "#00E396",
                      ],
                    },
                  })
                }
              />
              <input
                type="color"
                name="scatterColors2"
                value={
                  properties.scatterColors
                    ? properties.scatterColors[1]
                    : "#FF4560"
                }
                onChange={(e) =>
                  handlePropertyChange({
                    target: {
                      name: "scatterColors",
                      value: [
                        properties.scatterColors
                          ? properties.scatterColors[0]
                          : "#008FFB",
                        e.target.value,
                        properties.scatterColors
                          ? properties.scatterColors[2]
                          : "#00E396",
                      ],
                    },
                  })
                }
              />
              <input
                type="color"
                name="scatterColors3"
                value={
                  properties.scatterColors
                    ? properties.scatterColors[2]
                    : "#00E396"
                }
                onChange={(e) =>
                  handlePropertyChange({
                    target: {
                      name: "scatterColors",
                      value: [
                        properties.scatterColors
                          ? properties.scatterColors[0]
                          : "#008FFB",
                        properties.scatterColors
                          ? properties.scatterColors[1]
                          : "#FF4560",
                        e.target.value,
                      ],
                    },
                  })
                }
              />
            </label> */}

            {/* X-axis Title */}
            <label className="chart-properties-labels">
              X-Axis Title:
              <input
                type="text"
                name="options.xaxis.title.text"
                value={properties["options.xaxis.title.text"] || ""}
                onChange={handlePropertyChange}
              />
            </label>

            {/* Y-axis Title */}
            <label className="chart-properties-labels">
              Y-Axis Title:
              <input
                type="text"
                name="options.yaxis.title.text"
                value={properties["options.yaxis.title.text"] || ""}
                onChange={handlePropertyChange}
              />
            </label>

            {/* Show Legend */}
            <label className="chart-properties-labels">
              Show Legend:
              <div>
                <label className="me-2">
                  <input
                    type="radio"
                    name="options.legend.show"
                    data-value={true} // Custom attribute to store the boolean
                    checked={properties["options.legend.show"] === true}
                    onChange={(e) =>
                      handlePropertyChange({
                        target: { name: e.target.name, value: e.target.dataset.value === "true" },
                      })
                    }
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="options.legend.show"
                    data-value={false} // Custom attribute to store the boolean
                    checked={properties["options.legend.show"] === false}
                    onChange={(e) =>
                      handlePropertyChange({
                        target: { name: e.target.name, value: e.target.dataset.value === "true" },
                      })
                    }
                  />
                  No
                </label>
              </div>
            </label>

            {/* Legend Position */}
            <label className="chart-properties-labels">
              Legend Position:
              <select
                name="options.legend.position"
                value={properties["options.legend.position"] || "bottom"}
                onChange={handlePropertyChange}
              >
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </label>
          </>
        )}
        {/* Bubble Chart */}
        {selectedChart === "bubblechart" && (
          <>
            {/* Title */}
            <label className="chart-properties-labels">
              Title:
              <input
                type="text"
                name="title"
                value={properties.title || ""}
                onChange={handlePropertyChange}
              />
            </label>

            {/* Background Color */}
            <label className="chart-properties-labels">
              Background Color:
              <input
                type="color"
                name="backgroundColor"
                value={properties.backgroundColor || "#ffffff"}
                onChange={handlePropertyChange}
              />
            </label>

            {/* Bubble Colors */}
            <label className="chart-properties-labels">
              Bubble Colors:
              <input
                type="color"
                name="bubbleColors1"
                value={
                  properties.bubbleColors
                    ? properties.bubbleColors[0]
                    : "#008FFB"
                }
                onChange={(e) =>
                  handlePropertyChange({
                    target: {
                      name: "bubbleColors",
                      value: [
                        e.target.value,
                        properties.bubbleColors
                          ? properties.bubbleColors[1]
                          : "#FF4560",
                        properties.bubbleColors
                          ? properties.bubbleColors[2]
                          : "#00E396",
                        properties.bubbleColors
                          ? properties.bubbleColors[3]
                          : "#775DD0",
                      ],
                    },
                  })
                }
              />
              <input
                type="color"
                name="bubbleColors2"
                value={
                  properties.bubbleColors
                    ? properties.bubbleColors[1]
                    : "#FF4560"
                }
                onChange={(e) =>
                  handlePropertyChange({
                    target: {
                      name: "bubbleColors",
                      value: [
                        properties.bubbleColors
                          ? properties.bubbleColors[0]
                          : "#008FFB",
                        e.target.value,
                        properties.bubbleColors
                          ? properties.bubbleColors[2]
                          : "#00E396",
                        properties.bubbleColors
                          ? properties.bubbleColors[3]
                          : "#775DD0",
                      ],
                    },
                  })
                }
              />
              <input
                type="color"
                name="bubbleColors3"
                value={
                  properties.bubbleColors
                    ? properties.bubbleColors[2]
                    : "#00E396"
                }
                onChange={(e) =>
                  handlePropertyChange({
                    target: {
                      name: "bubbleColors",
                      value: [
                        properties.bubbleColors
                          ? properties.bubbleColors[0]
                          : "#008FFB",
                        properties.bubbleColors
                          ? properties.bubbleColors[1]
                          : "#FF4560",
                        e.target.value,
                        properties.bubbleColors
                          ? properties.bubbleColors[3]
                          : "#775DD0",
                      ],
                    },
                  })
                }
              />
              <input
                type="color"
                name="bubbleColors4"
                value={
                  properties.bubbleColors
                    ? properties.bubbleColors[3]
                    : "#775DD0"
                }
                onChange={(e) =>
                  handlePropertyChange({
                    target: {
                      name: "bubbleColors",
                      value: [
                        properties.bubbleColors
                          ? properties.bubbleColors[0]
                          : "#008FFB",
                        properties.bubbleColors
                          ? properties.bubbleColors[1]
                          : "#FF4560",
                        properties.bubbleColors
                          ? properties.bubbleColors[2]
                          : "#00E396",
                        e.target.value,
                      ],
                    },
                  })
                }
              />
            </label>

            {/* X-axis Title */}
            <label className="chart-properties-labels">
              X-Axis Title:
              <input
                type="text"
                name="xaxisTitle"
                value={properties.xaxisTitle || ""}
                onChange={handlePropertyChange}
              />
            </label>

            {/* Y-axis Title */}
            <label className="chart-properties-labels">
              Y-Axis Title:
              <input
                type="text"
                name="yaxisTitle"
                value={properties.yaxisTitle || ""}
                onChange={handlePropertyChange}
              />
            </label>

            {/* Max Y-axis */}
            <label className="chart-properties-labels">
              Max Y-Axis:
              <input
                type="number"
                name="maxYAxis"
                value={properties.maxYAxis || 70}
                onChange={handlePropertyChange}
              />
            </label>

            {/* Show Legend */}
            <label className="chart-properties-labels">
              Show Legend:
              <div>
                <label className="me-2">
                  <input
                    type="radio"
                    name="options.legend.show"
                    data-value={true} // Custom attribute to store the boolean
                    checked={properties["options.legend.show"] === true}
                    onChange={(e) =>
                      handlePropertyChange({
                        target: { name: e.target.name, value: e.target.dataset.value === "true" },
                      })
                    }
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="options.legend.show"
                    data-value={false} // Custom attribute to store the boolean
                    checked={properties["options.legend.show"] === false}
                    onChange={(e) =>
                      handlePropertyChange({
                        target: { name: e.target.name, value: e.target.dataset.value === "true" },
                      })
                    }
                  />
                  No
                </label>
              </div>
            </label>

            {/* Legend Position */}
            <label className="chart-properties-labels">
              Legend Position:
              <select
                name="legendPosition"
                value={properties.legendPosition || "bottom"}
                onChange={handlePropertyChange}
              >
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </label>
          </>
        )}
        {/* 3D Bubble Chart */}
        {selectedChart === "bubblechart3d" && (
          <>
            {/* Title */}
            <label className="chart-properties-labels">
              Title:
              <input
                type="text"
                name="title"
                value={properties.title || ""}
                onChange={handlePropertyChange}
              />
            </label>

            {/* Background Color */}
            <label className="chart-properties-labels">
              Background Color:
              <input
                type="color"
                name="backgroundColor"
                value={properties.backgroundColor || "#ffffff"}
                onChange={handlePropertyChange}
              />
            </label>

            {/* Bubble Colors */}
            <label className="chart-properties-labels">
              Bubble Colors:
              <input
                type="color"
                name="bubbleColors1"
                value={
                  properties.bubbleColors
                    ? properties.bubbleColors[0]
                    : "#008FFB"
                }
                onChange={(e) =>
                  handlePropertyChange({
                    target: {
                      name: "bubbleColors",
                      value: [
                        e.target.value,
                        properties.bubbleColors
                          ? properties.bubbleColors[1]
                          : "#FF4560",
                        properties.bubbleColors
                          ? properties.bubbleColors[2]
                          : "#00E396",
                        properties.bubbleColors
                          ? properties.bubbleColors[3]
                          : "#775DD0",
                      ],
                    },
                  })
                }
              />
              <input
                type="color"
                name="bubbleColors2"
                value={
                  properties.bubbleColors
                    ? properties.bubbleColors[1]
                    : "#FF4560"
                }
                onChange={(e) =>
                  handlePropertyChange({
                    target: {
                      name: "bubbleColors",
                      value: [
                        properties.bubbleColors
                          ? properties.bubbleColors[0]
                          : "#008FFB",
                        e.target.value,
                        properties.bubbleColors
                          ? properties.bubbleColors[2]
                          : "#00E396",
                        properties.bubbleColors
                          ? properties.bubbleColors[3]
                          : "#775DD0",
                      ],
                    },
                  })
                }
              />
              <input
                type="color"
                name="bubbleColors3"
                value={
                  properties.bubbleColors
                    ? properties.bubbleColors[2]
                    : "#00E396"
                }
                onChange={(e) =>
                  handlePropertyChange({
                    target: {
                      name: "bubbleColors",
                      value: [
                        properties.bubbleColors
                          ? properties.bubbleColors[0]
                          : "#008FFB",
                        properties.bubbleColors
                          ? properties.bubbleColors[1]
                          : "#FF4560",
                        e.target.value,
                        properties.bubbleColors
                          ? properties.bubbleColors[3]
                          : "#775DD0",
                      ],
                    },
                  })
                }
              />
              <input
                type="color"
                name="bubbleColors4"
                value={
                  properties.bubbleColors
                    ? properties.bubbleColors[3]
                    : "#775DD0"
                }
                onChange={(e) =>
                  handlePropertyChange({
                    target: {
                      name: "bubbleColors",
                      value: [
                        properties.bubbleColors
                          ? properties.bubbleColors[0]
                          : "#008FFB",
                        properties.bubbleColors
                          ? properties.bubbleColors[1]
                          : "#FF4560",
                        properties.bubbleColors
                          ? properties.bubbleColors[2]
                          : "#00E396",
                        e.target.value,
                      ],
                    },
                  })
                }
              />
            </label>

            {/* X-axis Title */}
            <label className="chart-properties-labels">
              X-Axis Title:
              <input
                type="text"
                name="xaxisTitle"
                value={properties.xaxisTitle || ""}
                onChange={handlePropertyChange}
              />
            </label>

            {/* Y-axis Title */}
            <label className="chart-properties-labels">
              Y-Axis Title:
              <input
                type="text"
                name="yaxisTitle"
                value={properties.yaxisTitle || ""}
                onChange={handlePropertyChange}
              />
            </label>

            {/* Max Y-axis */}
            <label className="chart-properties-labels">
              Max Y-Axis:
              <input
                type="number"
                name="maxYAxis"
                value={properties.maxYAxis || 70}
                onChange={handlePropertyChange}
              />
            </label>

            {/* Show Legend */}
            <label className="chart-properties-labels">
              Show Legend:
              <div>
                <label className="me-2">
                  <input
                    type="radio"
                    name="options.legend.show"
                    data-value={true} // Custom attribute to store the boolean
                    checked={properties["options.legend.show"] === true}
                    onChange={(e) =>
                      handlePropertyChange({
                        target: { name: e.target.name, value: e.target.dataset.value === "true" },
                      })
                    }
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="options.legend.show"
                    data-value={false} // Custom attribute to store the boolean
                    checked={properties["options.legend.show"] === false}
                    onChange={(e) =>
                      handlePropertyChange({
                        target: { name: e.target.name, value: e.target.dataset.value === "true" },
                      })
                    }
                  />
                  No
                </label>
              </div>
            </label>

            {/* Legend Position */}
            <label className="chart-properties-labels">
              Legend Position:
              <select
                name="legendPosition"
                value={properties.legendPosition || "bottom"}
                onChange={handlePropertyChange}
              >
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </label>
          </>
        )}
        {selectedChart === "Gantt Chart" && (
          <>
            {/* Title */}
            <label className="chart-properties-labels">
              Title:
              <input
                type="text"
                name="title"
                value={properties.title || ""}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Background Color */}
            <label className="chart-properties-labels">
              Background Color:
              <input
                type="color"
                name="backgroundColor"
                value={properties.backgroundColor || "#ffffff"}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Bar Colors */}
            <label className="chart-properties-labels">
              Bar Colors:
              <input
                type="color"
                name="barColors1"
                value={
                  properties.barColors ? properties.barColors[0] : "#008FFB"
                }
                onChange={(e) =>
                  handlePropertyChange({
                    target: {
                      name: "barColors",
                      value: [
                        e.target.value,
                        properties.barColors
                          ? properties.barColors[1]
                          : "#00E396",
                        properties.barColors
                          ? properties.barColors[2]
                          : "#775DD0",
                        properties.barColors
                          ? properties.barColors[3]
                          : "#FEB019",
                        properties.barColors
                          ? properties.barColors[4]
                          : "#FF4560",
                      ],
                    },
                  })
                }
              />
              <input
                type="color"
                name="barColors2"
                value={
                  properties.barColors ? properties.barColors[1] : "#00E396"
                }
                onChange={(e) =>
                  handlePropertyChange({
                    target: {
                      name: "barColors",
                      value: [
                        properties.barColors
                          ? properties.barColors[0]
                          : "#008FFB",
                        e.target.value,
                        properties.barColors
                          ? properties.barColors[2]
                          : "#775DD0",
                        properties.barColors
                          ? properties.barColors[3]
                          : "#FEB019",
                        properties.barColors
                          ? properties.barColors[4]
                          : "#FF4560",
                      ],
                    },
                  })
                }
              />
              <input
                type="color"
                name="barColors3"
                value={
                  properties.barColors ? properties.barColors[2] : "#775DD0"
                }
                onChange={(e) =>
                  handlePropertyChange({
                    target: {
                      name: "barColors",
                      value: [
                        properties.barColors
                          ? properties.barColors[0]
                          : "#008FFB",
                        properties.barColors
                          ? properties.barColors[1]
                          : "#00E396",
                        e.target.value,
                        properties.barColors
                          ? properties.barColors[3]
                          : "#FEB019",
                        properties.barColors
                          ? properties.barColors[4]
                          : "#FF4560",
                      ],
                    },
                  })
                }
              />
              <input
                type="color"
                name="barColors4"
                value={
                  properties.barColors ? properties.barColors[3] : "#FEB019"
                }
                onChange={(e) =>
                  handlePropertyChange({
                    target: {
                      name: "barColors",
                      value: [
                        properties.barColors
                          ? properties.barColors[0]
                          : "#008FFB",
                        properties.barColors
                          ? properties.barColors[1]
                          : "#00E396",
                        properties.barColors
                          ? properties.barColors[2]
                          : "#775DD0",
                        e.target.value,
                        properties.barColors
                          ? properties.barColors[4]
                          : "#FF4560",
                      ],
                    },
                  })
                }
              />
              <input
                type="color"
                name="barColors5"
                value={
                  properties.barColors ? properties.barColors[4] : "#FF4560"
                }
                onChange={(e) =>
                  handlePropertyChange({
                    target: {
                      name: "barColors",
                      value: [
                        properties.barColors
                          ? properties.barColors[0]
                          : "#008FFB",
                        properties.barColors
                          ? properties.barColors[1]
                          : "#00E396",
                        properties.barColors
                          ? properties.barColors[2]
                          : "#775DD0",
                        properties.barColors
                          ? properties.barColors[3]
                          : "#FEB019",
                        e.target.value,
                      ],
                    },
                  })
                }
              />
            </label>
            {/* Border Radius */}
            <label className="chart-properties-labels">
              Border Radius:
              <input
                type="number"
                name="borderRadius"
                value={properties.borderRadius || 4}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Show Legend */}
            <label className="chart-properties-labels">
              Show Legend:
              <div>
                <label className="me-2">
                  <input
                    type="radio"
                    name="options.legend.show"
                    data-value={true} // Custom attribute to store the boolean
                    checked={properties["options.legend.show"] === true}
                    onChange={(e) =>
                      handlePropertyChange({
                        target: { name: e.target.name, value: e.target.dataset.value === "true" },
                      })
                    }
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="options.legend.show"
                    data-value={false} // Custom attribute to store the boolean
                    checked={properties["options.legend.show"] === false}
                    onChange={(e) =>
                      handlePropertyChange({
                        target: { name: e.target.name, value: e.target.dataset.value === "true" },
                      })
                    }
                  />
                  No
                </label>
              </div>
            </label>
            {/* Legend Position */}
            <label className="chart-properties-labels">
              Legend Position:
              <select
                name="legendPosition"
                value={properties.legendPosition || "bottom"}
                onChange={handlePropertyChange}
              >
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </label>
            {/* X-Axis Title */}
            <label className="chart-properties-labels">
              X-Axis Title:
              <input
                type="text"
                name="xaxisTitle"
                value={properties.xaxisTitle || "Dates"}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Y-Axis Title */}
            <label className="chart-properties-labels">
              Y-Axis Title:
              <input
                type="text"
                name="yaxisTitle"
                value={properties.yaxisTitle || "Tasks"}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Show Tooltip */}
            <label className="chart-properties-labels">
              Show Tooltip:
              <input
                type="checkbox"
                name="showTooltip"
                checked={properties.showTooltip || true}
                onChange={(e) =>
                  handlePropertyChange({
                    target: { name: "showTooltip", value: e.target.checked },
                  })
                }
              />
            </label>
          </>
        )}
        {/* TREEMAP CHART */}
        {selectedChart === "treemap" && (
          <>
            {/* Title */}
            <label className="chart-properties-labels">
              Title:
              <input
                type="text"
                name="options.title.text"
                value={properties["options.title.text"] || ""}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Bar Colors */}
            {/* <label className="chart-properties-labels">
              Bar Colors:
              <input
                type="color"
                name="barColors1"
                value={
                  properties.barColors ? properties.barColors[0] : "#008FFB"
                }
                onChange={(e) =>
                  handlePropertyChange({
                    target: {
                      name: "barColors",
                      value: [
                        e.target.value,
                        properties.barColors
                          ? properties.barColors[1]
                          : "#00E396",
                        properties.barColors
                          ? properties.barColors[2]
                          : "#775DD0",
                        properties.barColors
                          ? properties.barColors[3]
                          : "#FEB019",
                        properties.barColors
                          ? properties.barColors[4]
                          : "#FF4560",
                      ],
                    },
                  })
                }
              />
              <input
                type="color"
                name="barColors2"
                value={
                  properties.barColors ? properties.barColors[1] : "#00E396"
                }
                onChange={(e) =>
                  handlePropertyChange({
                    target: {
                      name: "barColors",
                      value: [
                        properties.barColors
                          ? properties.barColors[0]
                          : "#008FFB",
                        e.target.value,
                        properties.barColors
                          ? properties.barColors[2]
                          : "#775DD0",
                        properties.barColors
                          ? properties.barColors[3]
                          : "#FEB019",
                        properties.barColors
                          ? properties.barColors[4]
                          : "#FF4560",
                      ],
                    },
                  })
                }
              />
              <input
                type="color"
                name="barColors3"
                value={
                  properties.barColors ? properties.barColors[2] : "#775DD0"
                }
                onChange={(e) =>
                  handlePropertyChange({
                    target: {
                      name: "barColors",
                      value: [
                        properties.barColors
                          ? properties.barColors[0]
                          : "#008FFB",
                        properties.barColors
                          ? properties.barColors[1]
                          : "#00E396",
                        e.target.value,
                        properties.barColors
                          ? properties.barColors[3]
                          : "#FEB019",
                        properties.barColors
                          ? properties.barColors[4]
                          : "#FF4560",
                      ],
                    },
                  })
                }
              />
              <input
                type="color"
                name="barColors4"
                value={
                  properties.barColors ? properties.barColors[3] : "#FEB019"
                }
                onChange={(e) =>
                  handlePropertyChange({
                    target: {
                      name: "barColors",
                      value: [
                        properties.barColors
                          ? properties.barColors[0]
                          : "#008FFB",
                        properties.barColors
                          ? properties.barColors[1]
                          : "#00E396",
                        properties.barColors
                          ? properties.barColors[2]
                          : "#775DD0",
                        e.target.value,
                        properties.barColors
                          ? properties.barColors[4]
                          : "#FF4560",
                      ],
                    },
                  })
                }
              />
              <input
                type="color"
                name="barColors5"
                value={
                  properties.barColors ? properties.barColors[4] : "#FF4560"
                }
                onChange={(e) =>
                  handlePropertyChange({
                    target: {
                      name: "barColors",
                      value: [
                        properties.barColors
                          ? properties.barColors[0]
                          : "#008FFB",
                        properties.barColors
                          ? properties.barColors[1]
                          : "#00E396",
                        properties.barColors
                          ? properties.barColors[2]
                          : "#775DD0",
                        properties.barColors
                          ? properties.barColors[3]
                          : "#FEB019",
                        e.target.value,
                      ],
                    },
                  })
                }
              />
            </label> */}
            {/* Show Legend */}
            <label className="chart-properties-labels">
              Show Legend:
              <div>
                <label className="me-2">
                  <input
                    type="radio"
                    name="options.legend.show"
                    data-value={true} // Custom attribute to store the boolean
                    checked={properties["options.legend.show"] === true}
                    onChange={(e) =>
                      handlePropertyChange({
                        target: { name: e.target.name, value: e.target.dataset.value === "true" },
                      })
                    }
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="options.legend.show"
                    data-value={false} // Custom attribute to store the boolean
                    checked={properties["options.legend.show"] === false}
                    onChange={(e) =>
                      handlePropertyChange({
                        target: { name: e.target.name, value: e.target.dataset.value === "true" },
                      })
                    }
                  />
                  No
                </label>
              </div>
            </label>
            {/* Background Color */}
            <label className="chart-properties-labels">
              Background Color:
              <input
                type="color"
                name="options.chart.background"
                value={properties["options.chart.background"] || "#ffffff"}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Legend Position */}
            <label className="chart-properties-labels">
              Legend Position:
              <select
                name="options.legend.position"
                value={properties["options.legend.position"] || "bottom"}
                onChange={handlePropertyChange}
              >
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </label>
          </>
        )}
        {/* Mixed Chart */}
        {selectedChart === "mixed" && (
          <>
            {/* Title */}
            <label className="chart-properties-labels">
              Title:
              <input
                type="text"
                name="options.title.text"
                value={properties["options.title.text"] || ""}
                onChange={handlePropertyChange}
              />
            </label>

            {/* Background Color */}
            <label className="chart-properties-labels">
              Background Color:
              <input
                type="color"
                name="options.chart.background"
                value={properties["options.chart.background"] || "#ffffff"}
                onChange={handlePropertyChange}
              />
            </label>

            {/* Column Color */}
            {/* <label className="chart-properties-labels">
              Column Color:
              <input
                type="color"
                name="columnColor"
                value={properties.columnColor || "#008FFB"}
                onChange={handlePropertyChange}
              />
            </label> */}

            {/* Line Color */}
            {/* <label className="chart-properties-labels">
              Line Color:
              <input
                type="color"
                name="lineColor"
                value={properties.lineColor || "#00E396"}
                onChange={handlePropertyChange}
              />
            </label> */}

            {/* Show Legend */}
            <label className="chart-properties-labels">
              Show Legend:
              <div>
                <label className="me-2">
                  <input
                    type="radio"
                    name="options.legend.show"
                    data-value={true} // Custom attribute to store the boolean
                    checked={properties["options.legend.show"] === true}
                    onChange={(e) =>
                      handlePropertyChange({
                        target: { name: e.target.name, value: e.target.dataset.value === "true" },
                      })
                    }
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="options.legend.show"
                    data-value={false} // Custom attribute to store the boolean
                    checked={properties["options.legend.show"] === false}
                    onChange={(e) =>
                      handlePropertyChange({
                        target: { name: e.target.name, value: e.target.dataset.value === "true" },
                      })
                    }
                  />
                  No
                </label>
              </div>
            </label>

            {/* Legend Position */}
            <label className="chart-properties-labels">
              Legend Position:
              <select
                name="options.legend.position"
                value={properties["options.legend.position"] || "bottom"}
                onChange={handlePropertyChange}
              >
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </label>

            {/* X-Axis Title */}
            <label className="chart-properties-labels">
              X-Axis Title:
              <input
                type="text"
                name="options.xaxis.title.text"
                value={properties["options.xaxis.title.text"] || ""}
                onChange={handlePropertyChange}
              />
            </label>

            {/* Y-Axis Title (Column) */}
            <label className="chart-properties-labels">
              Y-Axis Title (Column):
              <input
                type="text"
                name="options.yaxis.title.text"
                value={properties["options.yaxis.title.text"] || ""}
                onChange={handlePropertyChange}
              />
            </label>

            {/* Y-Axis Title (Line) */}
            {/* <label className="chart-properties-labels">
              Y-Axis Title (Line):
              <input
                type="text"
                name="yaxisTitle2"
                value={properties.yaxisTitle2 || ""}
                onChange={handlePropertyChange}
              />
            </label> */}
          </>
        )}
        {/* Gauge Chart */}
        {selectedChart === "radialBar" && (
          <>
            {/* Title */}
            <label className="chart-properties-labels">
              Title:
              <input
                type="text"
                name="options.title.text"
                value={properties["options.title.text"] || ""}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Background Color */}
            <label className="chart-properties-labels">
              Background Color:
              <input
                type="color"
                name="options.chart.background"
                value={properties["options.chart.background"] || "#ffffff"}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Bar Color */}
            <label className="chart-properties-labels">
              Bar Color:
              <input
                type="color"
                name="options.plotOptions.radialBar.dataLabels.value"
                value={
                  properties[
                  "options.plotOptions.radialBar.dataLabels.value"
                  ] || "#008FFB"
                }
                onChange={handlePropertyChange}
              />
            </label>
            {/* Show Legends */}

            <label className="chart-properties-labels">
              Show Legend:
              <div>
                <label className="me-2">
                  <input
                    type="radio"
                    name="options.legend.show"
                    data-value={true} // Custom attribute to store the boolean
                    checked={properties["options.legend.show"] === true}
                    onChange={(e) =>
                      handlePropertyChange({
                        target: { name: e.target.name, value: e.target.dataset.value === "true" },
                      })
                    }
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="options.legend.show"
                    data-value={false} // Custom attribute to store the boolean
                    checked={properties["options.legend.show"] === false}
                    onChange={(e) =>
                      handlePropertyChange({
                        target: { name: e.target.name, value: e.target.dataset.value === "true" },
                      })
                    }
                  />
                  No
                </label>
              </div>
            </label>
          </>
        )}
        {selectedChart === "Card" && (
          <>
            {/* Title */}
            <label className="chart-properties-labels">
              Title:
              <input
                type="text"
                name="title"
                value={properties.title || ""}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Subtitle */}
            <label className="chart-properties-labels">
              Subtitle:
              <input
                type="text"
                name="subtitle"
                value={properties.subtitle || ""}
                onChange={handlePropertyChange}
              />
            </label>
          </>
        )}
        {/* TABLE */}
        {selectedChart === "Table" && (
          <>
            {/* Title */}
            <label className="chart-properties-labels">
              Title:
              <input
                type="text"
                name="title"
                value={properties.title || ""}
                onChange={handlePropertyChange}
              />
            </label>

            {/* Header Labels */}
            <label className="chart-properties-labels">
              Text Header:
              <input
                type="text"
                name="headerText"
                value={properties.headers ? properties.headers.text : "Text"}
                onChange={(e) =>
                  handlePropertyChange({
                    target: {
                      name: "headers",
                      value: { ...properties.headers, text: e.target.value },
                    },
                  })
                }
              />
            </label>
            <label className="chart-properties-labels">
              Sum Header:
              <input
                type="text"
                name="headerSum"
                value={properties.headers ? properties.headers.sum : "Sum"}
                onChange={(e) =>
                  handlePropertyChange({
                    target: {
                      name: "headers",
                      value: { ...properties.headers, sum: e.target.value },
                    },
                  })
                }
              />
            </label>
            <label className="chart-properties-labels">
              Price Header:
              <input
                type="text"
                name="headerPrice"
                value={properties.headers ? properties.headers.price : "Price"}
                onChange={(e) =>
                  handlePropertyChange({
                    target: {
                      name: "headers",
                      value: { ...properties.headers, price: e.target.value },
                    },
                  })
                }
              />
            </label>
            <label className="chart-properties-labels">
              Date Header:
              <input
                type="text"
                name="headerDate"
                value={properties.headers ? properties.headers.date : "Date"}
                onChange={(e) =>
                  handlePropertyChange({
                    target: {
                      name: "headers",
                      value: { ...properties.headers, date: e.target.value },
                    },
                  })
                }
              />
            </label>
          </>
        )}
        {/* Image */}
        {selectedChart === "Image" && (
          <>
            {/* Title */}
            <label className="chart-properties-labels">
              Title:
              <input
                type="text"
                name="title"
                value={properties.title || ""}
                onChange={handlePropertyChange}
              />
            </label>
          </>
        )}
        {/* Typography */}
        {selectedChart === "Typography" && (
          <>
            {/* Title */}
            <label className="chart-properties-labels">
              Title:
              <input
                type="text"
                name="title"
                value={properties.title || ""}
                onChange={handlePropertyChange}
              />
            </label>

            {/* Subtitle */}
            <label className="chart-properties-labels">
              Subtitle:
              <input
                type="text"
                name="subtitle"
                value={properties.subtitle || ""}
                onChange={handlePropertyChange}
              />
            </label>

            {/* Paragraph */}
            <label className="chart-properties-labels">
              Paragraph:
              <textarea
                name="para"
                value={properties.para || ""}
                onChange={handlePropertyChange}
              />
            </label>

            {/* Subtitle I */}
            <label className="chart-properties-labels">
              Subtitle I:
              <input
                type="text"
                name="subtitleI"
                value={properties.subtitleI || ""}
                onChange={handlePropertyChange}
              />
            </label>

            {/* Paragraph I */}
            <label className="chart-properties-labels">
              Paragraph I:
              <textarea
                name="paraI"
                value={properties.paraI || ""}
                onChange={handlePropertyChange}
              />
            </label>

            {/* Subtitle II */}
            <label className="chart-properties-labels">
              Subtitle II:
              <input
                type="text"
                name="subtitleII"
                value={properties.subtitleII || ""}
                onChange={handlePropertyChange}
              />
            </label>

            {/* Paragraph II */}
            <label className="chart-properties-labels">
              Paragraph II:
              <textarea
                name="paraII"
                value={properties.paraII || ""}
                onChange={handlePropertyChange}
              />
            </label>
          </>
        )}
        {/* Add More Charts here */}
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Grids":
        return (
          <div className="container-grid-data">
            <div className="grid-data">
              <img src={Rarrow} alt="logo" />
              <p>Grids</p>
              <div className="grid-data-circle">7</div>
            </div>
            <div className="another-container-grid-data">
              <div className="c1">
                <img src={C1} alt="logo" />
              </div>
              <div className="c1">
                <img src={C2} alt="logo" />
              </div>
              <div className="c1">
                <img src={C3} alt="logo" />
              </div>
              <div className="c1">
                <img src={C4} alt="logo" />
              </div>
              <div className="c1">
                <img src={C5} alt="logo" />
              </div>
              <div className="c1">
                <img src={C6} alt="logo" />
              </div>
              <div className="c1">
                <CustomGrid onCreate={onCreateGrid} />
              </div>
            </div>
          </div>
        );
      case "Components":
        return (
          <div className="component-data">
            <div className="charts-cd-main">
              <div
                className="cd-I"
                onClick={() => {
                  setSelectedComponent("Charts");
                  setShowChartList(!showChartList);
                }}
              >
                <img src={Rarrow} alt="logo" />
                <p>Charts</p>
                <div className="grid-data-circle">17</div>
              </div>
              {selectedComponent === "Charts" && showChartList && (
                <div className="chart-list">
                  {/* Horizontal Bar Chart */}
                  <div
                    onClick={() => handleChartSelection("horizontalbarchart")}
                    className="b-chart"
                  >
                    <img src={W2} alt="logo" className="image-w2" />
                    <p>Horizontal Bar Chart</p>
                  </div>
                  {/* Vertical Bar Chart */}
                  <div
                    className="b-chart"
                    onClick={() => handleChartSelection("verticalbarchart")}
                  >
                    <img src={W2} alt="logo" />
                    <p>Vertical Bar Chart</p>
                  </div>
                  {/* Stacked Horizontal Bar Chart */}
                  <div
                    className="b-chart"
                    onClick={() => handleChartSelection("stackedhorizontalbar")}
                  >
                    <img src={SHBI} alt="logo" />
                    <p>Stacked Horizontal Bar</p>
                  </div>
                  {/* Stacked Vertical Bar Chart */}
                  <div
                    className="b-chart"
                    onClick={() => handleChartSelection("stackedverticalbar")}
                  >
                    <img src={SVB} alt="logo" />
                    <p>Stacked Vertical Bar</p>
                  </div>
                  {/* Stacked Horizontal Bar Chart I */}
                  <div
                    className="b-chart"
                    onClick={() =>
                      handleChartSelection("100stackedhorizontalbarchart")
                    }
                  >
                    <img src={SHB} alt="logo" />
                    <p>100% Stacked Horizontal</p>
                  </div>
                  {/* Stacked Vertical Bar Chart I */}
                  <div
                    className="b-chart"
                    onClick={() =>
                      handleChartSelection("100stackedverticalbarchart")
                    }
                  >
                    <img src={SVBI} alt="logo" />
                    <p>100% Stacked Vertical</p>
                  </div>
                  {/* Pie Chart */}
                  <div
                    className="b-chart"
                    onClick={() => handleChartSelection("pie")}
                  >
                    <img src={W1} alt="logo" />
                    <p>Pie Chart</p>
                  </div>
                  {/* Donut Chart */}
                  <div
                    className="b-chart"
                    onClick={() => handleChartSelection("donut")}
                  >
                    <img src={Piechart} alt="logo" />
                    <p>Donut Chart</p>
                  </div>
                  {/* Line Chart */}
                  <div
                    className="b-chart"
                    onClick={() => handleChartSelection("line")}
                  >
                    <img src={W3} alt="logo" />
                    <p>Line Chart</p>
                  </div>
                  {/* Area Chart */}
                  <div
                    className="b-chart"
                    onClick={() => handleChartSelection("area")}
                  >
                    <img src={AC} alt="logo" />
                    <p>Area Chart</p>
                  </div>
                  {/* Scatter Chart */}
                  <div
                    className="b-chart"
                    onClick={() => handleChartSelection("scatter")}
                  >
                    <img src={ScatterChart} alt="logo" />
                    <p>Scatter Chart</p>
                  </div>
                  {/* Bubble Chart */}
                  <div
                    className="b-chart"
                    onClick={() => handleChartSelection("bubblechart")}
                  >
                    <img src={BubbleChart} alt="logo" />
                    <p>Bubble Chart</p>
                  </div>
                  {/* 3D Bubble Chart */}
                  <div
                    className="b-chart"
                    onClick={() => handleChartSelection("bubblechart3d")}
                  >
                    <img src={BubbleChart3D} alt="logo" />
                    <p>3D Bubble Chart</p>
                  </div>
                  {/* Gantt Chart */}
                  <div
                    className="b-chart"
                    onClick={() => handleChartSelection("Gantt Chart")}
                  >
                    <img src={GanttChart} alt="logo" />
                    <p>Gantt Chart</p>
                  </div>
                  {/* TreeMap Chart */}
                  <div
                    className="b-chart"
                    onClick={() => handleChartSelection("treemap")}
                  >
                    <img src={Treemap} alt="logo" />
                    <p>Treemap Chart</p>
                  </div>
                  {/* Mixed Chart */}
                  <div
                    className="b-chart"
                    onClick={() => handleChartSelection("mixed")}
                  >
                    <img src={MC} alt="logo" />
                    <p>Mixed Chart</p>
                  </div>
                  {/* Gauge Chart */}
                  <div
                    className="b-chart"
                    onClick={() => handleChartSelection("radialBar")}
                  >
                    <img src={GaugeChart} alt="logo" />
                    <p>Gauge Chart</p>
                  </div>
                  {/* Add more charts */}
                </div>
              )}
            </div>
            <div
              className="cd-I"
              onClick={() =>
                setSelectedComponent(
                  selectedComponent === "Components" ? null : "Components"
                )
              }
            >
              <img src={Rarrow} alt="logo" />
              <p>Components</p>
              <div className="grid-data-circle">4</div>
            </div>
            {selectedComponent === "Components" && (
              <div className="chart-list">
                {/* Image*/}
                <div
                  className="b-chart"
                  onClick={() => handleChartSelection("Image")}
                >
                  <img src={W1} alt="logo" />
                  <p>Image</p>
                </div>
                {/* Simple Card */}
                <div
                  className="b-chart"
                  onClick={() => handleChartSelection("Card")}
                >
                  <img src={W1} alt="logo" />
                  <p>Card</p>
                </div>
                {/* Table */}
                <div
                  className="b-chart"
                  onClick={() => handleChartSelection("Table")}
                >
                  <img src={Table} alt="logo" />
                  <p>Table</p>
                </div>
              </div>
            )}
            <div
              className="cd-I"
              onClick={() =>
                setSelectedComponent(
                  selectedComponent === "Typography" ? null : "Typography"
                )
              }
            >
              <img src={Rarrow} alt="logo" />
              <p>Typography</p>
              <div className="grid-data-circle">10</div>
            </div>
            {selectedComponent === "Typography" && (
              <div className="chart-list">
                {/* Typography */}
                <div
                  className="b-chart"
                  onClick={() => handleChartSelection("Typography")}
                >
                  <img src={Typo} alt="logo" />
                  <p>Typography</p>
                </div>
              </div>
            )}
          </div>
        );
      case "Editor":
        return (
          <div className="editor-data">
            <div className="editor-data-c-1">
              <p className="text-primary text-center">{selectedChart}</p>
              <hr />
            </div>
            <TextField
              select
              label="Select Primary Key"
              value={selectedDatasets}
              multiple
              onChange={handleChange}
              fullWidth
              SelectProps={{
                multiple: true,
                renderValue: (selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((item) => (
                      <Chip key={item.datasetId} label={item.datasetTitle} />
                    ))}
                  </Box>
                ),
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {datasets.map((key) => (
                <MenuItem key={key.datasetId} value={key}>
                  {key.datasetTitle}{" "}
                </MenuItem>
              ))}
            </TextField>

            {/* Series */}
            {
              ["line",
                "verticalbarchart",
                "horizontalbarchart",
                "horizontalbarchart",
                "100stackedverticalbarchart",
                "100stackedhorizontalbarchart",
                "stackedverticalbar",
                "stackedhorizontalbar",
                "area",
                "mixed"
              ].includes(chartOptions.chartType)
              &&
              <>
                <div>
                  <Formik
                    initialValues={
                      chartOptions.formValues ||
                      {
                        category: { column: "", datasetName: "" },
                        series: [{ type: "", name: "", column: "", datasetName: "" }],
                      }}
                    enableReinitialize={true}
                    validationSchema={Yup.object().shape({
                      category: Yup.object().shape({
                        column: Yup.string().required("Category column is required"),
                        datasetName: Yup.string().required("Category dataset name is required"),
                      }),
                      series: Yup.array().of(
                        Yup.object().shape({
                          column: Yup.string().required("Series column is required"),
                          datasetName: Yup.string().required("Series dataset name is required"),
                          name: Yup.string().required("Name is required"),
                        })
                      ),
                    })}
                    onSubmit={(values) => {
                      handleSubmit(values);
                    }}
                  >
                    {({ values, errors, touched, setFieldValue }) => (
                      <Form>
                        {/* Category Dropdown */}
                        <div>
                          <label htmlFor="category">Category:</label>
                          <Select
                            options={categoriesOptions}
                            value={categoriesOptions.find((option) => {
                              const parsedValue = JSON.parse(option.value);
                              return (
                                parsedValue.column === values.category.column &&
                                parsedValue.datasetName === values.category.datasetName
                              );
                            })}
                            onChange={(selectedOption) => {
                              const parsedValue = JSON.parse(selectedOption.value);
                              setFieldValue("category", {
                                column: parsedValue.column,
                                datasetName: parsedValue.datasetName,
                              });
                            }}
                            className="react-select-container"
                            classNamePrefix="react-select"
                            placeholder="Choose Category"
                          />
                          {errors.category && touched.category && (
                            <div style={{ color: "red" }}>
                              {errors.category.column || errors.category.datasetName}
                            </div>
                          )}
                        </div>

                        {/* Series Field Array */}
                        <FieldArray name="series">
                          {({ push, remove }) => (
                            <>
                              {values && values.series.map((seriesItem, index) => (
                                <div key={index} style={{ border: "1px solid #ccc", padding: "5px" }}>
                                  {/* Name Field */}
                                  <div>
                                    <label htmlFor={`series[${index}].name`}>Name:</label>
                                    <Field
                                      className="form-control"
                                      id={`series[${index}].name`}
                                      name={`series[${index}].name`}
                                      placeholder="Enter a name"
                                    />
                                    {errors.series &&
                                      errors.series[index]?.name &&
                                      touched.series &&
                                      touched.series[index]?.name && (
                                        <div style={{ color: "red" }}>
                                          {errors.series[index].name}
                                        </div>
                                      )}
                                  </div>

                                  {/* Series Dropdown */}
                                  <label htmlFor={`series[${index}]`}>Series {index + 1}:</label>
                                  <Select
                                    options={categoriesOptions}
                                    value={categoriesOptions.find((option) => {
                                      const parsedValue = JSON.parse(option.value);
                                      return (
                                        parsedValue.column === seriesItem.column &&
                                        parsedValue.datasetName === seriesItem.datasetName
                                      );
                                    })}
                                    onChange={(selectedOption) => {
                                      const parsedValue = JSON.parse(selectedOption.value);
                                      setFieldValue(`series[${index}]`, {
                                        ...values.series[index],  // Spread the existing values of the current series
                                        column: parsedValue.column,
                                        datasetName: parsedValue.datasetName,
                                      });
                                    }}
                                    className="react-select-container"
                                    classNamePrefix="react-select"
                                    placeholder="Choose Series"
                                  />
                                  {errors.series &&
                                    errors.series[index] &&
                                    touched.series &&
                                    touched.series[index] && (
                                      <div style={{ color: "red" }}>
                                        {errors.series[index].column ||
                                          errors.series[index].datasetName}
                                      </div>
                                    )}

                                  {/* Remove Series Button */}
                                  <a
                                    type="button"
                                    onClick={() => remove(index)}
                                    style={{ marginTop: "10px" }}
                                    className="text-end"
                                  >
                                    <FontAwesomeIcon icon={faTrash} size="2x"></FontAwesomeIcon>
                                  </a>
                                </div>
                              ))}

                              <a
                                type="button"
                                onClick={() =>
                                  push({ column: "", name: "", type: "", datasetName: "" })
                                }
                                style={{ marginTop: "10px" }}
                                className="text-center"
                              >
                                <FontAwesomeIcon icon={faPlusCircle} size="2x"></FontAwesomeIcon>
                              </a>
                            </>
                          )}
                        </FieldArray>
                        {/* Submit Button */}
                        <button type="submit" style={{ marginTop: "20px" }}>
                          Load Chart
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </>
            }
            {
              [
                "pie",
                "donut",
                "radialBar"
              ].includes(chartOptions.chartType)
              &&
              <>
                <Formik
                  initialValues={
                    chartOptions.formValues || {
                      category: { column: "", datasetName: "" },
                      series: { column: "", datasetName: "" },
                    }
                  }
                  enableReinitialize={true}
                  validationSchema={Yup.object().shape({
                    category: Yup.object().shape({
                      column: Yup.string().required("Category column is required"),
                      datasetName: Yup.string().required("Category dataset name is required"),
                    }),
                    series: Yup.object().shape({
                      column: Yup.string().required("Series column is required"),
                      datasetName: Yup.string().required("Series dataset name is required"),
                    }),
                  })}
                  onSubmit={(values) => {
                    handleSubmit(values);
                  }}
                >
                  {({ values, errors, touched, setFieldValue }) => (
                    <Form>
                      {/* Category Dropdown */}
                      <div>
                        <label htmlFor="category">Category:</label>
                        <Select
                          options={categoriesOptions}
                          value={categoriesOptions.find((option) => {
                            const parsedValue = JSON.parse(option.value);
                            return (
                              parsedValue.column === values.category.column &&
                              parsedValue.datasetName === values.category.datasetName
                            );
                          })}
                          onChange={(selectedOption) => {
                            const parsedValue = JSON.parse(selectedOption.value);
                            setFieldValue("category", {
                              column: parsedValue.column,
                              datasetName: parsedValue.datasetName,
                            });
                          }}
                          className="react-select-container"
                          classNamePrefix="react-select"
                          placeholder="Choose Category"
                        />
                        {touched.category && errors.category && (
                          <div style={{ color: "red" }}>
                            {errors.category.column || errors.category.datasetName}
                          </div>
                        )}
                      </div>

                      {/* Series Dropdown */}
                      <div>
                        <label htmlFor="series">Series:</label>
                        <Select
                          options={categoriesOptions}
                          value={categoriesOptions.find((option) => {
                            const parsedValue = JSON.parse(option.value);
                            return (
                              parsedValue.column === values.series.column &&
                              parsedValue.datasetName === values.series.datasetName
                            );
                          })}

                          onChange={(selectedOption) => {
                            const parsedValue = JSON.parse(selectedOption.value);
                            setFieldValue("series", {
                              column: parsedValue.column,
                              datasetName: parsedValue.datasetName,
                            });
                          }}
                          className="react-select-container"
                          classNamePrefix="react-select"
                          placeholder="Choose Series"
                        />
                        {touched.series && errors.series && (
                          <div style={{ color: "red" }}>
                            {errors.series.column || errors.series.datasetName}
                          </div>
                        )}
                      </div>

                      {/* Submit Button */}
                      <button type="submit" style={{ marginTop: "20px" }}>
                        Load Chart
                      </button>
                    </Form>
                  )}
                </Formik>
              </>
            }
            {
              [
                "treemap"
              ].includes(chartOptions.chartType)
              &&
              <>
                <Formik
                  enableReinitialize={true}
                  initialValues={{
                    x: chartOptions?.formValues?.x || { column: "", datasetName: "" },
                    y: chartOptions?.formValues?.y || { column: "", datasetName: "" }
                  }}
                  validationSchema={Yup.object().shape({
                    x: Yup.object({
                      column: Yup.string().required("X column is required"),
                      datasetName: Yup.string().required("X datasetName is required")
                    }).required(),
                    y: Yup.object({
                      column: Yup.string().required("Y column is required"),
                      datasetName: Yup.string().required("Y datasetName is required")
                    }).required()
                  })}
                  onSubmit={(values) => {
                    console.log("Submitted Values:", values);
                    handleSubmit(values);
                  }}
                >
                  {({ values, errors, touched, setFieldValue }) => (
                    <Form>
                      {/* Dropdown for X */}
                      <div>
                        <label htmlFor="x">X:</label>
                        <Select
                          options={categoriesOptions}
                          value={categoriesOptions.find((option) => {
                            const parsedValue = JSON.parse(option.value);
                            return (
                              parsedValue.column === values.x.column &&
                              parsedValue.datasetName === values.x.datasetName
                            );
                          })}
                          onChange={(selectedOption) => {
                            const parsedValue = JSON.parse(selectedOption.value);
                            setFieldValue("x", {
                              column: parsedValue.column,
                              datasetName: parsedValue.datasetName
                            });
                          }}
                          className="react-select-container"
                          classNamePrefix="react-select"
                          placeholder="Choose X"
                        />
                        {touched.x && errors.x && (
                          <div style={{ color: "red" }}>
                            {errors.x.column || errors.x.datasetName}
                          </div>
                        )}
                      </div>

                      {/* Dropdown for Y */}
                      <div>
                        <label htmlFor="y">Y:</label>
                        <Select
                          options={categoriesOptions}
                          value={categoriesOptions.find((option) => {
                            const parsedValue = JSON.parse(option.value);
                            return (
                              parsedValue.column === values.y.column &&
                              parsedValue.datasetName === values.y.datasetName
                            );
                          })}
                          onChange={(selectedOption) => {
                            const parsedValue = JSON.parse(selectedOption.value);
                            setFieldValue("y", {
                              column: parsedValue.column,
                              datasetName: parsedValue.datasetName
                            });
                          }}
                          className="react-select-container"
                          classNamePrefix="react-select"
                          placeholder="Choose Y"
                        />
                        {touched.y && errors.y && (
                          <div style={{ color: "red" }}>
                            {errors.y.column || errors.y.datasetName}
                          </div>
                        )}
                      </div>

                      {/* Submit Button */}
                      <button type="submit" style={{ marginTop: "20px" }}>
                        Load Data
                      </button>
                    </Form>
                  )}
                </Formik>
              </>
            }
            {
              ["bubblechart", "bubblechart3d"].includes(chartOptions.chartType)
              &&
              <>
                <Formik
                  enableReinitialize={true}
                  initialValues={
                    chartOptions.formValues && chartOptions.formValues.datasets
                     && Array.isArray(chartOptions.formValues.datasets) && chartOptions.formValues.datasets.length > 0
                      ? { datasets: chartOptions.formValues.datasets }
                      : {
                        datasets: [
                          {
                            name: '',
                            data: {
                              x: { column: '', datasetName: '' },
                              y: { column: '', datasetName: '' },
                              z: { column: '', datasetName: '' },
                            },
                          },
                        ]
                      }
                  }
                  validationSchema={Yup.object().shape({
                    datasets: Yup.array().of(
                      Yup.object().shape({
                        name: Yup.string().required('Name is required'),
                        data: Yup.object().shape({
                          x: Yup.object().shape({
                            column: Yup.string().required('Column for X is required'),
                            datasetName: Yup.string().required('Dataset for X is required'),
                          }),
                          y: Yup.object().shape({
                            column: Yup.string().required('Column for Y is required'),
                            datasetName: Yup.string().required('Dataset for Y is required'),
                          }),
                          z: Yup.object().shape({
                            column: Yup.string().required('Column for Z is required'),
                            datasetName: Yup.string().required('Dataset for Z is required'),
                          }),
                        }),
                      })
                    ),
                  })}
                  onSubmit={(values) => {
                    console.log('Submitted Values:', values);
                    handleSubmit(values);
                  }}
                >
                  {({ values, errors, touched, setFieldValue }) => (
                    <Form>
                      <FieldArray name="datasets">
                        {({ push, remove }) => (
                          <>
                            {values.datasets.map((item, index) => (
                              <div key={index} style={{ border: "1px solid #ccc", padding: "5px" }}>
                                {/* Name Field */}
                                <div>
                                  <label htmlFor={`datasets[${index}].name`}>Name:</label>
                                  <Field
                                    className="form-control"
                                    id={`datasets[${index}].name`}
                                    name={`datasets[${index}].name`}
                                    placeholder="Enter a name"
                                  />
                                  {errors.datasets && errors.datasets[index]?.name && touched.datasets && touched.datasets[index]?.name && (
                                    <div style={{ color: 'red' }}>{errors.datasets[index].name}</div>
                                  )}
                                </div>

                                {/* Dropdown for X */}
                                <div>
                                  <label htmlFor={`datasets[${index}].data.x`}>X:</label>
                                  <Select
                                    options={categoriesOptions}
                                    value={categoriesOptions.find(
                                      (option) => {
                                        const parsedValue = JSON.parse(option.value);
                                        return (
                                          parsedValue.column === item.data.x.column &&
                                          parsedValue.datasetName === item.data.x.datasetName
                                        );
                                      }
                                    )}
                                    onChange={(selectedOption) => {
                                      const parsedValue = JSON.parse(selectedOption.value);
                                      setFieldValue(`datasets[${index}].data.x`, {
                                        column: parsedValue.column,
                                        datasetName: parsedValue.datasetName,
                                      });
                                    }}
                                    className="react-select-container"
                                    classNamePrefix="react-select"
                                    placeholder="Choose X"
                                  />
                                  {errors.datasets && errors.datasets[index]?.data?.x && touched.datasets && touched.datasets[index]?.data?.x && (
                                    <div style={{ color: 'red' }}>{errors.datasets[index].data.x}</div>
                                  )}
                                </div>

                                {/* Dropdown for Y */}
                                <div>
                                  <label htmlFor={`datasets[${index}].data.y`}>Y:</label>
                                  <Select
                                    options={categoriesOptions}
                                    value={categoriesOptions.find(
                                      (option) => {
                                        const parsedValue = JSON.parse(option.value);
                                        return (
                                          parsedValue.column === item.data.y.column &&
                                          parsedValue.datasetName === item.data.y.datasetName
                                        );
                                      }
                                    )}
                                    onChange={(selectedOption) => {
                                      const parsedValue = JSON.parse(selectedOption.value);
                                      setFieldValue(`datasets[${index}].data.y`, {
                                        column: parsedValue.column,
                                        datasetName: parsedValue.datasetName,
                                      });
                                    }}
                                    className="react-select-container"
                                    classNamePrefix="react-select"
                                    placeholder="Choose Y"
                                  />
                                  {errors.datasets && errors.datasets[index]?.data?.y && touched.datasets && touched.datasets[index]?.data?.y && (
                                    <div style={{ color: 'red' }}>{errors.datasets[index].data.y}</div>
                                  )}
                                </div>

                                {/* Dropdown for Z */}
                                <div>
                                  <label htmlFor={`datasets[${index}].data.z`}>Z:</label>
                                  <Select
                                    options={categoriesOptions}
                                    value={categoriesOptions.find(
                                      (option) => {
                                        const parsedValue = JSON.parse(option.value);
                                        return (
                                          parsedValue.column === item.data.z.column &&
                                          parsedValue.datasetName === item.data.z.datasetName
                                        );
                                      }
                                    )}
                                    onChange={(selectedOption) => {
                                      const parsedValue = JSON.parse(selectedOption.value);
                                      setFieldValue(`datasets[${index}].data.z`, {
                                        column: parsedValue.column,
                                        datasetName: parsedValue.datasetName,
                                      });
                                    }}
                                    className="react-select-container"
                                    classNamePrefix="react-select"
                                    placeholder="Choose Z"
                                  />
                                  {errors.datasets && errors.datasets[index]?.data?.z && touched.datasets && touched.datasets[index]?.data?.z && (
                                    <div style={{ color: 'red' }}>{errors.datasets[index].data.z}</div>
                                  )}
                                </div>

                                {/* Remove Dataset Button */}
                                <a
                                  className="text-end"
                                  type="button"
                                  onClick={() => remove(index)}
                                  style={{ marginTop: '10px' }}
                                >
                                  <FontAwesomeIcon icon={faTrash} size="2x"></FontAwesomeIcon>
                                </a>
                              </div>
                            ))}

                            {/* Add Dataset Button */}
                            <a
                              type="button"
                              onClick={() =>
                                push({
                                  name: '',
                                  data: {
                                    x: { column: '', datasetName: '' },
                                    y: { column: '', datasetName: '' },
                                    z: { column: '', datasetName: '' },
                                  },
                                })
                              }
                              style={{ marginTop: '10px' }}
                              className="text-center"
                            >
                              <FontAwesomeIcon icon={faPlusCircle} size="2x"></FontAwesomeIcon>
                            </a>
                          </>
                        )}
                      </FieldArray>

                      {/* Submit Button */}
                      <button type="submit" style={{ marginTop: '20px' }}>
                        Load Data
                      </button>
                    </Form>
                  )}
                </Formik>


              </>
            }
            {renderProperties()}
          </div >
        );
      default:
        return null;
    }
  };

  return (
    <div className="main-container-navbar-wrapper">
      <div className="container-navbar">
        <div className="first-row-navbar">
          <div>
            <img src={Logo} alt="logo" />
          </div>
          <div className="first-row-navbar-I">
            <div className="fr-navbar-I">
              <img src={Workspace} alt="logo" />
            </div>
            <div className="fr-navbar-II">
              <p>Selected Workspace</p>
              <select>
                <option>DASO</option>
                <option>PASO</option>
              </select>
            </div>
          </div>
        </div>
        <div className="second-row-navbar">
          <div className="user-permission">
            <div className="DS">
              <img src={USER} alt="logo" />
            </div>
            <div>
              <p>User Permissions</p>
            </div>
          </div>
          <div className="user-permission">
            <div className="DS">
              <img src={DS} alt="logo" />
            </div>
            <div onClick={handleCreateDataset}>
              <p>Create a Dataset</p>
            </div>
          </div>
          <div className="Dashboard">
            <div className="DS">
              <img src={DS} alt="logo" />
            </div>
            <div onClick={handleCreateDashboard}>
              <p>Create a Dashboard</p>
            </div>
          </div>
          <div className="first-div-second-row-btn-IV-nav">
            <img src={Dataset} alt="logo" />
            <select className="first-div-second-row-btn-IV-select-nav">
              <option>Account Settings</option>
              <option>Logout</option>
            </select>
          </div>
          <div className="bell">
            <img src={Bell} alt="logo" />
            <div className="alert-bell">10</div>
          </div>
        </div>
      </div>
      <div className="CDB">
        <div className="CDB-column">
          <div className="main-container-CDB">
            <div className="fr-CDB">
              {/* <p>Dashboard title</p> */}
              <input
                type="text"
                className="form-control"
                placeholder="Enter dashboard title"
                onBlur={(e) => handleDashboardName(e.target.value)}
              />
              {/* <img src={Pen} alt="logo" /> */}
            </div>
            <div className="sr-CDB">
              <div className="sr-CDB-I">
                <img src={S1} alt="logo" />
              </div>
              <div>
                <img src={L1} alt="logo" />
              </div>
              <div className="sr-CDB-III">
                <div className="sr-CDB-I">
                  <img src={S2} alt="logo" />
                </div>
                <div className="sr-CDB-I">
                  <img src={S3} alt="logo" />
                </div>
                <div className="sr-CDB-I">
                  <img src={S4} alt="logo" />
                </div>
                <div className="sr-CDB-I" onClick={handleDeleteChart}>
                  <img src={S5} alt="logo" />
                </div>
              </div>
              <div>
                <img src={L1} alt="logo" />
              </div>
              <div className="sr-CDB-III">
                <div className="sr-CDB-I">
                  <img src={M2} alt="logo" />
                </div>
                <div className="sr-CDB-I">
                  <img src={M1} alt="logo" />
                </div>
              </div>
              <div>
                <img src={L1} alt="logo" />
              </div>
              <div className="sr-CDB-III">
                <div className="sr-CDB-I">
                  <img src={M3} alt="logo" />
                </div>
                <div className="sr-CDB-I">
                  <img src={S6} alt="logo" />
                </div>
              </div>
              <div>
                <img src={L1} alt="logo" />
              </div>
              <div className="sr-CDB-III">
                <div className="sr-CDB-I">
                  <img src={M4} alt="logo" />
                </div>
                <div className="sr-CDB-I">
                  <img src={M5} alt="logo" />
                </div>
              </div>
              <div>
                <img src={L1} alt="logo" />
              </div>
              <div className="sr-CDB-III">
                <button
                  className="sr-btn"
                  onClick={handleShuffleCharts}
                  disabled={
                    selectedGridIndex === null || gridToMoveIndex === null
                  }
                >
                  Shuffle Charts
                </button>
                <div>
                  <button className="sr-btn" onClick={handleSaveChart}>
                    Save Changes
                  </button>
                </div>
                <div className="sr-btn-I">
                  <img src={S7} alt="logo" />
                </div>
                <div className="sr-btn-I">
                  <img src={M6} alt="logo" className="sr-img" />
                </div>
              </div>
            </div>
          </div>
          <div className="parent-container-CDB">{children}</div>
        </div>
        <div className="content-CDB-I">
          <div className="main-container-CDB-I">
            <div
              className={`CDB-I-i ${activeTab === "Grids" ? "active" : ""}`}
              onClick={() => setActiveTab("Grids")}
            >
              Grids
            </div>
            <div
              className={`CDB-I-i ${activeTab === "Components" ? "active" : ""
                }`}
              onClick={() => setActiveTab("Components")}
            >
              Components
            </div>
            <div
              className={`CDB-I-i ${activeTab === "Editor" ? "active" : ""}`}
              onClick={() => setActiveTab("Editor")}
            >
              Editor
            </div>
          </div>
          {renderContent()}
        </div>
        <div className="main-container-CDB-II">
          {/* Horizontal Slider */}
          <div>
            <img src={Slider} alt="logo" />
          </div>
          {/* Vertical Slider */}
          <div>
            <img src={Ver} alt="logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  datasets: state.dataset.datasets,
  dashboard: state.dashboard.current,
});
export default connect(mapStateToProps, {
  getDatasets,
  updateDashboard,
  addDashboard,
  saveDashboardChanges,
})(Dashboard);
