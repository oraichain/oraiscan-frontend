/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useMemo, useState, useRef, useEffect} from "react";
import {useGet} from "restful-react";
import { constantCase } from "change-case";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {_} from "src/lib/scripts";
import FilterSection from "src/components/common/FilterSection";
import Pagination from "src/components/common/Pagination";
import NoResult from "src/components/common/NoResult";
import ValidatorVotesTable from "./ValidatorVotesTable";
import styles from "./ValidatorVotes.scss";
import ValidatorVotesCard from "./ValidatorVotesCard";
import ValidatorVotesSkeleton from "./ValidatorVotesSkeleton";

const cx = classNames.bind(styles);
const pageSize = 10;

const ValidatorVotes = memo(({proposalId}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [firstLoadTransactionCompleted, setFirstLoadTransactionCompleted] = useState(false);
	const [loadTransactionCompleted, setLoadTransactionCompleted] = useState(false);
	const [loadTotalTxsCompleted, setLoadTotalTxsCompleted] = useState(false);
	const [pageId, setPageId] = useState(1);
	const voteTypesRef = useRef({
		ALL: 0,
	});
	const totalTxsRef = useRef({});
	const [voteType, setVoteType] = useState(voteTypesRef.current["ALL"]);
	const totalPagesRef = useRef(null);
	const prevDataRef = useRef([]);
	const [validatorVotes, setValidatorVotes] = useState([]);

	let transactionTimerId = useRef(null);
	let totalTxsTimerId = useRef(null);

	const cleanUpTransaction = () => {
		if (transactionTimerId) {
			clearTimeout(transactionTimerId.current);
		}
	};

	const cleanUpTotalTxs = () => {
		if (totalTxsTimerId) {
			clearTimeout(totalTxsTimerId.current);
		}
	};

	const converVoteTypes = types => {
		let labelArr;
		if (types === "VOTE_OPTION_NO_WITH_VETO" || types === "VOTE_OPTION_DID_NOT_VOTE") {
			labelArr = types.split("VOTE_OPTION_");
			labelArr = labelArr[1].split("_");
			labelArr = labelArr.join(" ");
			labelArr = ["", labelArr];
		} else {
			labelArr = types.split("_") || [];
		}
		return labelArr;
	};

	const getFilterData = (voteTypes, totalTxs) => {
		const filterData = [];
		for (let key in voteTypes) {
			// const label = `${sentenceCase(key)}(${!isNaN(totalTxs?.[key]) ? formatInteger(totalTxs[key]) : "-"})`;
			if (!voteTypes[key]) {
				continue;
			}
			const labelArr = converVoteTypes(voteTypes[key]);
			const labelTxt = labelArr[labelArr.length - 1];
			const label = labelArr[labelArr.length - 1] + " (" + (totalTxs[labelTxt] || 0) + ")";
			const value = voteTypes[key];

			filterData.push({
				label: label,
				value: value,
			});
		}
		filterData.push({
			label: "ALL (" + totalTxs["ALL"] + ")",
			value: voteTypes["ALL"],
		});
		return filterData;
	};

	const onPageChange = page => {
		cleanUpTransaction();
		setFirstLoadTransactionCompleted(false);
		setLoadTransactionCompleted(false);
		setPageId(page);
	};

	if (!firstLoadTransactionCompleted) {
		prevDataRef.current = null;
	}

	const votePath = `${consts.API.PROPOSAL_VOTES}`;
	const {data: voteData} = useGet({
		path: votePath,
	});
	if (voteData) {
		const voteTypes = {};
		voteTypes["ALL"] = 0;
		for (let key in voteData) {
			voteTypes[constantCase(key)] = voteData[key];
		}
		const newVoteTypes = {
			...voteTypes,
			"4": "VOTE_OPTION_DID_NOT_VOTE",
		};
		voteTypesRef.current = newVoteTypes;
	}

	const validatorVotesBasePath = `${consts.API.PROPOSALS}/${proposalId}/votes/validators`;
	const path = `${validatorVotesBasePath}`;
	// if (!_.isNil(voteType) && voteType !== voteTypesRef.current["ALL"]) {
	// 	validatorVotesPath = `${validatorVotesPath}&vote=${voteType}`;
	// }
	const {data: validatorVoteData, loading: validatorVoteLoading, error: validatorVoteError} = useGet({
		path,
	});

	useEffect(() => {
		if (validatorVoteData) {
			let totalVotes = {
				YES: [],
				NO: [],
				ABSTAIN: [],
				NO_WITH_VETO: [],
				DID_NOT_VOTE: [],
				ALL: validatorVoteData?.length || 0
			};

			validatorVoteData.map(val => {
				switch (val?.option) {
					case "VOTE_OPTION_YES":
						return totalVotes = {
							...totalVotes,
							YES: [...totalVotes.YES, val.option],
						}
					case "VOTE_OPTION_NO":
						return (totalVotes = {
							...totalVotes,
							NO: [...totalVotes.NO, val.option],
						});
					case "VOTE_OPTION_ABSTAIN":
						return (totalVotes = {
							...totalVotes,
							ABSTAIN: [...totalVotes.ABSTAIN, val.option],
						});
					case "VOTE_OPTION_NO_WITH_VETO":
						return (totalVotes = {
							...totalVotes,
							NO_WITH_VETO: [...totalVotes["NO_WITH_VETO"], val.option],
						});
					case "VOTE_OPTION_DID_NOT_VOTE":
						return (totalVotes = {
							...totalVotes,
							DID_NOT_VOTE: [...totalVotes["DID_NOT_VOTE"], val.option],
						});
					default:
						return totalVotes = {
							...totalVotes,
							ALL: validatorVoteData?.length,
						};
				}
			});
			const { YES, NO, ABSTAIN, NO_WITH_VETO, DID_NOT_VOTE, ALL } = totalVotes;
			const numberVotes = {
				YES: YES.length,
				NO: NO.length,
				ABSTAIN: ABSTAIN.length,
				"NO WITH VETO": NO_WITH_VETO.length,
				"DID NOT VOTE": DID_NOT_VOTE.length,
				ALL
			}
			totalTxsRef.current = numberVotes;
		}
	}, [validatorVoteData]);

	useEffect(() => {
		if (validatorVoteData) {
			if (voteType == 0) {
				setValidatorVotes(validatorVoteData);
			} else {
				setPageId(1);
				const validatorVoteList = validatorVoteData.filter(val => {
					return val?.option === voteType;
				});
				setValidatorVotes(validatorVoteList);
			}
		}
	}, [voteType, validatorVoteData]);

	let titleSection;
	let filterSection;
	let headerSection;
	let tableSection;
	let paginationSection;
	let bodySection;

	if (isLargeScreen) {
		titleSection = <div className={cx("title")}>Validator Votes</div>;
	} else {
		titleSection = <></>;
	}
	const filterData = getFilterData(voteTypesRef.current, totalTxsRef.current);
	filterSection = (
		<div className={cx("filter-section")}>
			<div className={cx("filter-section-header")}>Validator Votes</div>
			<FilterSection
				className={cx("filter-section-body")}
				data={filterData}
				value={voteType}
				onChange={value => {
					setVoteType(value);
				}}
			/>
		</div>
	);

	const currentTableData = useMemo(() => {
		const firstPageIndex = (pageId - 1) * pageSize;
		const lastPageIndex = firstPageIndex + pageSize;
		return validatorVotes.slice(firstPageIndex, lastPageIndex);
	}, [pageId, validatorVotes]);

	if (!validatorVoteLoading) {
		if (currentTableData.length > 0) {
			totalPagesRef.current = Math.ceil(validatorVotes?.length / 10);
			tableSection = isLargeScreen? <ValidatorVotesTable data={currentTableData} converVoteTypes={converVoteTypes} /> : <ValidatorVotesCard data={currentTableData} converVoteTypes={converVoteTypes}/>;
		} else {
			totalPagesRef.current = null;
			tableSection = <NoResult />;
		}
	} else {
		tableSection = <ValidatorVotesSkeleton />;
	}

	paginationSection = totalPagesRef.current ? <Pagination pages={totalPagesRef.current} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

	headerSection = <div className={cx("transactions-card-header")}>{filterSection}</div>;
	bodySection = (
		<div className={cx("transactions-card-body")}>
			{tableSection}
			{paginationSection}
		</div>
	);

	return (
		<div className={cx("transactions-card")}>
			{headerSection}
			{bodySection}
		</div>
	);
});

export default ValidatorVotes;
