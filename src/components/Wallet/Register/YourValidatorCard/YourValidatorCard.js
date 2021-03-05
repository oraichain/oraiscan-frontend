import React, {memo} from "react";
import {NavLink} from "react-router-dom";
import cn from "classnames/bind";
import copy from "copy-to-clipboard";
import {useDispatch} from "react-redux";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import {showAlert} from "src/store/modules/global";
import styles from "./YourValidatorCard.scss";
import editIcon from "src/assets/icons/edit.svg";
import roleIcon from "src/assets/wallet/role.svg";
import copyIcon from "src/assets/common/copy_ic.svg";

const cx = cn.bind(styles);

const YourValidatorCard = memo(({}) => {
	const dispatch = useDispatch();

	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

	const handleCopy = address => {
		copy(address);
		dispatch(
			showAlert({
				show: true,
				message: "Copied",
				autoHideDuration: 1500,
			})
		);
	};

	return (
		<div className={cx("your-validator-card")}>
			<div className={cx("your-validator-card-header")}>Your Validator</div>
			<div className={cx("your-validator-card-body")}>
				{isLargeScreen ? (
					<Grid container spacing={0}>
						<Grid item xs={6} className={cx("validator-detail")}>
							<div className={cx("validator-title")}>Validator name</div>
							<div className={cx("validator-name")}>
								<NavLink className={cx("nav-link")} to='/'>
									<span className={cx("validator-link")}>Oraichain</span>
								</NavLink>
								<NavLink className={cx("nav-link")} to='/'>
									<img className={cx("validator-icon", "validator-icon-right")} src={editIcon} />
								</NavLink>
							</div>
						</Grid>
						<Grid item xs={6} className={cx("validator-detail")}>
							<div className={cx("validator-title")}>Total Delegators</div>
							<div className={cx("validator-text")}>122</div>
						</Grid>
						<Grid item xs={6} className={cx("validator-detail")}>
							<div className={cx("validator-title")}>
								Validator address
								<img
									className={cx("validator-icon", "validator-icon-clickable", "validator-icon-right")}
									src={copyIcon}
									onClick={() => {
										handleCopy("0x09470B5978C978eB28df8C3cB8421520339c1E2a");
									}}
								/>
							</div>
							<div className={cx("validator-text")}>0x09470B5978C978eB28df8C3cB8421520339c1E2a</div>
						</Grid>
						<Grid item xs={6} className={cx("validator-detail")}>
							<div className={cx("validator-title")}>Total Stake Amount</div>
							<div className={cx("validator-text")}>120,256 ORAI</div>
						</Grid>

						<Grid item xs={6} className={cx("validator-detail")}>
							<div className={cx("validator-title")}>
								Validator Contract
								<img
									className={cx("validator-icon", "validator-icon-clickable", "validator-icon-right")}
									src={copyIcon}
									onClick={() => {
										handleCopy("0x09470B5978C978eB28df8C3cB8421520339c1E2a");
									}}
								/>
							</div>
							<div className={cx("validator-text")}>0x09470B5978C978eB28df8C3cB8421520339c1E2a</div>
						</Grid>

						<Grid item xs={6} className={cx("validator-detail")}>
							<div className={cx("validator-title")}>Status</div>
							<div className={cx("validator-status", "validator-status-active")}>Active</div>
						</Grid>

						<Grid item xs={6} className={cx("validator-detail")}>
							<div className={cx("validator-title")}>Role</div>
							<div className={cx("validator-role")}>
								<img className={cx("validator-icon", "validator-icon-left")} src={roleIcon} />
								<NavLink className={cx("nav-link")} to='/'>
									<span className={cx("validator-link")}>Oraichain</span>
								</NavLink>
								<NavLink className={cx("nav-link")} to='/'>
									<img className={cx("validator-icon", "validator-icon-right")} src={editIcon} />
								</NavLink>
							</div>
						</Grid>
						<Grid item xs={6} className={cx("validator-detail")}>
							<div className={cx("validator-title")}>Missing Block</div>
							<div className={cx("validator-text")}>0</div>
						</Grid>
						<Grid item xs={6} className={cx("validator-detail")}>
							<div className={cx("validator-title")}>Commission Rate</div>
							<div className={cx("validator-text")}>5%</div>
						</Grid>
						<Grid item xs={6} className={cx("validator-detail")}>
							<div className={cx("validator-title")}>Claimable Commission Reward</div>
							<div className={cx("validator-text")}>12,000 ORAI</div>
						</Grid>
						<Grid item xs={6} className={cx("validator-detail")}>
							<div className={cx("validator-title")}>Max Commission Rate</div>
							<div className={cx("validator-text")}>25%</div>
						</Grid>
						<Grid item xs={6} className={cx("validator-detail")}>
							<button className={cx("button")} onClick={() => {}}>
								Withdraw
							</button>
						</Grid>
						<Grid item xs={6} className={cx("validator-detail")}>
							<div className={cx("validator-title")}>Max Change Commission Rate</div>
							<div className={cx("validator-text")}>5%</div>
						</Grid>
					</Grid>
				) : (
					<Grid container spacing={0}>
						<Grid item xs={12} className={cx("validator-detail")}>
							<div className={cx("validator-title")}>Validator name</div>
							<div className={cx("validator-name")}>
								<NavLink className={cx("nav-link")} to='/'>
									<span className={cx("validator-link")}>Oraichain</span>
								</NavLink>
								<NavLink className={cx("nav-link")} to='/'>
									<img className={cx("validator-icon", "validator-icon-right")} src={editIcon} />
								</NavLink>
							</div>
						</Grid>
						<Grid item xs={6} className={cx("validator-detail")}>
							<div className={cx("validator-title")}>
								Validator address
								<img
									className={cx("validator-icon", "validator-icon-clickable", "validator-icon-right")}
									src={copyIcon}
									onClick={() => {
										handleCopy("0x09470B5978C978eB28df8C3cB8421520339c1E2a");
									}}
								/>
							</div>
							<div className={cx("validator-text")}>0x09470B5978C978eB28df8C3cB8421520339c1E2a</div>
						</Grid>

						<Grid item xs={12} className={cx("validator-detail")}>
							<div className={cx("validator-title")}>
								Validator Contract
								<img
									className={cx("validator-icon", "validator-icon-clickable", "validator-icon-right")}
									src={copyIcon}
									onClick={() => {
										handleCopy("0x09470B5978C978eB28df8C3cB8421520339c1E2a");
									}}
								/>
							</div>
							<div className={cx("validator-text")}>0x09470B5978C978eB28df8C3cB8421520339c1E2a</div>
						</Grid>
						<Grid item xs={12} className={cx("validator-detail")}>
							<div className={cx("validator-title")}>Role</div>
							<div className={cx("validator-role")}>
								<img className={cx("validator-icon", "validator-icon-left")} src={roleIcon} />
								<NavLink className={cx("nav-link")} to='/'>
									<span className={cx("validator-link")}>Oraichain</span>
								</NavLink>
								<NavLink className={cx("nav-link")} to='/'>
									<img className={cx("validator-icon", "validator-icon-right")} src={editIcon} />
								</NavLink>
							</div>
						</Grid>
						<Grid item xs={12} className={cx("validator-detail")}>
							<div className={cx("validator-title")}>Commission Rate</div>
							<div className={cx("validator-text", "validator-text-blue")}>5%</div>
						</Grid>
						<Grid item xs={12} className={cx("validator-detail")}>
							<div className={cx("validator-title")}>Max Commission Rate</div>
							<div className={cx("validator-text", "validator-text-blue")}>25%</div>
						</Grid>
						<Grid item xs={12} className={cx("validator-detail")}>
							<div className={cx("validator-title")}>Max Change Commission Rate</div>
							<div className={cx("validator-text", "validator-text-blue")}>5%</div>
						</Grid>
						<Grid item xs={12} className={cx("validator-detail")}>
							<div className={cx("validator-title")}>Total Delegators</div>
							<div className={cx("validator-text")}>122</div>
						</Grid>
						<Grid item xs={12} className={cx("validator-detail")}>
							<div className={cx("validator-title")}>Total Stake Amount</div>
							<div className={cx("validator-text")}>120,256 ORAI</div>
						</Grid>
						<Grid item xs={12} className={cx("validator-detail")}>
							<div className={cx("validator-title")}>Status</div>
							<div className={cx("validator-status", "validator-status-active")}>Active</div>
						</Grid>
						<Grid item xs={12} className={cx("validator-detail")}>
							<div className={cx("validator-title")}>Missing Block</div>
							<div className={cx("validator-text")}>0</div>
						</Grid>
						<Grid item xs={12} className={cx("validator-detail")}>
							<div className={cx("validator-title")}>Claimable Commission Reward</div>
							<div className={cx("validator-text")}>12,000 ORAI</div>
							<button className={cx("button")} onClick={() => {}}>
								Withdraw
							</button>
						</Grid>
					</Grid>
				)}
			</div>
		</div>
	);
});

export default YourValidatorCard;
