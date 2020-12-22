import React, {memo, useState} from "react";
import {useGet} from "restful-react";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import TransactionTable from "src/components/TxList/TransactionTable";
import Pagination from "src/components/common/Pagination";
import styles from "./TransactionCard.scss";

const defaultMinHeight = 420;
const TransactionCard = memo(({account = 0, minHeight = defaultMinHeight + "px"}) => {
	const cx = classNames.bind(styles);
	const basePath = `${consts.API.TXS_ACCOUNT}/${account}?limit=${consts.REQUEST.LIMIT}&TxType=cosmos-sdk/MsgSend`;
	const [path, setPath] = useState(`${basePath}&page_id=1`);
	const {data} = useGet({
		path: path,
	});

	console.log("TXS", data);
	if (!data) {
		return <Skeleton variant='rect' animation='wave' height={defaultMinHeight} />;
	}

	const totalPages = data?.page?.total_page ?? 0;
	const currentPage = data?.page?.page_id ?? 1;

	const onPageChange = page => {
		setPath(`${basePath}&page_id=${page}`);
	};

	return (
		<div className={cx("transaction-card")} style={{minHeight: minHeight}}>
			<div className={cx("transaction-card-header")}>Delegators</div>
			<div className={cx("transaction-card-body")}>
				<TransactionTable data={data.data} />
				{totalPages > 0 && <Pagination pages={totalPages} page={currentPage} onChange={(e, page) => onPageChange(page)} />}
			</div>
		</div>
	);
});

export default TransactionCard;
