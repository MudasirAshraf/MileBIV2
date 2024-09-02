// store.js
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "./reducers";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const initialState = {};
const persistConfig = {
  key: "root",
  whitelist: ["loginReducer"],
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleware = [thunk, logger];

const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

const persistor = persistStore(store);

// Use named exports here
export { store, persistor };
