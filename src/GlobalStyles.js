import {createGlobalStyle} from "styled-components";

let common = `
  --common-textColor: ${({theme}) => theme?.data?.common};
  --common-linkColor: ${({theme}) => theme?.data?.common};
  --common-activeTabColor: ${({theme}) => theme?.data?.common};
  --common-backgroundColor: ${({theme}) => theme?.data?.common};
  --common-containerBackgroundColor: ${({theme}) => theme?.data?.common};
  --common-blockItemBackgroundColor: ${({theme}) => theme?.data?.common};
  --common-borderColor: ${({theme}) => theme?.data?.common};
  --common-resultIconSuccessColor: ${({theme}) => theme?.data?.common};
  --common-resultIconFailureColor: ${({theme}) => theme?.data?.common};
  --common-themedTable-headerBackgroundColor: ${({theme}) => theme?.data?.common};
  --common-themedTable-oddRowBackgroundColor: ${({theme}) => theme?.data?.common};
  --common-themedTable-evenRowBackgroundColor: ${({theme}) => theme?.data?.common};
  --common-transactions-moreIconColor: ${({theme}) => theme?.data?.common};
  --common-transactions-transactionTypeLabelColor: ${({theme}) => theme?.data?.common};
  --common-transactions-amountTransactionLabelInColor: ${({theme}) => theme?.data?.common};
  --common-transactions-amountTransactionLabelOutColor: ${({theme}) => theme?.data?.common};
`;

// All tabs
let dashboard = `
  --dashboard-highChartMixedColor_1: ${({theme}) => theme?.data?.tabs?.dashboard};
  --dashboard-highChartMixedColor_2: ${({theme}) => theme?.data?.tabs?.dashboard};
  --dashboard-highChartLinearBorderColor_1: ${({theme}) => theme?.data?.tabs?.dashboard};
  --dashboard-highChartLinearBorderColor_2: ${({theme}) => theme?.data?.tabs?.dashboard};
`;

let validators = {
	validators: `
    --validators-cumulativeShareBarColor_1: ${({theme}) => theme?.data?.tabs?.validators?.cumulativeShareBarColor_1};
    --validators-cumulativeShareBarColor_2: ${({theme}) => theme?.data?.tabs?.validators?.cumulativeShareBarColor_1};`,
	validatorDetails: `
    --validators-validatorDetails-binanceStacking-activeLabelColor: ${({theme}) =>
			theme?.data?.tabs?.validators?.validatorDetails?.binanceStaking?.activeLabelColor};
    --validators-validatorDetails-delegatorsTable-oraiTextColor: ${({theme}) =>
			theme?.data?.tabs?.validators?.validatorDetails?.delegatorsTable?.oraiTextColor};
    --validators-validatorDetails-missedBlocksTable-failedColor: ${({theme}) =>
			theme?.data?.tabs?.validators?.validatorDetails?.missedBlocksTable?.failedColor};
    --validators-validatorDetails-missedBlocksTable-successColor: ${({theme}) =>
			theme?.data?.tabs?.validators?.validatorDetails?.missedBlocksTable?.successColor};
  `,
};

let proposals = {
	topProposalCard: `
    --proposals-topProposalCard-statusPassedColor: ${({theme}) => theme?.data?.tabs?.proposals?.topProposalCard?.statusPassedColor};
    --proposals-topProposalCard-statusRejectedColor: ${({theme}) => theme?.data?.tabs?.proposals?.topProposalCard?.statusRejectedColor};
    --proposals-topProposalCard-graphColor_yes: ${({theme}) => theme?.data?.tabs?.proposals?.topProposalCard?.graphColor_yes};
    --proposals-topProposalCard-graphColor_no: ${({theme}) => theme?.data?.tabs?.proposals?.topProposalCard?.graphColor_no};
    --proposals-topProposalCard-graphColor_abstain: ${({theme}) => theme?.data?.tabs?.proposals?.topProposalCard?.graphColor_abstain};
    --proposals-topProposalCard-graphColor_nowithveto: ${({theme}) => theme?.data?.tabs?.proposals?.topProposalCard?.graphColor_nowithveto};
  `,
	proposalTable: `
    --proposals-proposalTable-statusPassedColor: ${({theme}) => theme?.data?.tabs?.proposals?.proposalTable?.statusPassedColor};
    --proposals-proposalTable-statusFailedColor: ${({theme}) => theme?.data?.tabs?.proposals?.proposalTable?.statusFailedColor};
    --proposals-proposalTable-statusDepositPeriodColor: ${({theme}) => theme?.data?.tabs?.proposals?.proposalTable?.statusDepositPeriodColor};
    --proposals-proposalTable-statusUnspecifiedColor: ${({theme}) => theme?.data?.tabs?.proposals?.proposalTable?.statusUnspecifiedColor};
    --proposals-proposalTable-statusVotingPeriodColor: ${({theme}) => theme?.data?.tabs?.proposals?.proposalTable?.statusVotingPeriodColor};
  `,
	proposalDetails: `
    --proposals-proposalDetails-graphColor_yes: ${({theme}) => theme?.data?.tabs?.proposals?.proposalDetails?.graphColor_yes};
    --proposals-proposalDetails-graphColor_no: ${({theme}) => theme?.data?.tabs?.proposals?.proposalDetails?.graphColor_no};
    --proposals-proposalDetails-graphColor_abstain: ${({theme}) => theme?.data?.tabs?.proposals?.proposalDetails?.graphColor_abstain};
    --proposals-proposalDetails-graphColor_nowithveto: ${({theme}) => theme?.data?.tabs?.proposals?.proposalDetails?.graphColor_nowithveto};
    --proposals-proposalDetails-oraiTextColor: ${({theme}) => theme?.data?.tabs?.proposals?.proposalDetails?.oraiTextColor};
    --proposals-proposalDetails-labelPassedColor: ${({theme}) => theme?.data?.tabs?.proposals?.proposalDetails?.labelPassedColor};
  `,
};

let dataSources = {
	dataSourceDetails: `
    --dataSources-dataSourceDetails-requestTable-statusSuccessColor: ${({theme}) =>
			theme?.data?.tabs?.dataSources?.dataSourceDetails?.requestTable?.statusSuccessColor};
    --dataSources-dataSourceDetails-requestTable-statusPendingColor: ${({theme}) =>
			theme?.data?.tabs?.dataSources?.dataSourceDetails?.requestTable?.statusPendingColor};
    --dataSources-dataSourceDetails-requestTable-ownerTextColor: ${({theme}) =>
			theme?.data?.tabs?.dataSources?.dataSourceDetails?.requestTable?.ownerTextColor};
  `,
	dataSourceTable: ``,
};

let oracleScripts = {
	oracleScriptDetails: `
    --oracleScripts-oracleScriptDetails-requestTable-statusSuccessColor: ${({theme}) =>
			theme?.data?.tabs?.oracleScripts?.oracleScriptDetails?.requestTable?.statusSuccessColor};
    --oracleScripts-oracleScriptDetails-requestTable-statusPendingColor: ${({theme}) =>
			theme?.data?.tabs?.oracleScripts?.oracleScriptDetails?.requestTable?.statusPendingColor};
    --oracleScripts-oracleScriptDetails-requestTable-ownerTextColor: ${({theme}) =>
			theme?.data?.tabs?.oracleScripts?.oracleScriptDetails?.requestTable?.ownerTextColor};
  `,
	oracleScriptTable: ``,
};

let requests = {
	requests: `
    --requests-statusSuccessColor: ${({theme}) => theme?.data?.tabs?.requests?.statusSuccessColor};
    --requests-statusPendingColor: ${({theme}) => theme?.data?.tabs?.requests?.statusPendingColor};
  `,
	requestDetails: `
    --requests-requestDetails-oraiTextColor: ${({theme}) => theme?.data?.tabs?.requests?.requestDetails?.oraiTextColor};
  `,
	requestTable: `
    --requests-requestTable-ownerTextColor: ${({theme}) => theme?.data?.tabs?.requests?.requestTable?.ownerTextColor};
  `,
};

let accounts = {
	accountDetails: `
    --accounts-accountDetails-graphColor_available: ${({theme}) => theme?.data?.tabs?.accounts?.accountDetails?.graphColor_available};
    --accounts-accountDetails-graphColor_delegated: ${({theme}) => theme?.data?.tabs?.accounts?.accountDetails?.graphColor_delegated};
    --accounts-accountDetails-graphColor_reward: ${({theme}) => theme?.data?.tabs?.accounts?.accountDetails?.graphColor_reward};
    --accounts-accountDetails-graphColor_unbonding: ${({theme}) => theme?.data?.tabs?.accounts?.accountDetails?.graphColor_unbonding};
  `,
	accountTable: ``,
};

let wallet = {
	transactionTable: `
    --wallet-transactionTable-headerTextColor: ${({theme}) => theme?.data?.wallet?.transactionTable?.headerTextColor};
    --wallet-transactionTable-graphColor_delegated: ${({theme}) => theme?.data?.wallet?.transactionTable?.graphColor_delegated};
    --wallet-transactionTable-graphColor_reward: ${({theme}) => theme?.data?.wallet?.transactionTable?.graphColor_reward};
    --wallet-transactionTable-graphColor_unbonding: ${({theme}) => theme?.data?.wallet?.transactionTable?.graphColor_unbonding};
  `,
	becomeValidator: `
    --wallet-becomeValidator-registerForm-inputBorderColor: ${({theme}) => theme?.data?.wallet?.becomeValidator?.registerForm?.inputBorderColor};
    --wallet-becomeValidator-registerForm-iconInformationColor: ${({theme}) => theme?.data?.wallet?.becomeValidator?.registerForm?.iconInformationColor};
    --wallet-becomeValidator-registerForm-buttonNextColor: ${({theme}) => theme?.data?.wallet?.becomeValidator?.registerForm?.buttonNextColor};
    --wallet-becomeValidator-registerSuccessForm-validatorNameColor: ${({theme}) =>
			theme?.data?.wallet?.becomeValidator?.registerSuccessForm?.validatorNameColor};
    --wallet-becomeValidator-registerSuccessForm-statusActiveColor: ${({theme}) =>
			theme?.data?.wallet?.becomeValidator?.registerSuccessForm?.statusActiveColor};
    --wallet-becomeValidator-delegatorTable-addressLabelColor: ${({theme}) => theme?.data?.wallet?.becomeValidator?.delegatorTable?.addressLabelColor};
  `,
	delegatedValidator: ``,
	contact: ``,
};

export const GlobalStyles = createGlobalStyle`
  :root {
    ${common}
    ${dashboard}

    ${validators?.validators}
    ${validators?.validatorDetails}

    ${proposals?.proposalDetails}
    ${proposals?.proposalTable}
    ${proposals?.topProposalCard}

    ${dataSources?.dataSourceDetails}
    ${dataSources?.dataSourceTable}

    ${oracleScripts?.oracleScriptDetails}
    ${oracleScripts?.oracleScriptTable}

    ${requests?.requests}
    ${requests?.requestDetails}
    ${requests?.requestTable}

    ${accounts?.accountDetails}
    ${accounts?.accountTable}

    ${wallet?.becomeValidator}
    ${wallet?.contact}
    ${wallet?.delegatedValidator}
    ${wallet?.transactionTable}
  }
`;
