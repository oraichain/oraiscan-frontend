import React, {memo, useState} from "react";
import {useGet} from "restful-react";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import DelegatorTable from "src/components/Wallet/Register/DelegatorCard/DelegatorTable/DelegatorTable";
import DelegatorTableSkeleton from "src/components/Wallet/Register/DelegatorCard/DelegatorTable/DelegatorTableSkeleton";
import DelegatorCardList from "src/components/Wallet/Register/DelegatorCard/DelegatorCardList/DelegatorCardList";
import DelegatorCardListSkeleton from "src/components/Wallet/Register/DelegatorCard/DelegatorCardList/DelegatorCardListSkeleton";
import Pagination from "src/components/common/Pagination";
import NoResult from "src/components/common/NoResult";
import styles from "./DelegatorCard.module.scss";

const cx = classNames.bind(styles);

const DelegatorCard = memo(({address = ""}) => {
	const limit = consts.REQUEST.LIMIT;
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const basePath = consts.API.WALLET.DELEGATOR + "/" + address + "?limit=" + limit;
	const [path, setPath] = useState(`${basePath}&page_id=1`);
	const {data} = useGet({
		path: path,
	});

	const totalPages = Math.ceil((data?.pagination?.total ?? 0) / limit);
	const currentPage = data?.pagination?.page_id ?? 1;

	const onPageChange = page => {
		setPath(`${basePath}&page_id=${page}`);
	};

	let tableSection;
	let paginationSection;

	if (data) {
		if (Array.isArray(data?.delegator) && data.delegator.length > 0) {
			tableSection = isLargeScreen ? <DelegatorTable data={data.delegator} address={address} /> : <DelegatorCardList data={data.delegator} address={address} />;
		} else {
			tableSection = (
				<div className={cx("no-result-wrapper")}>
					<NoResult />
				</div>
			);
		}
	} else {
		tableSection = isLargeScreen ? <DelegatorTableSkeleton rows={limit} /> : <DelegatorCardListSkeleton rows={limit} />;
	}

	if (totalPages > 0) {
		paginationSection = <Pagination pages={totalPages} page={currentPage} onChange={(e, page) => onPageChange(page)} />;
	}

	return (
		<div className={cx("delegator-card")}>
			<div className={cx("delegator-card-header")}>Delegators</div>
			<div className={cx("delegator-card-body")}>
				{tableSection}
				{paginationSection}
			</div>
		</div>
	);
});

export default DelegatorCard;
