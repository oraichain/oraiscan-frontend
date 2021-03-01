import React, {useState} from "react";
import {useGet} from "restful-react";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {Button} from "@material-ui/core";
import cn from "classnames/bind";
import Pagination from "src/components/common/Pagination";
import consts from "src/constants/consts";
import styles from "./DelegatedClaim.scss";
import DelegatedTable from "./DelegatedTable";

const cx = cn.bind(styles);

export default function({setActiveTab, address}) {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const basePath = `${consts.LCD_API_BASE}${consts.LCD_API.CLAIM_REWARD}/${address}/rewards`;
	const [path, setPath] = useState(`${basePath}`);
	const {data} = useGet({
		path: path,
	});

	const {data: delegations} = useGet({
		path: `${consts.LCD_API_BASE}${consts.LCD_API.DELEGATION}/${address}`,
	});

	console.log(delegations);

	const totalPages = data?.page?.total_page ?? 0;
	const currentPage = data?.page?.page_id ?? 1;

	const onPageChange = page => {
		setPath(`${basePath}&page_id=${page}`);
	};

	return (
		<>
			<div className={cx("header")}>
				<div className={cx("title")}>Claim Reward</div>
				<Button className={cx("withdraw")} onClick={() => setActiveTab(1)}>
					Withdraw <img src={require("../../../../assets/wallet/arrow.svg")} />
				</Button>
			</div>
			<DelegatedTable rewards={data?.rewards} delegations={delegations?.delegation_responses} />
			<Pagination pages={totalPages} page={currentPage} onChange={(e, page) => onPageChange(page)} />
		</>
	);
}
