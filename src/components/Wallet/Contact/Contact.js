import React, {memo, useMemo, useState} from "react";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import classNames from "classnames/bind";
import ContactTable from "src/components/Wallet/ContactTable/ContactTable";
import ContactTableSkeleton from "src/components/Wallet/ContactTable/ContactTableSkeleton";
import ContactCardList from "src/components/Wallet/ContactCardList/ContactCardList";
import ContactCardListSkeleton from "src/components/Wallet/ContactCardList/ContactCardListSkeleton";
import Pagination from "src/components/common/Pagination";
import EmptyTable from "src/components/common/EmptyTable";
import styles from "./Contact.scss";

const cx = classNames.bind(styles);

const Contact = memo(() => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const storageData = JSON.parse(localStorage.getItem("address")) ?? {};
	let dataLength = Object.values(storageData).length;
	const totalPages = dataLength / 5 === Math.ceil(dataLength / 5) ? dataLength / 5 : Math.ceil(dataLength / 5) ?? 0;
	const [currentPage, setPage] = useState(1);

	const getAllPageData = data => {
		let allPageData = {};
		let tempPageNumber = 1;
		Object.values(data).forEach((contact, index, arr) => {
			allPageData[tempPageNumber] = allPageData[tempPageNumber] ? allPageData[tempPageNumber] : {};
			allPageData[tempPageNumber] = Object.assign(allPageData[tempPageNumber], {
				[contact?.address]: {
					address: contact?.address,
					name: contact?.name,
				},
			});
			if ((index + 1) % 5 === 0) {
				tempPageNumber += 1;
			}
		});
		return allPageData;
	};

	const allPageData = useMemo(() => getAllPageData(storageData), []);
	let currentPageData = Object.values(allPageData[currentPage]) ?? [];

	if (!storageData) {
		return isLargeScreen ? <ContactTableSkeleton /> : <ContactCardListSkeleton />;
	}

	const onPageChange = page => {
		setPage(page);
	};

	const columns = [{title: "TxHash"}, {title: "Type"}, {title: "Result"}, {title: "Amount"}, {title: "Fee"}, {title: "Height"}, {title: "Time"}];

	return (
		<div className={cx("Contact")}>
			<div className={cx("title")}>Contact</div>
			{Array.isArray(currentPageData) && currentPageData.length > 0 ? (
				<>
					{isLargeScreen ? <ContactTable data={currentPageData} /> : <ContactCardList data={currentPageData} />}
					{totalPages > 0 && <Pagination pages={totalPages} page={currentPage} onChange={(e, page) => onPageChange(page)} />}
				</>
			) : (
				<EmptyTable columns={columns} />
			)}
		</div>
	);
});

export default Contact;
