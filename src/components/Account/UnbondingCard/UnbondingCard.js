import React, {memo} from "react";
import {useGet} from "restful-react";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {_, reduceString} from "src/lib/scripts";
import UnbondingTable from "src/components/Account/UnbondingTable";
import Pagination from "src/components/common/Pagination";
import styles from "./UnbondingCard.scss";

const UnbondingCard = memo(({account = 0, minHeight = "420px"}) => {
	const cx = classNames.bind(styles);
	const path = `${consts.API.UNBONDINGS}/${account}`;
	const {data} = useGet({
		path: path,
	});

	const totalPages = 1;
	const currentPage = 1;
	const onPageChange = page => {};

	return (
		<div className={cx("unbonding-card")} style={{minHeight: minHeight}}>
			<div className={cx("unbonding-card-header")}>Unbondings</div>
			<div className={cx("unbonding-card-body")}>
				<UnbondingTable />
				<Pagination pages={totalPages} page={currentPage} onChange={(e, page) => onPageChange(page)} />
			</div>
		</div>
	);
});

export default UnbondingCard;
