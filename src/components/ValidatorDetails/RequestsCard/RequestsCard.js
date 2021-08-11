import React, {useState, useRef} from "react";
import PropTypes from "prop-types";
import cn from "classnames/bind";
import consts from "src/constants/consts";
import styles from "./RequestsCard.module.scss";
import {useGet} from "restful-react";
import Skeleton from "@material-ui/lab/Skeleton";
import RequestGridViewSkeleton from "src/components/Requests/RequestGridView/RequestGridViewSkeleton";
import RequestGridView from "src/components/ValidatorDetails/RequestGridView";
import RequestList from "../RequestList";
import {formatInteger} from "src/helpers/helper";
import Container from "@material-ui/core/Container";
import Pagination from "src/components/common/Pagination";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";

const cx = cn.bind(styles);

const RequestsCard = ({operatorAddress}) => {
	const [pageId, setPageId] = useState(1);
	const totalPagesRef = useRef(null);

	const onPageChange = page => {
		setPageId(page);
	};

	const basePath = `${consts.API.REQUESTS_VALIDATOR}/${operatorAddress}?limit=${consts.REQUEST.LIMIT}`;
	let path = `${basePath}&page_id=${pageId}`;

	const {data, loading, error} = useGet({
		path: path,
	});

	let requestList;
	let paginationSection;

	if (loading) {
		requestList = (
			<RequestList totalItems={<Skeleton className={cx("skeleton")} variant='text' width={24} height={30} />}>{<RequestGridViewSkeleton />}</RequestList>
		);
	} else if (error) {
		totalPagesRef.current = null;
		requestList = <RequestList totalItems='-'>{<RequestGridView data={[]} />}</RequestList>;
	} else {
		if (!isNaN(data?.page?.total_page)) {
			totalPagesRef.current = data.page.total_page;
		} else {
			totalPagesRef.current = null;
		}

		if (Array.isArray(data?.data) && data.data.length > 0) {
			requestList = (
				<RequestList totalItems={isNaN(data?.page?.total_item) ? "-" : formatInteger(data?.page?.total_item)}>{<RequestGridView data={data} />}</RequestList>
			);
		} else {
			requestList = <RequestList totalItems='-'>{<RequestGridView data={[]} />}</RequestList>;
		}
	}

	paginationSection = totalPagesRef.current ? <Pagination pages={totalPagesRef.current} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

	return (
		<Container fixed className={cx("requests")}>
			{requestList}
			{paginationSection}
		</Container>
	);
};

RequestsCard.propTypes = {
	totalItems: PropTypes.any,
	children: PropTypes.any,
};
RequestsCard.defaultProps = {
	totalItems: "-",
};

export default RequestsCard;
