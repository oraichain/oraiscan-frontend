import React, {useState, useRef} from "react";
import {useTheme} from "@material-ui/core/styles";
import {useParams} from "react-router-dom";
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
import NoResult from "src/components/common/NoResult";
import SmartContractTable from "src/components/SmartContracts/SmartContractTable";
import SmartContractTableSkeleton from "src/components/SmartContracts/SmartContractTable/SmartContractTableSkeleton";
import SmartContractCardList from "src/components/SmartContracts/SmartContractCardList";
import SmartContractCardListSkeleton from "src/components/SmartContracts/SmartContractCardList/SmartContractCardListSkeleton";
import styles from "./WasmCodeDetail.module.scss";

const cx = cn.bind(styles);

const WasmCodeDetail = () => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const params = useParams();
	const code_id = params?.["codeId"];
	const [pageId, setPageId] = useState(1);
	const totalPagesRef = useRef(null);

	const basePath = `${consts.API.WASM_CODE_BY_ID}/${code_id}`;

	const onPageChange = page => {
		setPageId(page);
	};

	const {data, loading, error} = useGet({
		path: basePath,
	});

	let titleSection;
	let paginationSection;
	let tableSection;

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

	paginationSection = totalPagesRef.current ? <Pagination pages={totalPagesRef.current} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

	paginationSection = totalPagesRef.current ? <Pagination pages={totalPagesRef.current} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

	return (
		<>
			<Container fixed className={cx("smart-contracts")}>
				{titleSection}
				{tableSection}
				{paginationSection}
			</Container>
		</>
	);
};

WasmCodeDetail.propTypes = {};
WasmCodeDetail.defaultProps = {};

export default WasmCodeDetail;
