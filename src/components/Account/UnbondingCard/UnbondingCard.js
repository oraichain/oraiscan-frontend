import React, {memo} from "react";
import {useGet} from "restful-react";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {_, reduceString} from "src/lib/scripts";
import UnbondingTable from "src/components/Account/UnbondingTable";
import Pagination from "src/components/common/Pagination";
import EmptyTable from "src/components/common/EmptyTable";
import styles from "./UnbondingCard.scss";

const UnbondingCard = memo(({account = 0, minHeight = 222}) => {
	const cx = classNames.bind(styles);
	const path = `${consts.API.UNBONDINGS}/${account}`;
	const {data} = useGet({
		path: path,
	});

	if (!data) {
		return <Skeleton variant='rect' animation='wave' height={minHeight} />;
	}

	const totalPages = 1;
	const currentPage = 1;
	const onPageChange = page => {};
	const columns = [{title: "Validator"}, {title: "Height"}, {title: "Amount"}, {title: "Completion Time"}];

	return (
		<div className={cx("unbonding-card")}>
			<div className={cx("unbonding-card-header")}>Unbondings</div>
			<div className={cx("unbonding-card-body")} style={{minHeight: minHeight + "px"}}>
				{Array.isArray(data?.data) && data.data.length > 0 ? (
					<>
						<UnbondingTable data={data.data} />
						{totalPages > 0 && <Pagination pages={totalPages} page={currentPage} onChange={(e, page) => onPageChange(page)} />}
					</>
				) : (
					<EmptyTable columns={columns} />
				)}
			</div>
		</div>
	);
});

export default UnbondingCard;
