import * as React from "react";
import cn from "classnames/bind";
import {_} from "src/lib/scripts";
import TxMessage from "./TxMessage";
import styles from "./TxData.scss";

export default function({txData}) {
	const cx = cn.bind(styles);
	return (
		<div className={cx("MsgList-wrapper")}>
			<h2 className={cx("title")}>Msgs</h2>
			{_.map(txData.messages, (v, i) => (
				<TxMessage key={i} msg={v} txData={txData} />
			))}
		</div>
	);
}
