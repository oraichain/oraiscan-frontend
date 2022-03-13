import React, {useMemo, useEffect, useState} from "react";
import cn from "classnames/bind";
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

// styles
import styles from "./Relayers.module.scss";

const cx = cn.bind(styles);
const {Panel} = Collapse;

const Relayers = () => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	console.log("🚀 ~ file: index.js ~ line 20 ~ Relayers ~ data", data);

	const loadMoreData = () => {
		if (loading) {
			return;
		}
		setLoading(true);
		fetch("https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo")
			.then(res => res.json())
			.then(body => {
				setData([...data, ...body.results]);
				setLoading(false);
			})
			.catch(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		loadMoreData();
	}, []);

	function callback(key) {
		console.log(key);
	}

	const renderList = useMemo(() => {
		const genHeader = item => {
			return (
				<List.Item key={item.id}>
					<List.Item.Meta avatar={<Avatar src={item.picture.large} />} title={<a href='https://ant.design'>{item.name.last}</a>} description={item.email} />
					<div>
						<Tag color={STATUS_COLOR.OPENED}>Opened</Tag>
						<div>Channel 1/1</div>
					</div>
				</List.Item>
			);
		};

		const renderItem = item => {
			return (
				<Collapse onChange={callback} expandIconPosition='right' className={cx("item-list")}>
					<Panel header={genHeader(item)} key='1'>
						<ChannelList />
					</Panel>
				</Collapse>
			);
		};

		return data?.map(item => renderItem(item));
	}, [data]);

	return (
		<Container fixed className={cx("dashboard")}>
			<div
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
					{renderList}
				</InfiniteScroll>
			</div>
		</Container>
	);
};

export default Relayers;
