import React, { memo, useState, useRef, useEffect } from "react";
import { useGet } from "restful-react";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from "@material-ui/core";
import SearchIcon from "src/icons/SearchIcon";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import axios from "axios";
import { _, stringNumCheck } from "src/lib/scripts";
import failIcon from "src/assets/transactions/fail_ic.svg";
import consts from "src/constants/consts";
import { useTheme } from "@material-ui/styles";
import styles from "./SmartSearchBox.module.scss";

const cx = classNames.bind(styles);

const SmartSearchBox = memo(({ closeMobileNavigateBar = () => { } }) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const history = useHistory();
	const dropdownRef = useRef(null);
	const searchBoxRef = useRef(null);
	const [searchValue, setSearchValue] = useState("");
	const [searchTypes, setSearchTypes] = useState(null);

	// const [path, setPath] = useState("");
	// const {data, loading, error, refetch} = useGet({
	// 	path: path,
	// });

	const getSearchTypes = async () => {
		if (!_.isString(searchValue)) {
			return false;
		} else if (stringNumCheck(searchValue)) {
			return "block";
		} else if (searchValue.substring(0, 4).toLowerCase() === "orai" && searchValue.length === 43) {
			try {
				setSearchTypes("account|checking");
				const data = await axios.get(`${consts.API_BASE}${consts.API.SMART_CONTRACT}/${searchValue}`);
				if (!_.isNil(data?.data?.code_id)) {
					return "account|smart Contract";
				}
			} catch (error) {
				return "account";
			}
		} else if (searchValue.substring(0, 11).toLowerCase() === "oraivaloper" && searchValue.length === 50) {
			return "validator";
		} else if (searchValue.length === 64) {
			return "transaction";
		}
		return false;
	};

	const gotoSearchTypePage = (searchType, searchValue) => {
		console.log("gotoSearchTypePage", searchType, searchValue);
		if (searchType === "block") {
			history.push(`/blocks/${searchValue}`);
		} else if (searchType === "account") {
			history.push(`/account/${searchValue}`);
		} else if (searchType === "smart Contract") {
			history.push(`/smart-contract/${searchValue}`);
		} else if (searchType === "validator") {
			history.push(`/validators/${searchValue}`);
		} else if (searchType === "transaction") {
			history.push(`/txs/${searchValue}`);
		}
		setSearchValue("");
	};

	useEffect(() => {
		if (searchValue !== "") {
			getSearchTypes()
				.then(types => {
					setSearchTypes(types);
				})
				.catch(error => { });
		} else {
			setSearchTypes(null);
		}
	}, [searchValue]);

	useEffect(() => {
		document.addEventListener("mouseup", handleClickOutside);
		return () => {
			document.removeEventListener("mouseup", handleClickOutside);
		};
	}, []);

	const handleClickOutside = event => {
		if (dropdownRef && !dropdownRef?.current?.contains?.(event?.target)) {
			if (!_.isNil(dropdownRef?.current?.style?.display)) {
				dropdownRef.current.style.display = "none";
			}
		}
	};

	let dropdownItems;
	if (searchTypes) {
		if (searchTypes?.includes("|")) {
			const searchTypeArray = searchTypes.split("|");
			dropdownItems = searchTypeArray.map(searchType => {
				let type;
				type =
					searchType === "checking" ? (
						<div className={cx("dropdown-item", "dropdown-item-disabled")} key={"dropdown-item-" + searchType}>
							<span className={cx("dropdown-item-message")}>Checking Is Smart Contract...</span>
						</div>
					) : (
						<div
							className={cx("dropdown-item")}
							key={"dropdown-item-" + searchType}
							onClick={e => {
								gotoSearchTypePage(searchType, searchValue);
								!isLargeScreen && closeMobileNavigateBar();
							}}>
							<span className={cx("dropdown-item-message")}>Search for</span>
							<span className={cx("dropdown-item-type")}>{searchType}</span>
						</div>
					);
				return type;
			});
		} else {
			dropdownItems = (
				<div
					className={cx("dropdown-item")}
					onClick={e => {
						gotoSearchTypePage(searchTypes, searchValue);
						!isLargeScreen && closeMobileNavigateBar();
					}}>
					<span className={cx("dropdown-item-message")}>Search for</span>
					<span className={cx("dropdown-item-type")}>{searchTypes}</span>
				</div>
			);
		}
	} else {
		dropdownItems = (
			<div className={cx("dropdown-item")}>
				<span className={cx("dropdown-item-message")}>Not found</span>
				<img src={failIcon} alt={"fail"} />
			</div>
		);
	}

	return (
		<div ref={searchBoxRef} className={cx("smart-search-box")}>
			<input
				type='text'
				className={cx("search-input")}
				placeholder='Search by Block, Transaction, Account or Smart Contract...'
				value={searchValue}
				onChange={e => {
					setSearchValue(e.target.value);
				}}
				onFocus={() => {
					dropdownRef.current.style.display = "block";
				}}
				onClick={() => {
					dropdownRef.current.style.display = "block";
				}}
			// onBlur={e => {
			// 	// setTimeout(function() {
			// 	// 	if (!_.isNil(dropdownRef?.current?.style?.display)) {
			// 	// 		dropdownRef.current.style.display = "none";
			// 	// 	}
			// 	// }, 0);
			// }}
			/>
			<div className={cx("dropdown")} ref={dropdownRef}>
				{!!searchValue && dropdownItems}
			</div>
		</div>
	);
});

SmartSearchBox.propTypes = {
	closeMobileNavigateBar: PropTypes.func,
};

SmartSearchBox.defaultProps = {};

export default SmartSearchBox;
