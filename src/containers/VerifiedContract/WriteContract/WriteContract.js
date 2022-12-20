import React, { memo } from "react";
import classNames from "classnames/bind";
import styles from "./WriteContract.module.scss";
import TransactionsIcon from "src/icons/Tabs/TransactionsTabIcon";
import HeaderContract from "../HeaderContract";
import CopyVerifiedIcon from "src/icons/CopyContractIcon";
import DownArrowIcon from "src/icons/DownArrowIcon";
import { InputNumberOrai, TextArea, InputTextWithIcon } from "src/components/common/form-controls";
import { Button, Grid, InputBase } from "@material-ui/core";
import VectorIcon from 'src/icons/VectorIcon';
import {  useSelector } from "react-redux";
const cx = classNames.bind(styles);

const ItemContract = ({ label, amount, type }) => {
	return (
		<div className={cx("items")} >
			<div className={cx("header")} >
				<div className={cx("label")}>{label}</div>
				<div className={cx("icon")}>
					<CopyVerifiedIcon className={cx('link')} />
					<div style={{ width: 16 }} />
					<DownArrowIcon className={cx('link')} />
				</div>
			</div>
			<div className={cx("value")}>
				<span className={cx("amount")}>{amount} </span>
				<span className={cx("type")}>{type}</span>
			</div>
		</div>
	);
};

const Allowance = ({ label, onClick, owner, setOwner, spender, setSpender }) => {
	return (
		<div className={cx("items")} >
			<div className={cx("header")} >
				<div className={cx("label")}>{label}</div>
				<div className={cx("icon")}>
					<CopyVerifiedIcon className={cx('link')} />
					<div style={{ width: 16 }} />
					<DownArrowIcon className={cx('link')} />
				</div>
			</div>
			<div className={cx("value")}>
				<div className={cx("label-contract")}>owner (address)</div>
				<div className={cx("input")}>
					<input type='text' className={cx("text-field")} placeholder={''} value={owner} readOnly={false} onChange={setOwner} />
				</div>
				<div className={cx("label-contract")}>spender (address)</div>
				<div className={cx("input")}>
					<input type='text' className={cx("text-field")} placeholder={''} value={spender} readOnly={false} onChange={setSpender} />
				</div>
				<div className={cx("btn")}>
					<Button variant='contained' onClick={onClick}>
						Query
					</Button>
				</div>

				<div className={cx("vector")}>
					<VectorIcon />
					<span className={cx("type")}>uint256</span>
				</div>
			</div>
		</div>
	)
}

const WriteContract = memo(() => {
	// @ts-ignore
	const { address } = useSelector(state => state.wallet);
	return (
		<div className={cx("readcontract")}>
			<HeaderContract icon={<></>} label={address ? "Connect to web3" : "Connect to wallet"}/>
			<div style={{ height: 16 }} />
			<ItemContract label={"1.  _maxTxAmount"} type={"uint256"} amount={"10000000000000"} />
			<ItemContract label={"2.  _maxWalletSize"} type={"uint256"} amount={"10000000000000"} />
			<Allowance label={"3.  allowance"} onClick={undefined} owner={undefined} setOwner={undefined} spender={undefined} setSpender={undefined} />
		</div>
	);
});

export default WriteContract;
