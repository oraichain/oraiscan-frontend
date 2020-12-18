import React, {useState, useEffect} from "react";
import {Poll} from "restful-react";
import Container from "@material-ui/core/Container";
import cn from "classnames/bind";
import consts from "src/constants/consts";
import {calculateBefore, calculateAfter} from "src/helpers/helper";
import {_} from "src/lib/scripts";
import Spinner from "src/components/common/Spinner";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import Pagination from "src/components/common/Pagination";
import TransactionTable from "src/components/TxList/TransactionTable";
import styles from "./TxList.scss";

const cx = cn.bind(styles);
const defaultPath = `${consts.API.TXLIST}?limit=${consts.REQUEST.LIMIT}`;

export default function(props) {
	const [currentPage, setCurrentPage] = useState(1);
	const [path, setPath] = useState(defaultPath);

	return (
		<Poll
			path={path}
			resolve={response => response}
			interval={consts.REQUEST.INTERVAL}
			// requestOptions={(url, method, requestBody) => ({
			// 	headers: {
			// 		[""]: "",
			// 	}
			// })}
		>
			{(response, {loading, polling}) => {
				if (!response) {
					return (
						<Container fixed className={cx("tx-list")}>
							<TitleWrapper>
								<PageTitle title={"Transactions"} />
							</TitleWrapper>
							<Spinner />
						</Container>
					);
				}

				const total = _.isNil(response?.paging?.total) ? 0 : Math.ceil(parseInt(response.paging.total));
				const totalPages = Math.ceil(total / consts.REQUEST.LIMIT);

				const onPageChange = page => {
					setPath(defaultPath + "&before=" + calculateBefore(total, consts.REQUEST.LIMIT, page));
					setCurrentPage(page);
				};

				return (
					<Container fixed className={cx("tx-list")}>
						<TitleWrapper>
							<PageTitle title={"Transactions"} />
							<StatusBox />
						</TitleWrapper>
						<TransactionTable data={response.data} />
						{totalPages > 0 && <Pagination pages={totalPages} page={currentPage} onChange={(e, page) => onPageChange(page)} />}
					</Container>
				);
			}}
		</Poll>
	);
}
