import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import datasetReducer from '../Milebi/src/redux/datasetSlice';


const persistConfig = {
  key: 'root',
  storage,
};


const persistedReducer = persistReducer(persistConfig, datasetReducer);

export const store = configureStore({
  reducer: {
    dataset: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
      immutableCheck: process.env.NODE_ENV !== 'production' ? false : true, 
    }),
});


export const persistor = persistStore(store);
