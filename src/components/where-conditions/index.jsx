import React, { useState, useEffect } from "react";
import { FieldArray } from "formik";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const WhereConditions = ({ values, errors, touched, setFieldValue, categoriesOptions, dataset }) => {
    const [uniqueValues, setUniqueValues] = useState({});
    const [isManualInput, setIsManualInput] = useState(false);

    const fetchUniqueValues = async (column, datasetName) => {
        // Return empty array if dataset or dataset data is unavailable
        if (!dataset || !dataset.dataSourceData) return [];
        const data = dataset.dataSourceData.map(row => row[column]);
        return [...new Set(data)]; // Remove duplicates
    };

    useEffect(() => {
        // Loop over whereConditions to fetch unique values
        values?.whereConditions?.forEach(async (condition) => {
            if (condition?.column && condition?.datasetName) {
                const key = `${condition.datasetName}.${condition.column}`;
                if (!uniqueValues[key]) {
                    const values = await fetchUniqueValues(condition.column, condition.datasetName);
                    setUniqueValues(prev => ({ ...prev, [key]: values }));
                }
            }
        });
    }, [values?.whereConditions]);

    const sqlOperators = [
        { value: "=", label: "Equals" },
        { value: "!=", label: "Not Equals" },
        { value: ">", label: "Greater Than" },
        { value: "<", label: "Less Than" },
        { value: ">=", label: "Greater or Equal" },
        { value: "<=", label: "Less or Equal" },
        { value: "IN", label: "IN (Multiple Values)" },
        { value: "NOT IN", label: "NOT IN (Multiple Values)" },
        { value: "LIKE", label: "LIKE (Pattern Matching)" }
    ];

    return (
        <FieldArray name="whereConditions">
            {({ push, remove }) => (
                <>
                    <p className="mb-0 mt-2 mb-1">Conditions</p>
                    {values?.whereConditions?.map((condition, condIndex) => {
                        // Generate key for unique values (column.datasetName)
                        const key = `${condition?.datasetName}.${condition?.column}`;
                        const options = uniqueValues[key] ? uniqueValues[key].map(value => ({ value, label: value })) : [];

                        const isMultiSelect = ["IN", "NOT IN"].includes(condition?.operator);

                        // State to manage manual input toggle

                        return (
                            <div className="border border-primary p-2 mb-2" key={condIndex}>
                                {/* Column Selection */}
                                <div>
                                    <label htmlFor={`whereConditions[${condIndex}].column`}>Column:</label>
                                    <Select
                                        options={categoriesOptions || []}  // Ensure categoriesOptions is not undefined
                                        value={categoriesOptions?.find((option) => {
                                            const parsedValue = option?.value ? JSON.parse(option.value) : {};
                                            return (
                                                parsedValue.column === condition?.column &&
                                                parsedValue.datasetName === condition?.datasetName
                                            );
                                        })}
                                        onChange={(selectedOption) => {
                                            const parsedValue = selectedOption?.value ? JSON.parse(selectedOption.value) : {};
                                            setFieldValue(`whereConditions[${condIndex}]`, {
                                                ...condition,
                                                column: parsedValue.column || "",
                                                datasetName: parsedValue.datasetName || "",
                                                value: "" // Reset value when column changes
                                            });
                                        }}
                                        className="react-select-container"
                                        classNamePrefix="react-select"
                                        placeholder="Choose Column"
                                    />
                                    {errors?.whereConditions?.[condIndex]?.column && touched?.whereConditions?.[condIndex]?.column && (
                                        <div style={{ color: "red" }}>{errors?.whereConditions?.[condIndex]?.column}</div>
                                    )}
                                </div>

                                {/* Operator Selection */}
                                <div>
                                    <label htmlFor={`whereConditions[${condIndex}].operator`}>Operator:</label>
                                    <Select
                                        options={sqlOperators || []}  // Ensure sqlOperators is always available
                                        value={sqlOperators?.find(op => op.value === condition?.operator)}
                                        onChange={(selectedOption) => {
                                            const newOperator = selectedOption?.value || "";
                                            setFieldValue(`whereConditions[${condIndex}].operator`, newOperator);

                                            // Clear value when switching between single & multi-select operators
                                            setFieldValue(`whereConditions[${condIndex}].value`, isMultiSelect ? "" : []);
                                        }}
                                        className="react-select-container"
                                        classNamePrefix="react-select"
                                        placeholder="Select Operator"
                                    />
                                    {errors?.whereConditions?.[condIndex]?.operator && touched?.whereConditions?.[condIndex]?.operator && (
                                        <div style={{ color: "red" }}>{errors?.whereConditions?.[condIndex]?.operator}</div>
                                    )}
                                </div>

                                {/* Value Selection */}
                                <div>
                                    <label htmlFor={`whereConditions[${condIndex}].value`}>Value:</label>
                                    {isManualInput ? (
                                        <input
                                            type="text"
                                            value={condition?.value || ""}
                                            onChange={(e) => {
                                                setFieldValue(`whereConditions[${condIndex}].value`, e.target.value);
                                            }}
                                            className="form-control"
                                            placeholder="Enter Value"
                                        />
                                    ) : (
                                        <Select
                                            options={options || []}
                                            value={
                                                isMultiSelect
                                                    ? options.filter(option => String(condition?.value || "").split(',').includes(option.value))
                                                    : options.find(option => option.value === String(condition?.value || ""))
                                            }
                                            onChange={(selectedOptions) => {
                                                if (isMultiSelect) {
                                                    const valuesArray = selectedOptions.map(option => option.value);
                                                    setFieldValue(`whereConditions[${condIndex}].value`, valuesArray.join(',')); // Store as a comma-separated string
                                                } else {
                                                    setFieldValue(`whereConditions[${condIndex}].value`, selectedOptions?.value || "");
                                                }
                                            }}
                                            className="react-select-container"
                                            classNamePrefix="react-select"
                                            placeholder="Select Value"
                                            isMulti={isMultiSelect}
                                        />
                                    )}
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            id={`manual-input-${condIndex}`}
                                            checked={isManualInput}
                                            onChange={() => setIsManualInput(!isManualInput)}
                                            className="form-check-input"
                                        />
                                        <label htmlFor={`manual-input-${condIndex}`} className="form-check-label">Enter Value Manually</label>
                                    </div>
                                    {errors?.whereConditions?.[condIndex]?.value && touched?.whereConditions?.[condIndex]?.value && (
                                        <div style={{ color: "red" }}>{errors?.whereConditions?.[condIndex]?.value}</div>
                                    )}
                                </div>

                                {/* Remove Condition */}
                                <button type="button" className="text-danger mt-2" onClick={() => remove(condIndex)}>
                                    <FontAwesomeIcon icon={faTrash} size="2x" />
                                </button>
                            </div>
                        );
                    })}

                    {/* Add Condition Button */}
                    <button
                        type="button"
                        style={{ cursor: "pointer", color: "green", background: "none", border: "none" }}
                        onClick={() => push({ operator: "", value: "", column: "", datasetName: "" })}
                    >
                        <FontAwesomeIcon icon={faPlusCircle} size="1x" /> Add Condition
                    </button>
                </>
            )}
        </FieldArray>
    );
};

export default WhereConditions;
