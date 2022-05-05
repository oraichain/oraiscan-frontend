// @ts-nocheck
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import cn from "classnames/bind";
import { useDispatch } from "react-redux";
import { showAlert } from "src/store/modules/global";

import styles from "./SelectFile.scss";

const cx = cn.bind(styles);

const validateLines = data => {
	const validRows = [];
	const invalidRows = [];
	for (let i = 0; i < data.length; i++) {
		const row = data[i];
		const rowArr = row.split(",");
		if (rowArr[1] && parseFloat(rowArr[1]) + "" !== "NaN") {
			validRows.push(i + 1);
		}
		if (!rowArr[1] || parseFloat(rowArr[1]) + "" === "NaN") {
			invalidRows.push(i + 1);
		}
	}
	return {
		validRows,
		invalidRows,
	};
};

export default function Basic({ handleSelectFile }) {
	const dispatch = useDispatch();
	const [invalidRows, setInvalidRows] = useState([]);

	const hooks = useDropzone({
		onDropAccepted: files => {
			setInvalidRows([]);
			const myFile = files[0];
			const reader = new FileReader();

			reader.addEventListener("load", function (e) {
				const lines = e.target.result.split("\n");
				const { validRows, invalidRows } = validateLines(lines);
				console.log({
					validRows,
					invalidRows,
				});
				if (validRows.length === 0) {
					setInvalidRows(invalidRows);
					return;
				}
				handleSelectFile(lines);
			});

			reader.readAsBinaryString(myFile);
		},
		onDropRejected: () => {
			setInvalidRows([]);
			dispatch(
				showAlert({
					show: true,
					message: "File extension not correct or file size exceeds the maximum file-size",
					autoHideDuration: 3000,
					type: "error",
				})
			);
		},
		maxSize: 2000000,
		accept: "text/plain",
	});
	const { getRootProps, getInputProps } = hooks;

	return (
		<section className={cx("container")}>
			<div {...getRootProps({ className: cx("dropzone") })}>
				<input {...getInputProps()} />
				<div className={cx("drag")}>
					Drag file here or <span className={cx("browse")}> Browse </span>
				</div>
				<div className={cx("note")}>{`Suported file: txt - Size < 2mb`}</div>
			</div>
			{invalidRows.length > 0 && <div className={cx("error")}>Invalid row: {invalidRows.join(", ")}</div>}
		</section>
	);
}
