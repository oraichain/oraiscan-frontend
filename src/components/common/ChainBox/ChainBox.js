/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useState, useRef, useEffect } from "react";
// import {useGet} from "restful-react";
import classNames from "classnames/bind";
// import {useDispatch} from "react-redux";

// import consts from "src/constants/consts";
// import {formatInteger, formatFloat, formatOrai} from "src/helpers/helper";
// import {setStatusBox} from "src/store/modules/blockchain";
import { formatNumber } from "src/helpers/helper";

import styles from "./ChainBox.scss";

const ChainBox = memo(({ chainValue }) => {
	const cx = classNames.bind(styles);

	return (
		<div className={cx("status-box")}>
			<div className={cx("status-box-item")}>
				<span className={cx("status-label")}>Oraichain Total Value: </span>
				<span className={cx("status-value")}>$ {formatNumber(+chainValue, 2)}</span>
			</div>
		</div>
	);
});

export default ChainBox;
