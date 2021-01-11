import {createAction, handleActions} from "redux-actions";

export const showAlert = createAction("SHOW_ALERT");
export const hideAlert = createAction("HIDE_ALERT");
export const openPageBar = createAction("OPEN_PAGE_BAR");
export const closePageBar = createAction("CLOSE_PAGE_BAR");

const initState = {
	showAlert: {
		show: false,
		message: "",
		autoHideDuration: 3000,
	},
	openPageBar: false,
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
	OPEN_PAGE_BAR: state => {
		state.openPageBar = true;
		return {...state};
	},
	CLOSE_PAGE_BAR: state => {
		state.openPageBar = false;
		return {...state};
	},
};

export default handleActions(handlers, initState);
