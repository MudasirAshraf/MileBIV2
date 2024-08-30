import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import datasetReducer from '../Milebi/src/redux/datasetSlice';

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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export const persistor = persistStore(store);
