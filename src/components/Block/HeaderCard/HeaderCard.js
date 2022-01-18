import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";
import cn from "classnames/bind";
import copy from "copy-to-clipboard";
import consts from "src/constants/consts";
import {showAlert} from "src/store/modules/global";
import {formatOrai} from "src/helpers/helper";
import {_} from "src/lib/scripts";
import CopyIcon from "src/icons/CopyIcon";
import {getTotalTime, setAgoTime} from "src/lib/scripts";
import InfoRow from "src/components/common/InfoRow";
import ShortenedString from "src/components/common/ShortenedString";
import styles from "./HeaderCard.module.scss";

const cx = cn.bind(styles);

const HeaderCard = ({data}) => {
	const dispatch = useDispatch();
	const validators = useSelector(state => state.blockchain.validators);

	return (
		<div className={cx("card")}>
			<h2 className={cx("card-header")}>Header</h2>
			<div className={cx("card-body")}>
				<InfoRow label='Height'>
					<div className={cx("height")}>{_.isNil(data?.height) ? "-" : data.height}</div>
				</InfoRow>

				<InfoRow label='Block Time'>
					<div className={cx("block-time")}>{_.isNil(data?.timestamp) ? "-" : setAgoTime(data.timestamp) + " (" + getTotalTime(data.timestamp) + ")"}</div>
				</InfoRow>

				<InfoRow label='Block Hash'>
					<div className={cx("hash")}>
						<span className={cx("hash-value")}>
							<ShortenedString inputString={_.isNil(data?.block_hash) ? "-" : data?.block_hash} showCopyIcon={true} long />
						</span>
						{!_.isNil(data?.block_hash) && (
							<span
								className={cx("hash-copy")}
								onClick={() => {
									copy(data.block_hash);
									dispatch(
										showAlert({
											show: true,
											message: "Copied",
											autoHideDuration: 1500,
										})
									);
								}}>
								<CopyIcon />
							</span>
						)}
					</div>
				</InfoRow>

				<InfoRow label='Number Of Transactions'>
					<div className={cx("tx-number")}>{isNaN(data?.num_txs) ? "-" : data.num_txs}</div>
				</InfoRow>

				<InfoRow label='Total Fees'>
					{isNaN(data?.total_fees) ? (
						<div className={cx("tx-number")}>-</div>
					) : (
						<div className={cx("tx-number")}>
							<span className={cx("tx-number-value")}>{formatOrai(data?.total_fees)}</span>
							<span className={cx("tx-number-denom")}>ORAI</span>
						</div>
					)}
				</InfoRow>

				<InfoRow label='Moniker'>
					{_.isNil(data?.moniker) ? (
						<span className={cx("moniker")}>-</span>
					) : (
						<NavLink className={cx("moniker")} to={`${consts.PATH.VALIDATORS}/${validators?.[data.moniker]?.operatorAddr}`}>
							{data.moniker}
						</NavLink>
					)}
				</InfoRow>
			</div>
		</div>
	);
};

HeaderCard.propTypes = {
	data: PropTypes.any,
};

HeaderCard.defaultProps = {};

export default HeaderCard;
