/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import cn from "classnames/bind";
import { useSelector } from "react-redux";
import { useGet } from "restful-react";
import { _ } from "src/lib/scripts";
import consts from "src/constants/consts";
import DelegatedClaim from "src/components/DelegatedValidator/DelegatedClaim";
import DelegatedWithdraw from "src/components/DelegatedValidator/DelegatedWithdraw";
import styles from "./DelegatedValidator.module.scss";

const cx = cn.bind(styles);

export default function(props) {
	const [activeTab, setActiveTab] = React.useState(0);
	const { address } = useSelector(state => state.wallet);
	const path = consts.API.VALIDATOR + "/" + address;
	const { data } = useGet({
		path: path,
	});

	return (
		<div className={cx("")}>
			<div className={cx("DelegatedValidator")}>
				<DelegatedClaim setActiveTab={setActiveTab} address={address} />
			</div>
			<div className={cx("DelegatedValidator")}>
				<DelegatedWithdraw setActiveTab={setActiveTab} address={address} />
			</div>
		</div>
	);
}
