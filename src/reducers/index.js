import { combineReducers } from "redux";
import { organizationReducer } from "./organizationReducer";
import { loginReducer } from "./loginReducer";
import { userReducer } from "./userReducer";
import { responseReducer } from "./responseReducer";
import { productReducer } from "./productReducer";
import { subscriptionReducer } from "./subscriptionReducer";
import { paymentCredentialsReducer } from "./paymentReducer";
import { datasetReducer } from "./datasetReducer";
import { dashboardReducer } from "./dashboardReducer";
import { componentReducer } from "./componentReducer";



export default combineReducers({
  organization: organizationReducer,
  login: loginReducer,
  user: userReducer,
  response:responseReducer,
  product: productReducer,
  subscription: subscriptionReducer,
  paymentcredentials:paymentCredentialsReducer,
  dataset:datasetReducer,
  dashboard:dashboardReducer,
  component:componentReducer,
});