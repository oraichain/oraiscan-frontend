import React from "react";
import {Snackbar} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = ({show, handleClose, message}) => {
	return (
		<Snackbar autoHideDuration={1500} anchorOrigin={{vertical: "top", horizontal: "right"}} open={show} onClose={handleClose}>
			<MuiAlert elevation={6} variant='filled' onClose={handleClose} severity='success'>
				{message}
			</MuiAlert>
		</Snackbar>
	);
};

export default Alert;
