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
	LIGHT_GREY: "#D7D7D7",
	NERO: "#181818",
	SOLITUDE: "#F7F9FB",
	WHITE: "#FFFFFF",
	GAINSBORO: "#E7E7E7",
	KASHMIR_BLUE: "#546A8A",
	DARK_TANGERINE: "#F8A80E",
	SUNSHADE: "#F98442",
	MORTAR: "#5C5959",
	PACIFIC_BLUE: "#008BD9",
	CREAM: "#D6FEC4",
	PALE_GREEN: "#B9F79C",
	HONEYDEW: "#ECFFE9",
	FREE_SPEECH_GREEN: "#12C90E",
	ROSE_BUD: "#FF9A9A",
	DEEP_SKY_BLUE: "#00B1E9",
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
					activeTabTextColor: colors.HAWKES_BLUE,
					buttonTextColor: colors.HAWKES_BLUE,
					buttonBackgroundColor: colors.DODGER_BLUE,
					backgroundColor: colors.BLUE_WHALE,
					containerBackgroundColor: colors.REGAL_BLUE_1,
					blockItemBackgroundColor: colors.REGAL_BLUE_2,
					borderColor: colors.VENICE_BLUE,
					headerTextColor: colors.HAWKES_BLUE,
					paginationTextColor: colors.BERMUDA_GREY,
					paginationActiveTextColor: colors.HAWKES_BLUE,
					resultIconSuccessColor: colors.DODGER_BLUE,
					resultIconFailureColor: colors.RADICAL_RED,
					resultIconPendingColor: colors.YELLOW_SEA,
					placeholderTextColor: colors.LIGHT_GREY,
					oraiDenomTextColor: colors.CARIBBEAN_GREEN,
					modal: {
						modalCommonTextColor: colors.HAWKES_BLUE,
						modalCommonBorderColor: colors.VENICE_BLUE,
						modalCommonBackgroundColor: colors.REGAL_BLUE_1,
						buttonCancelBackgroundColor: colors.REGAL_BLUE_2,
						buttonSubmitBackgroundColor: colors.DODGER_BLUE,
						modalSliderColor: colors.DODGER_BLUE,
					},
					themedTable: {
						headerBackgroundColor: colors.REGAL_BLUE_1,
						oddRowBackgroundColor: colors.REGAL_BLUE_2,
						evenRowBackgroundColor: colors.REGAL_BLUE_1,
					},
					transactions: {
						moreIconColor: colors.YELLOW_SEA,
						transactionTypeLabelColor: colors.NEON_BLUE,
						transactionTypeBackgroundColor: colors.NEON_BLUE,
						transactionTypeTextColor: colors.HAWKES_BLUE,
						amountTransactionLabelInColor: colors.DODGER_BLUE,
						amountTransactionBackgroundInColor: colors.DODGER_BLUE,
						amountTransactionTextInColor: colors.HAWKES_BLUE,
						amountTransactionLabelOutColor: colors.YELLOW_SEA,
						amountTransactionBackgroundOutColor: colors.YELLOW_SEA,
						amountTransactionTextOutColor: colors.HAWKES_BLUE,
					},
				},
				tabs: {
					dashboard: {
						blockTimeCoinGeckoTextColor: colors.SUNSET_ORANGE,
						iconBlockTimesColor: colors.LIGHT_GREY,
						detailsFooterTextColor: colors.LIGHT_GREY,
						xAxisChartTextColor: colors.BERMUDA_GREY,
						yAxisChartTextColor: colors.BERMUDA_GREY,
						highChartMixedColor_1: colors.SUMMER_SKY,
						highChartMixedColor_2: colors.REGAL_BLUE_3,
						highChartLinearBorderColor_1: colors.MAYA_BLUE,
						highChartLinearBorderColor_2: colors.COLUMBIA_BLUE,
					},
					validators: {
						deletegateButtonBorderColor: colors.DODGER_BLUE,
						deletegateButtonBackgroundColor: colors.DODGER_BLUE,
						deletegateButtonTextColor: colors.HAWKES_BLUE,
						cumulativeShareBarColor_1: colors.DODGER_BLUE,
						cumulativeShareBarColor_2: colors.VIKING,
						logoBorder: colors.WHITE,
						validatorDetails: {
							totalBlocksLabel: colors.DODGER_BLUE,
							totalBlocksLabelBackgroundColor: colors.DODGER_BLUE,
							totalBlocksLabelTextColor: colors.HAWKES_BLUE,
							binanceStaking: {
								activeLabelTextColor: colors.REGAL_BLUE_1,
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
							statusPassedBorderColor: colors.CARIBBEAN_GREEN,
							statusPassedBackgroundColor: colors.CARIBBEAN_GREEN,
							statusPassedTextColor: colors.REGAL_BLUE_1,
							statusRejectedBorderColor: colors.SUNSET_ORANGE,
							statusRejectedBackgroundColor: colors.SUNSET_ORANGE,
							statusRejectedTextColor: colors.REGAL_BLUE_1,
							graphColor_yes: colors.CERULEAN, // not sure, lack of design
							graphColor_no: colors.VIKING, // not sure, lack of design
							graphColor_abstain: colors.ROMANTIC, // not sure, lack of design
							graphColor_nowithveto: colors.MAGIC_MINT, // not sure, lack of design
						},
						proposalTable: {
							statusRejectedTextColor: colors.HAWKES_BLUE,
							statusRejectedBorderColor: colors.VIOLET_RED,
							statusRejectedBackgroundColor: colors.VIOLET_RED,

							statusPassedTextColor: colors.HAWKES_BLUE,
							statusPassedBorderColor: colors.DODGER_BLUE,
							statusPassedBackgroundColor: colors.DODGER_BLUE,

							statusFailedTextColor: colors.HAWKES_BLUE,
							statusFailedBorderColor: colors.SUNSET_ORANGE,
							statusFailedBackgroundColor: colors.SUNSET_ORANGE,

							statusDepositPeriodTextColor: colors.HAWKES_BLUE,
							statusDepositPeriodBorderColor: colors.PELOROUS,
							statusDepositPeriodBackgroundColor: colors.PELOROUS,

							statusUnspecifiedTextColor: colors.HAWKES_BLUE,
							statusUnspecifiedBorderColor: colors.YELLOW_SEA,
							statusUnspecifiedBackgroundColor: colors.YELLOW_SEA,

							statusVotingPeriodTextColor: colors.HAWKES_BLUE, // notsure, lack of design
							statusVotingPeriodBorderColor: colors.YELLOW_SEA, // notsure, lack of design
							statusVotingPeriodBackgroundColor: colors.YELLOW_SEA, // notsure, lack of design
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
				common: {
					textColor: colors.NERO,
					linkColor: colors.ROYAL_BLUE,
					activeTabColor: colors.ROYAL_BLUE,
					activeTabTextColor: colors.WHITE,
					buttonTextColor: colors.ROYAL_BLUE,
					buttonBackgroundColor: "none",
					backgroundColor: colors.SOLITUDE,
					containerBackgroundColor: colors.WHITE,
					blockItemBackgroundColor: colors.WHITE_SMOKE,
					borderColor: colors.GAINSBORO,
					headerTextColor: colors.KASHMIR_BLUE,
					paginationTextColor: colors.NERO,
					paginationActiveTextColor: colors.NEON_BLUE,
					resultIconSuccessColor: colors.LIME_GREEN,
					resultIconFailureColor: colors.RADICAL_RED,
					resultIconPendingColor: colors.YELLOW_SEA,
					placeholderTextColor: colors.LIGHT_GREY,
					oraiDenomTextColor: colors.NEON_BLUE,
					modal: {
						modalCommonTextColor: colors.PACIFIC_BLUE,
						modalCommonBorderColor: colors.PACIFIC_BLUE,
						modalCommonBackgroundColor: colors.PACIFIC_BLUE,
						buttonCancelBackgroundColor: "none",
						buttonSubmitBackgroundColor: colors.DEEP_SKY_BLUE,
						modalSliderColor: colors.PACIFIC_BLUE,
					},
					themedTable: {
						headerBackgroundColor: colors.WHITE_SMOKE,
						oddRowBackgroundColor: colors.WHITE,
						evenRowBackgroundColor: colors.WHITE_SMOKE,
					},
					transactions: {
						moreIconColor: colors.DARK_TANGERINE,
						transactionTypeLabelColor: colors.NEON_BLUE,
						transactionTypeBackgroundColor: "none",
						transactionTypeTextColor: colors.NEON_BLUE,
						amountTransactionLabelInColor: colors.LIME_GREEN,
						amountTransactionBackgroundInColor: "none",
						amountTransactionTextInColor: colors.LIME_GREEN,
						amountTransactionLabelOutColor: colors.SUNSHADE,
						amountTransactionBackgroundOutColor: "none",
						amountTransactionTextOutColor: colors.SUNSHADE,
					},
				},
				tabs: {
					dashboard: {
						blockTimeCoinGeckoTextColor: colors.SUNSET_ORANGE,
						iconBlockTimesColor: colors.MORTAR,
						detailsFooterTextColor: colors.MORTAR,
						xAxisChartTextColor: colors.BERMUDA_GREY,
						yAxisChartTextColor: colors.BERMUDA_GREY,
						highChartMixedColor_1: colors.SUMMER_SKY,
						highChartMixedColor_2: colors.REGAL_BLUE_3,
						highChartLinearBorderColor_1: colors.MAYA_BLUE,
						highChartLinearBorderColor_2: colors.COLUMBIA_BLUE,
					},
					validators: {
						deletegateButtonBorderColor: colors.PACIFIC_BLUE,
						deletegateButtonBackgroundColor: "none",
						deletegateButtonTextColor: colors.PACIFIC_BLUE,
						cumulativeShareBarColor_1: colors.CREAM,
						cumulativeShareBarColor_2: colors.PALE_GREEN,
						logoBorder: colors.ROYAL_BLUE,
						validatorDetails: {
							totalBlocksLabel: colors.NEON_BLUE,
							totalBlocksLabelBackgroundColor: "none",
							totalBlocksLabelTextColor: colors.NEON_BLUE,
							binanceStaking: {
								activeLabelTextColor: colors.FREE_SPEECH_GREEN,
								activeLabelColor: colors.HONEYDEW,
							},
							delegatorsTable: {
								oraiTextColor: colors.NEON_BLUE,
							},
							missedBlocksTable: {
								failedColor: colors.ROSE_BUD,
								successColor: colors.COLUMBIA_BLUE,
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
							statusPassedBorderColor: colors.LIME_GREEN,
							statusPassedBackgroundColor: "none",
							statusPassedTextColor: colors.LIME_GREEN,
							statusRejectedBorderColor: colors.SUNSET_ORANGE,
							statusRejectedBackgroundColor: "none",
							statusRejectedTextColor: colors.SUNSET_ORANGE,
							statusTextColor: colors.REGAL_BLUE_1,
							graphColor_yes: colors.CERULEAN, // not sure, lack of design
							graphColor_no: colors.VIKING, // not sure, lack of design
							graphColor_abstain: colors.ROMANTIC, // not sure, lack of design
							graphColor_nowithveto: colors.MAGIC_MINT, // not sure, lack of design
						},
						proposalTable: {
							statusRejectedTextColor: colors.VIOLET_RED,
							statusRejectedBorderColor: colors.VIOLET_RED,
							statusRejectedBackgroundColor: colors.WHITE,

							statusPassedTextColor: colors.LIME_GREEN,
							statusPassedBorderColor: colors.LIME_GREEN,
							statusPassedBackgroundColor: colors.WHITE,

							statusFailedTextColor: colors.SUNSET_ORANGE,
							statusFailedBorderColor: colors.SUNSET_ORANGE,
							statusFailedBackgroundColor: colors.WHITE,

							statusDepositPeriodTextColor: colors.PELOROUS,
							statusDepositPeriodBorderColor: colors.PELOROUS,
							statusDepositPeriodBackgroundColor: colors.WHITE,

							statusUnspecifiedTextColor: colors.YELLOW_SEA,
							statusUnspecifiedBorderColor: colors.YELLOW_SEA,
							statusUnspecifiedBackgroundColor: colors.WHITE,

							statusVotingPeriodTextColor: colors.YELLOW_SEA, // notsure, lack of design
							statusVotingPeriodBorderColor: colors.YELLOW_SEA, // notsure, lack of design
							statusVotingPeriodBackgroundColor: colors.WHITE, // notsure, lack of design
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
	},
	allIds: Object.values(themeIds),
};
