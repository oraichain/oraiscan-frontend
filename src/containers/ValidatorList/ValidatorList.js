import React, {useState, useRef, useEffect} from "react";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import {useGet} from "restful-react";
import Container from "@material-ui/core/Container";
import cn from "classnames/bind";
import consts from "src/constants/consts";
import {formatInteger, formatSeconds, formatOrai} from "src/helpers/helper";
import Spinner from "src/components/common/Spinner";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import StatusCardList from "src/components/common/StatusCardList";
import ButtonGroup from "src/components/common/ButtonGroup";
import SearchInput from "src/components/common/SearchInput";
import ValidatorTable from "src/components/ValidatorList/ValidatorTable";
import Pagination from "src/components/common/Pagination";
import styles from "./ValidatorList.scss";
import heightIcon from "src/assets/validators/height_ic.svg";
import validatorsIcon from "src/assets/validators/validators_ic.svg";
import bondedTokensIcon from "src/assets/validators/bonded_tokens_ic.svg";
import blockTimeIcon from "src/assets/validators/block_time_ic.svg";
import ShowSkeletonValid from "src/containers/ValidatorList/showSkeletonValid";

const cx = cn.bind(styles);

const ValidatorList = props => {
	const baseValidatorsPath = `${consts.API.VALIDATORS}?limit=${consts.REQUEST.LIMIT}`;
	const statusPath = consts.API.STATUS;

	const [currentPage, setCurrentPage] = useState(1);
	const [keyword, setKeyword] = useState("");
	const [showLoadingValidators, setShowLoadingValidators] = useState(true);
	const [validatorsPath, setValidatorsPath] = useState(`${baseValidatorsPath}&page_id=${currentPage}`);
	const [loadValidatorsCompleted, setLoadValidatorsCompleted] = useState(false);

	let timerID = useRef(null);

	const cleanUp = () => {
		if (timerID) {
			clearTimeout(timerID);
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

	console.log();
	useEffect(() => {
		if (loadValidatorsCompleted) {
			timerID = setTimeout(() => {
				refetchValidators();
				setLoadValidatorsCompleted(false);
			}, consts.REQUEST.TIMEOUT);
			return () => {
				cleanUp();
			};
		}
	}, [loadValidatorsCompleted]);

	if (!validators || (loadingValidators && showLoadingValidators) || !status) {
		return (
			<Container fixed className={cx("validator-list")}>
				<TitleWrapper>
					<PageTitle title={"Validators"} />
				</TitleWrapper>
				{/* <Skeleton variant='rect' animation='wave' height={100} /> */}
				<ShowSkeletonValid />
			</Container>
		);
	}

	const totalPages = validators?.page?.total_page ?? 0;

	const replaceQueryString = (path, key, value) => {
		const searchParams = new URLSearchParams(path);
		if (value === "") {
			searchParams.delete(key);
		} else {
			searchParams.set(key, value);
		}

		return decodeURIComponent(searchParams.toString());
	};

	const onPageChange = (path, key, value) => {
		cleanUp();
		setCurrentPage(value);
		setShowLoadingValidators(true);
		setValidatorsPath(replaceQueryString(path, key, value));
	};

	return (
		<Container fixed className={cx("validator-list")}>
			<TitleWrapper>
				<PageTitle title={"Validators"} />
				<StatusBox />
			</TitleWrapper>
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
						value: status?.bonded_tokens ? formatOrai(status.bonded_tokens, 1000000, 0, ",") : "-",
					},
					{
						icon: blockTimeIcon,
						label: "Block Time",
						value: status?.block_time ? formatSeconds(status.block_time) + "s" : "-",
					},
				]}
				minHeight='100px'
			/>
			<div className={cx("filter-section")}>
				<ButtonGroup data={buttonGroupData} rootClassName={cx("mr-18px")} />
				<SearchInput
					value={keyword}
					placeholder='Search validators'
					onChange={e => {
						setKeyword(e.target.value);
						setValidatorsPath(replaceQueryString(validatorsPath, "moniker", e.target.value));
					}}
				/>
			</div>
			<ValidatorTable data={validators.data} />
			{totalPages > 0 && <Pagination pages={totalPages} page={currentPage} onChange={(e, page) => onPageChange(validatorsPath, "page_id", page)} />}
		</Container>
	);
};

export default ValidatorList;
