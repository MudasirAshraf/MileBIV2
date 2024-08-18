import React, { useState } from 'react';
import './grids.scss';
import Dashboard from '../../components/dashboard';
import Grid from '../../components/grid-charts';

const Grids = () => {
  const [grids, setGrids] = useState([{ id: 1, rows: 1, cols: 1 }]);
  const [selectedCharts, setSelectedCharts] = useState([]);
  const [chartOptions, setChartOptions] = useState({});
  const [selectedChart, setSelectedChart] = useState(null);
  const [selectedGridIndex, setSelectedGridIndex] = useState(null);
  const [gridToMoveIndex, setGridToMoveIndex] = useState(null);

  const handleCreateGrid = (rows, cols) => {
    const newGrid = { rows, cols, id: Date.now() };
    setGrids([...grids, newGrid]);
  };

  const handleAddChartToGrid = (chart) => {
    setSelectedCharts([...selectedCharts, chart]);
    setChartOptions({ ...chartOptions, [chart]: {} }); // Initialize empty options for new chart
    handleCreateGrid(1, 1);
  };

  const handleSelectGrid = (index) => {
    if (selectedGridIndex === null) {
      setSelectedGridIndex(index);
    } else if (gridToMoveIndex === null) {
      setGridToMoveIndex(index);
    } else {
      // Swap if both indices are selected
      handleShuffleCharts();
    }
    setSelectedChart(selectedCharts[index]);
  };

  const handleUpdateChartOptions = (updatedOptions) => {
    setChartOptions(updatedOptions);
  };

  const handleDeleteChart = () => {
    if (selectedGridIndex !== null) {
      const updatedCharts = selectedCharts.filter((_, i) => i !== selectedGridIndex);
      const updatedGrids = grids.filter((_, i) => i !== selectedGridIndex);

      setSelectedCharts(updatedCharts);
      setGrids(updatedGrids);
      setSelectedChart(null);
      setSelectedGridIndex(null);
      setGridToMoveIndex(null);
      setChartOptions(prevOptions => {
        const newOptions = { ...prevOptions };
        delete newOptions[selectedChart];
        return newOptions;
      });
    }
  };

  const handleShuffleCharts = () => {
    if (selectedGridIndex !== null && gridToMoveIndex !== null && selectedGridIndex !== gridToMoveIndex) {
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
    <div className='main-container'>
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
      >
        <div className='container-grids'>
          <div className='content-grids'>
            {grids.map((grid, index) => (
              <Grid
                key={grid.id}
                chart={selectedCharts[index]}
                chartOptions={chartOptions[selectedCharts[index]]}
                onSelect={() => handleSelectGrid(index)}
                isSelected={selectedGridIndex === index || gridToMoveIndex === index}
              />
            ))}
          </div>
        </div>
      </Dashboard>
    </div>
  );
};

export default Grids;
