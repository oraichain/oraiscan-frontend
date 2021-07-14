import * as React from "react";
import {useState, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import {isNil} from "lodash";
import cn from "classnames/bind";
import Container from "@material-ui/core/Container";
import {useGet} from "restful-react";
import copy from "copy-to-clipboard";
import {showAlert} from "src/store/modules/global";
import {_} from "src/lib/scripts";
import drand from "src/lib/drand/drand";
import CopyIcon from "src/icons/CopyIcon";
import SearchIcon from "src/icons/SearchIcon";
import InfoRow from "src/components/common/InfoRow";
import RandomnessSkeleton from "./RandomnessSkeleton";
import styles from "./Randomness.module.scss";
import consts from "src/constants/consts";

const cx = cn.bind(styles);

const Randomness = ({}) => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);
	const randomValueRef = useRef(null);
	const [roundValue, setRoundValue] = useState(null);
	const [errorMessage, setErrorMessage] = useState(false);
	const wallet = useSelector(state => state.wallet);
	const address = wallet?.address;

	const {data: amountData, loading: amountLoading, error: amountError, refetch} = useGet({
		path: `${consts.LCD_API_BASE}${consts.LCD_API.BALANCES}/${address}`,
	});

	const balance = amountData?.balances?.[0]?.amount / 10 ** 6;

	useEffect(() => {
		handleGetRandomValue(false);
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

	const handleGetRandomValue = async isNewRandom => {
		const latestData = await drand("orai1e5rcy5azgah7rllnd7qvzz66mrsq6ehxma6g4m", parseInt(roundValue), "5", "0.000001", "200000", isNewRandom);
		setLoading(false);
		if (!isNil(latestData) && randomValueRef.current) {
			setData(latestData);

			let currentValue = Array.from(randomValueRef.current.innerHTML);
			let timeOut = 0;
			for (let i = 0; i < currentValue.length; i++) {
				timeOut += 30;
				let interval = setInterval(() => {
					let newValue = generateRandomString(1);
					currentValue[i] = newValue;
					if (randomValueRef.current) {
						randomValueRef.current.innerHTML = currentValue.join("");
					}
				}, 50);
				setTimeout(() => {
					currentValue[i] = Array.from(latestData?.latest?.randomness)?.[i];
					if (randomValueRef.current) {
						randomValueRef.current.innerHTML = currentValue.join("");
					}
					clearInterval(interval);
				}, 500 + timeOut);
			}
		}
	};

	return (
		<Container fixed className={cx("tx")}>
			{!loading && !amountLoading ? (
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
							<div className={cx("status")}>
								<span className={cx("status-text")}>{data?.latest?.signature}</span>
							</div>
						</InfoRow>
						<InfoRow label='Public Key'>{_.isNil(data?.pubkey) ? "-" : <div className={cx("public-key")}>{data?.pubkey}</div>}</InfoRow>
						<InfoRow label='Current Fees'>
							{_.isNil(data?.currentFees) ? (
								"-"
							) : (
								<>
									<div className={cx("current-fees")}>
										<span>{data?.currentFees / 10 ** 6}</span>
										<span className={cx("denom")}>ORAI</span>
									</div>
									{errorMessage && <div className={cx("error-message")}>{"Your balance must be larger than fees"}</div>}
								</>
							)}
						</InfoRow>
						<InfoRow label='Current Round'>{_.isNil(data?.latest?.round) ? "-" : <div className={cx("public-key")}>{data?.latest?.round}</div>}</InfoRow>
						<ul className={cx("info-row")}>
							<li className={cx("label-column")}>Search</li>
							<li className={cx("value-column")}>
								<input
									onChange={e => {
										setRoundValue(e.currentTarget.value);
									}}
									placeholder={"Search for round.."}
									className={cx("search")}
									value={roundValue}
								/>
								<button
									onClick={() => {
										setLoading(true);
										handleGetRandomValue(false);
									}}
									className={cx("search-button")}>
									<SearchIcon className={cx("search-button-icon")} />
								</button>
							</li>
						</ul>
						<div
							onClick={() => {
								if (parseFloat(data?.currentFees) > parseFloat(balance)) {
									setLoading(true);
									handleGetRandomValue(true);
								} else {
									setErrorMessage(true);
								}
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
