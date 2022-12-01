// @ts-nocheck
import React, { memo, useState, useEffect, useMemo, useCallback, useReducer, useRef } from "react";
import cn from "classnames/bind";
import { useForm, FormProvider } from "react-hook-form";
import { withStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { Divider, Input, notification, Spin } from "antd";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import _ from "lodash";
import BigNumber from "bignumber.js";

import { InputNumberOrai } from "src/components/common/form-controls";
import LoadingOverlay from "src/components/common/LoadingOverlay";
import { Fee, Gas } from "src/components/common/Fee";
import { ReactComponent as ExchangeIconGrey } from "src/assets/icons/exchange-grey.svg";
import consts from "src/constants/consts";
import { useFetch } from "src/hooks";
import styles from "./ProposalModal.module.scss";
import Long from "long";
import axios from "axios";
import DownAngleIcon from "src/icons/DownAngleIcon";
import { walletStation } from "src/lib/walletStation";
import { useHistory } from "react-router-dom";
import { handleTransactionResponse } from "src/helpers/transaction";
import { handleErrorMessage } from "../../lib/scripts";

const cx = cn.bind(styles);

const DialogContent = withStyles(theme => ({
	root: {
		padding: "0 30px",
	},
	"root:fist-child": {
		"padding-top": "0",
	},
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
	root: {
		margin: 0,
		padding: theme.spacing(1),
	},
}))(MuiDialogActions);

const ProposalVoteModal = memo(({ open, onClose, data }) => {
	const history = useHistory();
	const { address, account } = useSelector(state => state.wallet);
	const minFee = useSelector(state => state.blockchain.minFee);
	const [fee, setFee] = useState(0);
	const [gas, setGas] = useState(200000);
	const [loadingTransaction, setLoadingTransaction] = useState(false);
	const dropDownRef = useRef(null);
	const [voteField, setVoteOption] = useState("Yes");
	const selectedItemRef = useRef(null);
	const listRef = useRef(null);
	const [errorMessage, setErrorMessage] = useState("");

	const field = {
		Yes: "VOTE_OPTION_YES",
		Abstain: "VOTE_OPTION_ABSTAIN",
		No: "VOTE_OPTION_NO",
		"No with veto": "VOTE_OPTION_NO_WITH_VETO",
	};

	const objectField = {
		VOTE_OPTION_YES: "Yes",
		ABSTAIN: "Abstain",
		NO: "No",
		NO_WITH_VETO: "No with veto",
	};

	const showList = () => {
		if (!_.isNil(listRef.current)) {
			listRef.current.style.display = "block";
		}
	};

	const hideList = () => {
		if (!_.isNil(listRef.current)) {
			listRef.current.style.display = "none";
		}
	};

	const clickListener = event => {
		// console.log("event target: ", event.target);
		// console.log("selected item ref: ", selectedItemRef);
		if (event.target.hasAttribute("vote-option")) {
			setVoteOption(event.target.getAttribute("vote-option"));
			hideList();
			return;
		}

		if (selectedItemRef?.current?.contains?.(event?.target)) {
			if (listRef?.current?.style?.display === "block") {
				hideList();
			} else {
				showList();
			}
			return;
		}

		if (!_.isNil(listRef.current) && !listRef?.current?.contains?.(event?.target)) {
			hideList();
		}
	};

	const handleClose = () => {
		setErrorMessage("");
		onClose();
	};

	useEffect(() => {
		document.addEventListener("click", clickListener, true);

		return () => {
			document.removeEventListener("click", clickListener);
		};
	}, []);

	// TODO: DEPOSIT & VOTING
	const onVote = async () => {
		// can only vote if use has logged in
		try {
			if (address) {
				// VOTE_OPTION_UNSPECIFIED = 0,
				// /** VOTE_OPTION_YES - VOTE_OPTION_YES defines a yes vote option. */
				// VOTE_OPTION_YES = 1,
				// /** VOTE_OPTION_ABSTAIN - VOTE_OPTION_ABSTAIN defines an abstain vote option. */
				// VOTE_OPTION_ABSTAIN = 2,
				// /** VOTE_OPTION_NO - VOTE_OPTION_NO defines a no vote option. */
				// VOTE_OPTION_NO = 3,
				// /** VOTE_OPTION_NO_WITH_VETO - VOTE_OPTION_NO_WITH_VETO defines a no with veto vote option. */
				// VOTE_OPTION_NO_WITH_VETO = 4,
				// UNRECOGNIZED = -1
				setLoadingTransaction(true);
				console.log("vote option: ", voteField);
				let option = 1;
				switch (voteField) {
					case "Abstain":
						option = 2
						break;
					case "No":
						option = 3
						break;
					case "No with veto":
						option = 4
						break;
				}
				const response = await walletStation.vote(new Long(data.proposal_id), address, option);
				console.log("Result vote: ", response);
				handleTransactionResponse(response, notification, history, setLoadingTransaction);
			} else {
				// TODO: show error here
				setErrorMessage("You must log in first to vote for the proposal");
			}
		} catch (error) {
			setLoadingTransaction(false);
			notification.error({ message: handleErrorMessage(error) });
			console.log(error);
		}
	};

	useEffect(() => {
		const callBack = function (e) {
			if (e && e.data === "deny") {
				return onClose();
			}
			if (e?.data?.txhash) {
				onClose();
			}
		};
		window.addEventListener("message", callBack, false);
		return () => {
			window.removeEventListener("message", callBack);
		};
	}, []);

	const render = () => {
		return (
			<form>
				<DialogContent>
					<div className={cx("deposit-title")}> Vote for proposal id {data.proposal_id} </div>
					<div className={cx("vote-dropdown")}>
						<div className={cx("selected-item")} ref={selectedItemRef}>
							<input type='text' className={cx("text-field")} value={voteField} readOnly />
							<DownAngleIcon className={cx("arrow")} />
						</div>
						<div className={cx("list")} ref={listRef}>
							{Object.values(objectField).map((item, index) => (
								<div key={"list-item-" + index} className={cx("list-item")} vote-option={item}>
									{item}
								</div>
							))}
						</div>
					</div>
					<div className={cx("balance-title")}> Fee </div>
					<Fee handleChooseFee={setFee} minFee={minFee} className={cx("custom-fee")} />
					<Gas gas={gas} onChangeGas={setGas} />
					<div className={cx("error-message-vote")}>{errorMessage}</div>
				</DialogContent>
				<DialogActions>
					<button type='button' className={cx("btn", "btn-outline-secondary")} onClick={handleClose}>
						Cancel
					</button>
					<button type='button' className={cx("btn", "btn-primary", "m-2")} onClick={onVote}>
						Vote
					</button>
				</DialogActions>
			</form>
		);
	};

	return (
		<div className={cx("deposit")}>
			<Dialog onClose={handleClose} aria-labelledby='deposit-dialog' open={open} maxWidth='sm' fullWidth={true}>
				<div className={cx("content-tab", "deposit-dialog")}>
					<FormProvider>{render()}</FormProvider>
				</div>
			</Dialog>
			{loadingTransaction && <LoadingOverlay />}
		</div>
	);
});

export default ProposalVoteModal;
