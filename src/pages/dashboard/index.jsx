import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { TextField, MenuItem, Box, Chip } from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faPlus,
  faPlusCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
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
import CustomGrid from "../../components/custom-grid";
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
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import {
  addDashboard,
  updateDashboard,
  saveDashboardChanges,
  getSpecificDashboard,
  removeCurrentDashboard,
} from "../../actions/dashboardActions";
import { toast } from "react-toastify";
import { defaultChartOptions } from "../../data/chartData";
import { Debounce } from "react-lodash";
import WhereConditions from "../../components/where-conditions";
import DashboardHeader from "../dashboard-header";
import TableRelations from "../../components/table-relations";
import LimitSortField from "../../components/limit-sort-field";
import { useDashboardAccess } from "../../hooks/useDashboardAccess";
import { clearLogin } from "../../actions/loginActions";
import urlswithoutgateway from "../../actions/urlswithoutgateway";
import axiosInstance from "../../components/axios";

const Dashboard = ({
  children,
  onCreateGrid,
  onSelectChart,
  // chartOptions.chartType,
  onDeleteChart,
  onUpdateChartOptions,
  handleShuffleCharts,
  selectedGridIndex,
  gridToMoveIndex,
  getDatasets,
  getSpecificDashboard,
  datasets,
  dashboard,
  updateDashboard,
  addDashboard,
  saveDashboardChanges,
  chartOptions,
  user,
  removeCurrentDashboard,
  clearLogin,
  selectedIndex,
  handleDownloadingStatus,
}) => {
  const [activeTab, setActiveTab] = useState("Grids");
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [showChartList, setShowChartList] = useState(false);
  const [columns, setColumns] = useState([]);
  const [workspaces, setWorkspaces] = useState([]);
  const [downloading, setDownloading] = useState(false);
  const navigate = useNavigate();
  const [dashboardName, setDashboardName] = useState(
    dashboard ? dashboard.dashboardTitle : ""
  );
  const [copy, setCopy] = useState(false);
  const [cut, setCut] = useState(false);
  const [cutIndex, setCutIndex] = useState(0);

  const copyGrid = () => {
    if (selectedIndex < 0) {
      toast.error("Please select a grid to copy.");
      return;
    }

    setCutIndex(selectedIndex);
    const copiedItem = dashboard.datasetsTree[selectedIndex];
    const jsonString = JSON.stringify(copiedItem, null, 2);
    navigator.clipboard
      .writeText(jsonString)
      .then(() => toast.success("Copied to clipboard!"))
      .catch((err) => console.error("Copy failed:", err));
  };

  const pasteGrid = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const parsed = JSON.parse(text);

      if (
        dashboard &&
        Array.isArray(dashboard.datasetsTree) &&
        selectedIndex >= 0
      ) {
        if (cut) {
          const newDatasetsTree = [...dashboard.datasetsTree];
          newDatasetsTree[selectedIndex] = parsed;
          newDatasetsTree[cutIndex] = {};
          const updatedDashboard = {
            ...dashboard,
            datasetsTree: newDatasetsTree,
          };

          setCut(false);
          setCutIndex(0);
          updateDashboard(updatedDashboard);
        }

        if (copy) {
          const newDatasetsTree = [...dashboard.datasetsTree];
          newDatasetsTree[selectedIndex] = parsed;

          const updatedDashboard = {
            ...dashboard,
            datasetsTree: newDatasetsTree,
          };
          setCopy(false);
          updateDashboard(updatedDashboard);
        }
        toast.success("Pasted Successfully");
      }
      setCopy(false);
    } catch (err) {
      console.error("Paste or parse failed:", err);
      alert("Please copy grid to paste");
      setCopy(false);
    }
  };

  const printRef = useRef();

  const handleDownloadPdf = async () => {
    setDownloading(true);
    handleDownloadingStatus(true);
    await new Promise((resolve) => setTimeout(resolve, 100));
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("download.pdf");
    setDownloading(false);
    handleDownloadingStatus(false);
  };

  const { id } = useParams();
  const canAccess = useDashboardAccess(user, dashboard);

  const aggregateFunctions = {
    SUM: (data) =>
      data.reduce((sum, item) => {
        if (item === null || item === undefined) return sum;
        if (typeof item === "string") {
          const trimmed = item.trim();
          if (trimmed === "") return sum;
          const num = parseFloat(trimmed);
          return sum + (!isNaN(num) ? num : trimmed.length);
        }
        return sum + (isNaN(item) ? 0 : parseFloat(item));
      }, 0),

    AVERAGE: (data) => {
      const values = data
        .map((item) => {
          if (item === null || item === undefined) return null;
          if (typeof item === "string") {
            const trimmed = item.trim();
            if (trimmed === "") return null;
            const num = parseFloat(trimmed);
            return !isNaN(num) ? num : trimmed.length;
          }
          return isNaN(item) ? null : parseFloat(item);
        })
        .filter((item) => item !== null);

      return values.length
        ? (values.reduce((sum, val) => sum + val, 0) / values.length).toFixed(2)
        : "0.00";
    },

    MIN: (data) => {
      const values = data
        .map((item) => {
          if (item === null || item === undefined) return null;
          if (typeof item === "string") {
            const trimmed = item.trim();
            if (trimmed === "") return null;
            const num = parseFloat(trimmed);
            return !isNaN(num) ? num : trimmed.length;
          }
          return isNaN(item) ? null : parseFloat(item);
        })
        .filter((item) => item !== null);

      return values.length ? Math.min(...values) : "0.00";
    },

    MAX: (data) => {
      const values = data
        .map((item) => {
          if (item === null || item === undefined) return null;
          if (typeof item === "string") {
            const trimmed = item.trim();
            if (trimmed === "") return null;
            const num = parseFloat(trimmed);
            return !isNaN(num) ? num : trimmed.length;
          }
          return isNaN(item) ? null : parseFloat(item);
        })
        .filter((item) => item !== null);

      return values.length ? Math.max(...values) : "0.00";
    },

    COUNT: (data) =>
      data.filter((item) => item !== null && item !== undefined && item !== "")
        .length,
  };

  const groupData = (data, categoryColumn, seriesColumn) => {
    return data.reduce((acc, row) => {
      const category = row[categoryColumn];
      const series = row[seriesColumn];

      if (!category || series === undefined) return acc;

      acc[category] = acc[category] || [];
      acc[category].push(series);
      return acc;
    }, {});
  };

  const filterDataset = (dataset, filters = []) => {
    if (!dataset || !Array.isArray(dataset)) return [];

    return dataset.filter((row) => {
      return filters.every((filter) => {
        const { column, operator, value } = filter;
        if (!row.hasOwnProperty(column)) return false; // Validate column existence

        const rowValue = row[column];
        const filterValue = value?.toString(); // Ensure string comparison

        switch (operator) {
          case "=":
            return rowValue == filterValue;
          case "!=":
            return rowValue != filterValue;
          case ">":
            return rowValue > filterValue;
          case "<":
            return rowValue < filterValue;
          case ">=":
            return rowValue >= filterValue;
          case "<=":
            return rowValue <= filterValue;
          case "IN":
            return filterValue.split(",").includes(rowValue?.toString());
          case "NOT IN":
            return !filterValue.split(",").includes(rowValue?.toString());
          case "LIKE":
            return new RegExp(filterValue.replace(/%/g, ".*"), "i").test(
              rowValue?.toString()
            );
          default:
            return true;
        }
      });
    });
  };

  // Utility: Process series data
  const processSeries = (
    data,
    categories,
    seriesColumn,
    categoryColumn,
    groupBy,
    aggregateFunction,
    seriesGroup,
    type = ""
  ) => {
    if (groupBy === "yes") {
      if (seriesGroup == "yes") {
        const groupedData = groupData(data, categoryColumn, seriesColumn);
        const seriesValues = Array.from(
          new Set(data.map((item) => item[seriesColumn]))
        );

        return seriesValues.map((value) => ({
          name: value,
          type: type,
          data: categories.map((category) => {
            const values = groupedData[category] || [];
            const filteredValues = values.filter((v) => v === value);
            return aggregateFunctions[aggregateFunction](filteredValues);
          }),
        }));
      } else {
        const groupedData = data.reduce((acc, item) => {
          const category = item[categoryColumn];
          if (!acc[category]) acc[category] = [];
          acc[category].push(item[seriesColumn]);
          return acc;
        }, {});

        const categories = Object.keys(groupedData);

        const series = {
          name: seriesColumn,
          type: type,
          data: categories.map((category) => {
            const values = groupedData[category] || [];
            return aggregateFunctions[aggregateFunction](values);
          }),
        };
        return series;
      }
    } else {
      return categories.reduce((result, category) => {
        const rows = data.filter((item) => item[categoryColumn] === category);
        const seriesValues = Array.from(
          new Set(rows.map((item) => item[seriesColumn]))
        );
        seriesValues.forEach((value) => {
          result.push({
            name: value,
            type: type,
            data: rows
              .filter((item) => item[seriesColumn] === value)
              .map((item) => item[seriesColumn]),
          });
        });
        return result;
      }, []);
    }
  };

  // Process data in chunks
  const processDataInChunks = (data, chunkSize, processFn) => {
    const results = [];
    for (let i = 0; i < data.length; i += chunkSize) {
      const chunk = data.slice(i, i + chunkSize);
      results.push(...processFn(chunk));
    }
    return results;
  };

  const handleSubmit = (values) => {
    let updatedOptions = { ...chartOptions };
    let mergedDataset = [];

    switch (updatedOptions.chartType) {
      case "bubblechart":
      case "bubblechart3d":
        const processedItems = values.datasets.map((item) => {
          const xAxisData = getAxisData(item.data.x, "no", "");
          const yAxisData = getAxisData(item.data.y, "no", "");
          const zAxisData = getAxisData(item.data.z, "no", "");

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
            series: [...bubblechartData],
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
        // Validate inputs
        mergedDataset = mergeDatasets(
          chartOptions?.datasets,
          dashboard.tableRelationships
        );

        if (
          !mergedDataset ||
          mergedDataset.length < 1 ||
          !values.whereConditions ||
          !values.category ||
          !values.series
        ) {
          toast.error("Invalid input data or missing required fields.");
        }

        // Filter dataset with chunking
        const newfilteredDataset = processDataInChunks(
          mergedDataset,
          1000,
          (chunk) => filterDataset(chunk, values.whereConditions)
        );

        const { category, series, groupBy, aggregateFunction } = values;

        let categories = [];
        let processedSeries = [];

        if (groupBy === "yes") {
          // Get unique categories
          const seriesGroup = series[0]?.groupBy;
          categories = Array.from(
            new Set(newfilteredDataset.map((row) => row[category.column]))
          );
          if (seriesGroup == "yes") {
            categories.map((category1) => {
              const seriesData = series.map((item) => {
                const values = newfilteredDataset
                  .filter((row) => row[category.column] === category1)
                  .map((row) => row[item.column]);
                return aggregateFunctions[aggregateFunction](values);
              });

              processedSeries.push({
                name: category,
                data: {
                  name: category1 == "" ? "Blank" : category1,
                  data: seriesData,
                },
              });
            });
          } else {
            // Process series data in chunks
            processedSeries = series.map((item) => ({
              name: item.datasetName,
              data: processSeries(
                newfilteredDataset,
                categories,
                item.column,
                category.column,
                groupBy,
                aggregateFunction,
                seriesGroup
              ),
            }));
          }
        } else {
          categories = newfilteredDataset.map((row) => row[category.column]);
          processedSeries = series.map((item) => ({
            name: item.datasetName,
            data: {
              name: item.column,
              data: [newfilteredDataset.map((row) => row[item.column]).length],
            },
          }));
        }

        let mappedData = [];

        processedSeries.forEach((p) => {
          let obj = {};
          obj.name = p.data.name;
          obj.val = [];
          p.data.data.forEach((s, i) => {
            obj.val.push({
              value: s,
              category:
                series[0]?.groupBy == "yes" ? p.data.name : categories[i],
            });
          });
          mappedData.push(obj);
        });

        if (values.setLimit && values.limit.limit > 0) {
          const { type, limit } = values.limit;

          mappedData.forEach((obj) => {
            if (type === "ASC") {
              obj.val.sort((a, b) => a.value - b.value);
            } else if (type === "DESC") {
              obj.val.sort((a, b) => b.value - a.value);
            }

            obj.val = obj.val.slice(0, limit);
          });
          mappedData = mappedData.slice(0, limit);
        }

        categories = [
          ...new Set(
            mappedData.flatMap((obj) => obj.val.map((v) => v.category))
          ),
        ];

        processedSeries = mappedData.map((obj) => ({
          name: obj.name,
          data: categories.map((cat) => {
            const found = obj.val.find((v) => v.category === cat);
            return found ? found.value : 0;
          }),
        }));

        if (processedSeries.length < 30) {
          updatedOptions = {
            ...updatedOptions,
            formValues: values,
            options: {
              ...updatedOptions.options,
              xaxis: {
                ...updatedOptions.options.xaxis,
                categories: categories,
              },
              series: processedSeries,
            },
          };
        } else {
          toast.error(
            "Too many series to display. Please reduce the number of series."
          );
        }
        break;
      case "treemap":
        mergedDataset = mergeDatasets(
          chartOptions?.datasets,
          dashboard.tableRelationships
        );
        const treeMapDataset = processDataInChunks(
          mergedDataset,
          1000,
          (chunk) => filterDataset(chunk, values.whereConditions)
        );
        const xData = treeMapDataset.map((row) => row[values.x.column]);
        const treeMapData = xData.map((m, index) => {
          return {
            x: m,
            y: treeMapDataset.map((row) => row[values.y.column])[index],
          };
        });

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
        mergedDataset = mergeDatasets(
          chartOptions?.datasets,
          dashboard.tableRelationships
        );
        // Filter dataset with chunking
        const pieDataset = processDataInChunks(mergedDataset, 1000, (chunk) =>
          filterDataset(chunk, values.whereConditions)
        );
        const piecategory = values.category;
        const pieseries = values.series;
        const piegroupBy = values.groupBy;
        const pieaggregateFunction = values.aggregateFunction;

        let piecategories = [];
        let pieprocessedSeries = [];

        if (piegroupBy == "yes") {
          piecategories = Array.from(
            new Set(pieDataset.map((row) => row[piecategory.column]))
          );
          pieprocessedSeries = processSeries(
            pieDataset,
            piecategories,
            pieseries.column,
            piecategory.column,
            piegroupBy,
            pieaggregateFunction,
            ""
          );
          if (pieprocessedSeries) {
            pieprocessedSeries = pieprocessedSeries.data;
          }
        } else {
          piecategories = pieDataset.map((row) => row[piecategory.column]);
          pieprocessedSeries = pieDataset.map((row) => row[pieseries.column]);
        }

        updatedOptions = {
          ...updatedOptions,
          formValues: values,
          options: {
            ...updatedOptions.options,
            labels: piecategories,
            series: pieprocessedSeries,
          },
        };
        break;
      case "mixed":
        mergedDataset = mergeDatasets(
          chartOptions?.datasets,
          dashboard.tableRelationships
        );
        // Filter dataset with chunking
        const mdataset = processDataInChunks(mergedDataset, 1000, (chunk) =>
          filterDataset(chunk, values.whereConditions)
        );
        const mcategory = values.category;
        const mseries = values.series;
        const mgroupBy = values.groupBy;
        const maggregateFunction = values.aggregateFunction;
        let mcategories = [];
        let mprocessedSeries = [];
        if (mgroupBy == "yes") {
          mcategories = Array.from(
            new Set(mdataset.map((row) => row[mcategory.column]))
          );
          // Process each series dynamically
          mprocessedSeries = mseries.map((item) => ({
            name: item.datasetName,
            type: item.type,
            data: processSeries(
              mdataset,
              mcategories,
              item.column,
              mcategory.column,
              mgroupBy,
              maggregateFunction,
              "",
              item.type
            ),
          }));
        } else {
          mcategories = mdataset.map((row) => row[mcategory.column]);
          // Process each series dynamically
          mprocessedSeries = mseries.map((item) => ({
            name: item.datasetName,
            data: {
              name: item.column,
              type: item.type,
              data: mdataset.map((row) => row[item.column]),
            },
          }));
        }

        if (
          mprocessedSeries.length < 30 &&
          mprocessedSeries.flatMap((p) => p.data).length < 30
        ) {
          updatedOptions = {
            ...updatedOptions,
            formValues: values,
            options: {
              ...updatedOptions.options,
              labels: mcategories,
              series: mprocessedSeries.flatMap((p) => p.data),
            },
          };
        } else {
          toast.error(
            "Too many series to display. Please reduce the number of series."
          );
        }

        break;
      case "scatter":
        mergedDataset = mergeDatasets(
          chartOptions?.datasets,
          dashboard.tableRelationships
        );
        const filteredDataset = processDataInChunks(
          mergedDataset,
          1000,
          (chunk) => filterDataset(chunk, values.whereConditions)
        );
        if (values.series?.length > 0) {
          const seriesData = values.series.map((item) => {
            const { name, x, y } = item;

            const xData = filteredDataset.map((row) => row[x.column]);
            const yData = filteredDataset.map((row) => row[y.column]);

            const dataArray = xData.map((xValue, index) => ({
              x: xValue,
              y: yData[index],
            }));

            return {
              name,
              data: dataArray,
            };
          });

          updatedOptions = {
            ...updatedOptions,
            formValues: values,
            options: {
              ...updatedOptions.options,
              series: seriesData,
            },
          };
        }

      case "card":
        mergedDataset = mergeDatasets(
          chartOptions?.datasets,
          dashboard.tableRelationships
        );
        const cardDataset = processDataInChunks(mergedDataset, 1000, (chunk) =>
          filterDataset(chunk, values.whereConditions)
        );
        const cardData = cardDataset.map((row) => row[values.column.column]);
        const value = aggregateFunctions[values.function](cardData);
        updatedOptions = {
          ...updatedOptions,
          formValues: values,
          options: {
            ...updatedOptions.options,
            value: value,
          },
        };
        break;
      case "typography":
        updatedOptions = {
          ...updatedOptions,
          formValues: values,
          options: { ...updatedOptions.options, data: values.elements },
        };
        break;

      case "table":
        mergedDataset = mergeDatasets(
          chartOptions?.datasets,
          dashboard.tableRelationships
        );
        mergedDataset = mergeDatasets(
          chartOptions?.datasets,
          dashboard.tableRelationships
        );
        // Filter dataset with chunking
        const tableDataset = processDataInChunks(mergedDataset, 1000, (chunk) =>
          filterDataset(chunk, values.whereConditions)
        );

        let finalData = [];
        const selectedColumns = values?.columns || [];
        const groupColumns = values?.groupColumns || [];

        if (groupColumns.length > 0) {
          const groupedData = tableDataset.reduce((acc, row) => {
            if (!row) return acc;

            const groupKey = groupColumns
              .map((groupCol) => row?.[groupCol.column] ?? "Unknown")
              .join("_");

            if (!acc[groupKey]) {
              acc[groupKey] = [];
            }

            const rowData = selectedColumns.reduce((obj, col) => {
              obj[col.column] = row?.[col.column] ?? 0;
              return obj;
            }, {});

            acc[groupKey].push(rowData);
            return acc;
          }, {});

          finalData = Object.keys(groupedData).map((groupKey) => {
            const groupRows = groupedData[groupKey];

            let aggregatedRow = {};

            const groupValues = groupKey.split("_");
            groupColumns.forEach((groupCol, index) => {
              aggregatedRow[groupCol.column] = groupValues[index] ?? "Unknown";
            });

            selectedColumns.forEach((col) => {
              if (!col.function || !aggregateFunctions[col.function]) {
                console.warn(
                  `Aggregate function "${col.function}" not found for column "${col.column}". Skipping.`
                );
                aggregatedRow[col.column] = 0;
              } else {
                const columnValues = groupRows.map(
                  (row) => row[col.column] ?? 0
                );
                aggregatedRow[col.column] = aggregateFunctions[col.function](
                  columnValues,
                  col.column
                );
              }
            });
            return aggregatedRow;
          });
        } else {
          finalData = tableDataset?.map((row) =>
            selectedColumns.reduce((acc, col) => {
              acc[col.column] = row?.[col.column] ?? 0;
              return acc;
            }, {})
          );
        }

        if (values.setLimit && values.limit.column && values.limit.limit > 0) {
          const type = values.limit.type;
          finalData = finalData
            .sort((a, b) => {
              const valA = a[values.limit.column] ?? "";
              const valB = b[values.limit.column] ?? "";

              if (!isNaN(valA) && !isNaN(valB)) {
                return type === "ASC"
                  ? Number(valA) - Number(valB)
                  : Number(valB) - Number(valA);
              }

              return type === "ASC"
                ? String(valA).localeCompare(String(valB), undefined, {
                    sensitivity: "base",
                  })
                : String(valB).localeCompare(String(valA), undefined, {
                    sensitivity: "base",
                  });
            })
            .slice(0, values.limit.limit);
        }

        updatedOptions = {
          ...updatedOptions,
          formValues: values,
          options: {
            ...updatedOptions.options,
            data: finalData,
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

  const mergeDatasets = (datasets, relationships) => {
    // Convert datasets array to an object for quick lookup
    const datasetMap = datasets.reduce((acc, dataset) => {
      acc[dataset.datasetTitle] = dataset.dataSourceData;
      return acc;
    }, {});

    // If no relationships exist, return the first dataset
    if (!relationships || relationships.length === 0) {
      return datasets.length > 0 ? datasets[0].dataSourceData : [];
    }

    // Start with the first table as the base dataset
    let mergedData =
      datasetMap[relationships[0].mainTable]?.map((row) => ({ ...row })) || [];

    relationships.forEach(
      ({ mainTable, foreignKey, relatedTable, primaryKey }) => {
        const mainData = mergedData;
        const relatedData = datasetMap[relatedTable];

        if (!mainData || !relatedData) {
          console.warn(
            `Missing data for table: ${mainTable} or ${relatedTable}`
          );
          return;
        }

        mergedData = mainData.flatMap((mainRow) => {
          const relatedRows = relatedData.filter(
            (relRow) => relRow[primaryKey] === mainRow[foreignKey]
          );
          if (relatedRows.length === 0) {
            return { ...mainRow };
          }
          return relatedRows.map((relatedRow) => ({
            ...mainRow,
            ...relatedRow,
          }));
        });
      }
    );

    return mergedData;
  };

  const handleDashboardName = async (value) => {
    const updatedDashboard = {
      ...dashboard,
      dashboardTitle: value,
    };

    if (dashboard && dashboard.dashboardId != null) {
      console.log("Updating dashboard...");
      await updateDashboard(updatedDashboard);
    } else {
      console.log("Adding new dashboard...");
      updatedDashboard["userId"] = user.id;
      updatedDashboard["organizationId"] = user.organizationId;
      await addDashboard(updatedDashboard);
    }
  };

  const chartTypes = [
    {
      label: "Line",
      value: "line",
    },
    {
      label: "area",
      value: "area",
    },
    {
      label: "column",
      value: "column",
    },
  ];

  const categoriesOptions = columns.flatMap((col) =>
    col.columns.map((columnName) => ({
      value: JSON.stringify({
        column: columnName,
        datasetName: col.datasetName,
      }),
      label: `${col.datasetName}: ${columnName}`,
    }))
  );

  const handleColumns = (rows, cols, colData) => {
    onCreateGrid(rows, cols, colData);
  };

  useEffect(() => {
    if (dashboard) {
      setDashboardName(dashboard.dashboardTitle);
    }

    if (chartOptions && chartOptions["datasets"]) {
      const selectedDatasets = chartOptions["datasets"];
      if (selectedDatasets.length > 0) {
        chartOptions["datasets"] = selectedDatasets;
        const newColumns = selectedDatasets.map((dataset) => ({
          datasetName: dataset.datasetTitle,
          datasetId: dataset.datasetId,
          columns:
            dataset.dataSourceData.length > 0
              ? Object.keys(dataset.dataSourceData[0])
              : [],
        }));
        setColumns(newColumns);
      }
    } else {
      chartOptions["datasets"] = null;
      setColumns([]);
      // setSelectedDatasets([]);
    }
  }, [chartOptions, dashboard]);

  const handleCreateDashboard = () => {
    navigate("/create-dashboard-modals");
  };

  const handleChange = (event) => {
    if (event && event.length > 0) {
      const selectedDatasets = datasets.filter((dataset) =>
        event.some((e) => e.datasetId === dataset.datasetId)
      );

      if (selectedDatasets.length > 0) {
        chartOptions["datasets"] = selectedDatasets;

        const newColumns = selectedDatasets.map((dataset) => ({
          datasetName: dataset.datasetTitle,
          datasetId: dataset.datasetId,
          columns:
            dataset.dataSourceData.length > 0
              ? Object.keys(dataset.dataSourceData[0])
              : [],
        }));

        setColumns(newColumns);
      }
    } else {
      chartOptions["datasets"] = null;
      setColumns([]);
      // setSelectedDatasets([]);
    }
  };

  const handleCreateDataset = () => {
    navigate("/create-dataset-I");
  };

  const handleSaveChart = async (event) => {
    try {
      // Prevent default form submission if applicable
      event?.preventDefault();
      // Validate the dashboard title
      if (
        !dashboard ||
        !dashboard.dashboardTitle ||
        dashboard.dashboardTitle.trim() === ""
      ) {
        toast.warn("Dashboard name is required!!");
        return;
      }
      // Determine whether to update or add
      if (dashboard && dashboard.dashboardId != null) {
        console.log("Updating dashboard...");
        await updateDashboard(dashboard);
      } else {
        console.log("Adding new dashboard...");
        dashboard["userId"] = user.id;
        dashboard["organizationId"] = user.organizationId;
        await addDashboard(dashboard);
      }

      console.log("Dashboard saved successfully!");
    } catch (error) {
      console.error("Error saving the dashboard:", error);
    }
  };

  useEffect(() => {
    getDatasets();
    getWorkSpaces(user.organizationId);
    if (dashboard) {
      const updatedDashboard = {
        ...dashboard,
        isPublished: false,
      };
      updateDashboard(updatedDashboard);
    }
    if (id) {
      getSpecificDashboard(id);
    }

    return () => {
      removeCurrentDashboard();
    };
  }, []);

  const getWorkSpaces = async (id) => {
    axiosInstance.defaults.baseURL = urlswithoutgateway("admin");
    axiosInstance
      .get(`workspace/getactiveworkspaces/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.messageType !== 2) {
          setWorkspaces(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching workspaces:", error);
      });
  };

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
          obj[key] = value;
          return true;
        } else if (typeof obj[key] === "object" && obj[key] !== null) {
          const found = searchAndUpdateKey(obj[key], keyToFind, value);
          if (found) return true;
        }
      }
      return false;
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

  const handleSelectChange = (event) => {
    const value = event.target.value;
    if (value === "settings") {
      handleSettings();
    } else if (value === "logout") {
      clearLogin();
    }
  };

  const handleSettings = () => {
    navigate("/account-settings");
  };

  // Render Charts
  const renderProperties = () => {
    const properties = chartOptions.properties || {};
    if (!chartOptions) return null;
    return (
      <div className="chart-properties">
        {/* Horizontal Bar Chart */}
        {chartOptions.chartType === "horizontalbarchart" && (
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
              <div className="chart-select-wrapper">
                <select
                  className="chart-select"
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
              </div>
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
                        target: {
                          name: e.target.name,
                          value: e.target.dataset.value === "true",
                        },
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
                        target: {
                          name: e.target.name,
                          value: e.target.dataset.value === "true",
                        },
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
              <div className="chart-select-wrapper">
                <select
                  className="chart-select"
                  name="options.legend.position"
                  value={properties["options.legend.position"] || "top"}
                  onChange={handlePropertyChange}
                >
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>
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
        {chartOptions.chartType === "verticalbarchart" && (
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
              <div className="chart-select-wrapper">
                <select
                  className="chart-select"
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
              </div>
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
                        target: {
                          name: e.target.name,
                          value: e.target.dataset.value === "true",
                        },
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
                        target: {
                          name: e.target.name,
                          value: e.target.dataset.value === "true",
                        },
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
              <div className="chart-select-wrapper">
                <select
                  className="chart-select"
                  name="options.legend.position"
                  value={properties["options.legend.position"] || "top"}
                  onChange={handlePropertyChange}
                >
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>
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
        {chartOptions.chartType === "stackedhorizontalbar" && (
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
                        target: {
                          name: e.target.name,
                          value: e.target.dataset.value === "true",
                        },
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
                        target: {
                          name: e.target.name,
                          value: e.target.dataset.value === "true",
                        },
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
        {chartOptions.chartType === "stackedverticalbar" && (
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
                        target: {
                          name: e.target.name,
                          value: e.target.dataset.value === "true",
                        },
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
                        target: {
                          name: e.target.name,
                          value: e.target.dataset.value === "true",
                        },
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
              <div className="chart-select-wrapper">
                <select
                  className="chart-select"
                  name="options.legend.position"
                  value={properties["options.legend.position"] || "top"}
                  onChange={handlePropertyChange}
                >
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>
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
        {chartOptions.chartType === "100stackedhorizontalbarchart" && (
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
                        target: {
                          name: e.target.name,
                          value: e.target.dataset.value === "true",
                        },
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
                        target: {
                          name: e.target.name,
                          value: e.target.dataset.value === "true",
                        },
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
        {chartOptions.chartType === "100stackedverticalbarchart" && (
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
                        target: {
                          name: e.target.name,
                          value: e.target.dataset.value === "true",
                        },
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
                        target: {
                          name: e.target.name,
                          value: e.target.dataset.value === "true",
                        },
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
        {chartOptions.chartType === "pie" && (
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
              <div className="chart-select-wrapper">
                Legend Position:
                <select
                  className="chart-select"
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
              </div>
            </label>
          </>
        )}
        {/* Donut CHART */}
        {chartOptions.chartType === "donut" && (
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
              <div className="chart-select-wrapper">
                <select
                  className="chart-select"
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
              </div>
            </label>
          </>
        )}
        {/* Line Chart */}
        {chartOptions.chartType === "line" && (
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
                        target: {
                          name: e.target.name,
                          value: e.target.dataset.value === "true",
                        },
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
                        target: {
                          name: e.target.name,
                          value: e.target.dataset.value === "true",
                        },
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
              <div className="chart-select-wrapper">
                <select
                  className="chart-select"
                  name="options.legend.position"
                  value={properties["options.legend.position"] || "bottom"}
                  onChange={handlePropertyChange}
                >
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>
            </label>
          </>
        )}
        {chartOptions.chartType === "area" && (
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
                        target: {
                          name: e.target.name,
                          value: e.target.dataset.value === "true",
                        },
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
                        target: {
                          name: e.target.name,
                          value: e.target.dataset.value === "true",
                        },
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
              <div className="chart-select-wrapper">
                <select
                  className="chart-select"
                  name="options.legend.show"
                  value={properties["options.legend.show"] || "bottom"}
                  onChange={handlePropertyChange}
                >
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>
            </label>
          </>
        )}
        {/* Scatter Chart */}
        {chartOptions.chartType === "scatter" && (
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
                        target: {
                          name: e.target.name,
                          value: e.target.dataset.value === "true",
                        },
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
                        target: {
                          name: e.target.name,
                          value: e.target.dataset.value === "true",
                        },
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
              <div className="chart-select-wrapper">
                <select
                  className="chart-select"
                  name="options.legend.position"
                  value={properties["options.legend.position"] || "bottom"}
                  onChange={handlePropertyChange}
                >
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>
            </label>
          </>
        )}
        {/* Bubble Chart */}
        {chartOptions.chartType === "bubblechart" && (
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
                        target: {
                          name: e.target.name,
                          value: e.target.dataset.value === "true",
                        },
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
                        target: {
                          name: e.target.name,
                          value: e.target.dataset.value === "true",
                        },
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
              <div className="chart-select-wrapper">
                <select
                  className="chart-select"
                  name="legendPosition"
                  value={properties.legendPosition || "bottom"}
                  onChange={handlePropertyChange}
                >
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>
            </label>
          </>
        )}
        {/* 3D Bubble Chart */}
        {chartOptions.chartType === "bubblechart3d" && (
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
                        target: {
                          name: e.target.name,
                          value: e.target.dataset.value === "true",
                        },
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
                        target: {
                          name: e.target.name,
                          value: e.target.dataset.value === "true",
                        },
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
              <div className="chart-select-wrapper">
                <select
                  className="chart-select"
                  name="legendPosition"
                  value={properties.legendPosition || "bottom"}
                  onChange={handlePropertyChange}
                >
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>
            </label>
          </>
        )}
        {chartOptions.chartType === "Gantt Chart" && (
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
                        target: {
                          name: e.target.name,
                          value: e.target.dataset.value === "true",
                        },
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
                        target: {
                          name: e.target.name,
                          value: e.target.dataset.value === "true",
                        },
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
              <div className="chart-select-wrapper">
                <select
                  className="chart-select"
                  name="legendPosition"
                  value={properties.legendPosition || "bottom"}
                  onChange={handlePropertyChange}
                >
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>
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
        {chartOptions.chartType === "treemap" && (
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
                        target: {
                          name: e.target.name,
                          value: e.target.dataset.value === "true",
                        },
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
                        target: {
                          name: e.target.name,
                          value: e.target.dataset.value === "true",
                        },
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
              <div className="chart-select-wrapper">
                <select
                  className="chart-select"
                  name="options.legend.position"
                  value={properties["options.legend.position"] || "bottom"}
                  onChange={handlePropertyChange}
                >
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>
            </label>
          </>
        )}
        {/* Mixed Chart */}
        {chartOptions.chartType === "mixed" && (
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
                        target: {
                          name: e.target.name,
                          value: e.target.dataset.value === "true",
                        },
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
                        target: {
                          name: e.target.name,
                          value: e.target.dataset.value === "true",
                        },
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
              <div className="chart-select-wrapper">
                <select
                  className="chart-select"
                  name="options.legend.position"
                  value={properties["options.legend.position"] || "bottom"}
                  onChange={handlePropertyChange}
                >
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>
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
        {chartOptions.chartType === "radialBar" && (
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
                        target: {
                          name: e.target.name,
                          value: e.target.dataset.value === "true",
                        },
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
                        target: {
                          name: e.target.name,
                          value: e.target.dataset.value === "true",
                        },
                      })
                    }
                  />
                  No
                </label>
              </div>
            </label>
          </>
        )}
        {chartOptions.chartType === "card" && (
          <>
            {/* Title */}
            <label className="chart-properties-labels">
              Title:
              <input
                type="text"
                name="options.title"
                value={properties["options.title"] || ""}
                onChange={handlePropertyChange}
              />
            </label>
            {/* Background Color */}
            <label className="chart-properties-labels">
              Background Color:
              <input
                type="color"
                name="options.background"
                value={properties["options.background"] || "#ffffff"}
                onChange={handlePropertyChange}
              />
            </label>
          </>
        )}
        {/* TABLE */}
        {chartOptions.chartType === "table" && (
          <>
            {/* Title */}
            <label className="chart-properties-labels">
              Title:
              <input
                type="text"
                name="options.title"
                value={properties["options.title"] || ""}
                onChange={handlePropertyChange}
              />
            </label>
          </>
        )}
        {/* Image */}
        {chartOptions.chartType === "Image" && (
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
              <p className="grid-data-paragraph">Grids</p>
              <div className="grid-data-circle">7</div>
            </div>
            <div className="another-container-grid-data">
              <div className="c1">
                <img
                  src={C1}
                  alt="logo"
                  onClick={() => handleColumns(1, 1, [{ colWidth: "100%" }])}
                />
              </div>
              <div className="c1">
                <img
                  src={C2}
                  alt="logo"
                  onClick={() =>
                    handleColumns(1, 2, [
                      { colWidth: "50%" },
                      { colWidth: "50%" },
                    ])
                  }
                />
              </div>
              <div className="c1">
                <img
                  src={C3}
                  alt="logo"
                  onClick={() =>
                    handleColumns(1, 3, [
                      { colWidth: "33.33%" },
                      { colWidth: "33.33%" },
                      { colWidth: "33.33%" },
                    ])
                  }
                />
              </div>
              <div className="c1">
                <img
                  src={C4}
                  alt="logo"
                  onClick={() =>
                    handleColumns(1, 4, [
                      { colWidth: "25%" },
                      { colWidth: "25%" },
                      { colWidth: "25%" },
                      { colWidth: "25%" },
                    ])
                  }
                />
              </div>
              <div className="c1">
                <img
                  src={C5}
                  alt="logo"
                  onClick={() =>
                    handleColumns(1, 2, [
                      { colWidth: "20%" },
                      { colWidth: "80%" },
                    ])
                  }
                />
              </div>
              <div className="c1">
                <img
                  src={C6}
                  alt="logo"
                  onClick={() =>
                    handleColumns(1, 2, [
                      { colWidth: "80%" },
                      { colWidth: "20%" },
                    ])
                  }
                />
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
                <p className="grid-data-paragraph">Charts</p>
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
              <p className="grid-data-paragraph">Components</p>
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
                  onClick={() => handleChartSelection("card")}
                >
                  <img src={W1} alt="logo" />
                  <p>Card</p>
                </div>
                {/* Table */}
                <div
                  className="b-chart"
                  onClick={() => handleChartSelection("table")}
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
                  selectedComponent === "typography" ? null : "typography"
                )
              }
            >
              <img src={Rarrow} alt="logo" />
              <p className="grid-data-paragraph">Typography</p>
              <div className="grid-data-circle">1</div>
            </div>

            {selectedComponent === "typography" && (
              <div className="chart-list">
                {/* Typography */}
                <div
                  className="b-chart"
                  onClick={() => handleChartSelection("typography")}
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
              <p className="editor-para-data-c">{chartOptions.chartType}</p>
            </div>
            {/* Dataset */}
            {chartOptions?.chartType != "typography" && (
              <div>
                {chartOptions?.chartType && (
                  <div>
                    <Select
                      className="select-container"
                      classNamePrefix="react-select"
                      options={
                        datasets
                          ? datasets.map((item) => ({
                              label: item.datasetTitle,
                              value: item.datasetId,
                            }))
                          : []
                      }
                      isMulti={true}
                      value={
                        chartOptions && chartOptions["datasets"]
                          ? chartOptions["datasets"].map((dataset) => ({
                              label: dataset.datasetTitle,
                              value: dataset.datasetId,
                            }))
                          : []
                      }
                      onChange={(selectedOptions) => {
                        handleChange(
                          selectedOptions
                            ? selectedOptions.map((option) => ({
                                datasetTitle: option.label,
                                datasetId: option.value,
                              }))
                            : []
                        );
                      }}
                      placeholder="Select dataset"
                      closeMenuOnSelect={false}
                    />
                  </div>
                )}
                <TableRelations datasets={datasets} />
              </div>
            )}

            {/* Series */}
            {[
              "line",
              "verticalbarchart",
              "horizontalbarchart",
              "horizontalbarchart",
              "100stackedverticalbarchart",
              "100stackedhorizontalbarchart",
              "stackedverticalbar",
              "stackedhorizontalbar",
              "area",
              "mixed",
            ].includes(chartOptions.chartType) && (
              <>
                <div>
                  <Formik
                    initialValues={
                      chartOptions.formValues || {
                        category: { column: "", datasetName: "", function: "" },
                        series: [
                          {
                            type: "",
                            name: "",
                            column: "",
                            datasetName: "",
                            groupBy: "",
                          },
                        ],
                        whereConditions: [
                          {
                            operator: "",
                            value: "",
                            column: "",
                            datasetName: "",
                          },
                        ],
                        groupBy: "no",
                        aggregateFunction: "",
                        setLimit: false,
                        limit: {
                          column: "",
                          datasetName: "",
                          limit: 0,
                          type: "ASC",
                        },
                      }
                    }
                    enableReinitialize={true}
                    validationSchema={Yup.object().shape({
                      category: Yup.object().shape({
                        column: Yup.string().required(
                          "Category column is required"
                        ),
                        datasetName: Yup.string().required(
                          "Category dataset name is required"
                        ),
                        function: Yup.string(),
                      }),
                      whereConditions: Yup.array().of(
                        Yup.object().shape({
                          operator: Yup.string().required(
                            "Operator is required"
                          ),
                          value: Yup.string().required("Value is required"),
                          column: Yup.string().required("Column is required"),
                          datasetName: Yup.string().required(
                            "Dataset is required"
                          ),
                        })
                      ),
                      series: Yup.array().of(
                        Yup.object().shape({
                          column: Yup.string().required(
                            "Series column is required"
                          ),
                          datasetName: Yup.string().required(
                            "Series dataset name is required"
                          ),
                          name: Yup.string(),
                          type: Yup.string(),
                        })
                      ),
                      setLimit: Yup.boolean(),
                      // limit: Yup.object().when("setLimit", {
                      //   is: (setLimit) => setLimit === true || setLimit === "true",
                      //   then: Yup.object().shape({
                      //     limit: Yup.number()
                      //       .min(1, "Limit should be greater than zero")
                      //       .required("Limit is required"),
                      //     column: Yup.string().required("Column is required"),
                      //     datasetName: Yup.string().required("Dataset is required"),
                      //     type: Yup.string().required("Sorting type is required"),
                      //   }),
                      //   otherwise: Yup.object().shape({
                      //     limit: Yup.mixed().notRequired(),
                      //     column: Yup.mixed().notRequired(),
                      //     datasetName: Yup.mixed().notRequired(),
                      //     type: Yup.mixed().notRequired(),
                      //   }),
                      // }),
                    })}
                    onSubmit={(values) => {
                      handleSubmit(values);
                    }}
                  >
                    {({ values, errors, touched, setFieldValue }) => (
                      <Form>
                        {/* Category Dropdown */}
                        <div>
                          <label htmlFor="category" className="label-category">
                            Category:
                          </label>
                          <Select
                            options={categoriesOptions}
                            value={categoriesOptions.find((option) => {
                              const parsedValue = JSON.parse(option.value);
                              return (
                                parsedValue.column === values.category.column &&
                                parsedValue.datasetName ===
                                  values.category.datasetName
                              );
                            })}
                            onChange={(selectedOption) => {
                              const parsedValue = JSON.parse(
                                selectedOption.value
                              );
                              setFieldValue("category", {
                                column: parsedValue.column,
                                datasetName: parsedValue.datasetName,
                              });
                            }}
                            className="select-container"
                            classNamePrefix="react-select"
                            placeholder="Choose Category"
                          />
                          {errors.category && touched.category && (
                            <div style={{ color: "red" }}>
                              {errors.category.column ||
                                errors.category.datasetName}
                            </div>
                          )}
                        </div>

                        {/* Group By Radio Buttons */}
                        <div>
                          <label className="label-category-group">
                            Group By:
                          </label>
                          <div className="radio-group-container">
                            <label className="radio-option">
                              <Field
                                type="radio"
                                name="groupBy"
                                value="yes"
                                checked={values.groupBy === "yes"}
                                onChange={() => setFieldValue("groupBy", "yes")}
                              />
                              Yes
                            </label>
                            <label className="radio-option">
                              <Field
                                type="radio"
                                name="groupBy"
                                value="no"
                                checked={values.groupBy === "no"}
                                onChange={() => setFieldValue("groupBy", "no")}
                              />
                              No
                            </label>
                          </div>
                        </div>

                        {/* Aggregate Function Dropdown (Visible if Group By is "Yes") */}
                        {values.groupBy === "yes" && (
                          <div>
                            <label
                              htmlFor="aggregateFunction"
                              className="label-category-group"
                            >
                              Select Aggregate Function:
                            </label>
                            <Select
                              options={Object.keys(aggregateFunctions).map(
                                (func) => ({
                                  label: func,
                                  value: func,
                                })
                              )}
                              value={
                                values.aggregateFunction
                                  ? {
                                      label: values.aggregateFunction,
                                      value: values.aggregateFunction,
                                    }
                                  : null
                              }
                              onChange={(selectedFunc) => {
                                setFieldValue(
                                  "aggregateFunction",
                                  selectedFunc.value
                                );
                              }}
                              className="select-container"
                              classNamePrefix="react-select"
                              placeholder="Select function"
                            />
                            {errors.aggregateFunction &&
                              touched.aggregateFunction && (
                                <div style={{ color: "red" }}>
                                  {errors.aggregateFunction}
                                </div>
                              )}
                          </div>
                        )}

                        {/* Series Field Array */}
                        <FieldArray name="series">
                          {({ push, remove }) => (
                            <>
                              {values.series.map((seriesItem, index) => (
                                <div key={index}>
                                  {chartOptions.chartType === "mixed" && (
                                    <div>
                                      <label
                                        htmlFor={`series[${index}].type`}
                                        className="label-category-group"
                                      >
                                        Chart Type:
                                      </label>
                                      <Select
                                        options={chartTypes}
                                        value={chartTypes.find(
                                          (type) =>
                                            type.value === seriesItem.type
                                        )}
                                        onChange={(selectedType) => {
                                          setFieldValue(
                                            `series[${index}].type`,
                                            selectedType.value
                                          );
                                        }}
                                        className="select-container"
                                        classNamePrefix="react-select"
                                        placeholder="Choose Series"
                                      />
                                      {errors.series?.[index]?.type &&
                                        touched.series?.[index]?.type && (
                                          <div style={{ color: "red" }}>
                                            {errors.series[index].type}
                                          </div>
                                        )}
                                    </div>
                                  )}

                                  <div>
                                    <label
                                      htmlFor={`series[${index}].column`}
                                      className="label-category-group"
                                    >
                                      Series {index + 1}:
                                    </label>
                                    <Select
                                      options={categoriesOptions}
                                      value={categoriesOptions.find(
                                        (option) => {
                                          const parsedValue = JSON.parse(
                                            option.value
                                          );
                                          return (
                                            parsedValue.column ===
                                              seriesItem.column &&
                                            parsedValue.datasetName ===
                                              seriesItem.datasetName
                                          );
                                        }
                                      )}
                                      onChange={(selectedOption) => {
                                        const parsedValue = JSON.parse(
                                          selectedOption.value
                                        );
                                        setFieldValue(
                                          `series[${index}].column`,
                                          parsedValue.column
                                        );
                                        setFieldValue(
                                          `series[${index}].datasetName`,
                                          parsedValue.datasetName
                                        );
                                      }}
                                      className="select-container"
                                      classNamePrefix="react-select"
                                      placeholder="Choose Series"
                                    />
                                    {errors.series?.[index]?.column &&
                                      touched.series?.[index]?.column && (
                                        <div style={{ color: "red" }}>
                                          {errors.series[index].column ||
                                            errors.series[index].datasetName}
                                        </div>
                                      )}
                                  </div>

                                  {chartOptions.chartType != "mixed" && (
                                    <div>
                                      <label className="label-category-group">
                                        Group By:
                                      </label>
                                      <div className="radio-group-container">
                                        <label className="radio-option">
                                          <Field
                                            type="radio"
                                            name={`series[${index}].groupBy`}
                                            value="yes"
                                            checked={
                                              seriesItem.groupBy === "yes"
                                            }
                                            onChange={() =>
                                              setFieldValue(
                                                `series[${index}].groupBy`,
                                                "yes"
                                              )
                                            }
                                          />
                                          Yes
                                        </label>
                                        <label className="radio-option">
                                          <Field
                                            type="radio"
                                            name={`series[${index}].groupBy`}
                                            value="no"
                                            checked={
                                              seriesItem.groupBy === "no"
                                            }
                                            onChange={() =>
                                              setFieldValue(
                                                `series[${index}].groupBy`,
                                                "no"
                                              )
                                            }
                                          />
                                          No
                                        </label>
                                      </div>
                                    </div>
                                  )}

                                  {/* <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    style={{ marginTop: "10px", cursor: "pointer", color: "red", background: "none", border: "none" }}
                                    className="text-end mt-2"
                                  >
                                    <FontAwesomeIcon className="ms-2 text-danger" icon={faTrash} size="2x" />
                                  </button> */}
                                </div>
                              ))}

                              {chartOptions.chartType == "mixed" && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    push({
                                      column: "",
                                      name: "",
                                      type: "",
                                      datasetName: "",
                                      groupBy: "no",
                                    })
                                  }
                                  style={{
                                    cursor: "pointer",
                                    color: "green",
                                    background: "none",
                                    border: "none",
                                  }}
                                  className="text-center"
                                >
                                  <FontAwesomeIcon
                                    icon={faPlusCircle}
                                    size="1x"
                                  />{" "}
                                  Add
                                </button>
                              )}
                            </>
                          )}
                        </FieldArray>

                        <WhereConditions
                          values={values}
                          errors={errors}
                          touched={touched}
                          setFieldValue={setFieldValue}
                          categoriesOptions={categoriesOptions}
                          dataset={chartOptions["datasets"]}
                        />

                        <LimitSortField
                          values={values}
                          errors={errors}
                          touched={touched}
                          setFieldValue={setFieldValue}
                          categoriesOptions={categoriesOptions}
                        />

                        {/* Submit Button */}
                        <button type="submit" style={{ marginTop: "20px" }}>
                          Load Chart
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </>
            )}
            {["pie", "donut", "radialBar"].includes(chartOptions.chartType) && (
              <>
                <Formik
                  initialValues={
                    chartOptions.formValues || {
                      category: { column: "", datasetName: "", function: "" },
                      whereConditions: [
                        {
                          operator: "",
                          value: "",
                          column: "",
                          datasetName: "",
                        },
                      ],
                      series: { column: "", datasetName: "" },
                      aggregateFunction: "",
                      groupBy: "",
                    }
                  }
                  enableReinitialize={true}
                  validationSchema={Yup.object().shape({
                    category: Yup.object().shape({
                      column: Yup.string().required(
                        "Category column is required"
                      ),
                      datasetName: Yup.string().required(
                        "Category dataset name is required"
                      ),
                    }),
                    whereConditions: Yup.array().of(
                      Yup.object().shape({
                        operator: Yup.string().required("Operator is required"),
                        value: Yup.string().required("Value is required"),
                        column: Yup.string().required("Column is required"),
                        datasetName: Yup.string().required(
                          "Dataset is required"
                        ),
                      })
                    ),
                    aggregateFunction: Yup.string(),
                    groupBy: Yup.string(),
                    series: Yup.object().shape({
                      column: Yup.string().required(
                        "Series column is required"
                      ),
                      datasetName: Yup.string().required(
                        "Series dataset name is required"
                      ),
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
                        <label htmlFor="category" className="label-category">
                          Category:
                        </label>
                        <Select
                          options={categoriesOptions}
                          value={categoriesOptions.find((option) => {
                            const parsedValue = JSON.parse(option.value);
                            return (
                              parsedValue.column === values.category.column &&
                              parsedValue.datasetName ===
                                values.category.datasetName
                            );
                          })}
                          onChange={(selectedOption) => {
                            const parsedValue = JSON.parse(
                              selectedOption.value
                            );
                            setFieldValue("category", {
                              column: parsedValue.column,
                              datasetName: parsedValue.datasetName,
                            });
                          }}
                          className="select-container"
                          classNamePrefix="react-select"
                          placeholder="Choose Category"
                        />
                        {touched.category && errors.category && (
                          <div style={{ color: "red" }}>
                            {errors.category.column ||
                              errors.category.datasetName}
                          </div>
                        )}
                      </div>

                      {/* Group By Radio Buttons */}
                      <div className="mt-3">
                        <label className="label-category-group">
                          Group By:
                        </label>
                        <div className="radio-group-container">
                          <label className="radio-option">
                            <Field
                              type="radio"
                              name="groupBy"
                              value="yes"
                              checked={values.groupBy === "yes"}
                              onChange={() => setFieldValue("groupBy", "yes")}
                            />
                            Yes
                          </label>
                          <label className="radio-option">
                            <Field
                              type="radio"
                              name="groupBy"
                              value="no"
                              checked={values.groupBy === "no"}
                              onChange={() => setFieldValue("groupBy", "no")}
                            />
                            No
                          </label>
                        </div>
                      </div>

                      {/* Aggregate Function Dropdown (Visible if Group By is "Yes") */}
                      {values.groupBy === "yes" && (
                        <div className="mt-2">
                          <label
                            htmlFor="aggregateFunction"
                            className="label-category-group"
                          >
                            Select Aggregate Function:
                          </label>
                          <Select
                            options={Object.keys(aggregateFunctions).map(
                              (func) => ({
                                label: func,
                                value: func,
                              })
                            )}
                            value={
                              values.aggregateFunction
                                ? {
                                    label: values.aggregateFunction,
                                    value: values.aggregateFunction,
                                  }
                                : null
                            }
                            onChange={(selectedFunc) => {
                              setFieldValue(
                                "aggregateFunction",
                                selectedFunc.value
                              );
                            }}
                            className="select-container"
                            classNamePrefix="react-select"
                            placeholder="Select function"
                          />
                          {errors.aggregateFunction &&
                            touched.aggregateFunction && (
                              <div style={{ color: "red" }}>
                                {errors.aggregateFunction}
                              </div>
                            )}
                        </div>
                      )}

                      {/* Series Dropdown */}
                      <div>
                        <label
                          htmlFor="series"
                          className="label-category-group"
                        >
                          Series:
                        </label>
                        <Select
                          options={categoriesOptions}
                          value={categoriesOptions.find((option) => {
                            const parsedValue = JSON.parse(option.value);
                            return (
                              parsedValue.column === values.series.column &&
                              parsedValue.datasetName ===
                                values.series.datasetName
                            );
                          })}
                          onChange={(selectedOption) => {
                            const parsedValue = JSON.parse(
                              selectedOption.value
                            );
                            setFieldValue("series", {
                              column: parsedValue.column,
                              datasetName: parsedValue.datasetName,
                            });
                          }}
                          className="select-container"
                          classNamePrefix="react-select"
                          placeholder="Choose Series"
                        />

                        {touched.series && errors.series && (
                          <div style={{ color: "red" }}>
                            {errors.series.column || errors.series.datasetName}
                          </div>
                        )}
                      </div>

                      {/* Where Conditions Field */}
                      <WhereConditions
                        values={values}
                        errors={errors}
                        touched={touched}
                        setFieldValue={setFieldValue}
                        categoriesOptions={categoriesOptions}
                        dataset={chartOptions["datasets"]}
                      />
                      {/* Submit Button */}
                      <button type="submit" style={{ marginTop: "20px" }}>
                        Load Chart
                      </button>
                    </Form>
                  )}
                </Formik>
              </>
            )}
            {["treemap"].includes(chartOptions.chartType) && (
              <>
                <Formik
                  enableReinitialize={true}
                  initialValues={{
                    x: chartOptions?.formValues?.x || {
                      column: "",
                      datasetName: "",
                    },
                    y: chartOptions?.formValues?.y || {
                      column: "",
                      datasetName: "",
                    },
                  }}
                  validationSchema={Yup.object().shape({
                    x: Yup.object({
                      column: Yup.string().required("X column is required"),
                      datasetName: Yup.string().required(
                        "X datasetName is required"
                      ),
                    }).required(),
                    y: Yup.object({
                      column: Yup.string().required("Y column is required"),
                      datasetName: Yup.string().required(
                        "Y datasetName is required"
                      ),
                    }).required(),
                  })}
                  onSubmit={(values) => {
                    handleSubmit(values);
                  }}
                >
                  {({ values, errors, touched, setFieldValue }) => (
                    <Form>
                      {/* Dropdown for X */}
                      <div>
                        <label htmlFor="x" className="label-category-group">
                          X:
                        </label>
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
                            const parsedValue = JSON.parse(
                              selectedOption.value
                            );
                            setFieldValue("x", {
                              column: parsedValue.column,
                              datasetName: parsedValue.datasetName,
                            });
                          }}
                          className="select-container"
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
                        <label htmlFor="y" className="label-category-group">
                          Y:
                        </label>
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
                            const parsedValue = JSON.parse(
                              selectedOption.value
                            );
                            setFieldValue("y", {
                              column: parsedValue.column,
                              datasetName: parsedValue.datasetName,
                            });
                          }}
                          className="select-container"
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
            )}
            {["scatter"].includes(chartOptions.chartType) && (
              <>
                <Formik
                  enableReinitialize={true}
                  initialValues={
                    chartOptions?.formValues || {
                      series: [
                        {
                          name: "",
                          x: { column: "", datasetName: "" },
                          y: { column: "", datasetName: "" },
                        },
                      ],
                      whereConditions: [],
                    }
                  }
                  validationSchema={Yup.object().shape({
                    series: Yup.array()
                      .of(
                        Yup.object().shape({
                          name: Yup.string().required(
                            "Series name is required"
                          ),

                          x: Yup.object()
                            .shape({
                              column: Yup.string().required(
                                "X column is required"
                              ),
                              datasetName: Yup.string().required(
                                "X dataset name is required"
                              ),
                            })
                            .required("X object is required"),

                          y: Yup.object()
                            .shape({
                              column: Yup.string().required(
                                "Y column is required"
                              ),
                              datasetName: Yup.string().required(
                                "Y dataset name is required"
                              ),
                            })
                            .required("Y object is required"),
                        })
                      )
                      .required("Series is required"),
                    whereConditions: Yup.array().of(
                      Yup.object().shape({
                        operator: Yup.string().required("Operator is required"),
                        value: Yup.string().required("Value is required"),
                        column: Yup.string().required("Column is required"),
                        datasetName: Yup.string().required(
                          "Dataset is required"
                        ),
                      })
                    ),
                  })}
                  onSubmit={(values) => {
                    handleSubmit(values);
                  }}
                >
                  {({ values, errors, touched, setFieldValue }) => (
                    <Form>
                      {/* Field Array for Series */}
                      <FieldArray name="series">
                        {({ push, remove }) => (
                          <>
                            {values?.series?.map((seriesItem, index) => (
                              <div
                                key={index}
                                style={{
                                  marginBottom: "20px",
                                  border: "1px solid #ccc",
                                  padding: "10px",
                                  borderRadius: "5px",
                                }}
                              >
                                {/* Name Input */}
                                <div>
                                  <label
                                    htmlFor={`series[${index}].name`}
                                    className="label-category-group"
                                  >
                                    Value:
                                  </label>
                                  <Field
                                    className="form-control"
                                    name={`series[${index}].name`}
                                    placeholder="Enter Value"
                                  />
                                  {errors.series &&
                                    errors.series[index]?.name &&
                                    touched.series &&
                                    touched.series[index]?.name && (
                                      <div style={{ color: "red" }}>
                                        {errors.series[index]?.name}
                                      </div>
                                    )}
                                </div>

                                {/* Dropdown for X */}
                                <div>
                                  <label
                                    htmlFor={`series[${index}].x`}
                                    className="label-category-group"
                                  >
                                    X:
                                  </label>
                                  <Select
                                    options={categoriesOptions}
                                    value={categoriesOptions.find((option) => {
                                      const parsedValue = JSON.parse(
                                        option.value
                                      );
                                      return (
                                        parsedValue.column ===
                                          seriesItem?.x?.column &&
                                        parsedValue.datasetName ===
                                          seriesItem?.x?.datasetName
                                      );
                                    })}
                                    onChange={(selectedOption) => {
                                      const parsedValue = JSON.parse(
                                        selectedOption.value
                                      );
                                      setFieldValue(`series[${index}].x`, {
                                        column: parsedValue.column,
                                        datasetName: parsedValue.datasetName,
                                      });
                                    }}
                                    className="select-container"
                                    classNamePrefix="react-select"
                                    placeholder="Choose X"
                                  />
                                  {errors.series &&
                                    errors.series[index]?.x &&
                                    touched.series &&
                                    touched.series[index]?.x && (
                                      <div style={{ color: "red" }}>
                                        {errors.series[index]?.x?.column ||
                                          errors.series[index]?.x?.datasetName}
                                      </div>
                                    )}
                                </div>

                                {/* Dropdown for Y */}
                                <div>
                                  <label
                                    htmlFor={`series[${index}].y`}
                                    className="label-category-group"
                                  >
                                    Y:
                                  </label>
                                  <Select
                                    options={categoriesOptions}
                                    value={categoriesOptions.find((option) => {
                                      const parsedValue = JSON.parse(
                                        option.value
                                      );
                                      return (
                                        parsedValue.column ===
                                          seriesItem?.y?.column &&
                                        parsedValue.datasetName ===
                                          seriesItem?.y?.datasetName
                                      );
                                    })}
                                    onChange={(selectedOption) => {
                                      const parsedValue = JSON.parse(
                                        selectedOption.value
                                      );
                                      setFieldValue(`series[${index}].y`, {
                                        column: parsedValue.column,
                                        datasetName: parsedValue.datasetName,
                                      });
                                    }}
                                    className="select-container"
                                    classNamePrefix="react-select"
                                    placeholder="Choose Y"
                                  />
                                  {errors.series &&
                                    errors.series[index]?.y &&
                                    touched.series &&
                                    touched.series[index]?.y && (
                                      <div style={{ color: "red" }}>
                                        {errors.series[index]?.y?.column ||
                                          errors.series[index]?.y?.datasetName}
                                      </div>
                                    )}
                                </div>

                                {/* Remove Button */}
                                <div className="text-center mt-2">
                                  <a
                                    type="button"
                                    onClick={() => remove(index)}
                                    style={{ cursor: "pointer", color: "red" }}
                                    title="Remove this condition"
                                  >
                                    <FontAwesomeIcon icon={faTrash} size="2x" />
                                  </a>
                                </div>
                              </div>
                            ))}

                            {/* Add Button */}
                            <div style={{ marginTop: "10px" }}>
                              <button
                                type="button"
                                onClick={() =>
                                  push({
                                    name: "",
                                    x: { column: "", datasetName: "" },
                                    y: { column: "", datasetName: "" },
                                  })
                                }
                                style={{
                                  cursor: "pointer",
                                  color: "green",
                                  background: "none",
                                  border: "none",
                                }}
                                title="Add a new condition"
                              >
                                <FontAwesomeIcon
                                  icon={faPlusCircle}
                                  size="1x"
                                />{" "}
                                Add
                              </button>
                            </div>
                          </>
                        )}
                      </FieldArray>

                      {/* Where Conditions Field */}
                      <WhereConditions
                        values={values}
                        errors={errors}
                        touched={touched}
                        setFieldValue={setFieldValue}
                        categoriesOptions={categoriesOptions}
                        dataset={chartOptions["datasets"]}
                      />

                      {/* Submit Button */}
                      <button type="submit" style={{ marginTop: "20px" }}>
                        Load Data
                      </button>
                    </Form>
                  )}
                </Formik>
              </>
            )}
            {["bubblechart", "bubblechart3d"].includes(
              chartOptions.chartType
            ) && (
              <>
                <Formik
                  enableReinitialize={true}
                  initialValues={
                    chartOptions.formValues &&
                    chartOptions.formValues.datasets &&
                    Array.isArray(chartOptions.formValues.datasets) &&
                    chartOptions.formValues.datasets.length > 0
                      ? { datasets: chartOptions.formValues.datasets }
                      : {
                          datasets: [
                            {
                              name: "",
                              data: {
                                x: { column: "", datasetName: "" },
                                y: { column: "", datasetName: "" },
                                z: { column: "", datasetName: "" },
                              },
                            },
                          ],
                        }
                  }
                  validationSchema={Yup.object().shape({
                    datasets: Yup.array().of(
                      Yup.object().shape({
                        name: Yup.string().required("Name is required"),
                        data: Yup.object().shape({
                          x: Yup.object().shape({
                            column: Yup.string().required(
                              "Column for X is required"
                            ),
                            datasetName: Yup.string().required(
                              "Dataset for X is required"
                            ),
                          }),
                          y: Yup.object().shape({
                            column: Yup.string().required(
                              "Column for Y is required"
                            ),
                            datasetName: Yup.string().required(
                              "Dataset for Y is required"
                            ),
                          }),
                          z: Yup.object().shape({
                            column: Yup.string().required(
                              "Column for Z is required"
                            ),
                            datasetName: Yup.string().required(
                              "Dataset for Z is required"
                            ),
                          }),
                        }),
                      })
                    ),
                  })}
                  onSubmit={(values) => {
                    console.log("Submitted Values:", values);
                    handleSubmit(values);
                  }}
                >
                  {({ values, errors, touched, setFieldValue }) => (
                    <Form>
                      <FieldArray name="datasets">
                        {({ push, remove }) => (
                          <>
                            {values.datasets.map((item, index) => (
                              <div
                                key={index}
                                style={{
                                  border: "1px solid #ccc",
                                  padding: "5px",
                                }}
                              >
                                {/* Name Field */}
                                <div>
                                  <label
                                    htmlFor={`datasets[${index}].name`}
                                    className="label-category-group"
                                  >
                                    Name:
                                  </label>
                                  <Field
                                    className="form-control"
                                    id={`datasets[${index}].name`}
                                    name={`datasets[${index}].name`}
                                    placeholder="Enter a name"
                                  />
                                  {errors.datasets &&
                                    errors.datasets[index]?.name &&
                                    touched.datasets &&
                                    touched.datasets[index]?.name && (
                                      <div style={{ color: "red" }}>
                                        {errors.datasets[index].name}
                                      </div>
                                    )}
                                </div>

                                {/* Dropdown for X */}
                                <div>
                                  <label
                                    htmlFor={`datasets[${index}].data.x`}
                                    className="label-category-group"
                                  >
                                    X:
                                  </label>
                                  <Select
                                    options={categoriesOptions}
                                    value={categoriesOptions.find((option) => {
                                      const parsedValue = JSON.parse(
                                        option.value
                                      );
                                      return (
                                        parsedValue.column ===
                                          item.data.x.column &&
                                        parsedValue.datasetName ===
                                          item.data.x.datasetName
                                      );
                                    })}
                                    onChange={(selectedOption) => {
                                      const parsedValue = JSON.parse(
                                        selectedOption.value
                                      );
                                      setFieldValue(
                                        `datasets[${index}].data.x`,
                                        {
                                          column: parsedValue.column,
                                          datasetName: parsedValue.datasetName,
                                        }
                                      );
                                    }}
                                    className="select-container"
                                    classNamePrefix="react-select"
                                    placeholder="Choose X"
                                  />
                                  {errors.datasets &&
                                    errors.datasets[index]?.data?.x &&
                                    touched.datasets &&
                                    touched.datasets[index]?.data?.x && (
                                      <div style={{ color: "red" }}>
                                        {errors.datasets[index].data.x}
                                      </div>
                                    )}
                                </div>

                                {/* Dropdown for Y */}
                                <div>
                                  <label
                                    htmlFor={`datasets[${index}].data.y`}
                                    className="label-category-group"
                                  >
                                    Y:
                                  </label>
                                  <Select
                                    options={categoriesOptions}
                                    value={categoriesOptions.find((option) => {
                                      const parsedValue = JSON.parse(
                                        option.value
                                      );
                                      return (
                                        parsedValue.column ===
                                          item.data.y.column &&
                                        parsedValue.datasetName ===
                                          item.data.y.datasetName
                                      );
                                    })}
                                    onChange={(selectedOption) => {
                                      const parsedValue = JSON.parse(
                                        selectedOption.value
                                      );
                                      setFieldValue(
                                        `datasets[${index}].data.y`,
                                        {
                                          column: parsedValue.column,
                                          datasetName: parsedValue.datasetName,
                                        }
                                      );
                                    }}
                                    className="select-container"
                                    classNamePrefix="react-select"
                                    placeholder="Choose Y"
                                  />
                                  {errors.datasets &&
                                    errors.datasets[index]?.data?.y &&
                                    touched.datasets &&
                                    touched.datasets[index]?.data?.y && (
                                      <div style={{ color: "red" }}>
                                        {errors.datasets[index].data.y}
                                      </div>
                                    )}
                                </div>

                                {/* Dropdown for Z */}
                                <div>
                                  <label
                                    htmlFor={`datasets[${index}].data.z`}
                                    className="label-category-group"
                                  >
                                    Z:
                                  </label>
                                  <Select
                                    options={categoriesOptions}
                                    value={categoriesOptions.find((option) => {
                                      const parsedValue = JSON.parse(
                                        option.value
                                      );
                                      return (
                                        parsedValue.column ===
                                          item.data.z.column &&
                                        parsedValue.datasetName ===
                                          item.data.z.datasetName
                                      );
                                    })}
                                    onChange={(selectedOption) => {
                                      const parsedValue = JSON.parse(
                                        selectedOption.value
                                      );
                                      setFieldValue(
                                        `datasets[${index}].data.z`,
                                        {
                                          column: parsedValue.column,
                                          datasetName: parsedValue.datasetName,
                                        }
                                      );
                                    }}
                                    className="select-container"
                                    classNamePrefix="react-select"
                                    placeholder="Choose Z"
                                  />
                                  {errors.datasets &&
                                    errors.datasets[index]?.data?.z &&
                                    touched.datasets &&
                                    touched.datasets[index]?.data?.z && (
                                      <div style={{ color: "red" }}>
                                        {errors.datasets[index].data.z}
                                      </div>
                                    )}
                                </div>

                                {/* Remove Dataset Button */}
                                <a
                                  className="text-end"
                                  type="button"
                                  onClick={() => remove(index)}
                                  style={{ marginTop: "10px" }}
                                >
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    size="2x"
                                  ></FontAwesomeIcon>
                                </a>
                              </div>
                            ))}

                            {/* Add Dataset Button */}
                            <button
                              type="button"
                              onClick={() =>
                                push({
                                  name: "",
                                  data: {
                                    x: { column: "", datasetName: "" },
                                    y: { column: "", datasetName: "" },
                                    z: { column: "", datasetName: "" },
                                  },
                                })
                              }
                              style={{
                                cursor: "pointer",
                                color: "green",
                                background: "none",
                                border: "none",
                              }}
                              className="text-center"
                            >
                              <FontAwesomeIcon icon={faPlusCircle} size="1x" />{" "}
                              Add
                            </button>
                          </>
                        )}
                      </FieldArray>

                      {/* Submit Button */}
                      <button type="submit" style={{ marginTop: "20px" }}>
                        Load Data
                      </button>
                    </Form>
                  )}
                </Formik>
              </>
            )}
            {["card"].includes(chartOptions.chartType) && (
              <>
                <Formik
                  enableReinitialize={true}
                  initialValues={
                    chartOptions?.formValues || {
                      column: { column: "", datasetName: "" },
                      function: "",
                      whereConditions: [],
                    }
                  }
                  validationSchema={Yup.object().shape({
                    column: Yup.object({
                      column: Yup.string().required("X column is required"),
                      datasetName: Yup.string().required(
                        "X datasetName is required"
                      ),
                    }).required(),
                    function: Yup.string().required("Function is required"),
                    whereConditions: Yup.array().of(
                      Yup.object().shape({
                        operator: Yup.string().required("Operator is required"),
                        value: Yup.string().required("Value is required"),
                        column: Yup.string().required("Column is required"),
                        datasetName: Yup.string().required(
                          "Dataset is required"
                        ),
                      })
                    ),
                  })}
                  onSubmit={(values) => {
                    handleSubmit(values);
                  }}
                >
                  {({ values, errors, touched, setFieldValue }) => (
                    <Form>
                      {/* Dropdown for Column */}
                      <div>
                        <label
                          htmlFor="column"
                          className="label-category-group"
                        >
                          Select Column:
                        </label>
                        <Select
                          options={categoriesOptions}
                          value={categoriesOptions.find((option) => {
                            const parsedValue = JSON.parse(option.value);
                            return (
                              parsedValue.column === values.column.column &&
                              parsedValue.datasetName ===
                                values.column.datasetName
                            );
                          })}
                          onChange={(selectedOption) => {
                            const parsedValue = JSON.parse(
                              selectedOption.value
                            );
                            setFieldValue("column", {
                              column: parsedValue.column,
                              datasetName: parsedValue.datasetName,
                            });
                          }}
                          className="select-container"
                          classNamePrefix="react-select"
                          placeholder="Choose Column"
                        />
                        {touched.column && errors.column && (
                          <div style={{ color: "red" }}>
                            {errors.column.column || errors.column.datasetName}
                          </div>
                        )}
                      </div>

                      {/* Dropdown for Function */}
                      <div className="mt-2">
                        <label
                          htmlFor="function"
                          className="label-category-group"
                        >
                          Select Aggregate Function:
                        </label>
                        <Select
                          options={Object.keys(aggregateFunctions).map(
                            (func) => ({
                              label: func,
                              value: func,
                            })
                          )}
                          value={
                            values.function
                              ? {
                                  label: values.function,
                                  value: values.function,
                                }
                              : null
                          }
                          onChange={(selectedFunc) => {
                            setFieldValue("function", selectedFunc.value);
                          }}
                          className="select-container"
                          classNamePrefix="react-select"
                          placeholder="Select function"
                        />
                        {errors.function && touched.function && (
                          <div style={{ color: "red" }}>{errors.function}</div>
                        )}
                      </div>

                      {/* Where Conditions Component */}
                      <WhereConditions
                        values={values}
                        errors={errors}
                        touched={touched}
                        setFieldValue={setFieldValue}
                        categoriesOptions={categoriesOptions}
                        dataset={chartOptions["datasets"]}
                      />

                      {/* Submit Button */}
                      <button type="submit" style={{ marginTop: "20px" }}>
                        Load Data
                      </button>
                    </Form>
                  )}
                </Formik>
              </>
            )}
            {["table"].includes(chartOptions.chartType) && (
              <>
                <Formik
                  enableReinitialize={true}
                  initialValues={
                    chartOptions?.formValues || {
                      columns: [{ column: "", datasetName: "", function: "" }],
                      groupColumns: [],
                      whereConditions: [],
                      setLimit: false,
                      limit: {
                        column: "",
                        datasetName: "",
                        limit: 0,
                        type: "ASC",
                      },
                    }
                  }
                  validationSchema={Yup.object().shape({
                    columns: Yup.array()
                      .of(
                        Yup.object().shape({
                          column: Yup.string().required("Column is required"),
                          datasetName: Yup.string().required(
                            "Dataset Name is required"
                          ),
                          function: Yup.string().required(
                            "Function is required"
                          ),
                        })
                      )
                      .min(1, "At least one column must be selected"),
                    groupColumns: Yup.array().of(
                      Yup.object().shape({
                        column: Yup.string().required(
                          "Group Column is required"
                        ),
                        datasetName: Yup.string().required(
                          "Dataset Name is required"
                        ),
                      })
                    ),
                    whereConditions: Yup.array().of(
                      Yup.object().shape({
                        operator: Yup.string().required("Operator is required"),
                        value: Yup.string().required("Value is required"),
                        column: Yup.string().required("Column is required"),
                        datasetName: Yup.string().required(
                          "Dataset is required"
                        ),
                      })
                    ),
                    limit: Yup.object().shape({
                      // Ensure limit is treated as an object
                      limit: Yup.number()
                        .min(1, "Limit should be greater than zero")
                        .required("Limit is required"),
                      column: Yup.string().required("Column is required"),
                      datasetName: Yup.string().required("Dataset is required"),
                      type: Yup.string().required("Sorting type is required"),
                    }),
                    setLimit: Yup.boolean(),
                  })}
                  onSubmit={(values) => {
                    handleSubmit(values);
                  }}
                >
                  {({ values, errors, touched, setFieldValue }) => (
                    <Form>
                      {/* Multi-Select Dropdown for Columns */}
                      <div>
                        <label
                          htmlFor="columns"
                          className="label-category-group"
                        >
                          Select Columns:
                        </label>
                        <Select
                          options={categoriesOptions}
                          isMulti
                          value={values.columns.map((col) =>
                            categoriesOptions.find((option) => {
                              const parsedValue = JSON.parse(option.value);
                              return (
                                parsedValue.column === col.column &&
                                parsedValue.datasetName === col.datasetName
                              );
                            })
                          )}
                          onChange={(selectedOptions) => {
                            const selectedColumns = selectedOptions.map(
                              (option) => JSON.parse(option.value)
                            );

                            // Ensure each column has an associated function
                            const updatedColumns = selectedColumns.map(
                              (col) => ({
                                ...col,
                                function: col.function || "", // Ensure function field exists
                              })
                            );

                            setFieldValue("columns", updatedColumns);
                          }}
                          className="select-container"
                          classNamePrefix="react-select"
                          placeholder="Choose Columns"
                        />
                        {touched.columns && errors.columns && (
                          <div style={{ color: "red" }}>{errors.columns}</div>
                        )}
                      </div>

                      {/* Assign Aggregate Function to Each Column */}
                      <div>
                        {values.columns.map((col, index) => (
                          <div
                            key={index}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginBottom: "10px",
                            }}
                          >
                            <span>
                              {col.column} ({col.datasetName})
                            </span>
                            <Select
                              options={Object.keys(aggregateFunctions).map(
                                (func) => ({
                                  label: func,
                                  value: func,
                                })
                              )}
                              value={
                                col.function
                                  ? { label: col.function, value: col.function }
                                  : null
                              }
                              onChange={(selectedFunc) => {
                                const updatedColumns = [...values.columns];
                                updatedColumns[index].function =
                                  selectedFunc.value;
                                setFieldValue("columns", updatedColumns);
                              }}
                              className="select-container"
                              classNamePrefix="react-select"
                              placeholder="Select function"
                              style={{ marginLeft: "10px", minWidth: "200px" }}
                            />
                          </div>
                        ))}
                      </div>

                      {/* Multi-Select for Group Columns */}
                      <div>
                        <label
                          htmlFor="groupColumns"
                          className="label-category-group"
                        >
                          Select Group Columns:
                        </label>
                        <Select
                          options={categoriesOptions}
                          isMulti
                          value={values?.groupColumns?.map((col) =>
                            categoriesOptions.find((option) => {
                              const parsedValue = JSON.parse(option.value);
                              return (
                                parsedValue.column === col.column &&
                                parsedValue.datasetName === col.datasetName
                              );
                            })
                          )}
                          onChange={(selectedOptions) => {
                            const selectedGroupColumns = selectedOptions.map(
                              (option) => JSON.parse(option.value)
                            );
                            setFieldValue("groupColumns", selectedGroupColumns);
                          }}
                          className="select-container"
                          classNamePrefix="react-select"
                          placeholder="Choose Group Columns"
                        />
                        {touched.groupColumns && errors.groupColumns && (
                          <div style={{ color: "red" }}>
                            {errors.groupColumns}
                          </div>
                        )}
                      </div>

                      {/* Where Conditions Component */}
                      <WhereConditions
                        values={values}
                        errors={errors}
                        touched={touched}
                        setFieldValue={setFieldValue}
                        categoriesOptions={categoriesOptions}
                        dataset={chartOptions["datasets"]}
                      />

                      <LimitSortField
                        values={values}
                        errors={errors}
                        touched={touched}
                        setFieldValue={setFieldValue}
                        categoriesOptions={categoriesOptions}
                      />

                      {/* Submit Button */}
                      <button type="submit" style={{ marginTop: "20px" }}>
                        Load Data
                      </button>
                    </Form>
                  )}
                </Formik>
              </>
            )}
            {renderProperties()}
          </div>
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
            <img src={Logo} alt="logo" className="nav-logo-img" />
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
          {/* <div className="user-permission">
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
          </div> */}
          <div className="first-div-second-row-btn-IV">
            <img src={user?.profileImage} alt="logo" />
            <select
              className="first-div-second-row-btn-IV-select"
              onChange={handleSelectChange}
            >
              <option value="">Select an option</option>
              <option value="settings">Account Settings</option>
              <option value="logout">Logout</option>
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
                className="dashboard-input-title"
                placeholder="Enter dashboard title"
                value={dashboardName}
                onChange={(e) => setDashboardName(e.target.value)}
                onBlur={(e) => handleDashboardName(e.target.value)}
              />
              {/* <img src={Pen} alt="logo" /> */}
              <div className="workspace">
                <Select
                  options={workspaces.map((workspace) => ({
                    label: workspace.workSpaceName,
                    value: workspace.id,
                  }))}
                  value={
                    workspaces.find((w) => w.id === dashboard?.workspaceId)
                      ? {
                          label: workspaces.find(
                            (w) => w.id === dashboard.workspaceId
                          )?.workSpaceName,
                          value: dashboard.workspaceId,
                        }
                      : null
                  }
                  onChange={async (selectedOption) => {
                    if (selectedOption) {
                      const updatedDashboard = {
                        ...dashboard,
                        workspaceId: selectedOption.value,
                        workSpaceName: selectedOption.label,
                      };

                      if (dashboard && dashboard.dashboardId != null) {
                        console.log("Updating dashboard...");
                        await updateDashboard(updatedDashboard);
                      } else {
                        console.log("Adding new dashboard...");
                        updatedDashboard["userId"] = user.id;
                        updatedDashboard["dashboardTitle"] = "Blank";
                        updatedDashboard["organizationId"] =
                          user.organizationId;
                        await addDashboard(updatedDashboard);
                      }
                    }
                  }}
                  className="select-container"
                  classNamePrefix="react-select"
                  placeholder="Choose Series"
                />
              </div>
            </div>
            <div className="sr-CDB">
              {canAccess && (
                <div className="user-permission">
                  <div className="DS">
                    <img src={USER} alt="logo" />
                  </div>

                  <div
                    onClick={() =>
                      navigate(`/set-user-permissions/${dashboard.dashboardId}`)
                    }
                  >
                    <p className="perm-para">User Permissions</p>
                  </div>
                </div>
              )}

              {canAccess && (
                <div className="sr-CDB-I" onClick={handleSaveChart}>
                  <img src={S1} alt="logo" />
                </div>
              )}
              {/* <div>
                <img src={L1} alt="logo" />
              </div> */}
              <div className="sr-CDB-III">
                <div
                  className="sr-CDB-I"
                  onClick={() => {
                    setCut(true);
                    copyGrid();
                  }}
                >
                  <img src={S2} alt="logo" />
                </div>
                <div
                  className="sr-CDB-I"
                  onClick={() => {
                    setCopy(true);
                    copyGrid();
                  }}
                >
                  <img src={S3} alt="logo" />
                </div>
                <div className="sr-CDB-I" onClick={pasteGrid}>
                  <img src={S4} alt="logo" />
                </div>
                <div className="sr-CDB-I" onClick={handleDeleteChart}>
                  <img src={S5} alt="logo" />
                </div>
              </div>
              {/* <div>
                <img src={L1} alt="logo" />
              </div> */}
              {/* <div className="sr-CDB-III">
                <div className="sr-CDB-I">
                  <img src={M2} alt="logo" />
                </div>
                <div className="sr-CDB-I">
                  <img src={M1} alt="logo" />
                </div>
              </div> */}
              {/* <div>
                <img src={L1} alt="logo" />
              </div>
              <div className="sr-CDB-III">
                <div className="sr-CDB-I">
                  <img src={M3} alt="logo" />
                </div>
                <div className="sr-CDB-I">
                  <img src={S6} alt="logo" />
                </div>
              </div> */}
              <div>
                <img src={L1} alt="logo" />
              </div>
              <div className="sr-CDB-III">
                {/* <div className="sr-CDB-I">
                  <img src={M4} alt="logo" />
                </div> */}
                <div className="sr-CDB-I" onClick={handleDownloadPdf}>
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
                <div className="sr-btn-I">
                  <img src={S7} alt="logo" />
                </div>
                <div className="sr-btn-I">
                  <img src={M6} alt="logo" className="sr-img" />
                </div>
              </div>
            </div>
          </div>
          <div ref={printRef}>
            <div style={{ padding: "0px 18px", margin: "10px 0px" }}>
              <DashboardHeader downloading={downloading} />
            </div>
            <div className="parent-container-CDB">{children}</div>
          </div>
        </div>
        {canAccess && (
          <div className="content-CDB-I">
            <div className="main-container-CDB-I">
              <div
                className={`CDB-I-i ${activeTab === "Grids" ? "active" : ""}`}
                onClick={() => setActiveTab("Grids")}
              >
                Grids
              </div>
              <div
                className={`CDB-I-i ${
                  activeTab === "Components" ? "active" : ""
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
            {canAccess && renderContent()}
          </div>
        )}
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
  user: state.login.user,
});
export default connect(mapStateToProps, {
  getDatasets,
  updateDashboard,
  addDashboard,
  saveDashboardChanges,
  getSpecificDashboard,
  removeCurrentDashboard,
  clearLogin,
})(Dashboard);
