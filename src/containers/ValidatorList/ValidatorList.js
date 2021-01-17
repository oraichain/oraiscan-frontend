import React, {useState, useRef, useEffect} from "react";
import {useGet} from "restful-react";
import Skeleton from "react-loading-skeleton";
import Container from "@material-ui/core/Container";
import cn from "classnames/bind";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import consts from "src/constants/consts";
import {formatInteger, formatSeconds, formatOrai} from "src/helpers/helper";
import TogglePageBar from "src/components/common/TogglePageBar";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import StatusCardList from "src/components/common/StatusCardList";
import ButtonGroup from "src/components/common/ButtonGroup";
import SearchInput from "src/components/common/SearchInput";
import ValidatorTable from "src/components/ValidatorList/ValidatorTable";
import ValidatorTableSkeleton from "src/components/ValidatorList/ValidatorTable/ValidatorTableSkeleton";
import styles from "./ValidatorList.scss";
import heightIcon from "src/assets/validators/height_ic.svg";
import validatorsIcon from "src/assets/validators/validators_ic.svg";
import bondedTokensIcon from "src/assets/validators/bonded_tokens_ic.svg";
import blockTimeIcon from "src/assets/validators/block_time_ic.svg";

const cx = cn.bind(styles);

const ValidatorList = props => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const baseValidatorsPath = `${consts.API.VALIDATORS}`;
	const statusPath = consts.API.STATUS;
	const [currentPage, setCurrentPage] = useState(1);
	const [keyword, setKeyword] = useState("");
	const [showLoadingValidators, setShowLoadingValidators] = useState(true);
	// const [validatorsPath, setValidatorsPath] = useState(`${baseValidatorsPath}?page_id=1&limit=${consts.REQUEST.LIMIT}`);
	const [validatorsPath, setValidatorsPath] = useState(`${baseValidatorsPath}?page_id=1`);
	const [loadValidatorsCompleted, setLoadValidatorsCompleted] = useState(false);
	let backupData = useRef([]);

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
	const [buttonGroupData, setButtonGroupData] = useState([
		{
			label: "Active",
			onClick: selectedIndex => {
				setButtonGroupData(toggleData(buttonGroupData, selectedIndex));
			},
			active: true,
		},
		{
			label: "Inactive",
			onClick: selectedIndex => {
				setButtonGroupData(toggleData(buttonGroupData, selectedIndex));
			},
			active: false,
		},
	]);

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

	const replaceQueryString = (path, key, value) => {
		const searchParams = new URLSearchParams(path);
		if (value === "") {
			if (searchParams.has(key)) {
				searchParams.delete(key);
			}
		} else {
			if (searchParams.has(key)) {
				searchParams.set(key, value);
			} else {
				searchParams.append(key, value);
			}
		}
		return decodeURIComponent(searchParams.toString());
	};

	const onPageChange = (path, key, value) => {
		cleanUp();
		setCurrentPage(value);
		setShowLoadingValidators(true);
		setValidatorsPath(replaceQueryString(path, key, value));
	};

	let titleSection;
	let statusSection;
	let filterSection;
	let tableSection;

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
						value: status?.bonded_tokens ? formatOrai(status.bonded_tokens) : "-",
					},
					{
						icon: blockTimeIcon,
						label: "Block Time",
						value: status?.block_time ? formatSeconds(status.block_time) + "s" : "-",
					},
				]}
				minHeight={105}
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
				{/* <ButtonGroup data={buttonGroupData} rootClassName={cx("mr-18px")} /> */}
				<SearchInput value={keyword} rootClassName={cx("search-validators")} placeholder='Search validators' onChange={e => {}} />
				<div className={cx("filter-section-overlay")}></div>
			</div>
		);
		tableSection = <ValidatorTableSkeleton rows={10} />;
	} else {
		if (validators?.data != null) {
			backupData.current = validators.data;
		}

		// const totalPages = validators?.page?.total_page ?? 0;

		filterSection = (
			<div className={cx("filter-section")}>
				{/* <ButtonGroup data={buttonGroupData} rootClassName={cx("mr-18px")} /> */}
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

		tableSection = <ValidatorTable data={validators?.data != null ? validators.data : backupData.current} />;
		{
			/* {totalPages > 0 && <Pagination pages={totalPages} page={currentPage} onChange={(e, page) => onPageChange(validatorsPath, "page_id", page)} />} */
		}
	}

	return (
		<Container fixed className={cx("validator-list")}>
			{titleSection}
			{statusSection}
			{filterSection}
			{tableSection}
		</Container>
	);
};

export default ValidatorList;
