/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import {FormControl, InputLabel, Input, Button, FormHelperText, Tooltip} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import cn from "classnames/bind";
import {useForm, FormProvider} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import * as bech32 from "bech32-buffer";

import {ReactComponent as EditIcon} from "src/assets/icons/edit.svg";
import {InputNumberFormat, TextArea, InputTextWithIcon, InputText} from "src/components/common/form-controls";
import Keystation from "src/lib/Keystation";
import styles from "./Register.scss";

const cx = cn.bind(styles);

export default function({address, account}) {
	return (
		<div className={cx("Register")}>
			<div className={cx("title")}> Your Validator </div>
			<div className={cx("validator-row")}>
				<div className={cx("column")}>
					<div className={cx("validator-title")}> Validator name </div>
					<div className={cx("validator-name", "validator-info")}>
						{" "}
						Oraichain <EditIcon />{" "}
					</div>
				</div>
				<div className={cx("column")}>
					<div className={cx("validator-title")}> Total Delegators </div>
					<div className={cx("total-delegator", "validator-info")}> 122 </div>
				</div>
			</div>
			<div className={cx("validator-row")}>
				<div className={cx("column")}>
					<div className={cx("validator-title")}> Validator address </div>
					<div className={cx("validator-name")}> 0x09470B5978C978eB28df8C3cB8421520339c1E2a </div>
				</div>
				<div className={cx("column")}>
					<div className={cx("validator-title")}> Total Stake Amount </div>
					<div className={cx("total-delegator", "validator-info")}> 120,256 ORAI </div>
				</div>
			</div>
		</div>
	);
}
