import React, {useState, useRef, useEffect} from "react";
import {useGet} from "restful-react";
import Container from "@material-ui/core/Container";
import cn from "classnames/bind";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import consts from "src/constants/consts";
import {_} from "src/lib/scripts";
import TogglePageBar from "src/components/common/TogglePageBar";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import StatusCardList from "src/components/TxList/StatusCardList";
import SearchInput from "src/components/common/SearchInput";
import NoResult from "src/components/common/NoResult";
import ValidatorTable from "src/components/ValidatorList/ValidatorTable";
import ValidatorCardList from "src/components/ValidatorList/ValidatorCardList";
import ValidatorTableSkeleton from "src/components/ValidatorList/ValidatorTable/ValidatorTableSkeleton";
import ValidatorCardListSkeleton from "src/components/ValidatorList/ValidatorCardList/ValidatorCardListSkeleton";
import styles from "./ValidatorList.scss";

const cx = cn.bind(styles);

const ValidatorList = props => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const basePath = `${consts.API.VALIDATORS}`;
	const [keyword, setKeyword] = useState("");
	const [firstLoadCompleted, setFirstLoadCompleted] = useState(false);
	const [loadCompleted, setLoadCompleted] = useState(false);

	let timerIdRef = useRef(null);

	const cleanUp = () => {
		if (timerIdRef.current) {
			clearTimeout(timerIdRef.current);
			setLoadCompleted(false);
		}
	};

	let path = `${basePath}?page_id=1`;
	if (keyword !== "") {
		path += `&moniker=${keyword}`;
	}

	const {data, loading, error, refetch} = useGet({
		path: path,
		resolve: data => {
			if (!firstLoadCompleted) {
				setFirstLoadCompleted(true);
			}
			setLoadCompleted(true);
			return data;
		},
	});

	useEffect(() => {
		if (loadCompleted) {
			timerIdRef.current = setTimeout(() => {
				refetch();
				setLoadCompleted(false);
			}, consts.REQUEST.TIMEOUT);
			return () => {
				cleanUp();
			};
		}
	}, [loadCompleted, refetch]);

	let titleSection;
	let statusCardList;
	let filterSection;
	let tableSection;

	if (isLargeScreen) {
		titleSection = (
			<Container fixed>
				<TitleWrapper>
					<PageTitle title={"Validators"} />
					<StatusBox />
				</TitleWrapper>
			</Container>
		);
	} else {
		titleSection = <TogglePageBar type='validators' />;
	}

	statusCardList = <StatusCardList />;

	filterSection = (
		<div className={cx("filter-section")}>
			<SearchInput
				className={cx("search-validators")}
				placeholder='Search validators'
				value={keyword}
				readOnly={_.isNil(data) ? true : false}
				onChange={e => {
					cleanUp();
					setKeyword(e.target.value);
				}}
			/>
		</div>
	);

	if (loading) {
		if (firstLoadCompleted) {
			tableSection = isLargeScreen ? <ValidatorTable data={data?.data} /> : <ValidatorCardList data={data?.data} />;
		} else {
			tableSection = isLargeScreen ? <ValidatorTableSkeleton /> : <ValidatorCardListSkeleton />;
		}
	} else {
		if (error) {
			tableSection = <NoResult />;
		} else {
			tableSection = isLargeScreen ? <ValidatorTable data={data?.data} /> : <ValidatorCardList data={data?.data} />;
		}
	}

	return (
		<>
			{titleSection}
			<Container fixed className={cx("validator-list")}>
				{statusCardList}
				{filterSection}
				{tableSection}
			</Container>
		</>
	);
};

export default ValidatorList;
