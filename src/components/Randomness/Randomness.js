import * as React from "react";
import {useState, useEffect, useRef} from "react";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import PropTypes from "prop-types";
import {isNil} from "lodash";
import cn from "classnames/bind";
import Container from "@material-ui/core/Container";
import copy from "copy-to-clipboard";
import {showAlert} from "src/store/modules/global";
import {_} from "src/lib/scripts";
import drand from "src/lib/drand/drand";
import CopyIcon from "src/icons/CopyIcon";
import CheckIcon from "src/icons/CheckIcon";
import TimesIcon from "src/icons/TimesIcon";
import RedoIcon from "src/icons/RedoIcon";
import {getTotalTime, setAgoTime} from "src/lib/scripts";
import InfoRow from "src/components/common/InfoRow";
import ShortenedString from "src/components/common/ShortenedString";
import RandomnessSkeleton from "./RandomnessSkeleton";
import styles from "./Randomness.module.scss";

const cx = cn.bind(styles);

const Randomness = ({}) => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);
	const randomValueRef = useRef(null);

	let statusClassName;
	let statusIcon;
	let statusText;

	useEffect(() => {
		handleGetRandomValue();
	}, []);

	const generateRandomString = length => {
		let randomString = "";
		let randomASCII;
		let ascii_low = 65;
		let ascii_high = 90;
		for (let i = 0; i < length; i++) {
			randomASCII = Math.floor(Math.random() * (ascii_high - ascii_low) + ascii_low);
			randomString += String.fromCharCode(randomASCII);
		}
		return randomString;
	};

	const handleGetRandomValue = async () => {
		const latestData = await drand("orai1e5rcy5azgah7rllnd7qvzz66mrsq6ehxma6g4m", 7, "5", "0.005", "200000", true);
		setLoading(false);
		if (!isNil(latestData)) {
			setData(latestData);
			let currentValue = Array.from(randomValueRef.current.innerHTML);
			let timeOut = 0;
			for (let i = 0; i < currentValue.length; i++) {
				timeOut += 30;
				let interval = setInterval(() => {
					let newValue = generateRandomString(1);
					currentValue[i] = newValue;
					randomValueRef.current.innerHTML = currentValue.join("");
				}, 50);
				setTimeout(() => {
					currentValue[i] = Array.from(latestData?.latest?.randomness)?.[i];
					randomValueRef.current.innerHTML = currentValue.join("");
					clearInterval(interval);
				}, 500 + timeOut);
			}
		}
	};

	return (
		<Container fixed className={cx("tx")}>
			{!loading ? (
				<div className={cx("card")}>
					<h2 className={cx("card-header")}>Randomness Information</h2>
					<div className={cx("card-body")}>
						<InfoRow label='Random Value'>
							<div className={cx("address")}>
								<span ref={randomValueRef} className={cx("address-value")}>
									{data?.latest?.randomness}
								</span>
								<span
									className={cx("address-copy")}
									onClick={() => {
										copy(data?.latest?.randomness);
										dispatch(
											showAlert({
												show: true,
												message: "Copied",
												autoHideDuration: 1500,
											})
										);
									}}>
									<CopyIcon />
								</span>
							</div>
						</InfoRow>
						<InfoRow label='Signature'>
							<div className={cx("status", statusClassName)}>
								<span className={cx("status-text")}>{data?.latest?.signature}</span>
							</div>
						</InfoRow>
						<InfoRow label='Public Key'>{_.isNil(data?.pubkey) ? "-" : <div className={cx("height")}>{data?.pubkey}</div>}</InfoRow>
						<InfoRow label='Round'>{_.isNil(data?.latest?.round) ? "-" : <div className={cx("height")}>{"#" + data?.latest?.round}</div>}</InfoRow>
						<div
							onClick={() => {
								setLoading(true);
								handleGetRandomValue();
							}}
							className={cx("button-random")}>
							New Random
						</div>
					</div>
				</div>
			) : (
				<RandomnessSkeleton />
			)}
		</Container>
	);
};

Randomness.propTypes = {
	data: PropTypes.any,
};

Randomness.defaultProps = {};

export default Randomness;
