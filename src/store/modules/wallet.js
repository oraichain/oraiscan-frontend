import {createAction, handleActions} from "redux-actions";

export const initWallet = createAction("INIT_WALLET");

const initState = {
	address: "",
};

const handlers = {
	INIT_WALLET: (state, action) => {
		state.address = action.payload;
		return {...state};
	},
};

export default handleActions(handlers, initState);
