import React, {memo, useState, useRef} from "react";
import {useGet} from "restful-react";
import {useHistory} from "react-router-dom";
import SearchIcon from "src/icons/SearchIcon";
import classNames from "classnames/bind";
import {_, stringNumCheck} from "src/lib/scripts";
import styles from "./SmartSearchBox.scss";
import failIcon from "src/assets/transactions/fail_ic.svg";

const cx = classNames.bind(styles);

const SmartSearchBox = memo(({}) => {
	const history = useHistory();
	const dropdownRef = useRef(null);
	const [searchValue, setSearchValue] = useState("");

	const [path, setPath] = useState("https://dog.ceo/api/breeds/image/1");
	const {data, loading, error, refetch} = useGet({
		path: path,
		lazy: true,
		mock: {
			loading: false,
			data: {
				address: "orai18vd8fpwxzck93qlwghaj6arh4p7c5n8903w6c8",
				code_id: "1",
				creator: "orai18hr8jggl3xnrutfujy2jwpeu0l76azprlvgrwt",
				admin: "",
				label: "aioracle test",
			},
			error: null,
		},
	});

	const searchTypes = React.useMemo(() => {
		if (!_.isString(searchValue)) {
			return false;
		} else if (stringNumCheck(searchValue)) {
			return "block";
		} else if (searchValue.substring(0, 4).toLowerCase() === "orai" && searchValue.length === 43) {
			if (path !== "https://dog.ceo/api/breeds/image/2") {
				setPath("https://dog.ceo/api/breeds/image/2");
				refetch();
				return "account";
			}

			if (loading) {
				return "account";
			} else {
				if (error) {
					return "account";
				} else {
					if (!_.isNil(data.code_id)) {
						return "account|smartContract";
					}
				}
			}
		} else if (searchValue.substring(0, 11).toLowerCase() === "oraivaloper" && searchValue.length === 50) {
			return "validator";
		} else if (searchValue.length === 64) {
			return "transaction";
		}
		return false;
	}, [searchValue, data, loading, error, refetch]);

	const gotoSearchTypePage = (searchType, searchValue) => {
		console.log("gotoSearchTypePage", searchType, searchValue);
		if (searchType === "block") {
			history.push(`/blocks/${searchValue}`);
		} else if (searchType === "account") {
			history.push(`/account/${searchValue}`);
		} else if (searchType === "smartContract") {
			history.push(`/smart-contract/${searchValue}`);
		} else if (searchType === "validator") {
			history.push(`/validators/${searchValue}`);
		} else if (searchType === "transaction") {
			history.push(`/txs/${searchValue}`);
		}
		setSearchValue("");
	};

	let dropdownItems;
	if (searchValue !== "") {
		if (searchTypes) {
			if (searchTypes.includes("|")) {
				const searchTypeArray = searchTypes.split("|");
				dropdownItems = searchTypeArray.map(searchType => {
					return (
						<div
							className={cx("dropdown-item")}
							key={"dropdown-item-" + searchType}
							onClick={e => {
								gotoSearchTypePage(searchType, searchValue);
							}}>
							<span className={cx("dropdown-item-message")}>Search for</span>
							<span className={cx("dropdown-item-type")}>{searchType}</span>
						</div>
					);
				});
			} else {
				dropdownItems = (
					<div
						className={cx("dropdown-item")}
						onClick={e => {
							gotoSearchTypePage(searchTypes, searchValue);
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
	} else {
		dropdownItems = <></>;
	}

	return (
		<div className={cx("smart-search-box")}>
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
				onBlur={e => {
					setTimeout(function() {
						if (!_.isNil(dropdownRef?.current?.style?.display)) {
							dropdownRef.current.style.display = "none";
						}
					}, 1000);
				}}
			/>

			<div className={cx("search-button")}>
				<SearchIcon className={cx("search-button-icon")} />
			</div>

			<div className={cx("dropdown")} ref={dropdownRef}>
				{dropdownItems}
			</div>
		</div>
	);
});

export default SmartSearchBox;
