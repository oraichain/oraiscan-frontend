import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import penderMiddleware from "redux-pender";
import {createLogger} from "redux-logger";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

import {_} from "src/lib/scripts";

import * as modules from "./modules";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["wallet"],
};

// add all reducers
const reducers = persistReducer(persistConfig, combineReducers(modules));
const middlewares = [penderMiddleware()];
const isDev = process.env.NODE_ENV === "development";
if (isDev) {
	const logger = createLogger({
		collapsed: true,
		level: "log",
		//  to prevent pending console spam due to react pender
		predicate: (getState, action) => !(_.includes(action.type, "pender") || _.includes(action.type, "PENDING")), //  hide pender from logger
	});
	middlewares.push(logger);
}
// use dev tools only in dev
const devtools = isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devtools || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(...middlewares)));

export const persistor = persistStore(store);

export default store;
