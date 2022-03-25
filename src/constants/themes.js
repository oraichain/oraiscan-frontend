export const themeIds = {
	LIGHT: 1,
	DARK: 2,
};

const colors = {
	DENIM: "#F7F9FB",
	HAVELOCK_BLUE: "#546ABA",
	DODGER_BLUE: "#00A3FF",
	YELLOW_SEA: "#F59338",
	RADICAL_RED: "#FF2745",
	NEON_BLUE: "#5F51FF",
	VENICE_BLUE: "#2B5072",
	BERMUDA_GREY: "#69809D",
	ROYAL_BLUE: "#1B57F0",
	MINT_GREEN: "#00CF7E",
	LIME_GREEN: "#3FCC28",
	BLUE_WHALE: "#192B40",
	REGAL_BLUE_1: "#1E344D",
	HAWKES_BLUE: "#F6F7FB",
	SUMMER_SKY: "#3196D3",
	REGAL_BLUE_2: "#213B58",
	REGAL_BLUE_3: "#183657",
	MAYA_BLUE: "#42B6F6",
	COLUMBIA_BLUE: "#BFE8FF",
	VIKING: "#4EB3D3",
	SUNSET_ORANGE: "#F3574F",
	WHITE_SMOKE: "#F7F5F5",
	WHITE_SMOKE2: "#F7F5F5",
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
	GRAY: "#f5f5f5",
	SAPPHIRE: "#0e0314",
	PURPLE_1: "#302737",
	BASTILLE: "#2C2B2D",
	HAITI: "#1C1720",
	MULLED_WINE: "#322636",
	MULLED_WINE_2: "#4E4A5B",
	MEDIUM_STATE_BLUE: "#7664E4",
	BLUE_ZODIAC: "#423F5A",
	PURPLE_HEART: "#5A38BA",
	DEEP_DARK: "#322E36",
	PERANO: "#A79CEB",
	LINK_COLOR: "#D6CCF4",
	LABEL_BG_GRAY: "#2D2D35",
	LABEL_TEXT_GRAY: "#E2E4EB",
	LABEL_LIGHT_BG: "#EEEEF3",
	LABEL_LIGHT_TEXT: "#737998",
	LABEL_LIGHT_BORDER: "none",
	STATUS_PASSES_DARK: "#BBF8B1",
	STATUS_REJECTED_DARK: "#F2BCED",
	STATUS_UNSPECIFIED_DARK: "#F9CEA7",
	STATUS_DEPOSIT_PERIOD_DARK: "#A7CDF0",
	STATUS_VOTING_PERIOD_DARK: "#B4FBEE",
	STATUS_FAIL_DARK: "#EEAFAC",
	PAGINGNATION_TEXT_DARK: "#EBEAEF",
	PAGINGNATION_ACTIVE_TEXT_DARK: "#BDAFE2",
	SEPARATE_LINE_DARK: "#423F5A",
	MINT_GREEN: '#37cc6e',
	HOVER_DARK: "#403845",
	BOX_SHADOW_LIGHT: "rgba(174, 195, 210, 0.25)",
};

export const themes = {
	byIds: {
		[themeIds.DARK]: {
			id: themeIds.DARK,
			data: {
				common: {
					textColor: colors.HAWKES_BLUE,
					linkColor: colors.LINK_COLOR,
					tabColor: colors.BASTILLE,
					activeTabColor: colors.MEDIUM_STATE_BLUE,
					activeTabTextColor: colors.HAWKES_BLUE,
					buttonTextColor: colors.HAWKES_BLUE,
					buttonBackgroundColor: colors.MEDIUM_STATE_BLUE,
					backgroundColor: colors.SAPPHIRE,
					containerBackgroundColor: colors.PURPLE_1,
					blockItemBackgroundColor: colors.HAITI,
					blockItemBackgroundColorDarken: colors.REGAL_BLUE_3,
					borderColor: colors.BLUE_ZODIAC,
					headerTextColor: colors.HAWKES_BLUE,
					paginationTextColor: colors.PAGINGNATION_TEXT_DARK,
					paginationActiveTextColor: colors.PAGINGNATION_ACTIVE_TEXT_DARK,
					resultIconSuccessColor: colors.MEDIUM_STATE_BLUE,
					resultIconFailureColor: colors.RADICAL_RED,
					resultIconPendingColor: colors.YELLOW_SEA,
					placeholderTextColor: colors.LIGHT_GREY,
					oraiDenomTextColor: colors.LINK_COLOR,
					backGroundColorGray: colors.BLUE_WHALE,
					separateLine: colors.SEPARATE_LINE_DARK,
					boxShadowColor: "none",
					modal: {
						modalCommonTextColor: colors.PERANO,
						modalCommonBorderColor: colors.PERANO,
						modalCommonBackgroundColor: colors.REGAL_BLUE_1,
						buttonCancelBackgroundColor: "transparent",
						buttonSubmitBackgroundColor: colors.MEDIUM_STATE_BLUE,
						modalSliderColor: colors.DODGER_BLUE,
					},
					themedTable: {
						headerBackgroundColor: colors.MULLED_WINE_2,
						oddRowBackgroundColor: colors.HAITI,
						evenRowBackgroundColor: colors.HAITI,
						tableBorderColor: colors.MULLED_WINE,
					},
					transactions: {
						moreIconColor: colors.YELLOW_SEA,
						transactionTypeLabelColor: colors.LABEL_BG_GRAY,
						transactionTypeBackgroundColor: colors.LABEL_BG_GRAY,
						transactionTypeTextColor: colors.LABEL_TEXT_GRAY,
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
						deletegateButtonBorderColor: colors.MEDIUM_STATE_BLUE,
						deletegateButtonBackgroundColor: colors.MEDIUM_STATE_BLUE,
						deletegateButtonTextColor: colors.HAWKES_BLUE,
						deletegateButtonBackgroundColorHover: "#6657C0",
						cumulativeShareBarColor_1: "#352E45",
						cumulativeShareBarColor_2: "#4B455F",
						logoBorder: colors.WHITE,
						selectActiveBackgroundBtn: colors.MEDIUM_STATE_BLUE,
						validatorDetails: {
							totalBlocksLabel: colors.MEDIUM_STATE_BLUE,
							totalBlocksLabelBackgroundColor: colors.MEDIUM_STATE_BLUE,
							totalBlocksLabelTextColor: colors.HAWKES_BLUE,
							binanceStaking: {
								activeLabelTextColor: colors.REGAL_BLUE_1,
								activeLabelColor: colors.MINT_GREEN,
							},
							delegatorsTable: {
								oraiTextColor: colors.LINK_COLOR,
							},
							missedBlocksTable: {
								failedColor: colors.SUNSET_ORANGE,
								successColor: colors.MEDIUM_STATE_BLUE,
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
							statusPassedBorderColor: colors.STATUS_PASSES_DARK,
							statusPassedBackgroundColor: "#322E36",
							statusPassedTextColor: colors.STATUS_PASSES_DARK,
							statusRejectedBorderColor: colors.STATUS_REJECTED_DARK,
							statusRejectedBackgroundColor: "#322E36",
							statusRejectedTextColor: colors.STATUS_REJECTED_DARK,
							graphColor_yes: colors.CERULEAN, // not sure, lack of design
							graphColor_no: colors.VIKING, // not sure, lack of design
							graphColor_abstain: colors.ROMANTIC, // not sure, lack of design
							graphColor_nowithveto: colors.MAGIC_MINT, // not sure, lack of design
						},
						proposalTable: {
							statusRejectedTextColor: colors.STATUS_REJECTED_DARK,
							statusRejectedBorderColor: colors.STATUS_REJECTED_DARK,
							statusRejectedBackgroundColor: "#322E36",

							statusPassedTextColor: colors.STATUS_PASSES_DARK,
							statusPassedBorderColor: colors.STATUS_PASSES_DARK,
							statusPassedBackgroundColor: "#322E36",

							statusFailedTextColor: colors.STATUS_FAIL_DARK,
							statusFailedBorderColor: colors.STATUS_FAIL_DARK,
							statusFailedBackgroundColor: "#322E36",

							statusDepositPeriodTextColor: colors.STATUS_DEPOSIT_PERIOD_DARK,
							statusDepositPeriodBorderColor: colors.STATUS_DEPOSIT_PERIOD_DARK,
							statusDepositPeriodBackgroundColor: "#322E36",

							statusUnspecifiedTextColor: colors.STATUS_UNSPECIFIED_DARK,
							statusUnspecifiedBorderColor: colors.STATUS_UNSPECIFIED_DARK,
							statusUnspecifiedBackgroundColor: "#322E36",

							statusVotingPeriodTextColor: colors.STATUS_VOTING_PERIOD_DARK, // notsure, lack of design
							statusVotingPeriodBorderColor: colors.STATUS_VOTING_PERIOD_DARK, // notsure, lack of design
							statusVotingPeriodBackgroundColor: "#322E36", // notsure, lack of design
						},
						proposalDetails: {
							graphColor_yes: colors.CERULEAN,
							graphColor_no: colors.VIKING,
							graphColor_abstain: colors.ROMANTIC,
							graphColor_nowithveto: colors.MAGIC_MINT,
							oraiTextColor: colors.LINK_COLOR,
							labelPassedColor: colors.MINT_GREEN,
						},
					},
					dataSources: {
						dataSourceTable: {},
						dataSourceDetails: {
							requestTable: {
								statusSuccessColor: colors.DODGER_BLUE,
								statusPendingColor: colors.YELLOW_SEA,
								ownerTextColor: colors.MINT_GREEN,
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
								ownerTextColor: colors.MINT_GREEN,
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
							ownerTextColor: colors.MINT_GREEN,
						},
						requestDetails: {
							oraiTextColor: colors.LINK_COLOR,
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
							statusActiveColor: colors.MINT_GREEN,
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
				priceFeed: {
					priceFeedHover: "#403845",
				},
			},
		},
		[themeIds.LIGHT]: {
			id: themeIds.LIGHT,
			data: {
				common: {
					textColor: colors.NERO,
					linkColor: colors.PURPLE_HEART,
					tabColor: colors.WHITE,
					activeTabColor: colors.MEDIUM_STATE_BLUE,
					activeTabTextColor: colors.WHITE,
					buttonTextColor: colors.MEDIUM_STATE_BLUE,
					buttonBackgroundColor: "none",
					backgroundColor: colors.SOLITUDE,
					containerBackgroundColor: colors.WHITE,
					blockItemBackgroundColor: colors.WHITE_SMOKE,
					blockItemBackgroundColorDarken: colors.WHITE_SMOKE_2,
					borderColor: colors.GAINSBORO,
					headerTextColor: colors.KASHMIR_BLUE,
					paginationTextColor: colors.NERO,
					paginationActiveTextColor: colors.NEON_BLUE,
					resultIconSuccessColor: colors.LIME_GREEN,
					resultIconFailureColor: colors.RADICAL_RED,
					resultIconPendingColor: colors.YELLOW_SEA,
					placeholderTextColor: colors.SEPARATE_LINE_DARK,
					oraiDenomTextColor: colors.NEON_BLUE,
					backGroundColorGray: colors.GRAY,
					separateLine: colors.GAINSBORO,
					boxShadowColor: colors.BOX_SHADOW_LIGHT,
					modal: {
						modalCommonTextColor: colors.MEDIUM_STATE_BLUE,
						modalCommonBorderColor: colors.MEDIUM_STATE_BLUE,
						modalCommonBackgroundColor: colors.MEDIUM_STATE_BLUE,
						buttonCancelBackgroundColor: "none",
						buttonSubmitBackgroundColor: colors.MEDIUM_STATE_BLUE,
						modalSliderColor: colors.PACIFIC_BLUE,
					},
					themedTable: {
						headerBackgroundColor: colors.WHITE_SMOKE,
						oddRowBackgroundColor: colors.WHITE,
						evenRowBackgroundColor: colors.WHITE_SMOKE,
						tableBorderColor: colors.GAINSBORO,
					},
					transactions: {
						moreIconColor: colors.DARK_TANGERINE,
						transactionTypeLabelColor: colors.LABEL_LIGHT_BG,
						transactionTypeBackgroundColor: colors.LABEL_LIGHT_BG,
						transactionTypeTextColor: colors.LABEL_LIGHT_TEXT,
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
						deletegateButtonBorderColor: colors.MEDIUM_STATE_BLUE,
						deletegateButtonBackgroundColor: "none",
						deletegateButtonTextColor: colors.MEDIUM_STATE_BLUE,
						deletegateButtonBackgroundColorHover: "#ECEAFA",
						cumulativeShareBarColor_1: colors.CREAM,
						cumulativeShareBarColor_2: colors.PALE_GREEN,
						logoBorder: colors.ROYAL_BLUE,
						selectBackgroundBtn: colors.WHITE,
						selectActiveBackgroundBtn: colors.MEDIUM_STATE_BLUE,
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
								successColor: colors.LINK_COLOR,
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
							oraiTextColor: colors.NEON_BLUE,
							labelPassedColor: colors.MINT_GREEN,
						},
					},
					dataSources: {
						dataSourceTable: {},
						dataSourceDetails: {
							requestTable: {
								statusSuccessColor: colors.DODGER_BLUE,
								statusPendingColor: colors.YELLOW_SEA,
								ownerTextColor: colors.MINT_GREEN,
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
								ownerTextColor: colors.MINT_GREEN,
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
							ownerTextColor: colors.MINT_GREEN,
						},
						requestDetails: {
							oraiTextColor: colors.NEON_BLUE,
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
							statusActiveColor: colors.MINT_GREEN,
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
				priceFeed: {
					priceFeedHover: "#f6f6f6",
				},
			},
		},
	},
	allIds: Object.values(themeIds),
};
