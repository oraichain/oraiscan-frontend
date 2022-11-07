import React, {useState, useRef, useEffect, useMemo} from "react";
import {useGet} from "restful-react";
import Container from "@material-ui/core/Container";
import cn from "classnames/bind";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {useParams, useHistory, useLocation} from "react-router-dom";
import queryString from "query-string";

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
import styles from "./ValidatorList.module.scss";

const cx = cn.bind(styles);

const ValidatorList = props => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const basePath = `${consts.API.VALIDATORS}`;
	const [keyword, setKeyword] = useState("");
	const [firstLoadCompleted, setFirstLoadCompleted] = useState(false);
	const [loadCompleted, setLoadCompleted] = useState(false);
	const history = useHistory();
	const {status} = queryString.parse(history.location.search) || {};
	const isActiveValidator = !status || status === "active";

	let timerIdRef = useRef(null);

	const cleanUp = () => {
		if (timerIdRef.current) {
			clearTimeout(timerIdRef.current);
			setLoadCompleted(false);
		}
	};

	let path = `${basePath}?page_id=1`;
	let pathInActive = `${path}&status=inactive`;
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

	const {data: dataInActive, loading: loadingInActive, error: errorInactive, refetch: refetchInActive} = useGet({
		path: pathInActive,
	});

	const validators = useMemo(() => {
		if (data && data?.data?.length > 0 && dataInActive) {
			const newData = data?.data.concat(dataInActive?.data);
			const validatorList = newData
				.sort((val1, val2) => val2.self_bonded - val1.self_bonded)
				.map((val, index) => ({
					...val,
					rankCustom: index + 1,
				}));
			const result = validatorList.map(dt => {
				const inActiveItem = dataInActive?.data?.find(val => val?.rank === dt?.rank);
				if (inActiveItem) {
					return {
						...dt,
						statusType: "inactive",
					};
				}
				return dt;
			});
			return result;
		}
		return;
	}, [data?.data?.length, dataInActive?.data?.length]);

	const onValidators = status => {
		if (validators && validators.length > 0) {
			return !status ? validators.filter(val => !val?.statusType) : validators.filter(val => val?.statusType);
		}
	};

	// useEffect(() => {
	// 	if (loadCompleted) {
	// 		timerIdRef.current = setTimeout(() => {
	// 			refetch();
	// 			setLoadCompleted(false);
	// 		}, consts.REQUEST.TIMEOUT);
	// 		return () => {
	// 			cleanUp();
	// 		};
	// 	}
	// }, [loadCompleted, refetch]);

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

	const handleSelectValidator = status => {
		return function() {
			if (status === "active") {
				history.push("/validators");
			}

			if (status === "inactive") {
				history.push("/validators?status=inactive");
			}
		};
	};

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
			<div className={cx("button", "button-active", isActiveValidator ? "button-is-active" : "")} onClick={handleSelectValidator("active")}>
				{" "}
				Active{" "}
			</div>
			<div className={cx("button", !isActiveValidator ? "button-is-active" : "")} onClick={handleSelectValidator("inactive")}>
				{" "}
				Inactive{" "}
			</div>
		</div>
	);

	if (loading) {
		tableSection = isLargeScreen ? <ValidatorTableSkeleton /> : <ValidatorCardListSkeleton />;
		// if (firstLoadCompleted) {
		// 	tableSection = isLargeScreen ? <ValidatorTable data={data?.data} /> : <ValidatorCardList data={data?.data} />;
		// } else {
		// 	tableSection = isLargeScreen ? <ValidatorTableSkeleton /> : <ValidatorCardListSkeleton />;
		// }
	} else {
		if (error) {
			tableSection = <NoResult />;
		} else {
			const data = isActiveValidator ? onValidators("") : onValidators("inactive");
			tableSection = isLargeScreen ? <ValidatorTable data={data} /> : <ValidatorCardList data={data} />;
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
