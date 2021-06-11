import React, {memo} from "react";
import {networks} from "src/constants/networks";
import classNames from "classnames/bind";
import styles from "./NetworkSwitcher.scss";

const cx = classNames.bind(styles);

const NetworkSwitcher = memo(({}) => {
	let network = networks.MAINNET;
	let setNetwork = _ => {};

	if (typeof Storage !== "undefined") {
		network = localStorage.getItem("network");

		setNetwork = network => {
			localStorage.setItem("network", network);
		};
	}

	return (
		<select
			className={cx("select")}
			value={network}
			onChange={e => {
				setNetwork(e.target.value);
				window.location.reload();
			}}>
			{Object.values(networks).map((network, index) => (
				<option key={"network-" + index} value={network}>
					{network}
				</option>
			))}
		</select>
	);
});

export default NetworkSwitcher;
