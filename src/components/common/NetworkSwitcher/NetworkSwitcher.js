import React, {memo, useState, useEffect, useRef} from "react";
import {networks} from "src/constants/networks";
import _ from "lodash";
import classNames from "classnames/bind";
import styles from "./NetworkSwitcher.scss";
import DownAngleIcon from "src/icons/DownAngleIcon";

const cx = classNames.bind(styles);

const NetworkSwitcher = memo(({}) => {
	const selectedItemRef = useRef(null);
	const listRef = useRef(null);
	let network = networks.MAINNET;
	let setNetwork = _ => {};

	if (typeof Storage !== "undefined") {
		network = localStorage.getItem("network");

		setNetwork = network => {
			localStorage.setItem("network", network);
			window.location.reload();
		};
	}

	const showList = () => {
		if (!_.isNil(listRef.current)) {
			listRef.current.style.display = "block";
		}
	};

	const hideList = () => {
		if (!_.isNil(listRef.current)) {
			listRef.current.style.display = "none";
		}
	};

	const clickListener = event => {
		if (event.target.hasAttribute("data-network")) {
			setNetwork(event.target.getAttribute("data-network"));
			return;
		}

		if (selectedItemRef.current.contains(event.target)) {
			if (listRef.current.style.display === "block") {
				hideList();
			} else {
				showList();
			}
			return;
		}

		if (!_.isNil(listRef.current) && !listRef.current.contains(event.target)) {
			hideList();
		}
	};

	useEffect(() => {
		document.addEventListener("click", clickListener, true);

		return () => {
			document.removeEventListener("click", clickListener);
		};
	});

	return (
		<div className={cx("network-switcher")}>
			<div className={cx("selected-item")} ref={selectedItemRef}>
				<input type='text' className={cx("text-field")} value={network} readOnly />
				<DownAngleIcon className={cx("arrow")} />
			</div>
			<div className={cx("list")} ref={listRef}>
				{Object.values(networks).map((item, index) => (
					<div key={"list-item-" + index} className={cx("list-item")} data-network={item}>
						{item}
					</div>
				))}
			</div>
		</div>
	);
});

export default NetworkSwitcher;
