import {createAction, handleActions} from "redux-actions";

export const initWallet = createAction("INIT_WALLET");

const initState = {
	address: "",
	name: "",
	pubKey: Buffer.from("").toString("base64"),
};

const handlers = {
	INIT_WALLET: (state, action) => {
		state.address = action.payload.address || "";
		state.name = action.payload.name || "";
		state.pubKey = action.payload.pubKey || Buffer.from("").toString("base64");
		return {...state};
	},
};

export default handleActions(handlers, initState);
