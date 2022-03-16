import React, {useMemo, useEffect, useState} from "react";
import cn from "classnames/bind";
import {useGet} from "restful-react";
import InfiniteScroll from "react-infinite-scroll-component";
import List from "antd/lib/list";
import Avatar from "antd/lib/avatar";
import Skeleton from "antd/lib/skeleton";
import Collapse from "antd/lib/collapse";
import Divider from "antd/lib/divider";
import Tag from "antd/lib/tag";
import Container from "@material-ui/core/Container";

// components
import ChannelList from "./ChannelList";

// constants
import {STATUS_COLOR} from "./constants";
import consts from "src/constants/consts";

// styles
import styles from "./Relayers.module.scss";

const cx = cn.bind(styles);
const {Panel} = Collapse;

const Relayers = () => {
	// const [data, setData] = useState([]);

	const {data, loading, refetch} = useGet({
		path: consts.API.IBC_RELAYERS,
	});

	const arrayKeys = data && Object.keys(data);

	const lstRelayers = arrayKeys?.map(item => ({
		...data[item],
		name: item,
	}));

	// const loadMoreData = () => {
	// 	if (loading) {
	// 		return;
	// 	}
	// 	setLoading(true);
	// 	fetch("https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo")
	// 		.then(res => res.json())
	// 		.then(body => {
	// 			setData([...data, ...body.results]);
	// 			setLoading(false);
	// 		})
	// 		.catch(() => {
	// 			setLoading(false);
	// 		});
	// };

	function callback(key) {
		console.log(key);
	}

	const renderList = useMemo(() => {
		const genHeader = item => {
			return (
				<List.Item key={item.id}>
					<List.Item.Meta avatar={<Avatar size='large' />} title={<a href='https://ant.design'>{item.name}</a>} description={item?.email} />
					<div className={cx("extra-list")}>
						<div className={cx("extra-list-tag")} style={{background: "rgba(55,204,110,.1)", color: `${STATUS_COLOR.OPENED}`}}>
							<span className={cx("dot")} />
							<div>Opened</div>
						</div>
						<div className={cx("extra-list-info")}>Channel 1/1</div>
					</div>
				</List.Item>
			);
		};

		const renderItem = item => {
			return (
				<Collapse onChange={callback} expandIconPosition='right' className={cx("item-list")}>
					<Panel header={genHeader(item)} key='1'>
						<ChannelList channels={item?.channels} channelName={item?.name} />
					</Panel>
				</Collapse>
			);
		};

		return lstRelayers?.map(item => renderItem(item));
	}, [lstRelayers]);

	return (
		<Container fixed className={cx("relayers")}>
			{/* <div
				id='scrollableDiv'
				style={{
					height: "calc(100vh - 300px)",
					overflow: "auto",
				}}>
				<InfiniteScroll
					dataLength={data.length}
					next={loadMoreData}
					hasMore={data.length < 50}
					loader={<Skeleton avatar paragraph={{rows: 1}} active />}
					endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
					scrollableTarget='scrollableDiv'>
				</InfiniteScroll>
				{renderList}
			</div> */}
			<div className={cx("page-title")}>
				<h1>ibc relayers</h1>
			</div>
			{renderList}
		</Container>
	);
};

export default Relayers;
