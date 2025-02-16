import React from "react";
import Select from "react-select";
import { Field } from "formik";

const LimitSortField = ({ values, errors, touched, setFieldValue, categoriesOptions }) => {
    return (
        <div>
            {/* Checkbox to Enable/Disable Limit */}
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={values.setLimit}
                        onChange={(e) => setFieldValue("setLimit", e.target.checked)}
                    />
                    Enable Limit
                </label>
            </div>

            {/* Limit Fields (Show only if `setLimit` is true) */}
            {values.setLimit && (
                <>
                    {/* Column Selection Dropdown */}
                    <div>
                        <label htmlFor="columns">Select Column:</label>
                        <Select
                            options={categoriesOptions}
                            value={categoriesOptions.find(
                                (option) => JSON.parse(option.value).column === values.limit.column
                            )}
                            onChange={(selectedOption) => {
                                const selectedColumn = JSON.parse(selectedOption.value);
                                setFieldValue("limit", {
                                    ...values.limit,
                                    column: selectedColumn.column,
                                    datasetName: selectedColumn.datasetName,
                                });
                            }}
                            className="react-select-container"
                            classNamePrefix="react-select"
                            placeholder="Choose Column"
                        />
                        {touched.limit?.column && errors.limit?.column && (
                            <div style={{ color: "red" }}>{errors.limit.column}</div>
                        )}
                    </div>

                    {/* Limit Input */}
                    <div>
                        <label htmlFor="limit.limit">Top:</label>
                        <Field
                            className="form-control"
                            type="number"
                            name="limit.limit"
                            value={values.limit.limit}
                            onChange={(e) =>
                                setFieldValue("limit", {
                                    ...values.limit,
                                    limit: parseInt(e.target.value, 10) || 0,
                                })
                            }
                            placeholder="Top"
                        />
                        {touched.limit?.limit && errors.limit?.limit && (
                            <div style={{ color: "red" }}>{errors.limit.limit}</div>
                        )}
                    </div>

                    {/* Sort Options */}
                    <div className="mt-2">
                        <label>Sort:</label>
                        <div>
                            <label>
                                <Field
                                    type="radio"
                                    name="limit.type"
                                    value="ASC"
                                    checked={values.limit.type === "ASC"}
                                    onChange={(e) =>
                                        setFieldValue("limit", {
                                            ...values.limit,
                                            type: e.target.value,
                                        })
                                    }
                                />
                                ASC
                            </label>

                            <label style={{ marginLeft: "20px" }}>
                                <Field
                                    type="radio"
                                    name="limit.type"
                                    value="DESC"
                                    checked={values.limit.type === "DESC"}
                                    onChange={(e) =>
                                        setFieldValue("limit", {
                                            ...values.limit,
                                            type: e.target.value,
                                        })
                                    }
                                />
                                DESC
                            </label>

                            {touched.limit?.type && errors.limit?.type && (
                                <div style={{ color: "red" }}>{errors.limit.type}</div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default LimitSortField;
