import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import graphReducer from "./graph/graphReducer";

export default combineReducers({
    userReducer,
    graphReducer,
});
