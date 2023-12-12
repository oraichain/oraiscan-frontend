import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import cn from "classnames/bind";
import {useEffect, useRef, useState} from "react";
import {useGet} from "restful-react";
import BlockTable from "src/components/BlockList/BlockTable";
import BlockTableSkeleton from "src/components/BlockList/BlockTable/BlockTableSkeleton";
import NoResult from "src/components/common/NoResult";
import Pagination from "src/components/common/Pagination";
import BlockCardList from "src/components/Dashboard/BlockCardList";
import BlockCardListSkeleton from "src/components/Dashboard/BlockCardList/BlockCardListSkeleton";
import BlockTableDashboard from "src/components/Dashboard/BlockTable";
import BlockTableDashboardSkeleton from "src/components/Dashboard/BlockTable/BlockTableSkeleton";
import consts from "src/constants/consts";
import {arraysEqual, calculateBefore, mergeArrays} from "src/helpers/helper";
import styles from "./BlocksCard.module.scss";

const cx = cn.bind(styles);

const BlocksTableWrapper = ({ isShowMore = false }) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [firstLoadCompleted, setFirstLoadCompleted] = useState(false);
	const [loadCompleted, setLoadCompleted] = useState(false);
	const [pageId, setPageId] = useState(1);
	const totalItemsRef = useRef(null);
	const totalPagesRef = useRef(null);
	const canRefetchRef = useRef(true);
	const prevDataRef = useRef(null);

	let timerIdRef = useRef(null);

	const cleanUp = () => {
		if (timerIdRef) {
			clearTimeout(timerIdRef.current);
		}
	};

	const onPageChange = page => {
		cleanUp();
		setFirstLoadCompleted(false);
		setLoadCompleted(false);
		setPageId(page);
	};

	if (!firstLoadCompleted) {
		prevDataRef.current = null;
	}

	let path = `${consts.API.BLOCKLIST}?limit=${consts.REQUEST.LIMIT}`;
	if (totalItemsRef.current) {
		path += "&before=" + calculateBefore(totalItemsRef.current, consts.REQUEST.LIMIT, pageId);
	}

	const { data: blocks, loading, error, refetch } = useGet({
		path: path,
		resolve: data => {
			if (!firstLoadCompleted) {
				setFirstLoadCompleted(true);
			}
			setLoadCompleted(true);
			return data;
		},
	});


	/** TODO: fetch dữ liệu 10s 1 lần
	 * SetTimeOut 10s 1 lần thực hiện setLoadingComplete false,
	 *  và Kiểm tra nếu canRefetchRef = true thì refetch lại blocks, 
	 * refetch xong thì loadComplete true => tiếp tục setTimeout
	 */
	useEffect(() => {
		if (loadCompleted) {
			timerIdRef.current = setTimeout(() => {
				if (canRefetchRef.current) {
					refetch();
				}

				setLoadCompleted(false);
			}, consts.REQUEST.TIMEOUT);
			return () => {
				cleanUp();
			};
		}
	}, [loadCompleted]);

	let tableSection;
	let paginationSection;

	/** Render table section
	 * b1: kiểm tra loading fetch data blocks
		+ true: kiểm tra firstLoadCompleted (load lần đầu) đã thành công chưa
			 	- true: thì trong lúc loading data mới sẽ render lại blocks data cũ.
				- false: thì render ra phần loading.
		+ false: kiểm tra có error không
		 		- true: hiển thị table rỗng, reset totalItem, totalPage
		 		- false: không lỗi, hiển thị table blocks data
	 */
	if (loading) {
		if (firstLoadCompleted) {
			if (isShowMore) {
				tableSection = isLargeScreen ? <BlockTable data={blocks?.data} /> : <BlockCardList data={blocks?.data} />;
			} else {
				tableSection = isLargeScreen ? <BlockTableDashboard data={blocks?.data} /> : <BlockCardList data={blocks?.data} />;
			}
		} else {
			if (isShowMore) {
				tableSection = isLargeScreen ? <BlockTableSkeleton /> : <BlockCardListSkeleton />
			} else {
				tableSection = isLargeScreen ? <BlockTableDashboardSkeleton /> : <BlockCardListSkeleton />;
			}
		}
	} else {
		if (error) {
			totalItemsRef.current = null;
			totalPagesRef.current = null;
			tableSection = <NoResult />;
		} else {
			if (!isNaN(blocks?.paging?.total)) {
				// kiểm tra tổng item hiện tại có bằng tổng item blocks get về không
				//    + false: gán giá trị mới cho totalItemsRef, totalPagesRef
				//    + true: refeth lại blocks data
				if (totalItemsRef.current != blocks.paging.total) {
					totalItemsRef.current = blocks.paging.total;
					totalPagesRef.current = Math.ceil(blocks.paging.total / consts.REQUEST.LIMIT);
					canRefetchRef.current = false;
				} else {
					canRefetchRef.current = true;
				}
			} else {
				totalItemsRef.current = null;
				totalPagesRef.current = null;
			}

			if (Array.isArray(blocks?.data) && blocks.data.length > 0) {
				if (firstLoadCompleted && prevDataRef.current !== null && !arraysEqual(prevDataRef.current, blocks.data)) {
					const key = "height";
					const mergedData = mergeArrays(blocks.data, prevDataRef.current, key);

					// render status of blocks to add effect:
					// effect = {
					// 	OUT: -1,
					// 	NONE: 0,
					// 	IN: 1}
					const rowMotions = mergedData.map((mergedItem, index) => {
						if (prevDataRef.current.find(prevItem => mergedItem[key] == prevItem[key]) && !blocks.data.find(item => mergedItem[key] == item[key])) {
							return -1;
						}

						if (!prevDataRef.current.find(prevItem => mergedItem[key] == prevItem[key]) && blocks.data.find(item => mergedItem[key] == item[key])) {
							return 1;
						}

						return 0;
					});

					// check to render column table in diffent page. ( dashboard 4 cols, /blocks: 5 cols)
					if (isShowMore) {
						tableSection = isLargeScreen ? <BlockTable data={mergedData}  rowMotions={rowMotions} /> : <BlockCardList data={blocks?.data} />;
					} else {
						tableSection = isLargeScreen ? <BlockTableDashboard data={mergedData}  rowMotions={rowMotions} /> : <BlockCardList data={blocks?.data} />;
					}
				} else {
					// check to render column table in diffent page. ( dashboard 4 cols, /blocks: 5 cols)
					if (isShowMore) {
						tableSection = isLargeScreen ? <BlockTable data={blocks?.data} /> : <BlockCardList data={blocks?.data} />;
					} else {
						tableSection = isLargeScreen ? <BlockTableDashboard data={blocks?.data} /> : <BlockCardList data={blocks?.data} />;
					}
				}
				prevDataRef.current = [...blocks.data];
			} else {
				tableSection = <NoResult />;
			}
		}
	}
	paginationSection = totalPagesRef.current ? <Pagination pages={totalPagesRef.current} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

	return (
		<>
			{tableSection}
			{paginationSection}
		</>
	);
};

export default BlocksTableWrapper;
