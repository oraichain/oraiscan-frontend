import {createAction, handleActions} from "redux-actions";

export const loadMore = createAction("LOAD_MORE");
export const loadAll = createAction("LOAD_MORE_ALL");

const initState = {
	loadMore: 1,
}

const handlers = {
	LOAD_MORE: (state) => {
		state.loadMore = state.loadMore + 1;
		return {...state};
	},
	LOAD_MORE_ALL: (state, action) => {
		state.loadMore = action.payload.loadMore || 1;
		return {...state};
	},
};

export default handleActions(handlers, initState);
