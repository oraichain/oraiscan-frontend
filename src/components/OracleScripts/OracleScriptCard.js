import React, {memo} from "react";
import Grid from "@material-ui/core/Grid";
import {useHistory} from "react-router-dom";
import classNames from "classnames/bind";
import {tableThemes} from "src/constants/tableThemes";
import TableWithPagination from "src/components/common/TableWithPagination";
import styles from "./OracleScripts.scss";

const cx = classNames.bind(styles);

const OScriptTable = memo(({oscipts, pages, onPageChange, handleSearch}) => {
	return (
		<Grid container spacing={2} className={cx("oracle-script-card-list")}>
			<Grid item md={3} sm={6} xs={12}>
				<div className={cx("card-item")}>
					<div className={cx("ordering")}> #03 </div>
					<div className={cx("title")}> Band Standard Dataset (Forex & Commodities) </div>
					<div className={cx("content")}> Band Standard Dataset oracle script for querying cryptocurrency prices </div>
					<div className={cx("request")}>
						<div className={cx("request-key")}> Requests </div>
						<div className={cx("request-value")}> 181,103 </div>
					</div>
					<div className={cx("request")}>
						<div className={cx("request-key")}> Response time </div>
						<div className={cx("request-value")}> 8.17 s </div>
					</div>
				</div>
			</Grid>
			<Grid item md={3} sm={6} xs={12}>
				<div className={cx("card-item")}>
					<div className={cx("ordering")}> #03 </div>
					<div className={cx("title")}> Band Standard Dataset (Forex & Commodities) </div>
					<div className={cx("content")}> Band Standard Dataset oracle script for querying cryptocurrency prices </div>
					<div className={cx("request")}>
						<div className={cx("request-key")}> Requests </div>
						<div className={cx("request-value")}> 181,103 </div>
					</div>
					<div className={cx("request")}>
						<div className={cx("request-key")}> Response time </div>
						<div className={cx("request-value")}> 8.17 s </div>
					</div>
				</div>
			</Grid>
			<Grid item md={3} sm={6} xs={12}>
				<div className={cx("card-item")}>
					<div className={cx("ordering")}> #03 </div>
					<div className={cx("title")}> Band Standard Dataset (Crypto) (Staging) </div>
					<div className={cx("content")}> Band Standard Dataset oracle script for querying cryptocurrency prices </div>
					<div className={cx("request")}>
						<div className={cx("request-key")}> Requests </div>
						<div className={cx("request-value")}> 181,103 </div>
					</div>
					<div className={cx("request")}>
						<div className={cx("request-key")}> Response time </div>
						<div className={cx("request-value")}> 8.17 s </div>
					</div>
				</div>
			</Grid>
			<Grid item md={3} sm={6} xs={12}>
				<div className={cx("card-item")}>
					<div className={cx("ordering")}> #03 </div>
					<div className={cx("title")}> Band Standard Dataset (Forex & Commodities) </div>
					<div className={cx("content")}> Query the latest Oil Price </div>
					<div className={cx("request")}>
						<div className={cx("request-key")}> Requests </div>
						<div className={cx("request-value")}> 181,103 </div>
					</div>
					<div className={cx("request")}>
						<div className={cx("request-key")}> Response time </div>
						<div className={cx("request-value")}> 8.17 s </div>
					</div>
				</div>
			</Grid>
		</Grid>
	);
});

export default OScriptTable;
