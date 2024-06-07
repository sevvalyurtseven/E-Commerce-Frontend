import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { createLogger } from "redux-logger";
import reducers from "./reducers/index.jsx";

const logger = createLogger();

export const store = createStore(reducers, applyMiddleware(thunk, logger));
