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
	BLUE_WHALE: "#192B40",
	REGAL_BLUE_1: "#1E344D",
	HAWKES_BLUE: "#F6F7FB",
	SUMMER_SKY: "#3196D3",
	REGAL_BLUE_2: "#213B58",
	REGAL_BLUE_3: "#233D5C",
	MAYA_BLUE: "#42B6F6",
	COLUMBIA_BLUE: "#BFE8FF",
	VIKING: "#4EB3D3",
	SUNSET_ORANGE: "#F3574F",
	WHITE_SMOKE: "#F7F5F5",
	BERMUDA: "#7BCCC4",
	CERULEAN: "#0278AE",
	ROMANTIC: "#FFBF9B",
	MAGIC_MINT: "#A5ECD7",
	VIOLET_RED: "#D115BE",
	PELOROUS: "#287DCC",
};

export const themes = {
	byIds: {
		[themeIds.DARK]: {
			id: themeIds.DARK,
			data: {
				common: {
					textColor: colors.HAWKES_BLUE,
					linkColor: colors.DODGER_BLUE,
					activeTabColor: colors.DODGER_BLUE,
					backgroundColor: colors.BLUE_WHALE,
					containerBackgroundColor: colors.REGAL_BLUE_1,
					blockItemBackgroundColor: colors.REGAL_BLUE_2,
					borderColor: colors.VENICE_BLUE,
					resultIconSuccessColor: colors.DODGER_BLUE,
					resultIconFailureColor: colors.RADICAL_RED,
					themedTable: {
						headerBackgroundColor: colors.REGAL_BLUE_1,
						oddRowBackgroundColor: colors.REGAL_BLUE_2,
						evenRowBackgroundColor: colors.REGAL_BLUE_1,
					},
					transactions: {
						moreIconColor: colors.YELLOW_SEA,
						transactionTypeLabelColor: colors.NEON_BLUE,
						amountTransactionLabelInColor: colors.DODGER_BLUE,
						amountTransactionLabelOutColor: colors.YELLOW_SEA,
					},
				},
				tabs: {
					dashboard: {
						highChartMixedColor_1: colors.SUMMER_SKY,
						highChartMixedColor_2: colors.REGAL_BLUE_3,
						highChartLinearBorderColor_1: colors.MAYA_BLUE,
						highChartLinearBorderColor_2: colors.COLUMBIA_BLUE,
					},
					validators: {
						cumulativeShareBarColor_1: colors.DODGER_BLUE,
						cumulativeShareBarColor_2: colors.VIKING,
						validatorDetails: {
							binanceStaking: {
								activeLabelColor: colors.CARIBBEAN_GREEN,
							},
							delegatorsTable: {
								oraiTextColor: colors.CARIBBEAN_GREEN,
							},
							missedBlocksTable: {
								failedColor: colors.SUNSET_ORANGE,
								successColor: colors.DODGER_BLUE,
							},
						},
					},
					blocks: {
						blockDetails: {},
					},
					transactions: {
						transactionDetails: {},
					},
					proposals: {
						topProposalCard: {
							statusPassedColor: colors.CARIBBEAN_GREEN,
							statusRejectedColor: colors.SUNSET_ORANGE,
							graphColor_yes: colors.CERULEAN, // not sure, lack of design
							graphColor_no: colors.VIKING, // not sure, lack of design
							graphColor_abstain: colors.ROMANTIC, // not sure, lack of design
							graphColor_nowithveto: colors.MAGIC_MINT, // not sure, lack of design
						},
						proposalTable: {
							statusPassedColor: colors.DODGER_BLUE,
							statusFailedColor: colors.SUNSET_ORANGE,
							statusDepositPeriodColor: colors.PELOROUS,
							statusUnspecifiedColor: colors.YELLOW_SEA,
							statusVotingPeriodColor: colors.YELLOW_SEA, // notsure, lack of design
						},
						proposalDetails: {
							graphColor_yes: colors.CERULEAN,
							graphColor_no: colors.VIKING,
							graphColor_abstain: colors.ROMANTIC,
							graphColor_nowithveto: colors.MAGIC_MINT,
							oraiTextColor: colors.CARIBBEAN_GREEN,
							labelPassedColor: colors.CARIBBEAN_GREEN,
						},
					},
					dataSources: {
						dataSourceTable: {},
						dataSourceDetails: {
							requestTable: {
								statusSuccessColor: colors.DODGER_BLUE,
								statusPendingColor: colors.YELLOW_SEA,
								ownerTextColor: colors.CARIBBEAN_GREEN,
							},
							getCode: {
								// pending
							},
						},
					},
					oracleScripts: {
						oracleScriptTable: {},
						oracleScriptDetails: {
							requestTable: {
								statusSuccessColor: colors.DODGER_BLUE,
								statusPendingColor: colors.YELLOW_SEA,
								ownerTextColor: colors.CARIBBEAN_GREEN,
							},
							getCode: {
								// pending
							},
						},
					},
					requests: {
						statusSuccessColor: colors.DODGER_BLUE,
						statusPendingColor: colors.YELLOW_SEA,
						requestTable: {
							ownerTextColor: colors.CARIBBEAN_GREEN,
						},
						requestDetails: {
							oraiTextColor: colors.CARIBBEAN_GREEN,
						},
					},
					accounts: {
						accountTable: {},
						accountDetails: {
							graphColor_available: colors.CERULEAN,
							graphColor_delegated: colors.VIKING,
							graphColor_reward: colors.ROMANTIC,
							graphColor_unbonding: colors.MAGIC_MINT,
						},
					},
				},
				wallet: {
					transactionTable: {
						headerTextColor: colors.HAVELOCK_BLUE,
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
					contact: {},
				},
			},
		},
		[themeIds.LIGHT]: {
			id: themeIds.LIGHT,
			data: {
				textColor: "blue",
				backgroundColor: "#192B40",
			},
		},
	},
	allIds: Object.values(themeIds),
};
