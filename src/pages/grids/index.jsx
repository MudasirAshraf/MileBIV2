import React, { useState } from "react";
import "./grids.scss";
import Dashboard from "../../components/dashboard";
import Grid from "../../components/grid-charts";
import { updateDashboard } from "../../actions/dashboardActions";
import { connect } from "react-redux";
import { getChartOptions } from "../../data/chartData";

const Grids = ({ dashboard, updateDashboard }) => {
  const [grid, setGrid] = useState({});
  const [selectedCharts, setSelectedCharts] = useState([]);
  const [chartOptions, setChartOptions] = useState({});
  const [selectedChart, setSelectedChart] = useState(null);
  const [selectedGridIndex, setSelectedGridIndex] = useState(null);
  const [gridToMoveIndex, setGridToMoveIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleCreateGrid = (rows, cols) => {
    const newGrid = { rows: rows, cols: cols, id: Date.now() };
    setGrid(newGrid);
  };

  const handleAddChartToGrid = async (chart) => {
    const options = getChartOptions(chart);
    setSelectedCharts([...selectedCharts, chart]);
    setChartOptions(options);
    handleCreateGrid(1, 1);
    if (dashboard) {
      let datasetsTree = dashboard?.datasetsTree || [];
      let newIndex = 0;

      if (dashboard.datasetsTree) {
        newIndex =
          datasetsTree.length > 0
            ? Math.max(...datasetsTree.map((d) => d.index)) + 1
            : 1;
      }

      datasetsTree.push({
        index: newIndex,
        chartType: options.chartType,
        grids: { rows: 1, cols: 1, id: Date.now() },
        options: options,
      });

      const updatedDashboard = {
        ...dashboard,
        datasetsTree: datasetsTree,
      };

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
      // Swap if both indices are selected
      // handleShuffleCharts();
    }
    setSelectedChart(selectedCharts[index]);
    setChartOptions(options);
  };

  const handleUpdateChartOptions = async (updatedOptions) => {
    if (!dashboard?.datasetsTree?.[selectedIndex]) {
      console.warn(
        "Unable to update chart options: Invalid dashboard or index."
      );
      return;
    }

    const updatedTree = [...dashboard.datasetsTree];
    updatedTree[selectedIndex] = {
      ...updatedTree[selectedIndex],
      options: updatedOptions,
    };

    const updatedDashboard = {
      ...dashboard,
      datasetsTree : updatedTree
    }
    await updateDashboard(updatedDashboard)
    setChartOptions(updatedOptions);
    console.log("Chart options updated successfully.");
  };

  const handleDeleteChart = () => {
    if (selectedGridIndex !== null) {
      const updatedCharts = selectedCharts.filter(
        (_, i) => i !== selectedGridIndex
      );
      const updatedGrids = grids.filter((_, i) => i !== selectedGridIndex);

      setSelectedCharts(updatedCharts);
      setGrids(updatedGrids);
      setSelectedChart(null);
      setSelectedGridIndex(null);
      setGridToMoveIndex(null);
      setChartOptions((prevOptions) => {
        const newOptions = { ...prevOptions };
        delete newOptions[selectedChart];
        return newOptions;
      });
    }
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

  // onUpdateSeries = (series) => {
  //   console.log(series);
  // };

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
        <div className="container-grids">
          <div className="content-grids">
            {dashboard &&
              dashboard.datasetsTree &&
              dashboard.datasetsTree.map((d, index) => (
                <Grid
                  key={d.grids.id}
                  chart={selectedCharts[index]}
                  chartOptions={d.options}
                  onSelect={() => handleSelectGrid(index, d.options)}
                  isSelected={
                    selectedIndex === index
                  }
                />
              ))}
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
