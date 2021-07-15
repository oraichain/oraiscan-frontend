/* eslint-disable no-loop-func */
import React, {useState, useRef, useEffect} from "react";
import {useParams, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import PropTypes from "prop-types";
import {isNil} from "lodash";
import cn from "classnames/bind";
import Container from "@material-ui/core/Container";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import axios from "axios";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import TogglePageBar from "src/components/common/TogglePageBar";
import copy from "copy-to-clipboard";
import {showAlert} from "src/store/modules/global";
import {_} from "src/lib/scripts";
import drand from "src/lib/drand/drand";
import CopyIcon from "src/icons/CopyIcon";
import InfoRow from "src/components/common/InfoRow";
import consts from "src/constants/consts";
import config, { isTestnet } from "src/config";
import { generateRandomString } from "src/helpers/helper";
import RandomnessSkeleton from "./RandomnessDetailSkeleton";
import styles from "./RandomnessDetail.module.scss";

const cx = cn.bind(styles);

const Randomness = ({}) => {
	const {round} = useParams();
	const theme = useTheme();
	const history = useHistory();
	const [txhash, setTxhash] = useState(null);
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const { randomnessContractAddress } = config;
	const apiGetTx = `${consts.LCD_API_BASE}${consts.LCD_API.TXS}?events=wasm.round%3D%27${round}%27&events=wasm.contract_address%3D%27${randomnessContractAddress}%27`;

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

	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);
	const randomValueRef = useRef(null);

	useEffect(() => {
		handleGetRandomValue();
		handelGetTx();
	}, []);

	const handleGetRandomValue = async () => {
		const latestData = await drand(parseInt(round), false);
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
				}, 100 + timeOut);
			}
		}
	};

	const handelGetTx = async () => {
		const tx = await axios.get(apiGetTx);
		setTxhash(tx?.data?.tx_responses?.[0]?.txhash);
	}

	const handleClickTx = () => {
		history.push("/txs/" + txhash);
	}

	return (
		<>
			{titleSection}
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
								<div className={cx("status")}>
									<span className={cx("status-text")}>{data?.latest?.signature}</span>
								</div>
							</InfoRow>
							<InfoRow label='Public Key'>{_.isNil(data?.pubkey) ? "-" : <div className={cx("public-key")}>{data?.pubkey}</div>}</InfoRow>
							<InfoRow label='User Input'>
								<div className={cx("status")}>
									<span className={cx("status-text")}>{data?.latest?.user_input}</span>
								</div>
							</InfoRow>
							<InfoRow label='Transaction Hash'>
								<div className={cx("public-key", "pointer")} onClick={handleClickTx}>
									<span className={cx("public-key")}>{txhash}</span>
								</div>
							</InfoRow>
							<InfoRow label='Current Fees'>
								{_.isNil(data?.currentFees) ? (
									"-"
								) : (
									<div className={cx("current-fees")}>
										<span>{data?.currentFees / 10 ** 6}</span>
										<span className={cx("denom")}>ORAI</span>
									</div>
								)}
							</InfoRow>
							<InfoRow label='Current Round'>{_.isNil(data?.latest?.round) ? "-" : <div className={cx("public-key")}>{data?.latest?.round}</div>}</InfoRow>
						</div>
					</div>
				) : (
					<RandomnessSkeleton isLargeScreen={isLargeScreen} />
				)}
			</Container>
		</>
	);
};

Randomness.propTypes = {
	data: PropTypes.any,
};

Randomness.defaultProps = {};

export default Randomness;