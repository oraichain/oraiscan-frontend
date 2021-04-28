import React from "react";
import PropTypes from "prop-types";
import cn from "classnames/bind";
import SearchInput from "src/components/common/SearchInput";
import styles from "./FilterSection.module.scss";

const cx = cn.bind(styles);

const FilterSection = ({keyword, setKeyword}) => {
	return (
		<div className={cx("filter-section")}>
			<div className={cx("filter-section-header")}>Explore the decentralized with Oraichain</div>
			<div className={cx("filter-section-body")}>
				<SearchInput
					className={cx("search-input")}
					placeholder='Search request id'
					value={keyword}
					onChange={e => {
						setKeyword(e.target.value);
					}}
				/>
			</div>
		</div>
	);
};

FilterSection.propTypes = {
	keyword: PropTypes.string,
	setKeyword: PropTypes.func,
};
FilterSection.defaultProps = {};

export default FilterSection;
