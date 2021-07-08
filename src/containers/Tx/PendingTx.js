/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from "react";
import {useParams} from "react-router-dom";
import {useGet} from "restful-react";
import cn from "classnames/bind";
import PropTypes from "prop-types";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import consts from "src/constants/consts";
import {decodeTx} from "src/helpers/helper";
import PageTitle from "src/components/common/PageTitle";
import NotFound from "src/components/common/NotFound";
import StatusBox from "src/components/common/StatusBox";
import TitleWrapper from "src/components/common/TitleWrapper";
import TogglePageBar from "src/components/common/TogglePageBar";
import NavigateBackBar from "src/components/common/NavigateBackBar";
import TxInfo from "src/components/Tx/TxInfo";
import TxInfoSkeleton from "src/components/Tx/TxInfo/TxInfoSkeleton";
import TxData from "src/components/Tx/TxData";
import TxDataSkeleton from "src/components/Tx/TxData/TxDataSkeleton";
import styles from "./Tx.module.scss";
import _ from "lodash";
import axios from "axios";

const cx = cn.bind(styles);

const PendingTx = ({setPending, pending}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const params = useParams();
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState();
	const txHash = params?.["tx"];
	const path = `https://rpc.orai.io/unconfirmed_txs?limit=${consts.REQUEST.LIMIT}`;

	let timerIdRef = useRef(null);
	let pendingRef = useRef(pending);
	pendingRef.current = true;

	const cleanUp = () => {
		if (timerIdRef) {
			clearTimeout(timerIdRef.current);
		}
	};

	useEffect(() => {
		let timeoutRetry;
		async function getData(n) {
			n === 0 && setLoading(true);
			const result = await axios.get(path);
			const data = result?.data;
			setData(data);
			setLoading(false);
			if (pendingRef.current) {
				timeoutRetry = setTimeout(() => {
					getData(n + 1);
				}, 2000);
			} else {
				clearTimeout(timeoutRetry);
			}
		}
		getData(0);
		return () => {
			clearTimeout(timeoutRetry);
		}
	}, [txHash]);

	let titleSection;
	let txInfo;
	let txData;

	titleSection = isLargeScreen ? (
		<Container fixed>
			<TitleWrapper>
				<PageTitle title={"Transactions detail"} />
				<StatusBox />
			</TitleWrapper>
		</Container>
	) : (
		<>
			<TogglePageBar type='transactions' />
			<NavigateBackBar type='transactions' />
		</>
	);

	if (loading) {
		txInfo = <TxInfoSkeleton />;
		txData = <TxDataSkeleton />;
	} else {
		let hasPendingTransaction = false;
		if (Array.isArray(data?.result?.txs)) {
			for (let tx of data.result.txs) {
				const decodedTx = decodeTx(tx);
				console.log(decodedTx);

				if (txHash === decodedTx.hash) {
					hasPendingTransaction = true;
					const pendingData = {
						tx_hash: decodedTx.hash,
						result: "pending",
						fee: decodedTx.fee,
						height: null,
						timestamp: null,
						messages: [
							{
								"@type": decodedTx.messageType,
								...decodedTx.messageValue,
							},
						],
					};
					txInfo = <TxInfo data={pendingData} />;
					txData = <TxData data={pendingData} />;
					break;
				}
			}
		}

		if (!hasPendingTransaction) {
			cleanUp();
			pendingRef.current = false;
			setPending(false);
		}
	}

	return (
		<>
			{titleSection}
			<Container fixed className={cx("tx")}>
				{txInfo}
				{txData}
			</Container>
		</>
	);
};

PendingTx.propTypes = {};

PendingTx.defaultProps = {};

export default PendingTx;
