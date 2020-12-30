/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from "react";
import {Snackbar} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import {useSelector, useDispatch} from "react-redux";

import {hideAlert} from "src/store/modules/global";

const Alert = () => {
	const {show, message, autoHideDuration} = useSelector(state => state.global.showAlert);
	const dispatch = useDispatch();
	const handleClose = () => dispatch(hideAlert());
	useEffect(() => {
		const autoHide = setTimeout(() => {
			dispatch(hideAlert());
		});
		return () => {
			clearTimeout(autoHide);
		};
	}, []);
	return (
		<Snackbar autoHideDuration={autoHideDuration || 1500} anchorOrigin={{vertical: "top", horizontal: "right"}} open={show} onClose={handleClose}>
			<MuiAlert elevation={6} variant='filled' onClose={handleClose} severity='success'>
				{message}
			</MuiAlert>
		</Snackbar>
	);
};

export default Alert;
