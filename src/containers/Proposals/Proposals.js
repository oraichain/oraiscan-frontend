import React, { useState, useRef, useEffect } from "react";
import { useGet } from "restful-react";
import { useSelector } from "react-redux";
import cn from "classnames/bind";
import { useTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import * as yup from "yup";
import _ from "lodash";
import { yupResolver } from "@hookform/resolvers/yup";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import { isNil } from "lodash-es";
import { formatFloat } from "src/helpers/helper";
import consts from "src/constants/consts";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import TogglePageBar from "src/components/common/TogglePageBar";
import FilterSection from "src/components/common/FilterSection";
import FilterSectionSkeleton from "src/components/common/FilterSection/FilterSectionSkeleton";
import NoResult from "src/components/common/NoResult";
import Pagination from "src/components/common/Pagination";
import { Fee, Gas } from "src/components/common/Fee";
import TopProposalCardList from "src/components/Proposals/TopProposalCardList";
import TopProposalCardListSkeleton from "src/components/Proposals/TopProposalCardList/TopProposalCardListSkeleton";
import ProposalsTable from "src/components/Proposals/ProposalsTable/ProposalsTable";
import ProposalsTableSkeleton from "src/components/Proposals/ProposalsTable/ProposalsTableSkeleton";
import ProposalCardList from "src/components/Proposals/ProposalCardList/ProposalCardList";
import ProposalCardListSkeleton from "src/components/Proposals/ProposalCardList/ProposalCardListSkeleton";
import SelectBox from "src/components/common/SelectBox";
import AddIcon from "src/icons/AddIcon";
import { ReactComponent as CloseIcon } from "src/assets/icons/close.svg";
import moment from "moment";
import styles from "./Proposals.scss";
import { walletStation } from "src/lib/walletStation";
import { handleTransactionResponse } from "src/helpers/transaction";
import { notification } from "antd";
import LoadingOverlay from "src/components/common/LoadingOverlay";
import Big from "big.js";

const cx = cn.bind(styles);

const dateTimeVoting = time => {
	const dateVoting = new Date().toISOString().split("T")[0];
	const newDate = new Date();
	const timeOption = time ? new Date(newDate.getTime() + time) : newDate;
	const timeVoting = timeOption
		.toTimeString()
		.split(" ")[0]
		.slice(0, -3);
	return `${dateVoting}T${timeVoting}`;
};

const schema = yup.object().shape({
	title: yup.string().required("The Title is required"),
	description: yup.mixed().required("The Description is required"),
	amount: yup.string().required("The Amount is required"),
	voting_period_day: yup
		.number()
		.transform(value => (isNaN(value) ? -1 : value))
		.min(1, "Min value is 1 day"),
	voting_period_time: yup
		.string()
		.when("voting_period_day", {
			is: (val) => val === undefined,
			then: yup.string().test("is-greater", "Min value is 1 hour", function (value) {
				const defaultTime = "01:00:00";
				return moment(value, "HH:mm:ss").isSameOrAfter(moment(defaultTime, "HH:mm:ss"))
			}),
			otherwise: yup.string().notRequired()
		}),
	unbondingTime: yup.string(),
	// .required("The Unbonding time is required.")
	communitytax: yup
		.number()
		.transform(value => (isNaN(value) ? -1 : value))
		// .required("The Community Tax is required")
		.max(100, "Max value is 100%")
		.min(0, "Min value is 0%"),
	InflationMin: yup
		.number()
		.transform(value => (isNaN(value) ? -1 : value))
		// .required("The Community Tax is required")
		.max(100, "Max value is 100%")
		.min(0, "Min value is 0%"),
	InflationMax: yup
		.number()
		.transform(value => (isNaN(value) ? -1 : value))
		// .required("The Community Tax is required")
		.max(100, "Max value is 100%")
		.min(0, "Min value is 0%"),
});

const defaultValues = {
	title: "",
	description: "",
	amount: 10,
	unbondingTime: 3600,
	voting_period_day: 1,
	voting_period_time: "01:00:00",
	communitytax: 0,
	InflationMin: 0,
	InflationMax: 0,
};
const {
	PROPOSALS_OPTIONS: { UNBONDING_TIME, VOTING_PERIOD, COMMUNITY_TAX, INFLATION_MIN, INFLATION_MAX },
	VOTING_PERIOD_OPTIONS: { VOTING_DAY, VOTING_TIME },
} = consts;

const fields = [
	{
		label: "Unbonding time",
		value: UNBONDING_TIME,
	},
	{
		label: "Voting Period",
		value: VOTING_PERIOD,
	},
	{
		label: "Community Tax",
		value: COMMUNITY_TAX,
	},
	{
		label: "Minimum Inflation",
		value: INFLATION_MIN,
	},
	{
		label: "Maximum Inflation",
		value: INFLATION_MAX,
	},
];

const votingFields = [
	{
		label: "Day",
		value: VOTING_DAY,
	},
	{
		label: "Time",
		value: VOTING_TIME,
	},
];

export default function (props) {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [status, setStatus] = useState("PROPOSAL_STATUS_ALL");
	const [topPageId, setTopPageId] = useState(1);
	const totalTopPagesRef = useRef(null);
	const [pageId, setPageId] = useState(1);
	const [loadingTransaction, setLoadingTransaction] = useState(false);
	const totalPagesRef = useRef(null);
	const history = useHistory();
	const queryStringParse = queryString.parse(history.location.search) || {};
	const type = queryStringParse?.type ?? null;
	const [fieldValue, setFieldValue] = useState(UNBONDING_TIME);
	const [votingValue, setVotingValue] = useState(VOTING_DAY);
	const minFee = useSelector(state => state.blockchain.minFee);
	const { address, account } = useSelector(state => state.wallet);
	const [gas, setGas] = useState(200000);
	const [fee, setFee] = useState(0);
	const [open, setOpen] = useState(false);

	const {
		handleSubmit,
		register,
		unregister,
		control,
		formState: { errors },
		clearErrors,
	} = useForm({ defaultValues, resolver: yupResolver(schema) });

	useEffect(() => {
		if (fieldValue) {
			clearErrors();
		}
	}, [fieldValue]);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const onTopPageChange = page => {
		setTopPageId(page);
	};

	const onPageChange = page => {
		setPageId(page);
	};

	const topPath = `${consts.API.PROPOSALS}?status${!isNil(type) ? "&type=" + type : ""}&limit=3&page_id=${topPageId}`;
	const { data: topData, loading: topLoading, error: topError } = useGet({
		path: topPath,
	});

	const statusPath = consts.API.PROPOSAL_STATUS;
	const { data: statusData, loading: statusLoading, error: statusError } = useGet({
		path: statusPath,
	});

	const basePath = `${consts.API.PROPOSALS}?limit=${consts.REQUEST.LIMIT}${type ? "&type=" + type : ""}`;
	let path;
	if (status === "PROPOSAL_STATUS_ALL") {
		path = `${basePath}&page_id=${pageId}`;
	} else {
		path = `${basePath}&status=${status}&page_id=${pageId}`;
	}
	const { data, loading, error } = useGet({
		path: path,
	});

	let titleSection;
	let createButton;
	let topProposalCardList;
	let filterSection;
	let tableSection;
	let paginationTopSection;
	let paginationSection;

	createButton = (
		<div className={cx("create-button")} onClick={handleOpen}>
			<span className={cx("create-button-text")}>Create Proposal</span>
			<AddIcon className={cx("create-button-icon")} />
		</div>
	);

	const hmsToMiliSeconds = times => {
		const hmsArr = times.split(":");
		const seconds = +hmsArr[0] * 60 * 60 + +hmsArr[1] * 60 + +hmsArr[2];
		return new Big(seconds).mul(new Big(Math.pow(10, 9))).toFixed(0);
	};

	const handleDayTimePeriod = (days, times) => {
		if (days) {
			return new Big(Math.round(days * 24 * 60 * 60)).mul(new Big(Math.pow(10, 9))).toFixed(0);
		}
		return hmsToMiliSeconds(times);
	};

	const handleOptionData = data => {
		switch (fieldValue) {
			case VOTING_PERIOD:
				const { voting_period_day: days, voting_period_time: times } = data;
				return {
					...data,
					subspace: "gov",
					key: VOTING_PERIOD,
					value: JSON.stringify({
						voting_period: JSON.stringify(handleDayTimePeriod(days, times)),
					}),
				};
			case COMMUNITY_TAX:
				return {
					...data,
					subspace: "distribution",
					key: COMMUNITY_TAX,
					value: JSON.stringify(JSON.stringify(data?.communitytax / 100)),
				};
			case INFLATION_MIN:
				return {
					...data,
					subspace: "mint",
					key: INFLATION_MIN,
					value: JSON.stringify(JSON.stringify(data?.InflationMin / 100)),
				};
			case INFLATION_MAX:
				return {
					...data,
					subspace: "mint",
					key: INFLATION_MAX,
					value: JSON.stringify(JSON.stringify(data?.InflationMax / 100)),
				};
			default:
				return {
					...data,
					subspace: "staking",
					key: UNBONDING_TIME,
					value: JSON.stringify(data?.unbondingTime),
				};
		}
	};

	const onSubmit = async data => {
		try {
			setLoadingTransaction(true);
			const newData = handleOptionData(data);
			const { title, description, subspace, key, value, amount } = newData;
			const response = await walletStation.parameterChangeProposal(address, data.amount, {
				title: data.title,
				description: draftToHtml(data.description),
				changes: [
					{
						subspace,
						key,
						value,
					},
				],
				amount,
			});
			console.log("Result parameter change proposal: ", response);
			handleTransactionResponse(response, notification, history, setLoadingTransaction);
		} catch (error) {
			setLoadingTransaction(false);
			notification.error({ message: `Transaction failed with message: ${error?.toString()}` });
			console.log(error);
		}
	};

	if (isLargeScreen) {
		titleSection = (
			<Container fixed>
				<TitleWrapper>
					<PageTitle title={"Proposals"} />
					<StatusBox />
				</TitleWrapper>
			</Container>
		);
	} else {
		titleSection = <TogglePageBar type='proposals' />;
	}

	if (topLoading) {
		topProposalCardList = <TopProposalCardListSkeleton />;
	} else {
		if (topError) {
			totalPagesRef.current = null;
			topProposalCardList = <TopProposalCardList data={[]} />;
		} else {
			if (!isNaN(topData?.page?.total_page)) {
				totalTopPagesRef.current = topData?.page?.total_page;
			} else {
				totalTopPagesRef.current = null;
			}

			if (Array.isArray(topData?.data) && topData?.data?.length > 0) {
				topProposalCardList = <TopProposalCardList data={topData?.data} type={type} />;
			} else {
				tableSection = <NoResult />;
			}
		}
	}

	if (statusLoading) {
		filterSection = <FilterSectionSkeleton />;
	} else {
		let filterData;
		if (statusError) {
			filterData = [
				{
					label: "ALL",
					value: "PROPOSAL_STATUS_ALL",
				},
			];
		} else {
			filterData = statusData.map(value => {
				const filterItem = {
					label: value.replace("PROPOSAL_STATUS_", "").replace("_", " "),
					value: value,
				};
				return filterItem;
			});

			filterData.unshift({
				label: "ALL",
				value: "PROPOSAL_STATUS_ALL",
			});
		}

		filterSection = (
			<FilterSection
				className={cx("filter-section")}
				data={filterData}
				value={status}
				onChange={value => {
					setStatus(value);
				}}
			/>
		);
	}

	if (loading) {
		tableSection = isLargeScreen ? <ProposalsTableSkeleton /> : <ProposalCardListSkeleton />;
	} else {
		if (error) {
			totalPagesRef.current = null;
			tableSection = <NoResult />;
		} else {
			if (!isNaN(data?.page?.total_page)) {
				totalPagesRef.current = data.page.total_page;
			} else {
				totalPagesRef.current = null;
			}

			if (Array.isArray(data?.data) && data.data.length > 0) {
				tableSection = isLargeScreen ? <ProposalsTable data={data.data} type={type} /> : <ProposalCardList data={data.data} type={type} />;
			} else {
				tableSection = <NoResult />;
			}
		}
	}
	paginationTopSection = totalTopPagesRef.current ? (
		<Pagination pages={totalTopPagesRef.current} page={topPageId} onChange={(e, page) => onTopPageChange(page)} />
	) : (
		<></>
	);
	paginationSection = totalPagesRef.current ? <Pagination pages={totalPagesRef.current} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

	const handleVotingPeriod = value => {
		if (value === VOTING_DAY) {
			return (
				<>
					<Controller as={<input type='number' step='any' className={cx("text-field", "field-voting-input")} />} name={VOTING_DAY} control={control} ref={register} />
				</>
			);
		}
		return (
			<>
				<Controller as={<input type='time' step='1' className={cx("text-field", "field-voting-input", "without_ampm")} />} name={VOTING_TIME} control={control} />
			</>
		);
	};

	return (
		<>
			{titleSection}
			<Container fixed className={cx("proposals")}>
				{createButton}
				{topProposalCardList}
				{paginationTopSection}
				{filterSection}
				{tableSection}
				{paginationSection}
			</Container>
			<Dialog open={open} maxWidth='sm' fullWidth={true} aria-labelledby='create-proposal-dialog' onClose={handleClose}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={cx("dialog-header")}>
						<div className={cx("close-button")} onClick={handleClose}>
							<CloseIcon />
						</div>
					</div>
					<div className={cx("dialog-body")}>
						<div className={cx("field")}>
							<SelectBox value={fieldValue} data={fields} onChange={setFieldValue} />
						</div>
						<div className={cx("field")}>
							<label className={cx("label")} htmlFor='title'>
								Title
							</label>
							<input type='text' className={cx("text-field")} name='title' ref={register} />
							<ErrorMessage errors={errors} name='title' render={({ message }) => <p className={cx("error-message")}>{message}</p>} />
						</div>

						<div className={cx("field")}>
							<label className={cx("label")} htmlFor='description'>
								Description
							</label>
							<div className={cx("editor-wrapper")}>
								<Controller
									name='description'
									control={control}
									render={props => (
										<Editor
											{...props}
											onEditorStateChange={editorState => {
												if (editorState.blocks) {
													props.onChange(editorState.blocks[0]);
												}
											}}
										/>
									)}
								/>
							</div>
							<ErrorMessage errors={errors} name='description' render={({ message }) => <p className={cx("error-message")}>{message}</p>} />
						</div>

						<div className={cx("field")}>
							<label className={cx("label")} htmlFor='amount'>
								Amount (ORAI)
							</label>
							<input type='number' className={cx("text-field")} name='amount' ref={register} />
							<ErrorMessage errors={errors} name='amount' render={({ message }) => <p className={cx("error-message")}>{message}</p>} />
						</div>

						{fieldValue === UNBONDING_TIME && (
							<>
								<div className={cx("field")}>
									<label className={cx("label")} htmlFor='unbondingTime'>
										Unbonding time
									</label>
									<input type='number' className={cx("text-field")} name='unbondingTime' ref={register} />
									<ErrorMessage errors={errors} name='unbondingTime' render={({ message }) => <p className={cx("error-message")}>{message}</p>} />
								</div>
							</>
						)}

						{fieldValue === VOTING_PERIOD && (
							<div className={cx("field")}>
								<label className={cx("label")} htmlFor='voting_period'>
									Voting Period
								</label>
								<div className={cx("field-voting")}>
									<SelectBox value={votingValue} data={votingFields} onChange={setVotingValue} />
									{handleVotingPeriod(votingValue)}
								</div>
								<div className={cx("vme")}>
									<div className={cx("vme-hidden")}></div>
									<ErrorMessage errors={errors} name={votingValue} render={({ message }) => <p className={cx("error-message", "vme-text")}>{message}</p>} />
								</div>
							</div>
						)}

						{fieldValue === COMMUNITY_TAX && (
							<div className={cx("field")}>
								<label className={cx("label")} htmlFor='communitytax'>
									Community Tax (%)
								</label>
								<input type='number' step='any' className={cx("text-field")} name='communitytax' ref={register} />
								<ErrorMessage errors={errors} name='communitytax' render={({ message }) => <p className={cx("error-message")}>{message}</p>} />
							</div>
						)}

						{fieldValue === INFLATION_MIN && (
							<div className={cx("field")}>
								<label className={cx("label")} htmlFor='InflationMin'>
									Minimum Inflation (%)
								</label>
								<input type='number' step='any' className={cx("text-field")} name='InflationMin' ref={register} />
								<ErrorMessage errors={errors} name='InflationMin' render={({ message }) => <p className={cx("error-message")}>{message}</p>} />
							</div>
						)}

						{fieldValue === INFLATION_MAX && (
							<div className={cx("field")}>
								<label className={cx("label")} htmlFor='InflationMax'>
									Maximum Inflation (%)
								</label>
								<input type='number' step='any' className={cx("text-field")} name='InflationMax' ref={register} />
								<ErrorMessage errors={errors} name='InflationMax' render={({ message }) => <p className={cx("error-message")}>{message}</p>} />
							</div>
						)}

						<Fee handleChooseFee={setFee} minFee={minFee} className={cx("fee")} />
						<div className={cx("message")}>Minimin Tx Fee: {formatFloat(minFee)} ORAI</div>
						<Gas gas={gas} onChangeGas={setGas} className={cx("gas")} />
					</div>
					<div className={cx("dialog-footer")}>
						<button type='submit' className={cx("submit-button")}>
							<span className={cx("submit-button-text")}>Create</span>
						</button>
					</div>
				</form>
			</Dialog>
			{loadingTransaction && <LoadingOverlay />}
		</>
	);
}
