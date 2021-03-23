import React, {memo} from "react";
import classNames from "classnames/bind";
import Skeleton from "@material-ui/lab/Skeleton";
import styles from "./AddressCard.scss";

const cx = classNames.bind(styles);

const AddressCardSkeleton = memo(({}) => {
	return (
		<div className={cx("address-card")}>
			<div className={cx("address-card-header")}>
				<Skeleton className={cx("header-icon")} width={36} height={36} />
				<Skeleton className={cx("header-title")} width={36} height={36} />
			</div>

			{[0, 1].map((_, index) => (
				<div className={cx("address-card-body")} key={"address-card-body-" + index}>
					<Skeleton className={cx("address-title")} variant='text' width={60} height={24} />
					<Skeleton className={cx("address-value")} variant='text' height={18} />
				</div>
			))}
		</div>
	);
});

export default AddressCardSkeleton;
