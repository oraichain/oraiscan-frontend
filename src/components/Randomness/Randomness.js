import * as React from "react";
import {useState, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import {isNil} from "lodash";
import cn from "classnames/bind";
import Container from "@material-ui/core/Container";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import TogglePageBar from "src/components/common/TogglePageBar";
import {useGet} from "restful-react";
import {drand, getTxResponse} from "src/lib/drand/drand";
import SearchIcon from "src/icons/SearchIcon";
import RandomnessSkeleton from "./RandomnessSkeleton";
import consts from "src/constants/consts";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import RandomnessView from "./RandomnessView";
import NewRadomModalResult from "./NewRadomModalResult";
import styles from "./Randomness.module.scss";

const cx = cn.bind(styles);

const Randomness = ({}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const wallet = useSelector(state => state.wallet);

	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);
	const [roundValue, setRoundValue] = useState(null);
	const [errorMessage, setErrorMessage] = useState(false);
	const [requestRunning, setRequestRunning] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [txResponse, setTxResponse] = useState({});
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
		if (!isNil(latestData)) {
			setData(latestData);
		}
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
									<button onClick={handleGenerateNewRandom} className={cx("search-button")}>
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
