import React, { useState, useEffect, useRef } from "react";
import { useGet } from "restful-react";
import Container from "@material-ui/core/Container";
import Skeleton from "@material-ui/lab/Skeleton";
import cn from "classnames/bind";
import consts from "src/constants/consts";
import { calculateBefore, calculateAfter } from "src/helpers/helper";
import { _ } from "src/lib/scripts";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import Pagination from "src/components/common/Pagination";
import TransactionTable from "src/components/TxList/TransactionTable";
import styles from "./TxList.scss";
import ShowSkeleton from '../../components/TxList/TransactionTable/showSkeleton';
const TxList = () => {
	const cx = cn.bind(styles);
	const defaultPath = `${consts.API.TXLIST}?limit=${consts.REQUEST.LIMIT}`;

	const [showLoading, setShowLoading] = useState(true);
	const [path, setPath] = useState(defaultPath);
	const [currentPage, setCurrentPage] = useState(1);
	const [loadCompleted, setLoadCompleted] = useState(false);
	let timerID = useRef(null);

	const cleanUp = () => {
		if (timerID) {
			clearTimeout(timerID);
			setLoadCompleted(false);
		}
	};

	const { data, loading, refetch } = useGet({
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

	const total = _.isNil(data?.paging?.total) ? 0 : Math.ceil(parseInt(data.paging.total));
	const totalPages = Math.ceil(total / consts.REQUEST.LIMIT);

	const onPageChange = (total, limit, page) => {
		cleanUp();
		setShowLoading(true);
		setPath(defaultPath + "&before=" + calculateBefore(total, limit, page));
		setCurrentPage(page);
	};

	return (
		<Container fixed className={cx("tx-list")}>
			<TitleWrapper>
				<PageTitle title={"Transactions"} />
				<StatusBox />
			</TitleWrapper>
			<TransactionTable data={data.data} />
			{totalPages > 0 && <Pagination pages={totalPages} page={currentPage} onChange={(e, page) => onPageChange(total, consts.REQUEST.LIMIT, page)} />}
		</Container>
	);
};

export default TxList;
