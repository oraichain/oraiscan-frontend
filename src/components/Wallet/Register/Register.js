/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import {FormControl, InputLabel, Input, Button, FormHelperText, Tooltip} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import cn from "classnames/bind";

import Keystation from "src/lib/Keystation";
import styles from "./Register.scss";

const cx = cn.bind(styles);

const errorMessage = {
	gasLimit: {
		required: "Gas limit is required",
	},
	gasPrice: {
		required: "Gas price is required",
	},
	name: {
		required: "Name is required",
	},
	commissionRate: {
		required: "Commission rate is required",
	},
	maxRate: {
		required: "Max rate is required",
	},
	maxChangeRate: {
		required: "max change rate is required",
	},
	delegationAmount: {
		required: "Your delegation amount is required",
	},
};

export default class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			gasLimit: "",
			gasLimitError: "",
			gasPrice: "",
			gasPriceError: "",
			name: "",
			nameError: "",
			commissionRate: "",
			commissionRateError: "",
			maxRate: "",
			maxRateError: "",
			maxChangeRate: "",
			maxChangeRateError: "",
			delegationAmount: "",
			delegationAmountError: "",
		};
	}

	onSubmit = () => {
		const {
			gasLimit,
			gasLimitError,
			gasPrice,
			gasPriceError,
			name,
			nameError,
			commissionRate,
			commissionRateError,
			maxRate,
			maxRateError,
			maxChangeRate,
			maxChangeRateError,
			delegationAmount,
			delegationAmountError,
		} = this.state;

		let error = false;
		["gasLimit", "gasPrice", "name", "commissionRate", "maxRate", "maxChangeRate", "delegationAmount"].forEach(i => {
			if (!this.state[i]) {
				const err = i + "Error";
				this.setState({
					[err]: errorMessage[i].required,
				});
				error = true;
			}
		});

		const {account, address} = this.props;

		const myKeystation = new Keystation({
			client: process.env.REACT_APP_WALLET_API,
			lcd: "https://lcd.orai.io",
			path: "44/118/0/0/0",
			keystationUrl: process.env.REACT_APP_WALLET_API,
		});

		const payload = {
			type: "cosmos-sdk/MsgCreateValidator",
			value: {
				msg: [
					{
						type: "cosmos-sdk/MsgCreateValidator",
						value: {
							commission: {
								max_change_rate: maxChangeRate,
								max_rate: maxRate,
								rate: commissionRate,
							},
							delegator_address: address,
							description: {
								details: "helloworld",
								identity: "node",
								moniker: name,
								security_contact: "efg",
								website: "xyx.com",
							},
							min_self_delegation: 100,
							pubkey: "oraivalconspub1addwnpepqw8jxdggysfhj42eh6vy3z28x2c9y4nwfnz7x9vnszwdtyjwkn5jc7ev2m0",
							validator_address: "oraivaloper1fl58xqkpn24v2jecpcdg2w29fndsulmne4vy5g",
							value: {
								denom: "orai",
								amount: parseFloat(delegationAmount) * 1000000,
							},
						},
					},
				],
				signatures: null,
			},
		};

		const popup = myKeystation.openWindow("transaction", payload, account);
		let popupTick = setInterval(function() {
			if (popup.closed) {
				clearInterval(popupTick);
			}
		}, 500);
	};

	onChange = e => {
		const {id, value} = e.target;
		const error = id + "Error";
		this.setState({
			[id]: value,
			[error]: value ? "" : errorMessage[id].required,
		});
	};

	render() {
		const {
			gasLimit,
			gasLimitError,
			gasPrice,
			gasPriceError,
			name,
			nameError,
			commissionRate,
			commissionRateError,
			maxRate,
			maxRateError,
			maxChangeRate,
			maxChangeRateError,
			delegationAmount,
			delegationAmountError,
		} = this.state;

		return (
			<div className={cx("Register")}>
				<div className={cx("title")}>Register to become a validator</div>
				<form noValidate autoComplete='off'>
					<Grid container spacing={3} className={cx("row")}>
						<Grid item>
							<InputLabel
								className={cx("MuiFormLabel-root")}
								required={true}
								htmlFor='gasLimit'
								classes={{
									asterisk: styles.asterisk,
								}}>
								Gas limit
							</InputLabel>
							<Input
								value={gasLimit}
								onChange={e => this.onChange(e)}
								className={cx("MuiInputBase-root")}
								id='gasLimit'
								disableUnderline={true}
								required={true}
								placeholder='Ex: 5,000,000'
							/>
							{gasLimitError && (
								<FormHelperText error className={cx("error")}>
									{gasLimitError}
								</FormHelperText>
							)}
						</Grid>
						<Grid item>
							<InputLabel
								className={cx("MuiFormLabel-root")}
								required={true}
								htmlFor='gasPrice'
								classes={{
									asterisk: styles.asterisk,
								}}>
								Gas price
							</InputLabel>
							<Input
								value={gasPrice}
								onChange={e => this.onChange(e)}
								className={cx("MuiInputBase-root")}
								id='gasPrice'
								disableUnderline={true}
								required={true}
								placeholder='Ex: 100'
							/>
							{gasPriceError && (
								<FormHelperText error className={cx("error")}>
									{gasPriceError}
								</FormHelperText>
							)}
						</Grid>
					</Grid>
					<Grid container className={cx("row")}>
						<Grid item>
							<InputLabel
								className={cx("MuiFormLabel-root")}
								required={true}
								htmlFor='name'
								classes={{
									asterisk: styles.asterisk,
								}}>
								Name
							</InputLabel>
							<Input
								value={name}
								onChange={e => this.onChange(e)}
								className={cx("MuiInputBase-root")}
								id='name'
								disableUnderline={true}
								required={true}
								placeholder='Ex: My validator'
							/>
							{nameError && (
								<FormHelperText error className={cx("error")}>
									{nameError}
								</FormHelperText>
							)}
						</Grid>
					</Grid>
					<Grid container spacing={3} className={cx("row")}>
						<Grid item>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									marginBottom: 10,
								}}>
								<InputLabel
									style={{
										margin: 0,
									}}
									className={cx("MuiFormLabel-root")}
									required={true}
									htmlFor='commissionRate'
									classes={{
										asterisk: styles.asterisk,
									}}>
									Commission Rate (%)
								</InputLabel>
								<Tooltip title='lorem' placement='top'>
									<img src={require("../../../assets/wallet/info.svg")} />
								</Tooltip>
							</div>
							<Input
								value={commissionRate}
								onChange={e => this.onChange(e)}
								className={cx("MuiInputBase-root")}
								id='commissionRate'
								disableUnderline={true}
								required={true}
								placeholder='Ex: 10'
							/>
							{commissionRateError && (
								<FormHelperText error className={cx("error")}>
									{commissionRateError}
								</FormHelperText>
							)}
						</Grid>
						<Grid item>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									marginBottom: 10,
								}}>
								<InputLabel
									style={{
										margin: 0,
									}}
									className={cx("MuiFormLabel-root")}
									required={true}
									htmlFor='maxRate'
									classes={{
										asterisk: styles.asterisk,
									}}>
									Max Rate (%)
								</InputLabel>
								<Tooltip title='lorem' placement='top'>
									<img src={require("../../../assets/wallet/info.svg")} />
								</Tooltip>
							</div>
							<Input
								value={maxRate}
								onChange={e => this.onChange(e)}
								className={cx("MuiInputBase-root")}
								id='maxRate'
								disableUnderline={true}
								required={true}
								placeholder='Ex: 20'
							/>
							{maxRateError && (
								<FormHelperText error className={cx("error")}>
									{maxRateError}
								</FormHelperText>
							)}
						</Grid>
					</Grid>
					<Grid container className={cx("row")}>
						<Grid item>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									marginBottom: 10,
								}}>
								<InputLabel
									style={{
										margin: 0,
									}}
									className={cx("MuiFormLabel-root")}
									required={true}
									htmlFor='maxChangeRate'
									classes={{
										asterisk: styles.asterisk,
									}}>
									Max Change Rate (%)
								</InputLabel>
								<Tooltip title='lorem' placement='top'>
									<img src={require("../../../assets/wallet/info.svg")} />
								</Tooltip>
							</div>
							<Input
								value={maxChangeRate}
								onChange={e => this.onChange(e)}
								className={cx("MuiInputBase-root")}
								id='maxChangeRate'
								disableUnderline={true}
								required={true}
								placeholder='Ex: 30'
							/>
							{maxChangeRateError && (
								<FormHelperText error className={cx("error")}>
									{maxChangeRateError}
								</FormHelperText>
							)}
						</Grid>
					</Grid>
					<Grid container className={cx("row")}>
						<Grid item>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									marginBottom: 10,
								}}>
								<InputLabel
									className={cx("MuiFormLabel-root")}
									style={{
										margin: 0,
									}}
									required={true}
									htmlFor='delegationAmount'
									classes={{
										asterisk: styles.asterisk,
									}}>
									Your Delegation Amount (%)
								</InputLabel>
								<Tooltip title='lorem' placement='top'>
									<img src={require("../../../assets/wallet/info.svg")} />
								</Tooltip>
							</div>
							<Input
								value={delegationAmount}
								onChange={e => this.onChange(e)}
								className={cx("MuiInputBase-root")}
								id='delegationAmount'
								disableUnderline={true}
								required={true}
								placeholder='Ex: 25,000'
							/>
							{delegationAmountError && (
								<FormHelperText error className={cx("error")}>
									{delegationAmountError}
								</FormHelperText>
							)}
						</Grid>
					</Grid>
					<Button className={cx("MuiButton-root")} onClick={this.onSubmit}>
						Next
					</Button>
				</form>
			</div>
		);
	}
}
