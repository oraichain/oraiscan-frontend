export const themeIds = {
	LIGHT: 1,
	DARK: 2,
};

export const themes = {
	byIds: {
		[themeIds.LIGHT]: {
			id: themeIds.LIGHT,
			data: {
				textColor: "red",
				backgroundColor: "#F7F9FB",
			},
		},
		[themeIds.DARK]: {
			id: themeIds.DARK,
			data: {
				textColor: "blue",
				backgroundColor: "#192B40",
			},
		},
	},
	allIds: Object.values(themeIds),
};
