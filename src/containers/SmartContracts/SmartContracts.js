import React, {useState, useRef} from "react";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import cn from "classnames/bind";
import {useGet} from "restful-react";
import consts from "src/constants/consts";
import TogglePageBar from "src/components/common/TogglePageBar";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import Pagination from "src/components/common/Pagination";
import SearchInput from "src/components/common/SearchInput";
import NoResult from "src/components/common/NoResult";
import SmartContractTable from "src/components/SmartContracts/SmartContractTable";
import SmartContractTableSkeleton from "src/components/SmartContracts/SmartContractTable/SmartContractTableSkeleton";
import SmartContractCardList from "src/components/SmartContracts/SmartContractCardList";
import SmartContractCardListSkeleton from "src/components/SmartContracts/SmartContractCardList/SmartContractCardListSkeleton";
import styles from "./SmartContracts.module.scss";

const cx = cn.bind(styles);

const SmartContracts = () => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	// const [keyword, setKeyword] = useState(null);
	const [pageId, setPageId] = useState(1);
	const totalPagesRef = useRef(null);

	const onPageChange = page => {
		setPageId(page);
	};

	const basePath = `${consts.API.SMART_CONTRACTS_BY_CODE}?limit=${consts.REQUEST.LIMIT}`;
	// https://api.scan.orai.io/v1/smart_contracts_by_code_id?limit=10&page_id=1
	let path = `${basePath}&page_id=${pageId}`;
	// if (keyword) {
	// 	path = `${basePath}&page_id=${pageId}&tc_name=${keyword}`;
	// } else {
	// 	path = `${basePath}&page_id=${pageId}`;
	// }

	const {data, loading, error} = useGet({
		path: path,
	});

	let titleSection;
	let filterSection;
	let tableSection;
	let paginationSection;

	if (isLargeScreen) {
		titleSection = (
			<Container fixed>
				<TitleWrapper>
					<PageTitle title='Smart contracts' />
					<StatusBox />
				</TitleWrapper>
			</Container>
		);
	} else {
		titleSection = <TogglePageBar type='smart-contracts' />;
	}

	if (loading) {
		tableSection = isLargeScreen ? <SmartContractTableSkeleton /> : <SmartContractCardListSkeleton />;
	} else {
		if (error) {
			totalPagesRef.current = null;
			tableSection = <NoResult />;
		} else {
			if (!isNaN(data?.page?.total_page)) {
				totalPagesRef.current = data.page.total_page;
			} else {
				totalPagesRef.current = null;
			}

			if (Array.isArray(data?.data) && data.data.length > 0) {
				tableSection = isLargeScreen ? <SmartContractTable data={data?.data} /> : <SmartContractCardList data={data?.data} />;
			} else {
				tableSection = <NoResult />;
			}
		}
	}

	// filterSection = (
	// 	<div className={cx("filter-section")}>
	// 		<SearchInput
	// 			className={cx("search-input")}
	// 			placeholder='Search smart contracts'
	// 			value={keyword}
	// 			onChange={e => {
	// 				setKeyword(e.target.value);
	// 			}}
	// 		/>
	// 	</div>
	// );

	paginationSection = totalPagesRef.current ? <Pagination pages={totalPagesRef.current} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

	return (
		<>
			{titleSection}
			<Container fixed className={cx("smart-contracts")}>
				{filterSection}
				{tableSection}
				{paginationSection}
			</Container>
		</>
	);
};

SmartContracts.propTypes = {};
SmartContracts.defaultProps = {};

export default SmartContracts;
