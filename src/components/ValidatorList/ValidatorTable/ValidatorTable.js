import React, {memo} from "react";
import classNames from "classnames/bind";
import {tableThemes} from "src/constants/tableThemes";
import {formatPercentage} from "src/helpers/helper";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./ValidatorTable.scss";
import sortIcon from "src/assets/common/sort_ic.svg";
import aiIcon from "src/assets/common/ai_ic.svg";

const cx = classNames.bind(styles);

const rankHeaderCell = "Rank";
const validatorHeaderCell = (
	<>
		Validator
		<button type='button' className={cx("sort-button")} onClick={() => {}}>
			<img src={sortIcon} />
		</button>
	</>
);
const votingPowerHeaderCell = (
	<>
		Voting power
		<button type='button' className={cx("sort-button")} onClick={() => {}}>
			<img src={sortIcon} />
		</button>
	</>
);
const cumulativeShareHeaderCell = "Cumulative Share %";
const uptimeHeaderCell = (
	<>
		Uptime
		<button type='button' className={cx("sort-button")} onClick={() => {}}>
			<img src={sortIcon} />
		</button>
	</>
);
const commissionHeaderCell = (
	<>
		Commission
		<button type='button' className={cx("sort-button")} onClick={() => {}}>
			<img src={sortIcon} />
		</button>
	</>
);

const getCumulativeShareCell = (previousValue, currentValue) => {
	const totalValue = previousValue + currentValue;
	return (
		<>
			<div className={cx("previous-graph")} style={{width: previousValue + "%"}}></div>
			<div className={cx("current-graph")} style={{left: previousValue + "%", width: currentValue + "%"}}></div>
			<div className={cx("total-value")}>{totalValue} %</div>
		</>
	);
};

const headerCells = [rankHeaderCell, validatorHeaderCell, votingPowerHeaderCell, cumulativeShareHeaderCell, uptimeHeaderCell, commissionHeaderCell];
const ValidatorTable = memo(({data = []}) => {
	const dataRows = data.map(item => {
		const rankDataCell = item?.id ?? "-";
		const validatorDataCell = item?.moniker ? (
			<div className={cx("validator-cell")}>
				<img src={aiIcon} alt='' />
				{item.moniker}
			</div>
		) : (
			"-"
		);
		const votingPowerDataCell = (
			<div className={cx("voting-power-cell")}>
				<div>12,411,351</div>
				<div>6.56%</div>
			</div>
		);
		const previousValue = 10;
		const currentValue = 20;
		const cumulativeShareDataCell = getCumulativeShareCell(previousValue, currentValue);
		const uptimeDataCell = "-";
		const commissionDataCell = item?.commission_rate ? formatPercentage(item?.commission_rate) + "%" : "-";
		return [
			rankDataCell, //Rank
			validatorDataCell, //Validator
			votingPowerDataCell, // Voting Power
			cumulativeShareDataCell, // Cumulative Share
			uptimeDataCell, // Uptime
			commissionDataCell, // Commission
		];
	});

	return <ThemedTable theme={tableThemes.LIGHT} headerCells={headerCells} dataRows={dataRows} />;
});

export default ValidatorTable;
