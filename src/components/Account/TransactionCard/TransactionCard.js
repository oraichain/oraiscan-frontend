import React, {memo, useState} from "react";
import {useGet} from "restful-react";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import TransactionTable from "src/components/TxList/TransactionTable";
import Pagination from "src/components/common/Pagination";
import NoResult from "src/components/common/NoResult";
import styles from "./TransactionCard.scss";

const TransactionCard = memo(({account = 0, minHeight = 222}) => {
	const cx = classNames.bind(styles);
	const basePath = `${consts.API.TXS_ACCOUNT}/${account}?limit=${consts.REQUEST.LIMIT}&TxType=cosmos-sdk/MsgSend`;
	const [path, setPath] = useState(`${basePath}&page_id=1`);
	const {data} = useGet({
		path: path,
	});

	if (!data || typeof data === "string") {
		return <Skeleton variant='rect' animation='wave' height={minHeight + "px"} />;
	}

	const totalPages = data?.page?.total_page ?? 0;
	const currentPage = data?.page?.page_id ?? 1;

	const onPageChange = page => {
		setPath(`${basePath}&page_id=${page}`);
	};

	return (
		<div className={cx("transaction-card")}>
			<div className={cx("transaction-card-header")}>Transactions</div>
			<div className={cx("transaction-card-body")} style={{minHeight: minHeight + "px"}}>
				{Array.isArray(data?.data) && data.data.length > 0 ? (
					<>
						<TransactionTable data={data.data} />
						{totalPages > 0 && <Pagination pages={totalPages} page={currentPage} onChange={(e, page) => onPageChange(page)} />}
					</>
				) : (
					<div className={cx("no-result-wrapper")}>
						<NoResult />
					</div>
				)}
			</div>
		</div>
	);
});

export default TransactionCard;
