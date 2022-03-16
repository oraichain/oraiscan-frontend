import React, {useMemo} from "react";
import cn from "classnames/bind";
import {useGet} from "restful-react";
import List from "antd/lib/list";
import Avatar from "antd/lib/avatar";
import Collapse from "antd/lib/collapse";
import Container from "@material-ui/core/Container";

// components
import ChannelList from "./ChannelList";

// constants
import {STATUS_COLOR, STATE} from "./constants";
import consts from "src/constants/consts";

// styles
import styles from "./Relayers.module.scss";

const cx = cn.bind(styles);
const {Panel} = Collapse;

const Relayers = () => {
	const {data} = useGet({
		path: consts.API.IBC_RELAYERS,
	});

	const dataSource = data && Object.values(data);

	const renderList = useMemo(() => {
		const genHeader = item => {
			const listStatus = item?.channels?.map(i => i?.channel?.status);
			const atLeastOpenStatus = listStatus.some(item => item != STATE.STATE_CLOSED);
			const listOpenStatus = item?.channels?.filter(i => i?.channel?.status == STATE.STATE_OPEN);
			const colorStatus = atLeastOpenStatus ? STATUS_COLOR[STATE.STATE_OPEN] : STATUS_COLOR[STATE.STATE_CLOSED];
			const backgroundStatus = atLeastOpenStatus ? "rgba(55,204,110,.1)" : "rgba(255,39,69,.1)";
			return (
				<List.Item key={item.id}>
					<List.Item.Meta avatar={<Avatar size='large' src={item?.images?.large} />} title={item.name} description={item?.denom} />
					<div className={cx("extra-list")}>
						<div className={cx("extra-list-tag")} style={{background: backgroundStatus, color: colorStatus}}>
							<span className={cx("dot")} style={{background: colorStatus}} />
							<div>{atLeastOpenStatus ? "Opened" : "Closed"}</div>
						</div>
						<div className={cx("extra-list-info")}>Channel {`${listOpenStatus?.length}/${listStatus?.length}`}</div>
					</div>
				</List.Item>
			);
		};

		const renderItem = item => {
			return (
				<Collapse expandIconPosition='right' className={cx("item-list")}>
					<Panel header={genHeader(item)} key='1'>
						<ChannelList channels={item?.channels} channelName={item?.name} image={item?.images?.small} />
					</Panel>
				</Collapse>
			);
		};

		return dataSource?.map(item => renderItem(item));
	}, [dataSource]);

	return (
		<Container fixed className={cx("relayers")}>
			<div className={cx("page-title")}>
				<h1>ibc relayers</h1>
			</div>
			{renderList}
		</Container>
	);
};

export default Relayers;
