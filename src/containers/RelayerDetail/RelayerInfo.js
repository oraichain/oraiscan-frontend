import React from "react";
import cn from "classnames/bind";
import moment from "moment";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Card from "antd/lib/card";
import Avatar from "antd/lib/avatar/avatar";
import Typography from "antd/lib/typography";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// styles
import styles from "./RelayerInfo.module.scss";

// constants
import {STATE, STATUS_COLOR} from "src/containers/Relayers/constants";

const cx = cn.bind(styles);

const {Meta} = Card;
const {Title} = Typography;

const RelayerInfo = ({data}) => {
	const createdAt = moment(data?.channel?.created_at, "YYYY-MM-DD");
	const currentDate = moment().startOf("day");
	const operatingPeriod = moment.duration(currentDate.diff(createdAt)).asDays();
	const lastUpdateTime = moment(data?.last_updated, "YYYYMMDD").fromNow();
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

	const CHANNEL_NAME = {
		[STATE.STATE_OPEN]: "Well-known",
		[STATE.STATE_INIT || STATE.STATE_TRYOPEN || STATE.STATE_UNINITIALIZED_UNSPECIFIED]: "Unknown",
	};

	const STATUS_COLOR = {
		[STATE.STATE_OPEN]: "#37cc6e",
		[STATE.STATE_INIT || STATE.STATE_TRYOPEN || STATE.STATE_UNINITIALIZED_UNSPECIFIED]: "#ffb323",
	};

	return (
		<>
			<Row gutter={[24, 24]}>
				<Col xs={12} xl={6}>
					<div className={cx("card")} style={{background: STATUS_COLOR[data?.channel?.status], color: STATUS_COLOR[data?.channel?.status]}}>
						<p className={cx("card-status-label-state")}>{CHANNEL_NAME[data?.channel?.status]}</p>
						<div className={cx("card-sub-value", "status")} style={!isLargeScreen ? {fontSize: "12px"} : {}}>
							Total Transfer value
						</div>
						<div className={cx("card-value", "status")} style={!isLargeScreen ? {fontSize: "12px"} : {}}>
							$&nbsp;{data?.total_value?.toFixed(2)}
						</div>
					</div>
				</Col>
				<Col xs={12} xl={6}>
					<div className={cx("card")}>
						<div className={cx("card-label-state")}>IBC Total Txs</div>
						<div className={cx("card-value")}>{data?.total_txs}</div>
					</div>
				</Col>
				<Col xs={12} xl={6}>
					<div className={cx("card")}>
						<div className={cx("card-label-state")}>Last Update Time</div>
						<div className={cx("card-value")}>{lastUpdateTime}</div>
					</div>
				</Col>
				<Col xs={12} xl={6}>
					<div className={cx("card")}>
						<div className={cx("card-label-state")}>Operating Period</div>
						<div className={cx("card-value")}>
							{operatingPeriod}&nbsp;{operatingPeriod > 1 ? "Days" : "Day"}
						</div>
					</div>
				</Col>
			</Row>

			{/* <div className={cx("channel-info")}>
				<Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
					<Col span={11}>
						<div className={cx("channel-container")}>
							<div className={cx("channel-header")}>
								<div className={cx("channel-header-info")}>
									<Avatar src='https://joeschmoe.io/api/v1/random' style={{marginRight: "10px"}} />
									<div>
										<p className={cx("channel-header-infor-name")}>Orai Chanin</p>
										<p className={cx("channel-header-info-description")}>channel 1</p>
									</div>
								</div>
								<div className={cx("channel-header-status")}>Pending</div>
							</div>
							<Divider />
							<div className={cx("channel-body")}>
								<div className={cx("channel-body-item")}>
									<div className={cx("channel-body-item-label")}>IBC Send Txs</div>
									<div className={cx("channel-body-item-value")}>5,804</div>
								</div>
								<div className={cx("channel-body-item")}>
									<div className={cx("channel-body-item-label")}>IBC Send Txs</div>
									<div className={cx("channel-body-item-value")}>5,804</div>
								</div>
								<div className={cx("channel-body-item")}>
									<div className={cx("channel-body-item-label")}>IBC Send Txs</div>
									<div className={cx("channel-body-item-value")}>5,804</div>
								</div>
							</div>
						</div>
					</Col>
					<Col span={2} />
					<Col span={11}>
						<div className={cx("channel-container")}>
							<div className={cx("channel-header")}>
								<div className={cx("channel-header-info")}>
									<Avatar src='https://joeschmoe.io/api/v1/random' style={{marginRight: "10px"}} />
									<div>
										<p className={cx("channel-header-infor-name")}>Orai Chanin</p>
										<p className={cx("channel-header-info-description")}>channel 1</p>
									</div>
								</div>
								<div className={cx("channel-header-status")}>Pending</div>
							</div>
							<Divider />
							<div className={cx("channel-body")}>
								<div className={cx("channel-body-item")}>
									<div className={cx("channel-body-item-label")}>IBC Send Txs</div>
									<div className={cx("channel-body-item-value")}>5,804</div>
								</div>
								<div className={cx("channel-body-item")}>
									<div className={cx("channel-body-item-label")}>IBC Send Txs</div>
									<div className={cx("channel-body-item-value")}>5,804</div>
								</div>
								<div className={cx("channel-body-item")}>
									<div className={cx("channel-body-item-label")}>IBC Send Txs</div>
									<div className={cx("channel-body-item-value")}>5,804</div>
								</div>
							</div>
						</div>
					</Col>
				</Row>
			</div> */}
		</>
	);
};

export default RelayerInfo;
