import React, { useState } from 'react';
import './grids.scss';
import Dashboard from '../../components/dashboard';
import Grid from '../../components/grid-charts';

const Grids = () => {
  const [grids, setGrids] = useState([1]);
  const [selectedCharts, setSelectedCharts] = useState([]);
  const [chartOptions, setChartOptions] = useState({});
  const [selectedChart, setSelectedChart] = useState(null);
  const [selectedGridIndex, setSelectedGridIndex] = useState(null);

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
    setSelectedChart(selectedCharts[index]);
    setSelectedGridIndex(index);
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
      setChartOptions(prevOptions => {
        const newOptions = { ...prevOptions };
        delete newOptions[selectedChart];
        return newOptions;
      });
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
      >
        <div className='container-grids'>
          <div className='content-grids'>
            {grids.map((grid, index) => (
              <Grid
                key={grid.id}
                chart={selectedCharts[index]}
                chartOptions={chartOptions[selectedCharts[index]]}
                onSelect={() => handleSelectGrid(index)}
                isSelected={selectedGridIndex === index}
              />
            ))}
          </div>
        </div>
      </Dashboard>
    </div>
  );
};


export default Grids;
