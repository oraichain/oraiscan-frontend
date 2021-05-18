/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from "react";
import PendingTx from "./PendingTx";
import SuccessTx from "./SuccessTx";

const Tx = () => {
	const [pending, setPending] = useState(true);

	if (pending) {
		return <PendingTx setPending={setPending} />;
	}

	return <SuccessTx />;
};

Tx.propTypes = {};

Tx.defaultProps = {};

export default Tx;
