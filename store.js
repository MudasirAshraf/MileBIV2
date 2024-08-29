// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import datasetReducer from '../Milebi/src/redux/datasetSlice';
import { createTransform } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['dataset'], // Only persist the dataset slice
};

const persistedReducer = persistReducer(persistConfig, datasetReducer);

export const store = configureStore({
  reducer: {
    dataset: persistedReducer,
  },
  // Optionally, add middleware to handle non-serializable values
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredPaths: ['persist'],
      },
    }),
});

export const persistor = persistStore(store);
