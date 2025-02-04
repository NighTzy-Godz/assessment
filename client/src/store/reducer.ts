import { combineReducers } from "redux";
import { userApi } from "./userApi";

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
});

export default rootReducer;
