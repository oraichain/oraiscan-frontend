import React, {memo} from "react";
import {useGet} from "restful-react";
import classNames from "classnames/bind";
import Skeleton from "@material-ui/lab/Skeleton";
import consts from "src/constants/consts";
import DelegationTable from "src/components/Account/DelegationTable";
import Pagination from "src/components/common/Pagination";
import NoResult from "src/components/common/NoResult";
import styles from "./DelegationCard.scss";

const DelegationCard = memo(({account = 0, minHeight = 222}) => {
	const cx = classNames.bind(styles);
	const path = `${consts.API.DELEGATIONS}/${account}`;
	const {data} = useGet({
		path: path,
	});

	const totalPages = 1;
	const currentPage = 1;
	const onPageChange = page => {};

	return (
		<div className={cx("delegation-card")}>
			<div className={cx("delegation-card-header")}>Delegations</div>
			<div className={cx("delegation-card-body")} style={{minHeight: minHeight + "px"}}>
				{Array.isArray(data?.data) && data.data.length > 0 ? (
					<>
						<DelegationTable data={data.data} />
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

export default DelegationCard;
