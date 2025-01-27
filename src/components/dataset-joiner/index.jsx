import React, { useState } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import "./dataset-joiner.scss";
import { toast } from "react-toastify";

const DatasetJoiner = ({ datasets, addDataset, deleteDataset }) => {
    const [selectedDatasets, setSelectedDatasets] = useState([null]);
    const [primaryDataset, setPrimaryDataset] = useState(null);
    const [combinedData, setCombinedData] = useState([]);
    const [datasetName, setDatasetName] = useState("");
    const [joinConfig, setJoinConfig] = useState([]);
    const [selectedPrimaryKey, setSelectedPrimaryKey] = useState({});


    const datasetOptions = datasets.map((dataset) => ({
        label: dataset.datasetTitle || dataset.name_new,
        value: dataset.datasetId,
        data: dataset.dataSourceData,
    }));

    const handleDatasetSelection = (index, selectedOption) => {
        const newSelectedDatasets = [...selectedDatasets];
        newSelectedDatasets[index] = selectedOption ? selectedOption : null;
        setSelectedDatasets(newSelectedDatasets);

        if (index === 0) {
            setPrimaryDataset(selectedOption);
        }
    };

    const addDatasetSelection = () => {
        setSelectedDatasets([...selectedDatasets, null]);
        setJoinConfig([
            ...joinConfig,
            { dataset1Column: "", dataset2Column: "", joinType: "inner" },
        ]);
    };

    const deleteDatasetSelection = (index) => {
        const newSelectedDatasets = selectedDatasets.filter((_, i) => i !== index + 1);
        const newJoinConfig = joinConfig.filter((_, i) => i !== index);
        setSelectedDatasets(newSelectedDatasets);
        setJoinConfig(newJoinConfig);
    };

    const handleJoinConfigChange = (index, field, value) => {
        const newJoinConfig = [...joinConfig];
        newJoinConfig[index] = { ...newJoinConfig[index], [field]: value };
        setJoinConfig(newJoinConfig);
    };

    const saveDataSet = async () => {
        if (!datasetName) {
            toast.warning("Please enter a dataset name.");
            return;
        }
        const requestPayload = {
            datasetTitle: datasetName,
            primaryKeyColumn: selectedPrimaryKey,
            DataSourceData: combinedData,
            password: "password",
            userName: "userName",
            databaseType: "json",
            connectionString: "connectionString",
        };
        await addDataset(requestPayload);
    }

    const handleJoin = () => {
        if (!primaryDataset || selectedDatasets.length < 2) {
            alert("Please select a primary dataset and at least one dataset to join.");
            return;
        }

        let result = primaryDataset.data;
        for (let i = 1; i < selectedDatasets.length; i++) {
            const dataset1 = result;
            const dataset2 = selectedDatasets[i]?.data;
            const config = joinConfig[i - 1];

            if (!config || !config.dataset1Column || !config.dataset2Column) {
                alert("Please ensure all join columns are selected.");
                return;
            }

            let joinedData = [];

            if (config.joinType === "inner") {
                joinedData = dataset1
                    .filter((item1) =>
                        dataset2.some(
                            (item2) =>
                                item1[config.dataset1Column] === item2[config.dataset2Column]
                        )
                    )
                    .map((item1) => {
                        const matchingItem = dataset2.find(
                            (item2) =>
                                item1[config.dataset1Column] === item2[config.dataset2Column]
                        );
                        return { ...item1, ...matchingItem };
                    });
            } else if (config.joinType === "left") {
                joinedData = dataset1.map((item1) => {
                    const matchingItem = dataset2.find(
                        (item2) =>
                            item1[config.dataset1Column] === item2[config.dataset2Column]
                    );
                    return matchingItem
                        ? { ...item1, ...matchingItem }
                        : { ...item1, [config.dataset2Column]: null };
                });
            }

            result = joinedData;
        }

        setCombinedData(result);
    };

    const getDatasetColumns = (datasetIndex) => {
        return selectedDatasets[datasetIndex]?.data?.length > 0
            ? Object.keys(selectedDatasets[datasetIndex].data[0])
            : [];
    };

    return (
        <div className="dataset-joiner">
            <h2 className="heading">Join Multiple Datasets</h2>

            <div className="dataset-selection">
                <label>Select Primary Dataset:</label>
                <Select
                    options={datasetOptions}
                    onChange={(selectedOption) =>
                        handleDatasetSelection(0, selectedOption)
                    }
                    placeholder="Select a primary dataset"
                    value={
                        datasetOptions.find(
                            (option) => option.value === primaryDataset?.value
                        ) || null
                    }
                />
            </div>

            {selectedDatasets.slice(1).map((_, index) => (
                <div key={index + 1} className="dataset-selection">
                    <label>Select Dataset {index + 2} to Join:</label>
                    <Select
                        options={datasetOptions}
                        onChange={(selectedOption) =>
                            handleDatasetSelection(index + 1, selectedOption)
                        }
                        placeholder="Select a dataset"
                        value={
                            datasetOptions.find(
                                (option) => option.value === selectedDatasets[index + 1]?.value
                            ) || null
                        }
                    />
                    <button
                        onClick={() => deleteDatasetSelection(index)}
                        className="delete-dataset-button"
                    >
                        Delete Dataset
                    </button>
                </div>
            ))}

            <button onClick={addDatasetSelection} className="add-dataset-button mt-2">
                Add Another Dataset
            </button>

            {selectedDatasets.slice(1).map((_, index) => (
                <div key={index} className="join-config">
                    <h4>
                        Join Configuration for Primary Dataset and Dataset {index + 2}
                    </h4>
                    <div>
                        <label>Choose join column for Primary Dataset:</label>
                        <Select
                            options={getDatasetColumns(0).map((column) => ({
                                label: column,
                                value: column,
                            }))}
                            value={
                                joinConfig[index]?.dataset1Column
                                    ? {
                                        label: joinConfig[index]?.dataset1Column,
                                        value: joinConfig[index]?.dataset1Column,
                                    }
                                    : null
                            }
                            onChange={(e) =>
                                handleJoinConfigChange(index, "dataset1Column", e.value)
                            }
                            placeholder="Select join column"
                        />
                    </div>
                    <div>
                        <label>Choose join column for Dataset {index + 2}:</label>
                        <Select
                            options={getDatasetColumns(index + 1).map((column) => ({
                                label: column,
                                value: column,
                            }))}
                            value={
                                joinConfig[index]?.dataset2Column
                                    ? {
                                        label: joinConfig[index]?.dataset2Column,
                                        value: joinConfig[index]?.dataset2Column,
                                    }
                                    : null
                            }
                            onChange={(e) =>
                                handleJoinConfigChange(index, "dataset2Column", e.value)
                            }
                            placeholder="Select join column"
                        />
                    </div>
                    <div>
                        <label>Choose Join Type:</label>
                        <Select
                            options={[
                                { label: "Inner Join", value: "inner" },
                                { label: "Left Join", value: "left" },
                            ]}
                            value={
                                joinConfig[index]?.joinType
                                    ? {
                                        label: joinConfig[index]?.joinType,
                                        value: joinConfig[index]?.joinType,
                                    }
                                    : { label: "Inner Join", value: "inner" }
                            }
                            onChange={(e) =>
                                handleJoinConfigChange(index, "joinType", e.value)
                            }
                            placeholder="Select join type"
                        />
                    </div>
                </div>
            ))}

            <div className="row my-3 px-2">
                <input type="text" className="form-control" placeholder="Enter dataset name"
                    onChange={(e) => setDatasetName(e.target.value)} />
            </div>

            {combinedData && combinedData.length > 0 && <div>
                <label>Choose Primary Key Column:</label>
                <Select
                    options={Object.keys(combinedData[0])?.map((key) => ({
                        label: key,
                        value: key,
                    }))}
                    value={
                        selectedPrimaryKey
                            ? {
                                label: selectedPrimaryKey.label,
                                value: selectedPrimaryKey.value
                            }
                            : null
                    }
                    onChange={(e) =>
                        setSelectedPrimaryKey({ label: e.label, value: e.value })
                    }
                    placeholder="Select primary key column"
                />
            </div>
            }

            <button onClick={handleJoin} className="join-button">
                Join Datasets
            </button>

            <button onClick={saveDataSet} className="join-button mx-2">
                Save Dataset
            </button>

            <div className="result">
                {combinedData.length > 0 ? (
                    <table className="table table-responsive">
                        <thead>
                            <tr>
                                {Object.keys(combinedData[0]).map((key) => (
                                    <th key={key}>{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {combinedData.map((item, index) => (
                                <tr key={index}>
                                    {Object.values(item).map((value, i) => (
                                        <td key={i}>{value !== null && value !== undefined ? value : "-"}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No data to display.</p>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    datasets: state.dataset.datasets,
});

export default connect(mapStateToProps)(DatasetJoiner);


// import React, { useState } from 'react';

// const App = () => {
//   const [dataset, setDataset] = useState([
//     { id: 1, category: 'A', value: 10 },
//     { id: 2, category: 'B', value: 20 },
//     { id: 3, category: 'A', value: 30 },
//     { id: 4, category: 'C', value: 40 },
//     { id: 5, category: 'B', value: 50 },
//   ]);

//   const [selectedColumn, setSelectedColumn] = useState('');
//   const [selectedFunction, setSelectedFunction] = useState('');
//   const [result, setResult] = useState(null);

//   const aggregateFunctions = {
//     SUM: (data, column) => data.reduce((sum, item) => sum + (item[column] || 0), 0),
//     AVERAGE: (data, column) => {
//       const values = data.map(item => item[column] || 0);
//       return values.length ? (values.reduce((sum, val) => sum + val, 0) / values.length).toFixed(2) : 0;
//     },
//     MIN: (data, column) => Math.min(...data.map(item => item[column] || 0)),
//     MAX: (data, column) => Math.max(...data.map(item => item[column] || 0)),
//     COUNT: (data) => data.length,
//     GROUPBY: (data, groupByColumn) => {
//       return data.reduce((acc, item) => {
//         const key = item[groupByColumn];
//         if (!acc[key]) {
//           acc[key] = [];
//         }
//         acc[key].push(item);
//         return acc;
//       }, {});
//     },
//   };

//   const handleCalculate = () => {
//     if (selectedFunction && aggregateFunctions[selectedFunction]) {
//       const calculation = selectedFunction === 'GROUPBY'
//         ? aggregateFunctions[selectedFunction](dataset, selectedColumn)
//         : aggregateFunctions[selectedFunction](dataset, selectedColumn);

//       setResult(calculation);
//     } else {
//       alert('Please select a column and an aggregate function.');
//     }
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Aggregate Functions in React</h1>
//       <div>
//         <label>
//           Select Column:
//           <select
//             value={selectedColumn}
//             onChange={(e) => setSelectedColumn(e.target.value)}
//           >
//             <option value="">--Select Column--</option>
//             {Object.keys(dataset[0] || {}).map((key) => (
//               <option key={key} value={key}>
//                 {key}
//               </option>
//             ))}
//           </select>
//         </label>
//       </div>

//       <div>
//         <label>
//           Select Function:
//           <select
//             value={selectedFunction}
//             onChange={(e) => setSelectedFunction(e.target.value)}
//           >
//             <option value="">--Select Function--</option>
//             {Object.keys(aggregateFunctions).map((func) => (
//               <option key={func} value={func}>
//                 {func}
//               </option>
//             ))}
//           </select>
//         </label>
//       </div>

//       <button onClick={handleCalculate} style={{ marginTop: '10px' }}>
//         Calculate
//       </button>

//       {result !== null && (
//         <div style={{ marginTop: '20px' }}>
//           <h2>Result:</h2>
//           {selectedFunction === 'GROUPBY' ? (
//             Object.keys(result).map((group) => (
//               <div key={group}>
//                 <h3>Group: {group}</h3>
//                 <pre>{JSON.stringify(result[group], null, 2)}</pre>
//               </div>
//             ))
//           ) : (
//             <p>{selectedFunction}: {result}</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;

