// @ts-nocheck
import cn from "classnames/bind";
import { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import config from "src/config.js";
import { walletStation } from "src/lib/walletStation";
import { showAlert } from "src/store/modules/global";
import styles from "./RandomnessPopup.module.scss";

const cx = cn.bind(styles);

const RandomnessPopup = memo(({ open, closeDialog, eventHandleGetRamdomValue, userInput, setLoadingPopup, address }) => {
	const dispatch = useDispatch();

	const onSubmit = async () => {
		try {
			closeDialog();
			const contract = config.randomnessContractAddress;
			const msg = Buffer.from(
				JSON.stringify({
					request_random: {
						input: btoa(userInput || 100),
					},
				})
			);
			const response = await walletStation.randomnessContract(contract, msg, address);
			if (!response.code) {
				await eventHandleGetRamdomValue(response, contract);
			}
		} catch (error) {
			setLoadingPopup(false);
			dispatch(
				showAlert({
					show: true,
					message: error.message,
					autoHideDuration: 3000,
				})
			);
			console.log(error);
		}
	};

	useEffect(() => {
		if (open) onSubmit();
	}, [open]);

	return <div></div>;
});

export default RandomnessPopup;
