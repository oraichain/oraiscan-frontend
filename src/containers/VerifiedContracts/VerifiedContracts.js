import React, { useState, useRef } from "react";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import cn from "classnames/bind";
import { useGet } from "restful-react";
import consts from "src/constants/consts";
import TogglePageBar from "src/components/common/TogglePageBar";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import Pagination from "src/components/common/Pagination";
import NoResult from "src/components/common/NoResult";
import SmartContractTableSkeleton from "src/components/SmartContracts/SmartContractTable/SmartContractTableSkeleton";
import SmartContractCardListSkeleton from "src/components/SmartContracts/SmartContractCardList/SmartContractCardListSkeleton";
import styles from "./VerifiedContracts.module.scss";
import WasmCodeTable from "src/components/WasmCode/WasmCodeTable";
import WasmCodeCardList from "src/components/WasmCode/WasmCodeCardList/WasmCodeCardList";
import { useDispatch } from "react-redux";
import { storePageCode } from "src/store/modules/wasmcode";

const cx = cn.bind(styles);

const VerifiedContracts = () => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [wasmCodePageId, setWasmCodePageId] = useState(1);
	const wasmCodeTotalPagesRef = useRef(null);
	const dispatch = useDispatch();

	const onWasmCodePageChange = page => {
		setWasmCodePageId(page);
		dispatch(
			storePageCode({
				page: page,
				limit: consts.REQUEST.LIMIT,
			})
		);
	};

	const wasmCodePath = `${consts.API.WASM_CODE}?limit=${consts.REQUEST.LIMIT}&page_id=${wasmCodePageId}`;

	const { data: wasmCodeData, error: wasmCodeError, loading: wasmCodeLoading } = useGet({
		path: wasmCodePath,
	});

	let smartContractTitleSection;
	let paginationWasmcodeSection;
	let tableWasmcode;

	let VerifiedContractSection = (
		<TitleWrapper>
			{isLargeScreen ? (
				<>
					<PageTitle title='Verified Contracts' />
					<StatusBox />
				</>
			) : (
				<>
					<StatusBox />
					<PageTitle title='Verified Contracts' />
				</>
			)}
		</TitleWrapper>
	);

	if (isLargeScreen) {
		smartContractTitleSection = (
			<Container fixed>
				<TitleWrapper>
					<PageTitle title='Smart contracts' />
				</TitleWrapper>
			</Container>
		);
	} else {
		smartContractTitleSection = <TogglePageBar type='smart-contracts' />;
	}

	if (wasmCodeLoading) {
		tableWasmcode = isLargeScreen ? <SmartContractTableSkeleton /> : <SmartContractCardListSkeleton />;
	} else {
		if (wasmCodeError) {
			wasmCodeTotalPagesRef.current = null;
			tableWasmcode = <NoResult />;
		} else {
			if (!isNaN(wasmCodeData?.page?.total_page)) {
				wasmCodeTotalPagesRef.current = wasmCodeData.page.total_page;
			} else {
				wasmCodeTotalPagesRef.current = null;
			}

			if (Array.isArray(wasmCodeData?.data) && wasmCodeData.data.length > 0) {
				tableWasmcode = isLargeScreen ? <WasmCodeTable data={wasmCodeData?.data} /> : <WasmCodeCardList data={wasmCodeData?.data} />;
			} else {
				tableWasmcode = <NoResult />;
			}
		}
	}


	paginationWasmcodeSection = wasmCodeTotalPagesRef.current ? (
		<Pagination pages={wasmCodeTotalPagesRef.current} page={wasmCodePageId} onChange={(e, page) => onWasmCodePageChange(page)} />
	) : (
		<></>
	);

	return (
		<>
			<Container fixed className={cx("smart-contracts")}>
				{VerifiedContractSection}
			</Container>

			<Container fixed className={cx("smart-contracts")}>
				{tableWasmcode}
				{paginationWasmcodeSection}
			</Container>
		</>
	);
};

VerifiedContracts.propTypes = {};
VerifiedContracts.defaultProps = {};

export default VerifiedContracts;
