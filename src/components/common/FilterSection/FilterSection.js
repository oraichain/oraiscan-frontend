import React, {memo} from "react";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import classNames from "classnames/bind";
import ButtonGroup from "src/components/common/ButtonGroup";
import styles from "./FilterSection.scss";

const cx = classNames.bind(styles);

const FilterSection = memo(({data, value, onChange}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

	return (
		<div className={cx("filter-section")}>
			{isLargeScreen ? (
				<ButtonGroup data={data} value={value} onChange={onChange} />
			) : (
				<form>
					<select
						className={cx("select")}
						value={value}
						onChange={e => {
							onChange(e.target.value);
						}}>
						{data?.map((item, index) => (
							<option value={item.value}>{item.label}</option>
						))}
					</select>
				</form>
			)}
		</div>
	);
});

export default FilterSection;
