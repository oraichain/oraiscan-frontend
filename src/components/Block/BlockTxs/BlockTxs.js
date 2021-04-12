import * as React from "react";
import cn from "classnames/bind";
import styles from "./BlockTxs.scss";

import {_, empty} from "src/lib/scripts";
//  components
import {Table, TableBody} from "@material-ui/core";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import NoTx from "src/components/common/NoTx";
import {txTableHeader} from "src/components/TxList/Table/Table";
import TxListTableRow, {TableRowThin} from "src/components/TxList/TableRow/TableRow";
import TransactionTable from "src/components/TxList/TransactionTable";
import TransactionCardList from "src/components/TxList/TransactionCardList";

const cx = cn.bind(styles);

export default function({txData}) {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	return (
		<div className={cx("BlockTxs-wrapper")}>
			<div className={cx("title")}>Transactions</div>
			{empty(txData) ? (
				<NoTx text={"No Transactions"} />
			) : (
				<>
					{/* <Table className={cx("table")}>
						{txTableHeader}
						<TableBody>
							{_.map(txData, (v, i) => (
								<TxListTableRow key={i} blockData={v} />
							))}
						</TableBody>
					</Table> */}
					{isLargeScreen ? <TransactionTable data={txData} /> : <TransactionCardList data={txData} />}
					{/* <div className={cx("thinTable")}>
						{_.map(txData, (v, i) => (
							<TableRowThin key={i} blockData={v} />
						))}
					</div> */}
				</>
			)}
		</div>
	);
}
