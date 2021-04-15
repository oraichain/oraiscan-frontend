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
import TxInfo from "src/components/Tx/TxInfo";
import TxInfoSkeleton from "src/components/Tx/TxInfo/TxInfoSkeleton";
import TxData from "src/components/Tx/TxData";
import TxDataSkeleton from "src/components/Tx/TxData/TxDataSkeleton";
import styles from "./Tx.module.scss";

const cx = cn.bind(styles);

const Tx = () => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [pending, setPending] = useState(true);
	const params = useParams();
	const txHash = params?.["tx"];
	const pendingBasePath = `http://23.100.40.156:26657/unconfirmed_txs?limit=${consts.REQUEST.LIMIT}`;
	const restBasePath = `${consts.API.TX}/${txHash}`;

	let timerIdRef = useRef(null);
	let pendingDataRef = useRef(null);

	const cleanUp = () => {
		if (timerIdRef) {
			clearTimeout(timerIdRef.current);
		}
	};

	let path;
	if (pending) {
		path = pendingBasePath;
	} else {
		path = restBasePath;
	}

	const {data, loading, error, refetch} = useGet({
		path: path,
	});

	useEffect(() => {
		if (pending) {
			timerIdRef.current = setTimeout(() => {
				refetch();
			}, consts.REQUEST.TIMEOUT);
			return () => {
				cleanUp();
			};
		}
	});

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
		<TogglePageBar type='transactions' />
	);

	if (loading) {
		if (pendingDataRef.current) {
			txInfo = <TxInfo data={pendingDataRef.current} />;
			txData = <TxData data={pendingDataRef.current} />;
		} else {
			txInfo = <TxInfoSkeleton />;
			txData = <TxDataSkeleton />;
		}
	} else {
		if (error) {
			return <NotFound message={"Sorry! Tx Not Found"} />;
		} else {
			if (pending) {
				let hasPendingTransaction = false;

				if (Array.isArray(data?.result?.txs)) {
					for (let tx of data.result.txs) {
						const decodedTx = decodeTx(tx);

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
										type: decodedTx.messageType,
										value: decodedTx.messageValue,
									},
								],
							};
							pendingDataRef.current = pendingData;
							txInfo = <TxInfo data={pendingData} />;
							txData = <TxData data={pendingData} />;
							break;
						}
					}
				}

				if (!hasPendingTransaction) {
					txInfo = <TxInfoSkeleton />;
					txData = <TxDataSkeleton />;
					setPending(false);
				}
			} else {
				if (data?.height) {
					txInfo = <TxInfo data={data} />;
					txData = <TxData data={data} />;
				} else {
					txInfo = <NotFound message={"Sorry! Tx Not Found"} />;
				}
			}
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

Tx.propTypes = {};

Tx.defaultProps = {};

export default Tx;
