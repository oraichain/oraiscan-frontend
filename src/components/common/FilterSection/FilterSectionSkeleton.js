import React, {memo} from "react";
import classNames from "classnames/bind";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Skeleton from "@material-ui/lab/Skeleton";
import styles from "./FilterSection.scss";

const cx = classNames.bind(styles);

const FilterSectionSkeleton = memo(() => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	return (
		<div className={cx("filter-section")}>
			{isLargeScreen ? <Skeleton variant='rect' width={250} height={40} className={cx("skeleton")} /> : <Skeleton variant='rect' height={50} />}
		</div>
	);
});

export default FilterSectionSkeleton;
