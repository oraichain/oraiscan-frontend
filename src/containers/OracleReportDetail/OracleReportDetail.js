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
import DataSourceResults from "src/components/OracleReportDetail/DataSourceResults";
import TestCaseResults from "src/components/OracleReportDetail/TestCaseResults";
import styles from "./OracleReportDetail.scss";
import {formatOrai} from "src/helpers/helper";

const cx = cn.bind(styles);

export default function() {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const params = useParams();
	const id = params?.["id"];
	const contract = params?.["contract"];
	const history = useHistory();
	const queryStringParse = queryString.parse(history.location.search) || {};
	const address = queryStringParse?.validator_address ?? "";

	const path = `${consts.API.ORACLE_REPORT}/${address}?request_id=${id}&contract=${contract}`;
	const {data, loading, error} = useGet({
		path: path,
	});

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
	if (_.isNil(data?.status)) {
		statusElement = <div className={cx("status")}>-</div>;
	} else {
		switch (data?.status) {
			case true:
				statusElement = (
					<div className={cx("status")}>
						<CheckIcon className={cx("status-icon", "status-icon-success")} />
						<span className={cx("status-text")}>Success</span>
					</div>
				);
				break;
			case false:
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
								{_.isNil(data?.request_id) && _.isNil(data?.request_id) ? (
									<div className={cx("data-request-table__info-code-item-content", "data-request-table__info-code-item-content-type1")}>-</div>
								) : (
									<NavLink
										className={cx("data-request-table__info-code-item-content", "data-request-table__info-code-item-content-type1")}
										to={`${consts.PATH.ORACLE_REQUEST}/${data?.contract}/${data?.request_id}`}>
										{data?.request_id}
									</NavLink>
								)}
							</div>
							<div className={cx("data-request-table__info-code-item")}>
								<div className={cx("data-request-table__info-code-item-title", "test-cases")}>
									Contract <InformationIcon />
								</div>
								<div className={cx("data-request-table__info-code-item-content", "data-request-table__info-code-item-content-type1")}>
									{_.isNil(data?.contract) ? (
										<div className={cx("data-request-table__info-code-item-content", "data-request-table__info-code-item-content-type1")}>-</div>
									) : (
										<span className={cx("data-request-table__info-code-item-content", "data-request-table__info-code-item-content-type1")}>
											{data?.contract}
										</span>
									)}
								</div>
							</div>
							<div className={cx("data-request-table__info-code-item")}>
								<div className={cx("data-request-table__info-code-item-title")}> Block Height </div>
								{_.isNil(data?.block_height) ? (
									<div className={cx("data-request-table__info-code-item-content")}>-</div>
								) : (
									<span className={cx("data-request-table__info-code-item-content")}>{data?.block_height}</span>
								)}
							</div>
							<div className={cx("data-request-table__info-code-item")}>
								<div className={cx("data-request-table__info-code-item-title")}> Fee </div>
								{_.isNil(data?.fee) ? (
									<div className={cx("data-request-table__info-code-item-content")}>-</div>
								) : (
									<span className={cx("data-request-table__info-code-item-content")}>{data?.fee}</span>
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
								{_.isNil(data?.reporter_address) ? (
									<div className={cx("data-request-table__info-code-item-content")}>-</div>
								) : (
									<div className={cx("data-request-table__info-code-item-content")}>{data?.reporter_address}</div>
								)}
							</div>
							<div className={cx("data-request-table__info-code-item")}>
								<div className={cx("data-request-table__info-code-item-title")}> Name </div>
								{_.isNil(data?.reporter_name) ? (
									<div className={cx("data-request-table__info-code-item-content")}>-</div>
								) : (
									<div className={cx("data-request-table__info-code-item-content")}>{data?.reporter_name}</div>
								)}
							</div>
							<div className={cx("data-request-table__info-code-item")}>
								<div className={cx("data-request-table__info-code-item-title")}> Validator </div>
								{_.isNil(data?.reporter_validator) ? (
									<div className={cx("data-request-table__info-code-item-content")}>-</div>
								) : (
									<div className={cx("data-request-table__info-code-item-content")}>{data?.reporter_validator}</div>
								)}
							</div>
						</div>
					</div>
				</div>

				<Grid container spacing={2} className={cx("request-table-area")}>
					<Grid item lg={6} xs={12}>
						<TestCaseResults contract={contract} id={id} address={address} />
					</Grid>
					<Grid item lg={6} xs={12}>
						<TestCaseResults contract={contract} id={id} address={address} tcCheck={true} />
					</Grid>
				</Grid>
			</Container>
		</>
	);
}
