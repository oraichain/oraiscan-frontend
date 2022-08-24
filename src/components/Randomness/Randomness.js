import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router";
import PropTypes from "prop-types";
import { isNil, reject } from "lodash";
import cn from "classnames/bind";
import Container from "@material-ui/core/Container";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import TogglePageBar from "src/components/common/TogglePageBar";
import { useGet } from "restful-react";
import { getLatestRound, getRound } from "src/lib/drand/drand";
import SearchIcon from "src/icons/SearchIcon";
import RandomnessSkeleton from "./RandomnessSkeleton";
import consts from "src/constants/consts";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import RandomnessView from "./RandomnessView";
import NewRadomModalResult from "./NewRadomModalResult";
import styles from "./Randomness.module.scss";
import RandomnessPopup from "./RandomnessPopup";
import LoadingOverlay from "../common/LoadingOverlay";

const cx = cn.bind(styles);

const Randomness = ({ }) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const wallet = useSelector(state => state.wallet);
	// const { contract } = useParams();
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);
	const [roundValue, setRoundValue] = useState(null);
	const [errorMessage, setErrorMessage] = useState(false);
	const [requestRunning, setRequestRunning] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [txResponse, setTxResponse] = useState({});
	const [showAdvance, setShowAdvance] = useState(false);
	const [userInput, setUserInput] = useState("");
	const [open, setOpen] = useState(false);
	const [loadingPopup, setLoadingPopup] = useState(false);
	const address = wallet?.address;
	const minFee = useSelector(state => state.blockchain.minFee);
	const { data: amountData, loading: amountLoading } = useGet({
		path: `${consts.LCD_API_BASE}${consts.LCD_API.BALANCES}/${address}`,
	});

	const balance = amountData?.balances?.[0]?.amount / 10 ** 6;

	const loadData = data => {
		setData(data);
		setShowModal(false);
		setLoading(false);
	};

	const handleGetLatestRound = async () => {
		const latestData = await getLatestRound();
		console.log("latest data: ", latestData);
		if (latestData && latestData.latest) {
			if (!latestData.latest.combined_sig) {
				let round = latestData.latest.round - 1;
				let roundResult = {};
				do {
					roundResult = await getRound(round);
					console.log("round result: ", roundResult);
					round = round - 1;
				} while (!roundResult || !roundResult.latest || !roundResult.latest.combined_sig);
				loadData(roundResult);
				return;
			} else if (latestData.latest.aggregate_sig?.sender === "") {
				let round = latestData.latest.round - 1;
				let roundResult = {};
				do {
					roundResult = await getRound(round);
					console.log("round result: ", roundResult);
					round = round - 1;
				} while (!roundResult || !roundResult.latest || roundResult.latest.aggregate_sig.sender === "");
				loadData(roundResult);
				return;
			}
			// if data is valid and has enough info => set it
			loadData(latestData);
			return;
		}
		// if failed to retrieve latest data => we retry it
		setTimeout(handleGetLatestRound, 10000);
	};

	useEffect(() => {
		handleGetLatestRound();
	}, []);

	const random = () => {
		if (parseFloat(data?.currentFees) / 10 ** 6 > parseFloat(balance)) {
			setErrorMessage(true);
		} else {
			setRequestRunning(true);
			handleGetRandomValue();
		}
	};

	const handleSearch = async () => {
		setLoading(true);
		console.log("round value: ", roundValue);
		const searchResult = await getRound(roundValue);
		// if the round value is valid, we stop searching
		console.log("search result: ", searchResult);
		if (searchResult && searchResult.latest && (searchResult.latest.combined_sig || searchResult.latest.aggregate_sig.sender !== "")) {
			loadData(searchResult);
			return;
		}
		// else, we by default get the latest valid round
		await handleGetLatestRound();
	};

	const handleGetRound = async round => {
		const returnValue = await new Promise(async (resolve, reject) => {
			setTimeout(async () => {
				try {
					const returnValue = await getRound(round);
					resolve(returnValue);
				} catch (error) {
					reject(error);
				}
			}, 8000);
		});
		return returnValue;
	};

	const handleGetRandomValue = async () => {
		setOpen(!open);
		setRequestRunning(false);
	};

	const eventHandleGetRamdomValue = async (response, contract) => {
		const round = response.tx_response.logs[0].events[1].attributes[3].value;
		setTxResponse({
			contract: contract,
			txHash: response.tx_response?.txhash,
		});
		setShowModal(true);
		setUserInput("");
		let wantedRound = {};

		do {
			wantedRound = await handleGetRound(round);
			console.log("wanted round: ", wantedRound);
		} while (!wantedRound || !wantedRound.latest || !wantedRound.latest.combined_sig);

		setShowModal(false);
		setLoading(false);
		setData(wantedRound);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const showInputAdvance = () => {
		setShowAdvance(!showAdvance);
	};

	const handleUserInput = e => {
		setUserInput(e.target.value);
	};

	const handleGenerateNewRandom = () => {
		setLoading(true);
		handleGetRandomValue(false);
	};

	const closeDialog = () => {
		setOpen(false);
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
				{loadingPopup ? <LoadingOverlay /> : <></>}
				{!loading && !amountLoading ? (
					<div className={cx("card")}>
						<h2 className={cx("card-header")}>Randomness Information</h2>
						<div className={cx("card-body")}>
							<RandomnessView data={data} errorMessage={errorMessage} />
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
									<button onClick={handleSearch} className={cx("search-button")}>
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
				<RandomnessPopup
					open={open}
					address={address}
					closeDialog={closeDialog}
					minFee={minFee}
					withdrawable={String(data?.currentFees)}
					userInput={userInput}
					eventHandleGetRamdomValue={eventHandleGetRamdomValue}
					setLoadingPopup={setLoadingPopup}
				/>
				<NewRadomModalResult open={showModal} onClose={handleCloseModal} txResponse={txResponse} />
			</Container>
		</>
	);
};

Randomness.propTypes = {
	data: PropTypes.any,
};

Randomness.defaultProps = {};

export default Randomness;
