// @ts-nocheck
import React from "react";
import {useDropzone} from "react-dropzone";
import cn from "classnames/bind";
import {useDispatch} from "react-redux";
import {showAlert} from "src/store/modules/global";

import styles from "./SelectFile.scss";

const cx = cn.bind(styles);

export default function Basic({handleSelectFile}) {
	const dispatch = useDispatch();

	const hooks = useDropzone({
		onDropAccepted: files => {
			const myFile = files[0];
			const reader = new FileReader();

			reader.addEventListener("load", function(e) {
				const lines = e.target.result.split("\n");
				handleSelectFile(lines);
			});

			reader.readAsBinaryString(myFile);
		},
		onDropRejected: () => {
			dispatch(
				showAlert({
					show: true,
					message: "File extension not correct or file size exceeds the maximum file-size",
					autoHideDuration: 3000,
					type: "error",
				})
			);
		},
		maxSize: 100000,
		accept: "text/plain",
	});
	const {getRootProps, getInputProps} = hooks;

	return (
		<section className={cx("container")}>
			<div {...getRootProps({className: cx("dropzone")})}>
				<input {...getInputProps()} />
				<div className={cx("drag")}>
					Drag file here or <span className={cx("browse")}> Browse </span>
				</div>
				<div className={cx("note")}>{`Suported file: txt - Size < 1mb`}</div>
			</div>
		</section>
	);
}
