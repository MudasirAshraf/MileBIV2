import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "./reducers";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { loginReducer } from "./reducers/loginReducer";

const initialState = {};
const persistConfig = {
  key: "root",
  whitelist: "loginReducer",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleware = [thunk, logger];

export const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export let persistor = persistStore(store);
