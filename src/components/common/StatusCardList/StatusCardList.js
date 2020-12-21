import React, {memo} from "react";
import Grid from "@material-ui/core/Grid";
import cn from "classnames/bind";
import StatusCard from "src/components/common/StatusCard";
import styles from "./StatusCardList.scss";

const cx = cn.bind(styles);

const StatusCardList = memo(({data = [], minHeight = "100px"}) => (
	<Grid container spacing={2} className={cx("status-card-list")}>
		{data.map((item, index) => (
			<Grid item md={3} sm={6} xs={12}>
				<StatusCard icon={item.icon} label={item.label} key={index} value={item.value} minHeight={minHeight} />
			</Grid>
		))}
	</Grid>
));

export default StatusCardList;
