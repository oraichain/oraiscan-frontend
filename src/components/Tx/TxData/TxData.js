import * as React from "react";
import cn from "classnames/bind";
import PropTypes from "prop-types";
import { _ } from "src/lib/scripts";
import TxMessage from "./TxMessage";
import styles from "./TxData.module.scss";

const cx = cn.bind(styles);

const TxData = ({ data }) => {
	return (
		<div className={cx("card")}>
			<div className={cx("card-header")}>Msgs</div>
			<div className={cx("card-body")}>
				{_.map(data.messages, (v, i) => {
					console.log("data value: ", v);
					return (
						<TxMessage key={i} msg={v} data={data} />
					)
				})}
			</div>
		</div>
	);
};

TxData.propTypes = {
	data: PropTypes.any,
};

TxData.defaultProps = {};

export default TxData;
