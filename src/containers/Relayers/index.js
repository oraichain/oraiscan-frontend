import React, {useMemo} from "react";
import cn from "classnames/bind";
import {useGet} from "restful-react";
import List from "antd/lib/list";
import Avatar from "antd/lib/avatar";
import Collapse from "antd/lib/collapse";
import Container from "@material-ui/core/Container";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// components
import ChannelList from "./ChannelList";
import {useTheme} from "@material-ui/core/styles";
import TogglePageBar from "src/components/common/TogglePageBar";
import PageTitle from "src/components/common/PageTitle";
import TitleWrapper from "src/components/common/TitleWrapper";

// constants
import {STATUS_COLOR, STATE} from "./constants";
import consts from "src/constants/consts";

// styles
import styles from "./Relayers.module.scss";

const cx = cn.bind(styles);
const {Panel} = Collapse;

const Relayers = () => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const {data} = useGet({
		path: consts.API.IBC_RELAYERS,
	});

	let titleSection;
	titleSection = isLargeScreen ? (
		<Container fixed>
			<TitleWrapper>
				<PageTitle title={"IBC Relayers"} />
				{/* <StatusBox /> */}
			</TitleWrapper>
		</Container>
	) : (
		<TogglePageBar type={"ibc-relayers"} />
	);

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
					<List.Item.Meta avatar={<Avatar size='large' src={item?.images?.large} />} title={item.name || "UNKNOWN"} description={item?.denom ||"unknown"} />
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
		<>
			{titleSection}
			<Container fixed className={cx("relayers")}>
				{renderList}
			</Container>
		</>
	);
};

export default Relayers;
