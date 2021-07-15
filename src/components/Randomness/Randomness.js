import * as React from "react";
import {useState, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useHistory} from "react-router-dom";
import PropTypes from "prop-types";
import {isNil} from "lodash";
import cn from "classnames/bind";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import TogglePageBar from "src/components/common/TogglePageBar";
import {useGet} from "restful-react";
import copy from "copy-to-clipboard";
import {showAlert} from "src/store/modules/global";
import {_} from "src/lib/scripts";
import {drand, getTxResponse} from "src/lib/drand/drand";
import CopyIcon from "src/icons/CopyIcon";
import SearchIcon from "src/icons/SearchIcon";
import InfoRow from "src/components/common/InfoRow";
import RandomnessSkeleton from "./RandomnessSkeleton";
import consts from "src/constants/consts";
import config from "src/config";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {generateRandomString} from "src/helpers/helper";
import styles from "./Randomness.module.scss";

const cx = cn.bind(styles);

const Randomness = ({}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const wallet = useSelector(state => state.wallet);
	const dispatch = useDispatch();
	const history = useHistory();

	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);
	const randomValueRef = useRef(null);
	const [roundValue, setRoundValue] = useState(null);
	const [errorMessage, setErrorMessage] = useState(false);
	const [requestRunning, setRequestRunning] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [txResponse, setTxResponse] = useState({});
	const [txhash, setTxhash] = useState(null);
	const [showAdvance, setShowAdvance] = useState(false);
	const [userInput, setUserInput] = useState("");

	const address = wallet?.address;

	const {data: amountData, loading: amountLoading} = useGet({
		path: `${consts.LCD_API_BASE}${consts.LCD_API.BALANCES}/${address}`,
	});

	const balance = amountData?.balances?.[0]?.amount / 10 ** 6;

	useEffect(() => {
		handleGetRandomValue(false);
	}, []);

	useEffect(() => {
		const {randomnessContractAddress} = config;
		const apiGetTx = `${consts.LCD_API_BASE}${consts.LCD_API.TXS}?events=wasm.round%3D%27${data?.latest?.round}%27&events=wasm.contract_address%3D%27${randomnessContractAddress}%27`;
		const handelGetTx = async () => {
			const tx = await axios.get(apiGetTx);
			setTxhash(tx?.data?.tx_responses?.[0]?.txhash);
		};
		if (data?.latest?.round) {
			handelGetTx();
		}
	}, [data?.latest?.round]);

	const random = () => {
		if (parseFloat(data?.currentFees) / 10 ** 6 > parseFloat(balance)) {
			setErrorMessage(true);
		} else {
			setRequestRunning(true);
			handleGetRandomValue(true);
		}
	};

	const handleGetRandomValue = async isNewRandom => {
		if (isNewRandom) {
			try {
				const {response, contract} = await getTxResponse(String(data?.currentFees), "0", "200000", userInput);
				setTxResponse({
					contract: contract,
					txHash: response.tx_response?.txhash,
				});
				setShowModal(true);
				setUserInput("");
			} catch (error) {
				console.log(error);
			}
			setRequestRunning(false);
		}
		const latestData = await drand(parseInt(roundValue), isNewRandom);

		setShowModal(false);
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

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleClickTx = () => {
		history.push("/txs/" + txhash);
	};

	const showInputAdvance = () => {
		setShowAdvance(!showAdvance);
	};

	const handleUserInput = e => {
		setUserInput(e.target.value);
	};

	let titleSection;
	if (isLargeScreen) {
		titleSection = (
			<Container fixed>
				<TitleWrapper>
					<PageTitle title={"Randomness"} />
					<StatusBox />
				</TitleWrapper>
			</Container>
		);
	} else {
		titleSection = <TogglePageBar type='randomness' />;
	}

	return (
		<>
			{titleSection}
			<Container fixed className={cx("tx")}>
				{!loading && !amountLoading ? (
					<div className={cx("card")}>
						<h2 className={cx("card-header")}>Randomness Information</h2>
						<div className={cx("card-body")}>
							<InfoRow label='Random Seed (User Input)'>
								<div className={cx("input-text")}>{data?.latest?.user_input ? data.latest.user_input : "-"}</div>
							</InfoRow>
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
							<InfoRow label='Transaction Hash'>
								<div className={cx("public-key", "pointer")} onClick={handleClickTx}>
									<span className={cx("public-key")}>{txhash}</span>
								</div>
							</InfoRow>
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
							{requestRunning ? (
								<div className={cx("running")}></div>
							) : (
								<>
									<div className={cx("random")}>
										<div className={cx("button-random")} onClick={random}>
											New Random
										</div>
										<div className={cx("button-more")} onClick={showInputAdvance}>
											{" "}
											Advanced
											{showAdvance ? <ExpandLessIcon /> : <ExpandMoreIcon />}{" "}
										</div>
									</div>
									{showAdvance && (
										<div className={cx("user-input")}>
											Random Seed (User Input): <input type='text' value={userInput} onChange={handleUserInput} />
										</div>
									)}
								</>
							)}
						</div>
					</div>
				) : (
					<RandomnessSkeleton isLargeScreen={isLargeScreen} />
				)}

				<Dialog open={showModal} onClose={handleCloseModal} maxWidth='lg' fullWidth={true}>
					<div className={cx("tx_response")}>
						<div className={cx("message")}> New random seed coming in just a moment...</div>

						<InfoRow label='Contract'>
							<div className={cx("contract")}>
								<NavLink className={cx("contract-link")} to={`${consts.PATH.SMART_CONTRACT}/${txResponse.contract}`}>
									{txResponse.contract}
								</NavLink>
								<div
									className={cx("contract-copy")}
									onClick={() => {
										copy(txResponse.contract);
										dispatch(
											showAlert({
												show: true,
												message: "Copied",
												autoHideDuration: 1500,
											})
										);
									}}>
									<CopyIcon />
								</div>
							</div>
						</InfoRow>

						<InfoRow label='TxHash'>
							<div className={cx("txhash")}>
								<NavLink className={cx("txhash-link")} to={`${consts.PATH.TXLIST}/${txResponse.txHash}`}>
									{txResponse.txHash}
								</NavLink>
								<div
									className={cx("txhash-copy")}
									onClick={() => {
										copy(txResponse.txHash);
										dispatch(
											showAlert({
												show: true,
												message: "Copied",
												autoHideDuration: 1500,
											})
										);
									}}>
									<CopyIcon />
								</div>
							</div>
						</InfoRow>
					</div>
				</Dialog>
			</Container>
		</>
	);
};

Randomness.propTypes = {
	data: PropTypes.any,
};

Randomness.defaultProps = {};

export default Randomness;
