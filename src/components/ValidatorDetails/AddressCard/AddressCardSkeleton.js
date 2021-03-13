import React, {memo} from "react";
import classNames from "classnames/bind";
import styles from "./AddressCard.scss";
import Skeleton from "@material-ui/lab/Skeleton";

const cx = classNames.bind(styles);

const AddressCardSkeleton = memo(({}) => {
	return (
		<div className={cx("address-card")}>
			<div className={cx("address-card-header")}>
				<Skeleton variant='text' width={200} height={30} />
				<Skeleton variant='text' width={60} height={30} />
			</div>
			<div className={cx("address-card-body")}>
				<div className={cx("address")}>
					<div className={cx("address-type")}>Operator address</div>
					<div className={cx("address-value")}>
						<Skeleton variant='text' height={18} />
					</div>
				</div>
				<div className={cx("address")}>
					<div className={cx("address-type")}>Address</div>
					<div className={cx("address-value")}>
						<Skeleton variant='text' height={18} />
					</div>
				</div>
			</div>
		</div>
	);
});

export default AddressCardSkeleton;
