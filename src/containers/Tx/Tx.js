/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from "react";
import {useParams} from "react-router-dom";
import PendingTx from "./PendingTx";
import SuccessTx from "./SuccessTx";

const Tx = () => {
	const [pending, setPending] = useState(true);
	const params = useParams();
	const txHash = params?.["tx"];

	useEffect(() => {
		setPending(true);
	}, [txHash])

	if (pending) {
		return <PendingTx setPending={setPending} pending={pending} />;
	}

	return <SuccessTx />;
};

Tx.propTypes = {};

Tx.defaultProps = {};

export default Tx;
