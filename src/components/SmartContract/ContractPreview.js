import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import cn from "classnames/bind";
import { isNil } from "lodash-es";
import Grid from "@material-ui/core/Grid";
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from "@material-ui/lab/Skeleton";
import copy from "copy-to-clipboard";

import InfoRow from "src/components/common/InfoRow";
import consts from "src/constants/consts";
import { showAlert } from "src/store/modules/global";
import { ReactComponent as CopyIcon } from 'src/assets/common/copy_ic.svg';
import { ReactComponent as CheckIcon } from 'src/assets/icons/check.svg';
import styles from "./ContractPreview.module.scss";

const cx = cn.bind(styles);

const useStyles = makeStyles((theme) => ({
	customWidth: {
	  maxWidth: 600,
	  fontSize: 16,
	},
}));

const HeaderCardSkeleton = ({ data }) => {
	const dispatch = useDispatch();
	const [copied, setCopied] = React.useState(false);
	const classes = useStyles();
	return (
		<Grid item lg={7} xs={12}>
			<div className={cx("contract-preview")}>
				<table>
					<thead>
						<tr>
							<td colSpan={2}>
								<div className={cx("header-title")}>Contract Overview</div>
							</td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className={cx('contract-address')}>
								<div className={cx("item-title")}><span>Address&nbsp;</span>{
									data?.address ? (
										copied ? (
											<CheckIcon />
										) : (
											<CopyIcon className={cx('copy-btn')} onClick={() => {
												copy(data?.address);
												dispatch(
													showAlert({
														show: true,
														message: "Copied",
														autoHideDuration: 1500,
													})
												);
												setCopied(true);
												setTimeout(() => setCopied(false), 1500);
											}} />
										)
									) : (
										''
									)
								}</div>
							</td>
							<td>
								<Tooltip title={data?.address} classes={{ tooltip: classes.customWidth }} className={cx("item-text")}>
									<div >{isNil(data?.address) ? "-" : data?.address}</div>
								</Tooltip>
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Contract Info</div>
							</td>
							<td>
								<div className={cx("item-text")}>{isNil(data?.info) ? "-" : data?.info}</div>
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Code Id</div>
							</td>
							<td>
								<div className={cx("item-text")}>
									{isNil(data?.code_id) ? "-" : <NavLink className={cx("item-link")} to={`${consts.PATH.WASM_CODE}/${data?.code_id}`}>
										{data?.code_id}
									</NavLink>}
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</Grid>
	);
};

HeaderCardSkeleton.propTypes = {
	data: PropTypes.any,
};

HeaderCardSkeleton.defaultProps = {};

export default HeaderCardSkeleton;
