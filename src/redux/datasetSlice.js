// src/redux/datasetSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { evaluate } from 'mathjs';

// Async thunk to fetch dataset from the server
export const fetchDataset = createAsyncThunk('dataset/fetchDataset', async () => {
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL_DASHBOARD}Dataset`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    },
  });

  // Check if the response data is an array, if not default to an empty array
  return Array.isArray(response.data.data) ? response.data.data : [];
});

// Async thunk to update dataset on the server
export const updateDataset = createAsyncThunk('dataset/updateDataset', async (payload) => {
  // Ensure the payload is the complete dataset
  const response = await axios.put(`${import.meta.env.VITE_BASE_URL_DASHBOARD}Dataset`, payload, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
});

const datasetSlice = createSlice({
    name: 'dataset',
    initialState: {
      data: [],
      loading: false,
      error: null,
      transformationSteps: [],
    },
    reducers: {
      addColumn: (state, action) => {
        const newColumn = action.payload;
        const current = state.data.map((row) => ({
          ...row,
          dataSourceData: (row.dataSourceData || []).map((dtx) => ({
            ...dtx,
            [newColumn.title]: newColumn.type === 'Expression'
              ? evaluateExpression(dtx, newColumn.expression)
              : '',
          })),
        }));
        state.transformationSteps.push({
          Step: state.transformationSteps.length + 1,
          Type: 'AddColumn',
          Title: newColumn.title,
          ColumnCategory: newColumn.type,
          ...(newColumn.type === 'Expression' && { Expression: newColumn.expression }),
        });
        state.data = current;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchDataset.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchDataset.fulfilled, (state, action) => {
          state.data = action.payload;
          state.loading = false;
        })
        .addCase(fetchDataset.rejected, (state, action) => {
          state.error = action.error.message;
          state.loading = false;
        })
        .addCase(updateDataset.fulfilled, (state, action) => {
          state.data = action.payload;
        });
    },
  });
  

export const { addColumn } = datasetSlice.actions;
export default datasetSlice.reducer;



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

