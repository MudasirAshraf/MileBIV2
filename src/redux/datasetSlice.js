import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { evaluate } from 'mathjs';

//  fetch dataset from the server
export const fetchDataset = createAsyncThunk('dataset/fetchDataset', async () => {
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL_DASHBOARD}Dataset`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    },
  });

  return Array.isArray(response.data.data) ? response.data.data : [];
});

//  update dataset on the server
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

      // Apply the transformation to the data
      const updatedData = state.data.map((row) => ({
        ...row,
        dataSourceData: (row.dataSourceData || []).map((dtx) => ({
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

      // Update the data in the state
      state.data = updatedData;
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
        state.data = action.payload; // Update the state with the response from the server
      });
  },
});

export const { addColumn } = datasetSlice.actions;
export default datasetSlice.reducer;

// function to evaluate expressions
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
