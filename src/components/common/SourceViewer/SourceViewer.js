/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useRef, useEffect} from "react";
import classNames from "classnames/bind";
import Dialog from "@material-ui/core/Dialog";
import SmartContractCodeCard from "src/components/SmartContract";
import styles from "./SourceViewer.module.scss";
import {ReactComponent as CloseIcon} from "src/assets/icons/close.svg";

const cx = classNames.bind(styles);

const SourceViewer = ({title, data}) => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className={cx("source-viewer")}>
			<div className={cx("trigger")} onClick={handleOpen}>
				{title}
			</div>
			<Dialog open={open} maxWidth='lg' fullWidth={true} aria-labelledby='source-dialog' onClose={handleClose}>
				<div className={cx("preview")}>
					<div className={cx("close-button")} onClick={handleClose}>
						<CloseIcon />
					</div>
					<div className={cx("files")}>
						<SmartContractCodeCard data={data} noShadow={true} />
					</div>
				</div>
			</Dialog>
		</div>
	);
};

export default SourceViewer;
