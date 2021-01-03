import {createAction, handleActions} from "redux-actions";

export const showAlert = createAction("SHOW_ALERT");
export const hideAlert = createAction("HIDE_ALERT");

const initState = {
	showAlert: {
		show: false,
		message: "",
		autoHideDuration: 3000,
	},
};

const handlers = {
	SHOW_ALERT: (state, action) => {
		state.showAlert = action.payload;
		return {...state};
	},
	HIDE_ALERT: (state, action) => {
		state.showAlert = {
			show: false,
			message: "",
			autoHideDuration: 3000,
		};
		return {...state};
	},
};

export default handleActions(handlers, initState);
