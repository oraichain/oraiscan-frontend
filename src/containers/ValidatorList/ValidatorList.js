import React, {useState, useRef, useEffect} from "react";
import {useGet} from "restful-react";
import Skeleton from "react-loading-skeleton";
import Container from "@material-ui/core/Container";
import cn from "classnames/bind";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import consts from "src/constants/consts";
import {formatInteger, formatSeconds, formatOrai, replaceQueryString, formatFloat} from "src/helpers/helper";
import TogglePageBar from "src/components/common/TogglePageBar";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import StatusCardList from "src/components/common/StatusCardList";
// import ButtonGroup from "src/components/common/ButtonGroup";
import SearchInput from "src/components/common/SearchInput";
import ValidatorTable from "src/components/ValidatorList/ValidatorTable";
import ValidatorCardList from "src/components/ValidatorList/ValidatorCardList";
import ValidatorTableSkeleton from "src/components/ValidatorList/ValidatorTable/ValidatorTableSkeleton";
import ValidatorCardListSkeleton from "src/components/ValidatorList/ValidatorCardList/ValidatorCardListSkeleton";
import styles from "./ValidatorList.scss";
import heightIcon from "src/assets/validators/height_ic.svg";
import validatorsIcon from "src/assets/validators/validators_ic.svg";
import bondedTokensIcon from "src/assets/validators/bonded_tokens_ic.svg";
import blockTimeIcon from "src/assets/validators/clock.svg";

const cx = cn.bind(styles);

const ValidatorList = props => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const baseValidatorsPath = `${consts.API.VALIDATORS}`;
	const statusPath = consts.API.STATUS;
	// const [currentPage, setCurrentPage] = useState(1);
	const [keyword, setKeyword] = useState("");
	const [showLoadingValidators, setShowLoadingValidators] = useState(true);
	// const [validatorsPath, setValidatorsPath] = useState(`${baseValidatorsPath}?page_id=1&limit=${consts.REQUEST.LIMIT}`);
	const [validatorsPath, setValidatorsPath] = useState(`${baseValidatorsPath}?page_id=1`);
	const [loadValidatorsCompleted, setLoadValidatorsCompleted] = useState(false);

	let timerID = useRef(null);

	const cleanUp = () => {
		if (timerID.current) {
			clearTimeout(timerID.current);
			setLoadValidatorsCompleted(false);
		}
	};

	const toggleData = (data, selectedIndex) => {
		return data.map((item, index) => {
			if (selectedIndex === index) {
				return Object.assign({}, item, {active: true});
			}
			return Object.assign({}, item, {active: false});
		});
	};

	const {data: validators, loading: loadingValidators, refetch: refetchValidators} = useGet({
		path: validatorsPath,
		resolve: data => {
			if (showLoadingValidators) {
				setShowLoadingValidators(false);
			}
			setLoadValidatorsCompleted(true);
			return data;
		},
	});

	const {data: status} = useGet({
		path: statusPath,
	});

	const {data: dataPrice} = useGet({
		path: consts.API.ORAICHAIN_INFO,
	});

	useEffect(() => {
		if (loadValidatorsCompleted) {
			timerID.current = setTimeout(() => {
				refetchValidators();
				setLoadValidatorsCompleted(false);
			}, consts.REQUEST.TIMEOUT);
			return () => {
				cleanUp();
			};
		}
	}, [loadValidatorsCompleted, refetchValidators]);

	// const onPageChange = (path, key, value) => {
	// 	cleanUp();
	// 	setCurrentPage(value);
	// 	setShowLoadingValidators(true);
	// 	setValidatorsPath(replaceQueryString(path, key, value));
	// };

	let titleSection;
	let statusSection;
	let filterSection;
	let tableSection;
	// let paginationSection;

	if (isLargeScreen) {
		titleSection = (
			<TitleWrapper>
				<PageTitle title={"Validators"} />
				<StatusBox />
			</TitleWrapper>
		);
	} else {
		titleSection = <TogglePageBar type='validators' />;
	}

	if (status) {
		statusSection = (
			<StatusCardList
				data={[
					{
						icon: heightIcon,
						label: "Height",
						value: status?.latest_block_height ? formatInteger(status.latest_block_height) : "-",
					},
					{
						icon: validatorsIcon,
						label: "Validators",
						value: status?.total_validator_num ? status.total_validator_num + "/" + status.total_validator_num : "-",
					},
					{
						icon: bondedTokensIcon,
						label: "Bonded Tokens",
						value: (
							<div style={{marginBottom: "-45px"}}>
								<div>{status?.bonded_tokens ? formatFloat(status.bonded_tokens / 1000000) + " ORAI " : "-"}</div>
								<div style={{fontSize: "12px", marginTop: "-10px"}}>
									{dataPrice?.price ? formatFloat(dataPrice.price * (status.bonded_tokens / 1000000)) + " USD" : "-"}
								</div>
							</div>
						),
					},
					{
						icon: blockTimeIcon,
						label: "Block Time",
						value: status?.block_time ? formatSeconds(status.block_time) + "s" : "-",
					},
				]}
				minHeight={125}
			/>
		);
	} else {
		statusSection = (
			<StatusCardList
				data={[
					{
						icon: heightIcon,
						label: "Height",
						value: <Skeleton />,
					},
					{
						icon: validatorsIcon,
						label: "Validators",
						value: <Skeleton />,
					},
					{
						icon: bondedTokensIcon,
						label: "Bonded Tokens",
						value: <Skeleton />,
					},
					{
						icon: blockTimeIcon,
						label: "Block Time",
						value: <Skeleton />,
					},
				]}
				minHeight={105}
			/>
		);
	}

	if (!validators || (loadingValidators && showLoadingValidators)) {
		filterSection = (
			<div className={cx("filter-section")}>
				<SearchInput value={keyword} rootClassName={cx("search-validators")} placeholder='Search validators' onChange={e => {}} />
				<div className={cx("filter-section-overlay")}></div>
			</div>
		);
		tableSection = isLargeScreen ? <ValidatorTableSkeleton /> : <ValidatorCardListSkeleton />;
	} else {
		// const totalPages = validators?.page?.total_page ?? 0;

		filterSection = (
			<div className={cx("filter-section")}>
				<SearchInput
					value={keyword}
					placeholder='Search validators'
					rootClassName={cx("search-validators")}
					onChange={e => {
						cleanUp();
						setKeyword(e.target.value);
						setValidatorsPath(replaceQueryString(validatorsPath, "moniker", e.target.value));
					}}
				/>
			</div>
		);

		const tableData = validators?.data ?? [];
		tableSection = isLargeScreen ? <ValidatorTable data={tableData} /> : <ValidatorCardList data={tableData} />;

		// paginationSection =
		// 	totalPages > 0 ? <Pagination pages={totalPages} page={currentPage} onChange={(e, page) => onPageChange(validatorsPath, "page_id", page)} /> : <></>;
	}

	return (
		<Container fixed className={cx("validator-list")}>
			{titleSection}
			{statusSection}
			{filterSection}
			{tableSection}
			{/* {paginationSection} */}
		</Container>
	);
};

export default ValidatorList;
