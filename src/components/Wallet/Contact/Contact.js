import React, {memo, useMemo, useState} from "react";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import classNames from "classnames/bind";
import ContactTable from "src/components/Wallet/ContactTable/ContactTable";
import ContactTableSkeleton from "src/components/Wallet/ContactTable/ContactTableSkeleton";
import ContactCardList from "src/components/Wallet/ContactCardList/ContactCardList";
import ContactCardListSkeleton from "src/components/Wallet/ContactCardList/ContactCardListSkeleton";
import Pagination from "src/components/common/Pagination";
import NoResult from "src/components/common/NoResult";
import {useSelector} from "src/hooks";
import styles from "./Contact.scss";

const cx = classNames.bind(styles);

const Contact = memo(() => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const contactStorageData = useSelector(state => state.contact);
	let dataLength = Object.values(contactStorageData).length;
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

	const allPageData = useMemo(() => getAllPageData(contactStorageData), [contactStorageData]);
	let currentPageData = Object.values(allPageData[currentPage] || {}) ?? [];

	if (!contactStorageData) {
		return isLargeScreen ? <ContactTableSkeleton /> : <ContactCardListSkeleton />;
	}

	const onPageChange = page => {
		setPage(page);
	};

	return (
		<div className={cx("Contact")}>
			<div className={cx("title")}>Contact</div>
			{Array.isArray(currentPageData) && currentPageData.length > 0 ? (
				<>
					{isLargeScreen ? <ContactTable data={currentPageData} /> : <ContactCardList data={currentPageData} />}
					{totalPages > 0 && <Pagination pages={totalPages} page={currentPage} onChange={(e, page) => onPageChange(page)} />}
				</>
			) : (
				<NoResult />
			)}
		</div>
	);
});

export default Contact;
