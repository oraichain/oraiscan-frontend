// @ts-nocheck
import * as React from "react";
import { useState, useEffect, useRef} from "react";
import { useParams } from "react-router-dom";
// import {ReCaptcha} from "react-recaptcha-google";
import ReCAPTCHA from "react-google-recaptcha";
import PropTypes from "prop-types";
import axios from "axios";
import cn from "classnames/bind";
import Container from "@material-ui/core/Container";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import TogglePageBar from "src/components/common/TogglePageBar";
import consts from "src/constants/consts";
import styles from "./ExportData.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarIcon from "src/assets/account/CalendarIcon";
import moment from "moment";

const cx = cn.bind(styles);

const ExportData = ({}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [showModal, setShowModal] = useState(false);
	const [txResponse, setTxResponse] = useState({});
	const currentDateUTC = moment().toDate();
	currentDateUTC.setHours(0, 0, 0, 0);
	const [startDate, setStartDate] = useState(currentDateUTC);
	const [endDate, setEndDate] = useState(currentDateUTC);
	const params = useParams();
	console.log({ params });
	const [disabledSubmit, setDisabledSubmit] = useState(true);

	// useEffect(() => {
	// 	loadReCaptcha();
	// }, []);

	const download = async () => {
		const account = params?.["account"];
		axios({
			method: "get",
			url: `${consts.API_BASE}${consts.API.EXPORT_DATA}/${account}?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`,
			responseType: "arraybuffer",
		})
			.then(response => {
				var link = document.createElement("a");
				link.href = window.URL.createObjectURL(new Blob([response.data], {type: "application/octet-stream"}));
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
							<div style={{marginRight: 20}} className={cx("date")}>
								<DatePicker
									// minDate={Date.now()}
									selected={startDate}
									endDate={startDate}
									onChange={date => {
										setStartDate(date);
									}}
									popperClassName={cx("datepicker")}
									wrapperClassName={cx("datepicker-wrapper")}
									dateFormat='MMMM dd, yyyy'
									// maxDate={new Date().setDate(new Date().getDate() + 7)}
								/>
								<CalendarIcon className={cx("calendar-icon")} />
							</div>
							<span className={cx("divider-text")}>To</span>
							<div style={{marginLeft: 20}} className={cx("date")}>
								<DatePicker
									// minDate={Date.now()}
									selected={endDate}
									endDate={endDate}
									onChange={date => {
										setEndDate(date);
									}}
									popperClassName={cx("datepicker")}
									wrapperClassName={cx("datepicker-wrapper")}
									dateFormat='MMMM dd, yyyy'
									// maxDate={new Date().setDate(new Date().getDate() + 7)}
								/>
								<CalendarIcon className={cx("calendar-icon")} />
							</div>
						</div>
						<div className={cx("captcha-wrapper")}>
							
							<ReCAPTCHA
								sitekey="6LdnYZ8dAAAAAJfN7IqLGcmtzAc2iFrnxznJb8Zu"
								onChange={() => {
									setDisabledSubmit(false)
								}}
								size='normal'
								render='explicit'
								data-theme='dark'
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
