import React from "react";
import cn from "classnames/bind";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Card from "antd/lib/card";
import Avatar from "antd/lib/avatar/avatar";
import Typography from "antd/lib/typography";
import Divider from "antd/lib/divider";

// styles
import styles from "./RelayerInfo.module.scss";

const cx = cn.bind(styles);

const {Meta} = Card;
const {Title} = Typography;

const RelayerInfo = () => {
	return (
		<>
			<Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
				<Col span={6}>
					<div className={cx("card")}>
						<div className={cx("card-label-state")}>label</div>
						<div className={cx("card-sub-value")}>sub value</div>
						<div className={cx("card-value")}>value</div>
					</div>
				</Col>
				<Col span={6}>
					<div className={cx("card")}>
						<div className={cx("card-label-state")}>label</div>
						<div className={cx("card-value")}>value</div>
					</div>
				</Col>
				<Col span={6}>
					<div className={cx("card")}>
						<div className={cx("card-label-state")}>label</div>
						<div className={cx("card-value")}>value</div>
					</div>
				</Col>
				<Col span={6}>
					<div className={cx("card")}>
						<div className={cx("card-label-state")}>label</div>
						<div className={cx("card-value")}>value</div>
					</div>
				</Col>
			</Row>

			<div className={cx("channel-info")}>
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
			</div>
		</>
	);
};

export default RelayerInfo;
