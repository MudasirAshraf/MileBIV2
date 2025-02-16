import React, { useState } from "react";
import "./grids.scss";
import Dashboard from "../../components/dashboard";
import Grid from "../../components/grid-charts";
import { updateDashboard } from "../../actions/dashboardActions";
import { connect } from "react-redux";
import { getChartOptions } from "../../data/chartData";
import { toast } from "react-toastify";

const Grids = ({ dashboard, updateDashboard }) => {
  const [grid, setGrid] = useState({});
  const [selectedCharts, setSelectedCharts] = useState([]);
  const [chartOptions, setChartOptions] = useState({});
  const [selectedChart, setSelectedChart] = useState(null);
  const [selectedGridIndex, setSelectedGridIndex] = useState(null);
  const [gridToMoveIndex, setGridToMoveIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleCreateGrid = async (rows, cols, colsdata) => {
    const newGrid = { rows: rows, cols: cols, id: Date.now() };
    setGrid(newGrid);
    if (colsdata) {
      colsdata.forEach(async (col, index) => {
        const newGrid = {
          id: index,
          rows: 1,
          cols: cols,
          colWidth: col.colWidth,
        };

        if (dashboard) {
          dashboard = {
            ...dashboard,
            datasetsTree: [
              ...(dashboard.datasetsTree || []),
              {
                datasetLabel: "Chart",
                iconUrl: "",
                gridHeight: "400",
                grids: newGrid,
              },
            ],
          };
        } else {
          dashboard = {
            datasetsTree: [
              {
                datasetLabel: "Chart",
                iconUrl: "",
                gridHeight: "400",
                grids: newGrid,
              },
            ]
          };
        }
      });
      await updateDashboard(dashboard);
    }
  };

  const handleAddChartToGrid = async (chart) => {
    const options = getChartOptions(chart);
    setSelectedCharts([...selectedCharts, chart]);
    setChartOptions(options);
    // handleCreateGrid(1, 1);
    if (dashboard) {
      let datasetsTree = dashboard?.datasetsTree || [];
      const exitsDatasetTree = datasetsTree.find((d, index) => index == selectedIndex);

      if (exitsDatasetTree) {
        exitsDatasetTree["chartType"] = options.chartType,
          exitsDatasetTree["options"] = options
      }
      // else {
      //   datasetsTree.push({
      //     index: selectedIndex,
      //     chartType: options.chartType,
      //     grids: { rows: 1, cols: 1, id: Date.now(), colIndex: selectedIndex },
      //     options: options,
      //   });
      // }

      const updatedDashboard = {
        ...dashboard,
        datasetsTree: datasetsTree,
      };
      setSelectedChart(chart);
      setChartOptions(options || {});
      await updateDashboard(updatedDashboard);
    }
  };

  const handleSelectGrid = (index, options) => {
    setSelectedIndex(index);
    if (selectedGridIndex === null) {
      setSelectedGridIndex(index);
    } else if (gridToMoveIndex === null) {
      setGridToMoveIndex(index);
    } else {
    }
    setSelectedChart(selectedCharts[index]);
    setChartOptions(options || {});
  };

  const handleUpdateChartOptions = async (updatedOptions) => {
    // Find the dataset with the matching index
    const datasetTree = dashboard.datasetsTree?.find((dataset, index) => index === selectedIndex);

    if (!datasetTree) {
      console.warn("Unable to update chart options: Invalid dashboard or index.");
      return;
    }

    // Create the updated datasetTree with the new options
    const updatedDatasetTree = {
      ...datasetTree,
      options: updatedOptions,
    };

    // Update the datasetsTree array with the modified datasetTree
    const updatedDashboard = {
      ...dashboard,
      datasetsTree: dashboard.datasetsTree.map((dataset, index) =>
        index === selectedIndex ? updatedDatasetTree : dataset
      ),
    };

    // Perform the update
    await updateDashboard(updatedDashboard);

    // Set the updated chart options locally
    setChartOptions(updatedOptions);
    console.log("Chart options updated successfully.");
  };


  const handleDeleteChart = async () => {
    // if (selectedGridIndex !== null) {
    //   setSelectedCharts(updatedCharts);
    //   setSelectedChart(null);
    //   setSelectedGridIndex(null);
    //   setGridToMoveIndex(null);
    // }

    // Remove the dataset at selectedIndex
    if (dashboard?.datasetsTree && selectedIndex !== null) {
      dashboard?.datasetsTree.splice(selectedIndex, 1);
      setSelectedIndex(null)

      await updateDashboard(dashboard);
      toast.success("Grid Removed Successfully")
      return;
    }
    toast.warn("Please Select Grid to Delete")
  };


  const handleShuffleCharts = () => {
    if (
      selectedGridIndex !== null &&
      gridToMoveIndex !== null &&
      selectedGridIndex !== gridToMoveIndex
    ) {
      const updatedCharts = [...selectedCharts];

      // Get the selected chart to move
      const chartToMove = updatedCharts[selectedGridIndex];

      // Remove the selected chart from its current position
      updatedCharts.splice(selectedGridIndex, 1);

      // Insert the selected chart at the target position
      updatedCharts.splice(gridToMoveIndex, 0, chartToMove);

      setSelectedCharts(updatedCharts);
      setSelectedGridIndex(null);
      setGridToMoveIndex(null);
    }
  };

  return (
    <div className="main-container">
      <Dashboard
        onCreateGrid={handleCreateGrid}
        onSelectChart={handleAddChartToGrid}
        selectedChart={selectedChart}
        onDeleteChart={handleDeleteChart}
        chartOptions={chartOptions}
        onUpdateChartOptions={handleUpdateChartOptions}
        handleShuffleCharts={handleShuffleCharts}
        selectedGridIndex={selectedGridIndex}
        gridToMoveIndex={gridToMoveIndex}
      // onUpdateSeries={onUpdateSeries}
      >
        <div className="container-grids p-3">
          <div className="content-grids p-0">
            <div className="d-flex flex-wrap justify-content-center">
              {dashboard && dashboard.datasetsTree && dashboard.datasetsTree.map((dataset, index) => {
                // Find the dataset with the matching index
                // const dataset = dashboard.datasetsTree?.find(dataset => dataset.index === index);
                return (
                  <Grid
                    key={index}
                    dataset={dataset}
                    dashboard={dashboard}
                    chart={dataset && dataset.options ? dataset.options || {} : {}}
                    chartOptions={dataset && dataset.options ? dataset.options : {}}
                    onSelect={(selectedIndex) => handleSelectGrid(selectedIndex, dataset && dataset.options ? dataset.options : {})}
                    selectedIndex={selectedIndex}
                    colWidth={dataset?.grids?.colWidth}
                    index={index}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </Dashboard>
    </div>
  );
};

const mapStateToProps = (state) => ({
  dashboard: state.dashboard.current,
});
export default connect(mapStateToProps, {
  updateDashboard,
})(Grids);
