import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import cn from "classnames/bind";
import SearchInput from "src/components/common/SearchInput";
import GridViewIcon from "src/icons/GridViewIcon";
import ListViewIcon from "src/icons/ListViewIcon";
import styles from "./FilterSection.module.scss";

const cx = cn.bind(styles);

const FilterSection = ({isGridView, keyword, setIsGridView, setKeyword}) => {
	return (
		<Grid container spacing={2} alignItems='center' className={cx("filter-section")}>
			<Grid item lg={6} xs={12} alignContent='flex-start' className={cx("filter-section-header")}>
				Explore the decentralized with Oraichain
			</Grid>
			<Grid item lg={6} xs={12} alignContent='flex-end' className={cx("filter-section-body")}>
				<div
					className={cx("view-switch")}
					onClick={() => {
						setIsGridView(!isGridView);
					}}>
					{isGridView ? (
						<>
							<ListViewIcon className={cx("view-switch-icon")} />
							<span className={cx("view-switch-text")}>Column</span>
						</>
					) : (
						<>
							<GridViewIcon className={cx("view-switch-icon")} />
							<span className={cx("view-switch-text")}>Grid</span>
						</>
					)}
				</div>

				<div className={cx("search-box")}>
					<SearchInput
						className={cx("search-input")}
						placeholder='Search token name'
						value={keyword}
						onChange={e => {
							setKeyword(e.target.value);
						}}
					/>
				</div>
			</Grid>
		</Grid>
	);
};

FilterSection.propTypes = {
	isGridView: PropTypes.bool,
	keyword: PropTypes.string,
	setIsGridView: PropTypes.func,
	setKeyword: PropTypes.func,
};
FilterSection.defaultProps = {};

export default FilterSection;
