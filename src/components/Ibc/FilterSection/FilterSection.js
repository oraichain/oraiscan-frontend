import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import cn from "classnames/bind";
import SearchInput from "src/components/common/SearchInput";
import styles from "./FilterSection.module.scss";
import DownAngleIcon from "src/icons/DownAngleIcon";
import { assetsNetworks, assetsDropDown } from "src/constants/ibc";
import _ from "lodash";

const cx = cn.bind(styles);

const FilterSection = ({ keyword, setKeyword, assetSearch, setAssetSearch, onChange }) => {
	const selectedPriceFeedNetworkRef = useRef(null);
	const listPriceFeedNetworks = useRef(null);

	const showList = () => {
		if (!_.isNil(listPriceFeedNetworks.current)) {
			listPriceFeedNetworks.current.style.display = "block";
		}
	};

	const hideList = () => {
		if (!_.isNil(listPriceFeedNetworks.current)) {
			listPriceFeedNetworks.current.style.display = "none";
		}
	};

	const clickListener = event => {
		if (event?.target?.hasAttribute("ibc-network")) {
			hideList();
			setAssetSearch(assetsNetworks.findIndex(e => e === event?.target?.getAttribute("ibc-network")));
			return;
		}

		if (selectedPriceFeedNetworkRef?.current?.contains?.(event?.target)) {
			if (listPriceFeedNetworks?.current?.style?.display === "block") {
				hideList();
			} else {
				showList();
			}
			return;
		}

		if (!_.isNil(listPriceFeedNetworks.current) && !listPriceFeedNetworks?.current?.contains?.(event?.target)) {
			hideList();
		}
	};

	useEffect(() => {
		document.addEventListener("click", clickListener, true);

		return () => {
			document.removeEventListener("click", clickListener);
		};
	}, []);

	return (
		<Grid container spacing={2} alignItems='center' className={cx("filter-section")}>
			<Grid item lg={6} xs={12} className={cx("filter-section-left")}>
				<div className={cx("search-box")}>
					<SearchInput
						className={cx("search-input")}
						placeholder='Search Asset'
						value={keyword}
						// onChange={e => {
						// 	const query = {
						// 		search: e.target.value,
						// 	};
						// 	setKeyword(e.target.value);
						// 	// history.push({
						// 	// 	pathname: `${history.location.pathname}`,
						// 	// 	search: queryString.stringify(query, {
						// 	// 		encode: false,
						// 	// 	}),
						// 	// });
						// }}
						onChange={onChange}
					/>
				</div>
			</Grid>
			<Grid item lg={6} xs={12} className={cx("filter-section-right")}>
				<div className={cx("network-switcher")} ref={selectedPriceFeedNetworkRef}>
					<div className={cx("selected-item")}>
						<input type='text' className={cx("text-field")} value={assetsNetworks[assetSearch]} readOnly />
						<DownAngleIcon className={cx("arrow")} />
					</div>
					<div className={cx("list")} ref={listPriceFeedNetworks}>
						{Object.values(assetsDropDown).map((item, index) => (
							<div key={"list-item-" + index} className={cx("list-item")} ibc-network={item}>
								{item}
							</div>
						))}
					</div>
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
