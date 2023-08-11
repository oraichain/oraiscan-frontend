import { createAction, handleActions } from "redux-actions";

export const updateProposal = createAction("UPDATE_LIST_PROPOSAL");
export const removeProposal = createAction("REMOVE_LIST_PROPOSAL");
export const updateBondedToken = createAction("UPDATE_BONDED_TOKEN");

const initState = {
	proposals: [],
	bondTotal: 0,
};

const handlers = {
	UPDATE_LIST_PROPOSAL: (state, action) => {
		return {
			...state,
			proposals: [...action.payload, ...state.proposals],
		};
	},
	REMOVE_LIST_PROPOSAL: state => {
		return {
			...state,
			proposals: [],
		};
	},
	UPDATE_BONDED_TOKEN: (state, action) => {
		return {
			...state,
			bondTotal: action.payload,
		};
	},
};

export default handleActions(handlers, initState);
