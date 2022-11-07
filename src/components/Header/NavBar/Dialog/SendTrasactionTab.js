// @ts-nocheck
import React from "react";
import Grid from "@material-ui/core/Grid";
import cn from "classnames/bind";
import {reduceString} from "src/lib/scripts";
import {TextArea} from "src/components/common/form-controls";

import {formatOrai} from "src/helpers/helper";

import styles from "./Dialog.module.scss";

const cx = cn.bind(styles);

export default function FormDialog({address, amount, methods}) {
	const {errors} = methods;

	return (
		<form className={cx("form-dialog")}>
			<Grid container spacing={2}>
				<div className={cx("row-balance")}>
					<div className={cx("left")}>
						<div className={cx("title")}> My Address </div>
						<div className={cx("value")}> {reduceString(address, 8, 8)} </div>
					</div>
					<div className={cx("right")}>
						<div className={cx("title", "title-right")}> Balance </div>
						<div className={cx("value")}> {formatOrai(amount || 0)} ORAI </div>
					</div>
				</div>
				<Grid item xs={12} className={cx("form-input")}>
					<div className={cx("label")}> Transaction </div>
					<TextArea name='freeMessage' placeholder='Enter unsigned transaction json' rows={23} required errorobj={errors} />
				</Grid>
			</Grid>
		</form>
	);
}
