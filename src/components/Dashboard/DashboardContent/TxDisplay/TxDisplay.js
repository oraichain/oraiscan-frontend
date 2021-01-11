import * as React from "react";
import cn from "classnames/bind";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import consts from "src/constants/consts";
import {_} from "src/lib/scripts";
import {useFetch, useTimer} from "src/hooks";
import ErrorPage from "src/components/common/ErrorPage";
import TableWrapper from "src/components/Dashboard/TableWrapper";
import TxDisplayTableRow, {TableRowMobile} from "./TableRow";
import styles from "./TxDisplay.scss";

const cx = cn.bind(styles);

export default function(props) {
	const [data, requestFetch] = useFetch(`${consts.API_BASE}${consts.API.TXLIST}?limit=10`, "get");
	const isDesktop = useMediaQuery("(min-width:500px)");

	const [watching] = useTimer(true, consts.NUM.DASH_REAL_TIME_DELAY_MS);

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

	const tableHeaderRender = React.useMemo(
		() => (
			<TableHead>
				<TableRow>
					<TableCell className={cx("tableHeaderCell", "txHashWidth")} align='left'>
						<span>Tx hash</span>
					</TableCell>
					<TableCell className={cx("tableHeaderCell", "typeWidth")} align='left'>
						Type
					</TableCell>
					<TableCell className={cx("tableHeaderCell", "height")} align='right'>
						Height
					</TableCell>
					<TableCell className={cx("tableHeaderCell", "timeWidth")} align='right'>
						<span>Time</span>
					</TableCell>
				</TableRow>
			</TableHead>
		),
		[]
	);

	const tableBodyRender = React.useMemo(
		() => (
			<TableBody>
				{_.map(data?.data?.data, (v, i) => (
					<TxDisplayTableRow key={i} blockData={v} />
				))}
			</TableBody>
		),
		[data]
	);

	return React.useMemo(
		() => (
			<TableWrapper title={"Transactions"} type={2}>
				{data.error ? (
					<ErrorPage />
				) : isDesktop ? (
					<Table className={cx("TxDisplay-table")}>
						{tableHeaderRender}
						{tableBodyRender}
					</Table>
				) : (
					<MobileTable />
				)}
			</TableWrapper>
		),
		[data.error, isDesktop, tableHeaderRender, tableBodyRender]
	);
}
