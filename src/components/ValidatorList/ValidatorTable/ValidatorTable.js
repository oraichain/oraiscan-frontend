import React, {memo} from "react";
import classNames from "classnames/bind";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./ValidatorTable.scss";

const cx = classNames.bind(styles);
const headerCells = ["Rank", "Validator", "Voting power", "Cumulative Share", "Uptime", "Commission"];
const ValidatorTable = memo(({dataRows}) => {
	return <ThemedTable theme={tableThemes.LIGHT} headerCells={headerCells} dataRows={dataRows} />;
});

ValidatorTable.defaultProps = {};

export default ValidatorTable;
