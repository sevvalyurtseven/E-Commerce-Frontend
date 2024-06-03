import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import logger from "redux-logger";
import reducers from "./reducers/index.jsx";

export const store = createStore(reducers, applyMiddleware(logger, thunk));
