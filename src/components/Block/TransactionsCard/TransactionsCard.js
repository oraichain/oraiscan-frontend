import React from "react";
import PropTypes from "prop-types";
import cn from "classnames/bind";
import {_} from "src/lib/scripts";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import TransactionTable from "src/components/TxList/TransactionTable";
import TransactionTableSkeleton from "src/components/TxList/TransactionTable/TransactionTableSkeleton";
import TransactionCardList from "src/components/TxList/TransactionCardList";
import TransactionCardListSkeleton from "src/components/TxList/TransactionCardList/TransactionCardListSkeleton";
import EmptyTable from "src/components/common/EmptyTable";
import styles from "./TransactionsCard.module.scss";

const cx = cn.bind(styles);

const columns = [
	{title: "TxHash", align: "left"},
	{title: "Type", align: "left"},
	{title: "Result", align: "center"},
	{title: "Amount", align: "right"},
	{title: "Fee", align: "right"},
	{title: "Height", align: "right"},
	{title: "Time", align: "right"},
];

const TransactionsCard = ({data, loading, error}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

	let tableSection;

	if (loading) {
		tableSection = isLargeScreen ? <TransactionTableSkeleton /> : <TransactionCardListSkeleton />;
	} else {
		if (error) {
			tableSection = <EmptyTable columns={columns} />;
		} else {
			if (Array.isArray(data) && data.length > 0) {
				tableSection = isLargeScreen ? <TransactionTable data={data} /> : <TransactionCardList data={data} />;
			} else {
				tableSection = <EmptyTable columns={columns} />;
			}
		}
	}

	return (
		<div className={cx("transactions-card")}>
			<div className={cx("transactions-card-header")}>Transactions</div>
			<div className={cx("transactions-card-body")}>{tableSection}</div>
		</div>
	);
};

TransactionsCard.propTypes = {
	data: PropTypes.any,
	loading: PropTypes.bool,
	error: PropTypes.any,
};
TransactionsCard.defaultProps = {};

export default TransactionsCard;
