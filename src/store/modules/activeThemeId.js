import {createAction, handleActions} from "redux-actions";
import {themeIds} from "src/constants/themes";

export const setActiveThemeId = createAction("SET_ACTIVE_THEME_ID");

const initState = themeIds.DARK;

const handlers = {
	SET_ACTIVE_THEME_ID: (_, action) => {
		return action.payload;
	},
};

export default handleActions(handlers, initState);
