import {createGlobalStyle} from "styled-components";

let common = theme => {
	return `
  --common-textColor: ${theme?.data?.common?.textColor};
  --common-linkColor: ${theme?.data?.common?.linkColor};
  --common-activeTabColor: ${theme?.data?.common?.activeTabColor};
  --common-activeTabTextColor: ${theme?.data?.common?.activeTabTextColor};
  --common-buttonTextColor: ${theme?.data?.common?.buttonTextColor};
  --common-buttonBackgroundColor: ${theme?.data?.common?.buttonBackgroundColor};
  --common-backgroundColor: ${theme?.data?.common?.backgroundColor};
  --common-containerBackgroundColor: ${theme?.data?.common?.containerBackgroundColor};
  --common-blockItemBackgroundColor: ${theme?.data?.common?.blockItemBackgroundColor};
  --common-blockItemBackgroundColorDarken: ${theme?.data?.common?.blockItemBackgroundColorDarken};
  --common-borderColor: ${theme?.data?.common?.borderColor};
  --common-headerTextColor: ${theme?.data?.common?.headerTextColor};
  --common-paginationTextColor: ${theme?.data?.common?.paginationTextColor};
  --common-paginationActiveTextColor: ${theme?.data?.common?.paginationActiveTextColor};
  --common-placeholderTextColor: ${theme?.data?.common?.placeholderTextColor};
  --common-resultIconSuccessColor: ${theme?.data?.common?.resultIconSuccessColor};
  --common-resultIconFailureColor: ${theme?.data?.common?.resultIconFailureColor};
  --common-resultIconPendingColor: ${theme?.data?.common?.resultIconPendingColor};
  --common-oraiDenomTextColor: ${theme?.data?.common?.oraiDenomTextColor};
  --common-modal-modalCommonTextColor: ${theme?.data?.common?.modal?.modalCommonTextColor};
  --common-modal-modalCommonBorderColor: ${theme?.data?.common?.modal?.modalCommonBorderColor};
  --common-modal-modalCommonBackgroundColor: ${theme?.data?.common?.modal?.modalCommonBackgroundColor};
  --common-modal-modalSliderColor: ${theme?.data?.common?.modal?.modalSliderColor};
  --common-modal-buttonCancelBackgroundColor: ${theme?.data?.common?.modal?.buttonCancelBackgroundColor};
  --common-modal-buttonSubmitBackgroundColor: ${theme?.data?.common?.modal?.buttonSubmitBackgroundColor};

  --common-themedTable-headerBackgroundColor: ${theme?.data?.common?.themedTable?.headerBackgroundColor};
  --common-themedTable-oddRowBackgroundColor: ${theme?.data?.common?.themedTable?.oddRowBackgroundColor};
  --common-themedTable-evenRowBackgroundColor: ${theme?.data?.common?.themedTable?.evenRowBackgroundColor};
  --common-transactions-moreIconColor: ${theme?.data?.common?.transactions?.moreIconColor};
  --common-transactions-transactionTypeLabelColor: ${theme?.data?.common?.transactions?.transactionTypeLabelColor};
  --common-transactions-transactionTypeBackgroundColor: ${theme?.data?.common?.transactions?.transactionTypeBackgroundColor};
  --common-transactions-transactionTypeTextColor: ${theme?.data?.common?.transactions?.transactionTypeTextColor};
  --common-transactions-amountTransactionLabelInColor: ${theme?.data?.common?.transactions?.amountTransactionLabelInColor};
  --common-transactions-amountTransactionTextInColor: ${theme?.data?.common?.transactions?.amountTransactionTextInColor};
  --common-transactions-amountTransactionBackgroundInColor: ${theme?.data?.common?.transactions?.amountTransactionBackgroundInColor};
  --common-transactions-amountTransactionLabelOutColor: ${theme?.data?.common?.transactions?.amountTransactionLabelOutColor};
  --common-transactions-amountTransactionTextOutColor: ${theme?.data?.common?.transactions?.amountTransactionTextOutColor};
  --common-transactions-amountTransactionBackgroundOutColor: ${theme?.data?.common?.transactions?.amountTransactionBackgroundOutColor};
  --common-backGroundColorGray: ${theme?.data?.common?.backGroundColorGray};
`;
};

// All tabs
let dashboard = theme => {
	return `
  --dashboard-detailsFooterTextColor: ${theme?.data?.tabs?.dashboard?.detailsFooterTextColor};
  --dashboard-xAxisChartTextColor: ${theme?.data?.tabs?.dashboard?.xAxisChartTextColor};
  --dashboard-yAxisChartTextColor: ${theme?.data?.tabs?.dashboard?.yAxisChartTextColor};
  --dashboard-blockTimeCoinGeckoTextColor: ${theme?.data?.tabs?.dashboard?.blockTimeCoinGeckoTextColor};
  --dashboard-iconBlockTimesColor: ${theme?.data?.tabs?.dashboard?.iconBlockTimesColor};
  --dashboard-highChartMixedColor_1: ${theme?.data?.tabs?.dashboard?.highChartMixedColor_1};
  --dashboard-highChartMixedColor_2: ${theme?.data?.tabs?.dashboard?.highChartMixedColor_2};
  --dashboard-highChartLinearBorderColor_1: ${theme?.data?.tabs?.dashboard?.highChartLinearBorderColor_1};
  --dashboard-highChartLinearBorderColor_2: ${theme?.data?.tabs?.dashboard?.highChartLinearBorderColor_2};
`;
};

let validators = theme => {
	return {
		validators: `
      --validators-deletegateButtonTextColor: ${theme?.data?.tabs?.validators?.deletegateButtonTextColor};
      --validators-deletegateButtonBackgroundColor: ${theme?.data?.tabs?.validators?.deletegateButtonBackgroundColor};
      --validators-deletegateButtonBorderColor: ${theme?.data?.tabs?.validators?.deletegateButtonBorderColor};
      --validators-cumulativeShareBarColor_1: ${theme?.data?.tabs?.validators?.cumulativeShareBarColor_1};
      --validators-cumulativeShareBarColor_2: ${theme?.data?.tabs?.validators?.cumulativeShareBarColor_2};
      --validators-selectBackgroundBtn: ${theme?.data?.tabs?.validators?.selectBackgroundBtn};
      --validators-selectActiveBackgroundBtn: ${theme?.data?.tabs?.validators?.selectActiveBackgroundBtn};
      --validators-logo-border: ${theme?.data?.tabs?.validators?.logoBorder};`,
		validatorDetails: `
      --validators-validatorDetails-totalBlocksLabel: ${theme?.data?.tabs?.validators?.validatorDetails?.totalBlocksLabel};
      --validators-validatorDetails-totalBlocksLabelBackgroundColor: ${theme?.data?.tabs?.validators?.validatorDetails?.totalBlocksLabelBackgroundColor};
      --validators-validatorDetails-totalBlocksLabelTextColor: ${theme?.data?.tabs?.validators?.validatorDetails?.totalBlocksLabelTextColor};
      --validators-validatorDetails-binanceStacking-activeLabelTextColor: ${theme?.data?.tabs?.validators?.validatorDetails?.binanceStaking?.activeLabelTextColor};
      --validators-validatorDetails-binanceStacking-activeLabelColor: ${theme?.data?.tabs?.validators?.validatorDetails?.binanceStaking?.activeLabelColor};
      --validators-validatorDetails-delegatorsTable-oraiTextColor: ${theme?.data?.tabs?.validators?.validatorDetails?.delegatorsTable?.oraiTextColor};
      --validators-validatorDetails-missedBlocksTable-failedColor: ${theme?.data?.tabs?.validators?.validatorDetails?.missedBlocksTable?.failedColor};
      --validators-validatorDetails-missedBlocksTable-successColor: ${theme?.data?.tabs?.validators?.validatorDetails?.missedBlocksTable?.successColor};
    `,
	};
};

let proposals = theme => {
	return {
		topProposalCard: `
      --proposals-topProposalCard-statusPassedBorderColor: ${theme?.data?.tabs?.proposals?.topProposalCard?.statusPassedBorderColor};
      --proposals-topProposalCard-statusPassedBackgroundColor: ${theme?.data?.tabs?.proposals?.topProposalCard?.statusPassedBackgroundColor};
      --proposals-topProposalCard-statusPassedTextColor: ${theme?.data?.tabs?.proposals?.topProposalCard?.statusPassedTextColor};
      --proposals-topProposalCard-statusRejectedBorderColor: ${theme?.data?.tabs?.proposals?.topProposalCard?.statusRejectedBorderColor};
      --proposals-topProposalCard-statusRejectedBackgroundColor: ${theme?.data?.tabs?.proposals?.topProposalCard?.statusRejectedBackgroundColor};
      --proposals-topProposalCard-statusRejectedTextColor: ${theme?.data?.tabs?.proposals?.topProposalCard?.statusRejectedTextColor};
      --proposals-topProposalCard-graphColor_yes: ${theme?.data?.tabs?.proposals?.topProposalCard?.graphColor_yes};
      --proposals-topProposalCard-graphColor_no: ${theme?.data?.tabs?.proposals?.topProposalCard?.graphColor_no};
      --proposals-topProposalCard-graphColor_abstain: ${theme?.data?.tabs?.proposals?.topProposalCard?.graphColor_abstain};
      --proposals-topProposalCard-graphColor_nowithveto: ${theme?.data?.tabs?.proposals?.topProposalCard?.graphColor_nowithveto};
    `,
		proposalTable: `
      --proposals-proposalTable-statusPassedTextColor: ${theme?.data?.tabs?.proposals?.proposalTable?.statusPassedTextColor};
      --proposals-proposalTable-statusPassedBorderColor: ${theme?.data?.tabs?.proposals?.proposalTable?.statusPassedBorderColor};
      --proposals-proposalTable-statusPassedBackgroundColor: ${theme?.data?.tabs?.proposals?.proposalTable?.statusPassedBackgroundColor};
      --proposals-proposalTable-statusRejectedTextColor: ${theme?.data?.tabs?.proposals?.proposalTable?.statusRejectedTextColor};
      --proposals-proposalTable-statusRejectedBorderColor: ${theme?.data?.tabs?.proposals?.proposalTable?.statusRejectedBorderColor};
      --proposals-proposalTable-statusRejectedBackgroundColor: ${theme?.data?.tabs?.proposals?.proposalTable?.statusRejectedBackgroundColor};
      --proposals-proposalTable-statusFailedTextColor: ${theme?.data?.tabs?.proposals?.proposalTable?.statusFailedTextColor};
      --proposals-proposalTable-statusFailedBorderColor: ${theme?.data?.tabs?.proposals?.proposalTable?.statusFailedBorderColor};
      --proposals-proposalTable-statusFailedBackgroundColor: ${theme?.data?.tabs?.proposals?.proposalTable?.statusFailedBackgroundColor};
      --proposals-proposalTable-statusDepositPeriodTextColor: ${theme?.data?.tabs?.proposals?.proposalTable?.statusDepositPeriodTextColor};
      --proposals-proposalTable-statusDepositPeriodBorderColor: ${theme?.data?.tabs?.proposals?.proposalTable?.statusDepositPeriodBorderColor};
      --proposals-proposalTable-statusDepositPeriodBackgroundColor: ${theme?.data?.tabs?.proposals?.proposalTable?.statusDepositPeriodBackgroundColor};
      --proposals-proposalTable-statusUnspecifiedTextColor: ${theme?.data?.tabs?.proposals?.proposalTable?.statusUnspecifiedTextColor};
      --proposals-proposalTable-statusUnspecifiedBorderColor: ${theme?.data?.tabs?.proposals?.proposalTable?.statusUnspecifiedBorderColor};
      --proposals-proposalTable-statusUnspecifiedBackgroundColor: ${theme?.data?.tabs?.proposals?.proposalTable?.statusUnspecifiedBackgroundColor};
      --proposals-proposalTable-statusVotingPeriodTextColor: ${theme?.data?.tabs?.proposals?.proposalTable?.statusVotingPeriodTextColor};
      --proposals-proposalTable-statusVotingPeriodBorderColor: ${theme?.data?.tabs?.proposals?.proposalTable?.statusVotingPeriodBorderColor};
      --proposals-proposalTable-statusVotingPeriodBackgroundColor: ${theme?.data?.tabs?.proposals?.proposalTable?.statusVotingPeriodBackgroundColor};
    `,
		proposalDetails: `
      --proposals-proposalDetails-graphColor_yes: ${theme?.data?.tabs?.proposals?.proposalDetails?.graphColor_yes};
      --proposals-proposalDetails-graphColor_no: ${theme?.data?.tabs?.proposals?.proposalDetails?.graphColor_no};
      --proposals-proposalDetails-graphColor_abstain: ${theme?.data?.tabs?.proposals?.proposalDetails?.graphColor_abstain};
      --proposals-proposalDetails-graphColor_nowithveto: ${theme?.data?.tabs?.proposals?.proposalDetails?.graphColor_nowithveto};
      --proposals-proposalDetails-oraiTextColor: ${theme?.data?.tabs?.proposals?.proposalDetails?.oraiTextColor};
      --proposals-proposalDetails-labelPassedColor: ${theme?.data?.tabs?.proposals?.proposalDetails?.labelPassedColor};
    `,
	};
};

let dataSources = theme => {
	return {
		dataSourceDetails: `
      --dataSources-dataSourceDetails-requestTable-statusSuccessColor: ${theme?.data?.tabs?.dataSources?.dataSourceDetails?.requestTable?.statusSuccessColor};
      --dataSources-dataSourceDetails-requestTable-statusPendingColor: ${theme?.data?.tabs?.dataSources?.dataSourceDetails?.requestTable?.statusPendingColor};
      --dataSources-dataSourceDetails-requestTable-ownerTextColor: ${theme?.data?.tabs?.dataSources?.dataSourceDetails?.requestTable?.ownerTextColor};
    `,
		dataSourceTable: ``,
	};
};

let oracleScripts = theme => {
	return {
		oracleScriptDetails: `
      --oracleScripts-oracleScriptDetails-requestTable-statusSuccessColor: ${theme?.data?.tabs?.oracleScripts?.oracleScriptDetails?.requestTable?.statusSuccessColor};
      --oracleScripts-oracleScriptDetails-requestTable-statusPendingColor: ${theme?.data?.tabs?.oracleScripts?.oracleScriptDetails?.requestTable?.statusPendingColor};
      --oracleScripts-oracleScriptDetails-requestTable-ownerTextColor: ${theme?.data?.tabs?.oracleScripts?.oracleScriptDetails?.requestTable?.ownerTextColor};
    `,
		oracleScriptTable: ``,
	};
};

let requests = theme => {
	return {
		requests: `
      --requests-statusSuccessColor: ${theme?.data?.tabs?.requests?.statusSuccessColor};
      --requests-statusPendingColor: ${theme?.data?.tabs?.requests?.statusPendingColor};
    `,
		requestDetails: `
      --requests-requestDetails-oraiTextColor: ${theme?.data?.tabs?.requests?.requestDetails?.oraiTextColor};
    `,
		requestTable: `
      --requests-requestTable-ownerTextColor: ${theme?.data?.tabs?.requests?.requestTable?.ownerTextColor};
    `,
	};
};

let accounts = theme => {
	return {
		accountDetails: `
      --accounts-accountDetails-graphColor_available: ${theme?.data?.tabs?.accounts?.accountDetails?.graphColor_available};
      --accounts-accountDetails-graphColor_delegated: ${theme?.data?.tabs?.accounts?.accountDetails?.graphColor_delegated};
      --accounts-accountDetails-graphColor_reward: ${theme?.data?.tabs?.accounts?.accountDetails?.graphColor_reward};
      --accounts-accountDetails-graphColor_unbonding: ${theme?.data?.tabs?.accounts?.accountDetails?.graphColor_unbonding};
    `,
		accountTable: ``,
	};
};

let wallet = theme => {
	return {
		transactionTable: `
      --wallet-transactionTable-headerTextColor: ${theme?.data?.wallet?.transactionTable?.headerTextColor};
      --wallet-transactionTable-graphColor_delegated: ${theme?.data?.wallet?.transactionTable?.graphColor_delegated};
      --wallet-transactionTable-graphColor_reward: ${theme?.data?.wallet?.transactionTable?.graphColor_reward};
      --wallet-transactionTable-graphColor_unbonding: ${theme?.data?.wallet?.transactionTable?.graphColor_unbonding};
    `,
		becomeValidator: `
      --wallet-becomeValidator-registerForm-inputBorderColor: ${theme?.data?.wallet?.becomeValidator?.registerForm?.inputBorderColor};
      --wallet-becomeValidator-registerForm-iconInformationColor: ${theme?.data?.wallet?.becomeValidator?.registerForm?.iconInformationColor};
      --wallet-becomeValidator-registerForm-buttonNextColor: ${theme?.data?.wallet?.becomeValidator?.registerForm?.buttonNextColor};
      --wallet-becomeValidator-registerSuccessForm-validatorNameColor: ${theme?.data?.wallet?.becomeValidator?.registerSuccessForm?.validatorNameColor};
      --wallet-becomeValidator-registerSuccessForm-statusActiveColor: ${theme?.data?.wallet?.becomeValidator?.registerSuccessForm?.statusActiveColor};
      --wallet-becomeValidator-delegatorTable-addressLabelColor: ${theme?.data?.wallet?.becomeValidator?.delegatorTable?.addressLabelColor};
    `,
		delegatedValidator: ``,
		contact: ``,
	};
};

let priceFeed = theme => {
	return `
      --price-feed-hover: ${theme?.data?.priceFeed?.priceFeedHover};
`;
};

export const GlobalStyles = createGlobalStyle`
  :root {
    ${({theme}) => common(theme)}
    ${({theme}) => dashboard(theme)}

    ${({theme}) => validators(theme)?.validators}
    ${({theme}) => validators(theme)?.validatorDetails}

    ${({theme}) => proposals(theme)?.proposalDetails}
    ${({theme}) => proposals(theme)?.proposalTable}
    ${({theme}) => proposals(theme)?.topProposalCard}

    ${({theme}) => dataSources(theme)?.dataSourceDetails}
    ${({theme}) => dataSources(theme)?.dataSourceTable}

    ${({theme}) => oracleScripts(theme)?.oracleScriptDetails}
    ${({theme}) => oracleScripts(theme)?.oracleScriptTable}

    ${({theme}) => requests(theme)?.requestDetails}
    ${({theme}) => requests(theme)?.requestTable}
    ${({theme}) => requests(theme)?.requests}

    ${({theme}) => accounts(theme)?.accountDetails}
    ${({theme}) => accounts(theme)?.accountTable}

    ${({theme}) => wallet(theme)?.becomeValidator}
    ${({theme}) => wallet(theme)?.delegatedValidator}
    ${({theme}) => wallet(theme)?.transactionTable}
    ${({theme}) => wallet(theme)?.contact}
    ${({theme}) => priceFeed(theme)}
  }
`;
