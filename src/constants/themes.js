export const themeIds = {
	LIGHT: 1,
	DARK: 2,
};

const colors = {
	DENIM: "#F7F9FB",
	HAVELOCK_BLUE: "#546ABA",
	DODGER_BLUE: "#1A87FF",
	YELLOW_SEA: "#F59338",
	RADICAL_RED: "#FF2745",
	NEON_BLUE: "#5F51FF",
	VENICE_BLUE: "#2B5072",
	BERMUDA_GREY: "#69809D",
	ROYAL_BLUE: "#1B57F0",
	CARIBBEAN_GREEN: "#00CF7E",
	LIME_GREEN: "#3FCC28",
};

export const themes = {
	byIds: {
		[themeIds.LIGHT]: {
			id: themeIds.LIGHT,
			data: {
				common: {
					textColor: "red",
					linkColor: colors.DODGER_BLUE,
					backgroundColor: colors.DENIM,
				},
				wallet: {
					activeTabColor: colors.DODGER_BLUE,
					transactionTable: {
						headerTextColor: colors.HAVELOCK_BLUE,
						amountLabelInBackgroundColor: colors.DODGER_BLUE,
						amountLabelOutBackgroundColor: colors.YELLOW_SEA,
						resultIconSuccessColor: colors.DODGER_BLUE,
						resultIconFailureColor: colors.RADICAL_RED,
						typeLabelBackgroundColor: colors.NEON_BLUE,
					},
					becomeValidator: {
						registerForm: {
							inputBorderColor: colors.VENICE_BLUE,
							iconInformationColor: colors.BERMUDA_GREY,
							buttonNextColor: colors.DODGER_BLUE,
						},
						registerSuccessForm: {
							validatorNameColor: colors.ROYAL_BLUE,
							statusActiveColor: colors.CARIBBEAN_GREEN,
						},
						delegatorTable: {
							addressLabelColor: colors.NEON_BLUE,
						},
					},
					delegatedValidator: {
						claimReward: {},
						withdraw: {},
					},
				},
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
