import React, {memo, useEffect, useState} from "react";
import {useGet} from "restful-react";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import classNames from "classnames/bind";
import Pagination from "src/components/common/Pagination";
import NoResult from "src/components/common/NoResult";
import CwTable from "./CwTable";
import CwTableSkeleton from "./CwTable/CwTableSkeleton";
import CwCardSkeleton from "./CwCard/CwCardSkeleton";
import {getListCwToken} from "src/lib/api";
import CwCard from "./CwCard";
import styles from "./CwToken.scss";

const cx = classNames.bind(styles);

const CwToken = memo(({account = "", address = ""}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [dataCw, setDataCw] = useState({
		data: [],
		page: {
			limit: 10,
			page_id: 1,
		},
	});
	const {data, page} = dataCw;
	const [path, setPath] = useState(() => {
		return getListCwToken(address, page);
	});

	const {data: dataRes} = useGet({
		path,
	});

	useEffect(() => {
		if (dataRes) {
			setDataCw({
				...dataCw,
				data: dataRes?.data,
				page: {
					...dataCw.page,
					...dataRes?.page,
				},
			});
		}
	}, [dataRes]);

	const totalPages = page?.total_page ?? 0;
	const currentPage = page?.page_id ?? 1;

	const onPageChange = (newPage) => {
		const pageObj = {
			...page,
			page_id: newPage,
		};
		setPath(getListCwToken(address, pageObj));
	};

	const tableSekeleton = () => {
		return isLargeScreen ? <CwTableSkeleton /> : <CwCardSkeleton />;
	};

	return (
		<div className={cx("cw20")}>
			{!dataRes ? (
				tableSekeleton()
			) : Array.isArray(data) && data.length > 0 ? (
				<>
					{isLargeScreen ? <CwTable data={data} account={account} address={address} /> : <CwCard data={data} account={account} address={address} />}
					{totalPages > 0 && <Pagination pages={totalPages} page={currentPage} onChange={(e, page) => onPageChange(page)} />}
				</>
			) : (
				<NoResult />
			)}
		</div>
	);
});

export default CwToken;
