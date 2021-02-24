import React, {useState, useEffect} from "react";
import classNames from "classnames/bind";
import logo from "src/assets/header/logo.svg";

import styles from "./App.scss";

const cx = classNames.bind(styles);

export default function({days, hours, minutes, seconds}) {
	const [state, setState] = useState({
		width: "100%",
		height: "100%",
	});

	useEffect(() => {
		setState({
			width: window.innerWidth - 20 + "px",
			height: window.innerHeight - 0 + "px",
		});
	}, []);

	return (
		<div className={cx("countdown")} style={state}>
			<div className={cx("menu")}>
				<div className={cx("menu-left")}>
					<div>
						{" "}
						<img src={logo} alt={"logo"} className={cx("logo")} />{" "}
					</div>
					<div className={cx("name")}>Oraiscan</div>
				</div>
				<div className={cx("menu-right")}>
					<div>
						{" "}
						<a href='/'> Home </a>{" "}
					</div>
					<div>
						{" "}
						<a href='https://liquidity.orai.io/'> Product </a>{" "}
					</div>
					<div>
						{" "}
						<a href='https://orai.io/tokenomics'> Tokenomic </a>{" "}
					</div>
					<div>
						{" "}
						<a href='https://orai.io/#team'> About </a>{" "}
					</div>
					<div>
						{" "}
						<a href='https://docs.orai.io/docs/whitepaper/introduction/'> Whitepaper </a>{" "}
					</div>
				</div>
			</div>
			<div className={cx("title")}> Mainnet Launch on ORAISCAN </div>
			<div className={cx("remain")}>
				{days} DAY {hours > 9 ? hours : "0" + hours}:{minutes > 9 ? minutes : "0" + minutes}:{seconds > 9 ? seconds : "0" + seconds}
			</div>
			<div className={cx("join-us")}>
				<div> Join our journey to create a better world </div>
				<div> Using the power of Artificial Intelligence interconnected with Blockchain </div>
			</div>
		</div>
	);
}
