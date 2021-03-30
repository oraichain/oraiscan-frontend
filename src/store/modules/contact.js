import {createAction, handleActions} from "redux-actions";

export const addContact = createAction("ADD_CONTACT");

const initState = {};

const handlers = {
	ADD_CONTACT: (state, action) => {
		return {...state, ...action.payload};
	},
};

export default handleActions(handlers, initState);
