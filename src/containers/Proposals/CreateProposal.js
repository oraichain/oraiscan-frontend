import {ErrorMessage} from "@hookform/error-message";
import {yupResolver} from "@hookform/resolvers/yup";
import Dialog from "@material-ui/core/Dialog";
import {notification} from "antd";
import BigNumber from "bignumber.js";
import draftToHtml from "draftjs-to-html";
import {useEffect, useState} from "react";
import {Editor} from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {Controller, useForm} from "react-hook-form";
import {ReactComponent as CloseIcon} from "src/assets/icons/close.svg";
import SelectBox from "src/components/common/SelectBox";
import consts from "src/constants/consts";
import {handleTransactionResponse} from "src/helpers/transaction";
import AddIcon from "src/icons/AddIcon";
import {ORAI} from "src/lib/config/constants";
import {walletStation} from "src/lib/walletStation";
import {defaultValues, fields, votingFields} from "./constant";
import * as yup from "yup";
import moment from "moment";
import {useSelector} from "react-redux";
import cn from "classnames/bind";
import styles from "./Proposals.module.scss";
import LoadingOverlay from "src/components/common/LoadingOverlay";
import {handleErrorMessage} from "src/lib/scripts";
import {useHistory} from "react-router-dom";

const cx = cn.bind(styles);

const {
	PROPOSALS_OPTIONS: { UNBONDING_TIME, VOTING_PERIOD, COMMUNITY_TAX, INFLATION_MIN, INFLATION_MAX, TEXT_PROPOSAL, DEPOSIT_PARAMS, UPDATE_ADMIN_PROPOSAL },
	VOTING_PERIOD_OPTIONS: { VOTING_DAY, VOTING_TIME },
} = consts;

const schema = yup.object().shape({
	title: yup.string().required("The Title is required"),
	description: yup.mixed().required("The Description is required"),
	amount: yup.number().required("The Amount is required"),
	voting_period_day: yup
		.number()
		.transform(value => (isNaN(value) ? -1 : value))
		.min(1, "Min value is 1 day")
		.notRequired(),
	voting_period_time: yup.string().when("voting_period_day", {
		is: val => val === undefined,
		then: yup
			.string()
			.test("is-greater", "Min value is 1 hour", function (value) {
				const defaultTime = "01:00:00";
				return moment(value || defaultTime, "HH:mm:ss").isSameOrAfter(moment(defaultTime, "HH:mm:ss"));
			})
			.notRequired(),
		otherwise: yup.string().notRequired(),
	}),
	unbondingTime: yup.string(),
	newadmin: yup.string(),
	contract: yup.string(),
	min_deposit: yup.number().notRequired(),
	communitytax: yup
		.number()
		.transform(value => (isNaN(value) ? -1 : value))
		.max(100, "Max value is 100%")
		.min(0, "Min value is 0%"),
	InflationMin: yup
		.number()
		.transform(value => (isNaN(value) ? -1 : value))
		.max(100, "Max value is 100%")
		.min(0, "Min value is 0%"),
	InflationMax: yup
		.number()
		.transform(value => (isNaN(value) ? -1 : value))
		.max(100, "Max value is 100%")
		.min(0, "Min value is 0%"),
});
export default function CreateProposal() {
	const [open, setOpen] = useState(false);
	const [loadingTransaction, setLoadingTransaction] = useState(false);
	const [fieldValue, setFieldValue] = useState(UNBONDING_TIME);
	const { address } = useSelector(state => state.wallet);
	const [votingValue, setVotingValue] = useState(VOTING_DAY);
	const history = useHistory();

	const {
		handleSubmit,
		register,
		control,
		formState: { errors },
		clearErrors
	} = useForm({ defaultValues, resolver: yupResolver(schema) });

	useEffect(() => {
		if (fieldValue) {
			clearErrors();
		}
	}, [fieldValue]);



	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleVotingPeriod = value => {
		if (value === VOTING_DAY) {
			return (
				<Controller
					as={<input type='number' step='any' className={cx("text-field", "field-voting-input")} />}
					name={VOTING_DAY}
					control={control}
					ref={register}
				/>
			);
		}
		return (
			<Controller
				as={<input type='time' step='1' className={cx("text-field", "field-voting-input", "without_ampm")} />}
				name={VOTING_TIME}
				control={control}
			/>
		);
	};

	const hmsToMiliSeconds = times => {
		const hmsArr = times.split(":");
		const seconds = +hmsArr[0] * 60 * 60 + +hmsArr[1] * 60 + +hmsArr[2];
		return new BigNumber(seconds).multipliedBy(new BigNumber(Math.pow(10, 9))).toFixed(0);
	};

	const handleDayTimePeriod = (days, times) => {
		if (days) {
			return new BigNumber(Math.round(days * 24 * 60 * 60)).multipliedBy(new BigNumber(Math.pow(10, 9))).toFixed(0);
		}
		return hmsToMiliSeconds(times);
	};

	const handleOptionData = data => {
		data.amount *= 10 ** 6;
		switch (fieldValue) {
			case VOTING_PERIOD:
				const { voting_period_day: days, voting_period_time: times } = data;
				return {
					...data,
					subspace: "gov",
					key: VOTING_PERIOD,
					value: JSON.stringify({
						voting_period: handleDayTimePeriod(days, times),
					}),
				};
			case DEPOSIT_PARAMS:
				return {
					...data,
					subspace: "gov",
					key: DEPOSIT_PARAMS,
					value: JSON.stringify({
						min_deposit: [{ denom: ORAI, amount: (data.min_deposit * 10 ** 6).toString() }],
					}),
				};
			case COMMUNITY_TAX:
				return {
					...data,
					subspace: "distribution",
					key: COMMUNITY_TAX,
					value: JSON.stringify(JSON.stringify(data?.communitytax / 100)),
				};
			case INFLATION_MIN:
				return {
					...data,
					subspace: "mint",
					key: INFLATION_MIN,
					value: JSON.stringify(JSON.stringify(data?.InflationMin / 100)),
				};
			case INFLATION_MAX:
				return {
					...data,
					subspace: "mint",
					key: INFLATION_MAX,
					value: JSON.stringify(JSON.stringify(data?.InflationMax / 100)),
				};
			case TEXT_PROPOSAL:
				return {
					...data,
					key: TEXT_PROPOSAL,
				};
			case UPDATE_ADMIN_PROPOSAL:
				return {
					...data,
					key: UPDATE_ADMIN_PROPOSAL,
				};
			default:
				return {
					...data,
					subspace: "staking",
					key: UNBONDING_TIME,
					value: JSON.stringify(new BigNumber(+data?.unbondingTime * Math.pow(10, 9)).toFixed(0))
				};
		}
	};

	const onSubmit = async data => {
		try {
			setLoadingTransaction(true);
			const newData = handleOptionData(data);
			const { title, description, subspace, key, value, amount, newadmin, contract } = newData;
			var response;
			if (key === TEXT_PROPOSAL) {
				response = await walletStation.textProposal(address, amount, {
					title: title,
					description: draftToHtml(description),
				});
			} else if (key == UPDATE_ADMIN_PROPOSAL) {
				response = await walletStation.updateAdminProposal(address, amount, {
					title: title,
					description: draftToHtml(description).trim(),
					newAdmin: newadmin,
					contract: contract,
				});
			} else {
				response = await walletStation.parameterChangeProposal(address, amount, {
					title: title,
					description: draftToHtml(description),
					changes: [
						{
							subspace,
							key,
							value,
						},
					],
					amount,
				});
			}
			handleTransactionResponse(response, notification, history, setLoadingTransaction);
		} catch (error) {
			console.log("error: ", error);
			setLoadingTransaction(false);
			notification.error({ message: handleErrorMessage(error) });
			console.log(error);
		}
	};

  return (
    <div>
        <div className={cx("create-button")} onClick={handleOpen}>
			<span className={cx("create-button-text")}>Create Proposal</span>
			<AddIcon className={cx("create-button-icon")} />
		</div>
        <Dialog open={open} maxWidth='sm' fullWidth={true} aria-labelledby='create-proposal-dialog' onClose={handleClose}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={cx("dialog-header")}>
						<div className={cx("close-button")} onClick={handleClose}>
							<CloseIcon />
						</div>
					</div>
					<div className={cx("dialog-body")}>
						<div className={cx("field")}>
							<SelectBox value={fieldValue} data={fields} onChange={setFieldValue} />
						</div>
						<div className={cx("field")}>
							<label className={cx("label")} htmlFor='title'>
								Title
							</label>
							<input type='text' className={cx("text-field")} name='title' ref={register} />
							<ErrorMessage errors={errors} name='title' render={({ message }) => <p className={cx("error-message")}>{message}</p>} />
						</div>

						<div className={cx("field")}>
							<label className={cx("label")} htmlFor='description'>
								Description
							</label>
							<div className={cx("editor-wrapper")}>
								<Controller
									name='description'
									control={control}
									render={props => (
										<Editor
											{...props}
											onEditorStateChange={editorState => {
												if (editorState.blocks) {
													props.onChange(editorState.blocks[0]);
												}
											}}
										/>
									)}
								/>
							</div>
							<ErrorMessage errors={errors} name='description' render={({ message }) => <p className={cx("error-message")}>{message}</p>} />
						</div>

						<div className={cx("field")}>
							<label className={cx("label")} htmlFor='amount'>
								Deposit Amount (ORAI)
							</label>
							<input type='number' step={0.00000001} className={cx("text-field")} name='amount' ref={register} />
							<ErrorMessage errors={errors} name='amount' render={({ message }) => <p className={cx("error-message")}>{message}</p>} />
						</div>

						{fieldValue === UNBONDING_TIME && (
							<>
								<div className={cx("field")}>
									<label className={cx("label")} htmlFor='unbondingTime'>
										Unbonding time
									</label>
									<input type='number' className={cx("text-field")} name='unbondingTime' ref={register} />
									<ErrorMessage errors={errors} name='unbondingTime' render={({ message }) => <p className={cx("error-message")}>{message}</p>} />
								</div>
							</>
						)}

						{fieldValue === DEPOSIT_PARAMS && (
							<>
								<div className={cx("field")}>
									<label className={cx("label")} htmlFor='min_deposit'>
										Minimum Deposit Amount {`(${ORAI.toUpperCase()}`}
									</label>
									<input type='number' className={cx("text-field")} name='min_deposit' ref={register} />
									<ErrorMessage errors={errors} name='min_deposit' render={({ message }) => <p className={cx("error-message")}>{message}</p>} />
								</div>
							</>
						)}

						{fieldValue === VOTING_PERIOD && (
							<div className={cx("field")}>
								<label className={cx("label")} htmlFor='voting_period'>
									Voting Period
								</label>
								<div className={cx("field-voting")}>
									<SelectBox value={votingValue} data={votingFields} onChange={setVotingValue} />
									{handleVotingPeriod(votingValue)}
								</div>
								<div className={cx("vme")}>
									<div className={cx("vme-hidden")}></div>
									<ErrorMessage errors={errors} name={votingValue} render={({ message }) => <p className={cx("error-message", "vme-text")}>{message}</p>} />
								</div>
							</div>
						)}

						{fieldValue === UPDATE_ADMIN_PROPOSAL && (
							<div className={cx("field")}>
								<label className={cx("label")} htmlFor='newadmin'>
									New Admin
								</label>
								<input type='string' step='any' className={cx("text-field")} name='newadmin' ref={register} />
								<ErrorMessage errors={errors} name='newadmin' render={({ message }) => <p className={cx("error-message")}>{message}</p>} />
							</div>
						)}

						{fieldValue === UPDATE_ADMIN_PROPOSAL && (
							<div className={cx("field")}>
								<label className={cx("label")} htmlFor='contract'>
									Contract
								</label>
								<input type='string' step='any' className={cx("text-field")} name='contract' ref={register} />
								<ErrorMessage errors={errors} name='contract' render={({ message }) => <p className={cx("error-message")}>{message}</p>} />
							</div>
						)}

						{fieldValue === COMMUNITY_TAX && (
							<div className={cx("field")}>
								<label className={cx("label")} htmlFor='communitytax'>
									Community Tax (%)
								</label>
								<input type='number' step='any' className={cx("text-field")} name='communitytax' ref={register} />
								<ErrorMessage errors={errors} name='communitytax' render={({ message }) => <p className={cx("error-message")}>{message}</p>} />
							</div>
						)}

						{fieldValue === INFLATION_MIN && (
							<div className={cx("field")}>
								<label className={cx("label")} htmlFor='InflationMin'>
									Minimum Inflation (%)
								</label>
								<input type='number' step='any' className={cx("text-field")} name='InflationMin' ref={register} />
								<ErrorMessage errors={errors} name='InflationMin' render={({ message }) => <p className={cx("error-message")}>{message}</p>} />
							</div>
						)}

						{fieldValue === INFLATION_MAX && (
							<div className={cx("field")}>
								<label className={cx("label")} htmlFor='InflationMax'>
									Maximum Inflation (%)
								</label>
								<input type='number' step='any' className={cx("text-field")} name='InflationMax' ref={register} />
								<ErrorMessage errors={errors} name='InflationMax' render={({ message }) => <p className={cx("error-message")}>{message}</p>} />
							</div>
						)}

						<div className={cx("field")}>
							<label className={cx("label")}>Notes </label>
							If the proposal cannot pass the deposit period, then all the deposited tokens will be burned. So please create & choose the proposals wisely!
						</div>
					</div>

					<div className={cx("dialog-footer")}>
						<button type='submit' className={cx("submit-button")}>
							<span className={cx("submit-button-text")}>Create</span>
						</button>
					</div>
				</form>
			</Dialog>
			{loadingTransaction && <LoadingOverlay />}
    </div>
  )
}
