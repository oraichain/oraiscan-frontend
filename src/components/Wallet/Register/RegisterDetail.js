/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import cn from "classnames/bind";
import DelegatorCard from "src/components/Wallet/Register/DelegatorCard";
import YourValidatorCard from "src/components/Wallet/Register/YourValidatorCard";
import styles from "./Register.scss";

const cx = cn.bind(styles);

export default function({address, account}) {
	return (
		<>
			<YourValidatorCard address={address} />
			<DelegatorCard address={address} />
		</>
	);
}
