import * as React from "react";
import cn from "classnames/bind";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Skeleton from "react-skeleton-loader";
import {setAgoTime} from "src/lib/scripts";

import styles from "./BlocksDisplay.scss";
//  utils
import {useFetch, useTimer} from "src/hooks";
import consts from "src/constants/consts";
import {_} from "src/lib/scripts";
//  components
import ErrorPage from "src/components/common/ErrorPage";
import TableWrapper from "src/components/Dashboard/TableWrapper";
import BlockDisplayTableRow, {TableRowMobile} from "./TableRow";

const cx = cn.bind(styles);

export default function(props) {
	const [data, requestFetch] = useFetch(`${consts.API_BASE}${consts.API.BLOCKLIST}?limit=10`, "get");
	const [watching] = useTimer(true, consts.NUM.DASH_REAL_TIME_DELAY_MS);
	const isDesktop = useMediaQuery("(min-width:500px)");

	React.useEffect(() => {
		requestFetch();
	}, [watching, requestFetch]);

	const MobileTable = () => {
		return (
			<div className={cx("block-table")}>
				{_.map(data?.data?.data, (v, i) => (
					<TableRowMobile blockData={v} />
				))}
			</div>
		);
	};

	const tableHeaderRender = React.useMemo(() => {
		return (
			<TableHead>
				<TableRow>
					<TableCell className={cx("tableHeaderCell", "heightWidth")} align='left'>
						<span>Height</span>
					</TableCell>
					<TableCell className={cx("tableHeaderCell", "proposer")} align='left'>
						Proposer
					</TableCell>
					<TableCell className={cx("tableHeaderCell")} align='right'>
						Txs
					</TableCell>
					<TableCell className={cx("tableHeaderCell", "timeWidth")} align='right'>
						<span>Time</span>
					</TableCell>
				</TableRow>
			</TableHead>
		);
	}, []);
	const tableBodyRender = React.useMemo(
		() => (
			<>
				{_.map(data?.data?.data, (v, i) => (
					<BlockDisplayTableRow key={i} blockData={v} />
				))}
			</>
		),
		[data]
	);

	return React.useMemo(
		() => (
			<TableWrapper title={"Blocks"} type={1}>
				{data.error ? (
					<ErrorPage />
				) : isDesktop ? (
					<Table className={cx("BlocksDisplay-table")}>
						{tableHeaderRender}
						<TableBody>{tableBodyRender}</TableBody>
					</Table>
				) : (
					<MobileTable />
				)}
			</TableWrapper>
		),
		[data.error, isDesktop, tableHeaderRender, tableBodyRender]
	);
}
