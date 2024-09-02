import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { evaluate } from 'mathjs';

// Fetch dataset from the server
export const fetchDataset = createAsyncThunk('dataset/fetchDataset', async () => {
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL_DASHBOARD}Dataset`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    },
  });

  return Array.isArray(response.data.data) ? response.data.data : [];
});

// Update dataset on the server
export const updateDataset = createAsyncThunk('dataset/updateDataset', async (payload) => {
  const response = await axios.put(
    `${import.meta.env.VITE_BASE_URL_DASHBOARD}Dataset`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
});

// Define initial state and slice
const datasetSlice = createSlice({
  name: 'dataset',
  initialState: {
    data: [],
    loading: false,
    error: null,
    transformationSteps: [],
    current: null,
  },
  reducers: {
    addColumn: (state, action) => {
      const newColumn = action.payload;

      // Apply the transformation to the data
      const updatedData = state.data.map(row => ({
        ...row,
        dataSourceData: (row.dataSourceData || []).map(dtx => ({
          ...dtx,
          [newColumn.title]: newColumn.type === 'Expression'
            ? evaluateExpression(dtx, newColumn.expression)
            : '',
        })),
      }));

      // Add the transformation step
      state.transformationSteps.push({
        Step: state.transformationSteps.length + 1,
        Type: 'AddColumn',
        Title: newColumn.title,
        ColumnCategory: newColumn.type,
        ...(newColumn.type === 'Expression' && { Expression: newColumn.expression }),
      });

      state.data = updatedData;
      state.current = {
        data: updatedData,
        transformationSteps: state.transformationSteps,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateDataset.fulfilled, (state, action) => {
        state.data = action.payload; // Update the state with the response from the server
        state.current = action.payload;
      });
  },
});

export const { addColumn } = datasetSlice.actions;
export default datasetSlice.reducer;

// Function to evaluate expressions
export const evaluateExpression = (data, expression) => {
  try {
    const context = { ...data };
    const result = evaluate(expression, context);
    return typeof result === 'object' ? JSON.stringify(result) : result;
  } catch (error) {
    console.error('Error evaluating expression:', error.message);
    return '';
  }
};
