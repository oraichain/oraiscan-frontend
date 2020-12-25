import React, {useState, useRef} from "react";
import {NavLink} from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import {_, refineAddress} from "src/lib/scripts";
import DisplayLongString from "src/components/common/DisplayLongString";
import copyIcon from "src/assets/common/copy_ic.svg";

export default function({address, cx}) {
	const contentRef = useRef(null);
	const [open, setOpen] = useState(false);

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	const copyToClipboard = () => {
		if (contentRef && contentRef?.current) {
			const contentElement = contentRef.current;
			contentElement.select();
			contentElement.setSelectionRange(0, 99999); /* For mobile devices */
			document.execCommand("copy");
			setOpen(true);
		}
	};

	if (!_.isNil(address)) {
		const refinedAddress = refineAddress(address);
		return (
			<>
				<input type='text' className={cx("content-input")} ref={contentRef} value={refinedAddress} />
				<NavLink className={cx("blueColor")} to={`/account/${refinedAddress}`}>
					<DisplayLongString inputString={refinedAddress} />
				</NavLink>
				<img
					src={copyIcon}
					alt=''
					className={cx("copy-icon")}
					onClick={() => {
						copyToClipboard();
					}}
				/>
				<Snackbar
					anchorOrigin={{
						vertical: "top",
						horizontal: "center",
					}}
					open={open}
					autoHideDuration={6000}
					onClose={handleClose}
					autoHideDuration={400}
					message='Đã sao chép'
				/>
			</>
		);
	}

	return <>-</>;
}
