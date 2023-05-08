// @ts-nocheck
import Container from "@material-ui/core/Container";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import axios from "axios";
import cn from "classnames/bind";
import moment from "moment";
import PropTypes from "prop-types";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ReCaptcha } from "react-recaptcha-google";
import { useParams, useHistory, useLocation } from "react-router-dom";
import CalendarIcon from "src/assets/account/CalendarIcon";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import TitleWrapper from "src/components/common/TitleWrapper";
import TogglePageBar from "src/components/common/TogglePageBar";
import consts from "src/constants/consts";
import styles from "./ExportData.module.scss";
import { typeExport } from "../Account/Account";

const cx = cn.bind(styles);

const ExportData = props => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const currentDateUTC = moment().toDate();
	currentDateUTC.setHours(0, 0, 0, 0);
	const [startDate, setStartDate] = useState(currentDateUTC);
	const [endDate, setEndDate] = useState(currentDateUTC);
	const params = useParams();
	const location = useLocation();
	const account = params?.["account"];
	const [disabledSubmit, setDisabledSubmit] = useState(true);

	const searchParams = new URLSearchParams(location.search);
	const type = searchParams.get("type");
	const apiExportData = type === typeExport.cw20 ? consts.API.EXPORT_CW20_TRANSACTION : consts.API.EXPORT_DATA;

	const download = async () => {
		axios({
			method: "get",
			url: `${consts.API_BASE}${apiExportData}/${account}?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`,
			responseType: "arraybuffer",
		})
			.then(response => {
				var link = document.createElement("a");
				link.href = window.URL.createObjectURL(new Blob([response.data], { type: "application/octet-stream" }));
				link.download = `export-${account}.csv`;

				document.body.appendChild(link);

				link.click();
				setTimeout(function() {
					window.URL.revokeObjectURL(link);
				}, 200);
			})
			.catch(error => {});
	};

	let titleSection;
	if (isLargeScreen) {
		titleSection = (
			<Container fixed>
				<TitleWrapper>
					<PageTitle title={"Download Data"} />
					<StatusBox />
				</TitleWrapper>
			</Container>
		);
	} else {
		titleSection = <TogglePageBar type='Download Data' />;
	}

	return (
		<>
			{titleSection}
			<Container fixed className={cx("tx")}>
				<div className={cx("card")}>
					<h2 className={cx("card-header")}>The information you requested can be downloaded from this page.</h2>
					<div className={cx("card-body")}>
						<label className={cx("input-text")}>Export the latest transaction records starting from</label>
						<div className={cx("date-select")}>
							<div style={{ marginRight: 20 }} className={cx("date")}>
								<DatePicker
									selected={startDate}
									endDate={startDate}
									onChange={date => {
										setStartDate(date);
									}}
									popperClassName={cx("datepicker")}
									wrapperClassName={cx("datepicker-wrapper")}
									dateFormat='MMMM dd, yyyy'
								/>
								<CalendarIcon className={cx("calendar-icon")} />
							</div>
							<span className={cx("divider-text")}>To</span>
							<div style={{ marginLeft: 20 }} className={cx("date")}>
								<DatePicker
									selected={endDate}
									endDate={endDate}
									onChange={date => {
										setEndDate(date);
									}}
									popperClassName={cx("datepicker")}
									wrapperClassName={cx("datepicker-wrapper")}
									dateFormat='MMMM dd, yyyy'
								/>
								<CalendarIcon className={cx("calendar-icon")} />
							</div>
						</div>
						<div className={cx("captcha-wrapper")}>
							<ReCaptcha
								size='normal'
								data-theme='dark'
								render='explicit'
								sitekey='6LdnYZ8dAAAAAJfN7IqLGcmtzAc2iFrnxznJb8Zu'
								onloadCallback={() => {}}
								verifyCallback={() => {
									setDisabledSubmit(false);
								}}
							/>
						</div>
						<>
							<div className={cx("random")}>
								<button className={cx("button-random", disabledSubmit && "button-random-disabled")} onClick={disabledSubmit || download}>
									Download
								</button>
							</div>
						</>
					</div>
				</div>
			</Container>
		</>
	);
};

ExportData.propTypes = {
	data: PropTypes.any,
};

ExportData.defaultProps = {};

export default ExportData;
