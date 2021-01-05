import React, {useState, useEffect, useRef} from "react";
import {useHistory} from "react-router-dom";
import {useGet} from "restful-react";
import Container from "@material-ui/core/Container";
import Skeleton from "@material-ui/lab/Skeleton";
import cn from "classnames/bind";
import consts from "src/constants/consts";
import {calculateBefore} from "src/helpers/helper";
import {_} from "src/lib/scripts";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import Pagination from "src/components/common/Pagination";
import TransactionTable from "src/components/TxList/TransactionTable";
import styles from "./TxList.scss";
import ShowSkeleton from "../../components/TxList/TransactionTable/showSkeleton";
const TxList = props => {
	const cx = cn.bind(styles);

	const history = useHistory();
	const getPaginationPath = (pathname, page) => {
		return pathname + "?page=" + page;
	};
	const redirectToFirstPage = pathname => {
		history.push(getPaginationPath(pathname, 1));
	};

	const [total, setTotal] = useState(-1);
	const searchParams = new URLSearchParams(props.location.search);
	let page = parseFloat(searchParams.get("page"));
	let isPageValid = true;
	if (!Number.isInteger(page) || page < 1 || (total !== -1 && page > Math.ceil(total / consts.REQUEST.LIMIT))) {
		page = 1;
		isPageValid = false;
	}

	const [showLoading, setShowLoading] = useState(true);
	const [loadCompleted, setLoadCompleted] = useState(false);
	let timerID = useRef(null);

	const basePath = `${consts.API.TXLIST}?limit=${consts.REQUEST.LIMIT}`;
	let path = basePath;
	if (total !== -1 && isPageValid) {
		path = basePath + "&before=" + calculateBefore(total, consts.REQUEST.LIMIT, page);
	}

	const cleanUp = () => {
		if (timerID) {
			clearTimeout(timerID);
			setLoadCompleted(false);
		}
	};

	const {data, loading, refetch} = useGet({
		path: path,
		resolve: data => {
			if (showLoading) {
				setShowLoading(false);
			}
			setLoadCompleted(true);
			return data;
		},
	});

	useEffect(() => {
		if (loadCompleted) {
			timerID = setTimeout(() => {
				refetch();
				setLoadCompleted(false);
			}, consts.REQUEST.TIMEOUT);
			return () => {
				cleanUp();
			};
		}
	}, [loadCompleted]);

	useEffect(() => {
		if (!isPageValid) {
			redirectToFirstPage(props.location.pathname);
		}
	}, [total]);

	if (!data || (loading && showLoading)) {
		return (
			<Container fixed className={cx("tx-list")}>
				<TitleWrapper>
					<PageTitle title={"Transactions"} />
				</TitleWrapper>
				{/* <Skeleton variant='rect' animation='wave' height={400} /> */}
				<ShowSkeleton />
			</Container>
		);
	}

	const totalItems = _.isNil(data?.paging?.total) ? 0 : Math.ceil(parseInt(data.paging.total));
	const totalPages = Math.ceil(totalItems / consts.REQUEST.LIMIT);

	if (total !== totalItems) {
		setTotal(totalItems);
	}

	const onPageChange = page => {
		cleanUp();
		setShowLoading(true);
		history.push(getPaginationPath(props.location.pathname, page));
	};

	return (
		<Container fixed className={cx("tx-list")}>
			<TitleWrapper>
				<PageTitle title={"Transactions"} />
				<StatusBox />
			</TitleWrapper>
			<TransactionTable data={data.data} />
			{totalPages > 0 && <Pagination pages={totalPages} page={page} onChange={(e, page) => onPageChange(page)} />}
		</Container>
	);
};

export default TxList;
