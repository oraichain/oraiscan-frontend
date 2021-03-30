/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import {FormControl, InputLabel, Input, Button, FormHelperText, Tooltip} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import cn from "classnames/bind";
import {useForm, FormProvider} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import * as bech32 from "bech32-buffer";

import {InputNumberFormat, TextArea, InputTextWithIcon, InputText} from "src/components/common/form-controls";
import {myKeystation} from "src/lib/Keystation";
import styles from "./Register.scss";

const cx = cn.bind(styles);

const validationSchemaForm = yup.object().shape({
	name: yup.string().required("Name is Required"),
	identity: yup.string().required("Identity is Required"),
	commissionRate: yup.number().required("Commission Rate is Required"),
	maxRate: yup.number().required("Max Rate is Required"),
	maxChangeRate: yup.number().required("Max Change Rate is Required"),
	delegationAmount: yup.number().required("Your Delegation Amount is Required"),
	minSelfDelegation: yup.number().required("Min Self Delegation is Required"),
});

export default function({address, account}) {
	const {data} = bech32.decode(address);
	const validatorAddress = bech32.encode("oraivaloper", data);
	const methods = useForm({
		resolver: yupResolver(validationSchemaForm),
	});

	const {handleSubmit, errors, register, setValue, getValues} = methods;

	const onSubmit = data => {
		const {maxChangeRate, maxRate, commissionRate, name, details, identity, securityContact, website, minSelfDelegation, delegationAmount} = data;

		const payload = {
			type: "cosmos-sdk/MsgCreateValidator",
			value: {
				msg: [
					{
						type: "cosmos-sdk/MsgCreateValidator",
						value: {
							commission: {
								max_change_rate: maxChangeRate / 100 + "",
								max_rate: maxRate / 100 + "",
								rate: commissionRate / 100 + "",
							},
							delegator_address: address,
							description: {
								details,
								identity,
								moniker: name,
								security_contact: securityContact,
								website,
							},
							min_self_delegation: minSelfDelegation + "",
							pubkey: "oraivalconspub1addwnpepq2nrd82mxjk5wed8e9v07ha9alkkanek67c03s9kcddv4zst3mh3v276fpw",
							validator_address: validatorAddress,
							value: {
								denom: "orai",
								amount: delegationAmount * 1000000 + "",
							},
						},
					},
				],
				fee: {
					amount: [0],
					gas: "200000",
				},
				signatures: null,
				memo: data.memo || "",
			},
		};

		const popup = myKeystation.openWindow("transaction", payload, account);
		let popupTick = setInterval(function() {
			if (popup.closed) {
				clearInterval(popupTick);
			}
		}, 500);
	};

	return (
		<div className={cx("Register")}>
			<div className={cx("title")}>Register to become a validator</div>
			<FormProvider {...methods}>
				<form className={cx("form-dialog")}>
					<Grid container spacing={2}>
						<Grid container item md={4} sm={12}>
							<InputText name='name' label='Name' required errorobj={errors} classNameCustom={cx("input-text")} placeholder='Ex: My validator' />
						</Grid>
						<Grid container item md={4} sm={12}>
							<InputText name='identity' label='Identity' required errorobj={errors} classNameCustom={cx("input-text")} placeholder='Ex: identity_info_001' />
						</Grid>
					</Grid>
					<Grid container spacing={2} className={cx("grid")}>
						<Grid container item md={4} sm={12}>
							<InputText name='commissionRate' label='Commission Rate (%)' required errorobj={errors} classNameCustom={cx("input-text")} placeholder='Ex: 10' />
						</Grid>
						<Grid container item md={4} sm={12}>
							<InputText name='maxRate' label='Max Rate (%)' required errorobj={errors} classNameCustom={cx("input-text")} placeholder='Ex: 20' />
						</Grid>
						<Grid container item md={4} sm={12}>
							<InputText name='maxChangeRate' label='Max Change Rate (%)' required errorobj={errors} classNameCustom={cx("input-text")} placeholder='Ex: 30' />
						</Grid>
					</Grid>
					<Grid container spacing={2} className={cx("grid")}>
						<Grid container item md={4} sm={12}>
							<InputText
								name='delegationAmount'
								label='Your Delegation Amount'
								required
								errorobj={errors}
								classNameCustom={cx("input-text")}
								placeholder='Ex: 25,000'
							/>
						</Grid>
						<Grid container item md={4} sm={12}>
							<InputText
								name='minSelfDelegation'
								label='Min Self Delegation'
								required
								errorobj={errors}
								classNameCustom={cx("input-text")}
								placeholder='Ex: 25,000'
							/>
						</Grid>
					</Grid>
					<Grid container spacing={2} className={cx("grid")}>
						<Grid container item md={4} sm={12}>
							<InputText name='website' label='Website' errorobj={errors} classNameCustom={cx("input-text")} placeholder='Ex: xyz.com' />
						</Grid>
						<Grid container item md={4} sm={12}>
							<InputText
								name='securityContact'
								label='Security Contact'
								errorobj={errors}
								classNameCustom={cx("input-text")}
								placeholder='Ex: security_address_001'
							/>
						</Grid>
						<Grid container item md={4} sm={12}>
							<InputText name='details' label='Details' errorobj={errors} classNameCustom={cx("input-text")} placeholder='Ex: demo_details' />
						</Grid>
					</Grid>
				</form>
			</FormProvider>
			<Button className={cx("MuiButton-root")} onClick={handleSubmit(onSubmit)}>
				Next
			</Button>
		</div>
	);
}
