import React, {memo} from "react";
import {useGet} from "restful-react";
import classNames from "classnames/bind";
import Skeleton from "@material-ui/lab/Skeleton";
import consts from "src/constants/consts";
import DelegatorTable from "src/components/Account/DelegatorTable";
import Pagination from "src/components/common/Pagination";
import styles from "./DelegatorCard.scss";

const defaultMinHeight = 420;

const DelegatorCard = memo(({account = 0, minHeight = defaultMinHeight + "px"}) => {
	const cx = classNames.bind(styles);
	const path = `${consts.API.DELEGATORS}/${account}`;
	const {data} = useGet({
		path: path,
	});

	if (!data) {
		return <Skeleton variant='rect' animation='wave' height={defaultMinHeight} />;
	}

	console.log("DELEGATORS", data);

	const totalPages = 1;
	const currentPage = 1;
	const onPageChange = page => {};

	return (
		<div className={cx("delegator-card")} style={{minHeight: minHeight}}>
			<div className={cx("delegator-card-header")}>Delegators</div>
			<div className={cx("delegator-card-body")}>
				<DelegatorTable data={data} />
				<Pagination pages={totalPages} page={currentPage} onChange={(e, page) => onPageChange(page)} />
			</div>
		</div>
	);
});

export default DelegatorCard;
