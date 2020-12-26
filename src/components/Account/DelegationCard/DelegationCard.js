import React, {memo} from "react";
import {useGet} from "restful-react";
import classNames from "classnames/bind";
import Skeleton from "@material-ui/lab/Skeleton";
import consts from "src/constants/consts";
import DelegationTable from "src/components/Account/DelegationTable";
import Pagination from "src/components/common/Pagination";
import styles from "./DelegationCard.scss";

const defaultMinHeight = 420;

const DelegationCard = memo(({account = 0, minHeight = defaultMinHeight + "px"}) => {
	const cx = classNames.bind(styles);
	const path = `${consts.API.DELEGATIONS}/${account}`;
	const {data} = useGet({
		path: path,
	});

	if (!data) {
		return <Skeleton variant='rect' animation='wave' height={defaultMinHeight} />;
	}

	console.log("DELEGATIONS", data);

	const totalPages = 1;
	const currentPage = 1;
	const onPageChange = page => {};

	return (
		<div className={cx("delegation-card")} style={{minHeight: minHeight}}>
			<div className={cx("delegation-card-header")}>Delegations</div>
			<div className={cx("delegation-card-body")}>
				<DelegationTable data={data} />
				<Pagination pages={totalPages} page={currentPage} onChange={(e, page) => onPageChange(page)} />
			</div>
		</div>
	);
});

export default DelegationCard;
