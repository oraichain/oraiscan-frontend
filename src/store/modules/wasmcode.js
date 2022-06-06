import {createAction, handleActions} from "redux-actions";

export const storeWasmCode = createAction("STORE_WASM");
export const storePageCode = createAction("STORE_WASM_PAGE");

const initState = {
	wasmCode: {},
	page_id: 1,
	limit: 10,
};

const handlers = {
	STORE_WASM_PAGE: (state, {page_id, limit}) => {
		return {
			...state,
			page_id,
			limit,
		};
	},
};

export default handleActions(handlers, initState);
