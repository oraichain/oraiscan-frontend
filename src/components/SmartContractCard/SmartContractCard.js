import React from "react";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";
import cn from "classnames/bind";
import consts from "src/constants/consts";
import {_} from "src/lib/scripts";
import InfoRow from "src/components/common/InfoRow";
import styles from "./SmartContractCard.module.scss";

const cx = cn.bind(styles);

const SmartContractCard = ({data}) => {
	return (
		<div className={cx("card")}>
			<h2 className={cx("card-header")}>Information</h2>
			<div className={cx("card-body")}>
				<InfoRow label='Address'>
					<div className={cx("address")}>{_.isNil(data?.address) ? "-" : data.address}</div>
				</InfoRow>

				<InfoRow label='Admin'>
					<div className={cx("admin")}>{_.isNil(data?.admin) ? "-" : data.admin}</div>
				</InfoRow>

				<InfoRow label='Code ID'>
					<div className={cx("code-id")}>{_.isNil(data?.code_id) ? "-" : data.code_id}</div>
				</InfoRow>

				<InfoRow label='Creator'>
					<NavLink className={cx("creator")} to={`${consts.PATH.ACCOUNT}/${data?.creator}`}>
						{data?.creator}
					</NavLink>
				</InfoRow>

				<InfoRow label='Label'>
					<div className={cx("label")}>{_.isNil(data?.label) ? "-" : data.label}</div>
				</InfoRow>
			</div>
		</div>
	);
};

SmartContractCard.propTypes = {
	data: PropTypes.any,
};

SmartContractCard.defaultProps = {};

export default SmartContractCard;
