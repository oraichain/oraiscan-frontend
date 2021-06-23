// @ts-nocheck
import React from "react";
import Container from "@material-ui/core/Container";
import cn from "classnames/bind";
import {useGet} from "restful-react";
import Grid from "@material-ui/core/Grid";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {NavLink, useParams, useHistory} from "react-router-dom";
import queryString from "query-string";
import {_} from "src/lib/scripts";
import consts from "src/constants/consts";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import {ReactComponent as InformationIcon} from "src/assets/icons/information.svg";
import CheckIcon from "src/icons/Validators/CheckIcon";
import TimesIcon from "src/icons/TimesIcon";
import ClockIcon from "src/icons/ClockIcon";
import NavigateBackBar from "src/components/common/NavigateBackBar";
import TogglePageBar from "src/components/common/TogglePageBar";
import RequestContainer from "./RequestContainer";
import TestCaseCard from "./TestCaseCard";
import styles from "./RequestReportDetail.scss";

const cx = cn.bind(styles);

export default function() {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const {id} = useParams();
	const history = useHistory();
	const queryStringParse = queryString.parse(history.location.search) || {};
	const address = queryStringParse?.validator_address ?? "";

	const path = `${process.env.REACT_APP_LCD_API || "https://lcd.orai.io"}/airesult/fullreq/${id}`;
	const {data, loading, error} = useGet({
		path: path,
	});

	const reportDetailsData = data?.reports?.filter(item => item?.reporter?.validator === address);

	let titleSection;
	if (isLargeScreen) {
		titleSection = (
			<Container fixed>
				<TitleWrapper>
					<PageTitle title={"Report Details"} />
					<StatusBox />
				</TitleWrapper>
			</Container>
		);
	} else {
		titleSection = (
			<>
				<TogglePageBar type='ai_requests' />
				<NavigateBackBar type='request_report' id={id} />
			</>
		);
	}

	let statusElement;
	if (_.isNil(reportDetailsData?.[0]?.resultStatus)) {
		statusElement = <div className={cx("status")}>-</div>;
	} else {
		switch (reportDetailsData?.[0]?.resultStatus) {
			case "success":
				statusElement = (
					<div className={cx("status")}>
						<CheckIcon className={cx("status-icon", "status-icon-success")} />
						<span className={cx("status-text")}>Success</span>
					</div>
				);
				break;
			case "pending":
				statusElement = (
					<div className={cx("status")}>
						<ClockIcon className={cx("status-icon", "status-icon-pending")} />
						<span className={cx("status-text")}>Pending</span>
					</div>
				);
				break;
			case "fail":
				statusElement = (
					<div className={cx("status")}>
						<TimesIcon className={cx("status-icon", "status-icon-fail")} />
						<span className={cx("status-text")}>Failed</span>
					</div>
				);
				break;
			default:
				break;
		}
	}

	return (
		<>
			{titleSection}
			<Container fixed className={cx("request-report-details")}>
				<div className={cx("data-request-table")}>
					<div className={cx("data-request-table__title")}>Report Info</div>

					<div className={cx("data-request-table__info")}>
						<div className={cx("data-request-table__info-head")}> Infomation </div>
						<div className={cx("data-request-table__info-code")}>
							<div className={cx("data-request-table__info-code-item")}>
								<div className={cx("data-request-table__info-code-item-title")}> RequestID </div>
								{_.isNil(reportDetailsData?.[0]?.requestID) ? (
									<div className={cx("data-request-table__info-code-item-content", "data-request-table__info-code-item-content-type1")}>-</div>
								) : (
									<NavLink
										className={cx("data-request-table__info-code-item-content", "data-request-table__info-code-item-content-type1")}
										to={`${consts.PATH.REQUESTS}/${reportDetailsData?.[0]?.requestID}`}>
										{reportDetailsData?.[0]?.requestID}
									</NavLink>
								)}
							</div>
							<div className={cx("data-request-table__info-code-item")}>
								<div className={cx("data-request-table__info-code-item-title", "test-cases")}>
									Test Cases <InformationIcon />
								</div>
								<div className={cx("data-request-table__info-code-item-content", "data-request-table__info-code-item-content-type1")}>
									{_.isNil(reportDetailsData?.[0]?.TestCaseResults?.[0]?.name) ? (
										<div className={cx("data-request-table__info-code-item-content", "data-request-table__info-code-item-content-type1")}>-</div>
									) : (
										<span className={cx("data-request-table__info-code-item-content", "data-request-table__info-code-item-content-type1")}>
											{reportDetailsData?.[0]?.TestCaseResults?.[0]?.name}
										</span>
									)}
								</div>
							</div>
							<div className={cx("data-request-table__info-code-item")}>
								<div className={cx("data-request-table__info-code-item-title")}> Block Height </div>
								{_.isNil(reportDetailsData?.[0]?.blockHeight) ? (
									<div className={cx("data-request-table__info-code-item-content")}>-</div>
								) : (
									<span className={cx("data-request-table__info-code-item-content")}>{reportDetailsData?.[0]?.blockHeight}</span>
								)}
							</div>
							<div className={cx("data-request-table__info-code-item")}>
								<div className={cx("data-request-table__info-code-item-title")}> Fee </div>
								{_.isNil(reportDetailsData?.[0]?.fees) ? (
									<div className={cx("data-request-table__info-code-item-content")}>-</div>
								) : (
									<span className={cx("data-request-table__info-code-item-content")}>{reportDetailsData?.[0]?.fees}</span>
								)}
							</div>
							<div className={cx("data-request-table__info-code-item")}>
								<div className={cx("data-request-table__info-code-item-title")}> Status </div>
								{statusElement}
							</div>
						</div>
					</div>

					<div className={cx("data-request-table__info", "margin-top-20")}>
						<div className={cx("data-request-table__info-head")}> Reporter </div>
						<div className={cx("data-request-table__info-code")}>
							<div className={cx("data-request-table__info-code-item")}>
								<div className={cx("data-request-table__info-code-item-title")}> Address </div>
								{_.isNil(reportDetailsData?.[0]?.reporter?.address) ? (
									<div className={cx("data-request-table__info-code-item-content")}>-</div>
								) : (
									<div className={cx("data-request-table__info-code-item-content")}>{reportDetailsData?.[0]?.reporter?.address}</div>
								)}
							</div>
							<div className={cx("data-request-table__info-code-item")}>
								<div className={cx("data-request-table__info-code-item-title")}> Name </div>
								{_.isNil(reportDetailsData?.[0]?.reporter?.name) ? (
									<div className={cx("data-request-table__info-code-item-content")}>-</div>
								) : (
									<div className={cx("data-request-table__info-code-item-content")}>{reportDetailsData?.[0]?.reporter?.name}</div>
								)}
							</div>
							<div className={cx("data-request-table__info-code-item")}>
								<div className={cx("data-request-table__info-code-item-title")}> Validator </div>
								{_.isNil(reportDetailsData?.[0]?.reporter?.validator) ? (
									<div className={cx("data-request-table__info-code-item-content")}>-</div>
								) : (
									<div className={cx("data-request-table__info-code-item-content")}>{reportDetailsData?.[0]?.reporter?.validator}</div>
								)}
							</div>
						</div>
					</div>
				</div>

				<Grid container spacing={2} className={cx("request-table-area")}>
					<Grid item lg={6} xs={12}>
						<RequestContainer data={reportDetailsData?.[0]?.DataSourceResults} loading={loading} error={error} id={id} address={address} />
					</Grid>
					<Grid item lg={6} xs={12}>
						<TestCaseCard data={reportDetailsData?.[0]?.TestCaseResults?.[0]} loading={loading} error={error} id={id} address={address} />
					</Grid>
				</Grid>
			</Container>
		</>
	);
}
