// @ts-nocheck
import * as React from "react";
import {useState, useEffect, useRef} from "react";
import {useParams} from "react-router";
import {loadReCaptcha, ReCaptcha} from "react-recaptcha-google";
import PropTypes from "prop-types";
import cn from "classnames/bind";
import Container from "@material-ui/core/Container";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import TogglePageBar from "src/components/common/TogglePageBar";
import {useGet} from "restful-react";
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
	const currentDateUTC = moment.utc().toDate();
	currentDateUTC.setHours(0, 0, 0);
	const [startDate, setStartDate] = useState(currentDateUTC);
	const [endDate, setEndDate] = useState(currentDateUTC);
	const params = useParams();
	const account = params?.["account"];
	const [disabledSubmit, setDisabledSubmit] = useState(true);

	useEffect(() => {
		loadReCaptcha();
	}, []);

	console.log(startDate, endDate, "aaaa");

	const download = () => {
		// if (parseFloat(data?.currentFees) / 10 ** 6 > parseFloat(balance)) {
		// 	setErrorMessage(true);
		// } else {
		// 	setRequestRunning(true);
		// 	handleGetRandomValue();
		// }
		// danh();
	};

	// const danh = async () => {
	// 	const path = consts.API.EXPORT_DATA + "/" + account;
	// 	const {data} = await useGet({
	// 		path: path,
	// 	});

	// 	return data;
	// };

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
						<label className={cx("input-text")}>Export the earliest 5000 records starting from</label>
						<div className={cx("date-select")}>
							<div style={{marginRight: 20}} className={cx("date")}>
								<DatePicker
									// minDate={Date.now()}
									selected={startDate}
									endDate={startDate}
									onChange={date => {
										date.setHours(0, 0, 0);
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
										date.setHours(0, 0, 0);
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
							<ReCaptcha
								// ref={el => {
								// 	this.captchaDemo = el;
								// }}
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
						{/* <script src='https://www.google.com/recaptcha/api.js'></script> */}
						{/* <RandomnessView data={data} errorMessage={errorMessage} /> */}
						{/* <ul className={cx("info-row")}>
								<li className={cx("label-column")}>Search</li>
								<li className={cx("value-column")}>
									<input
										onChange={e => {
											setRoundValue(e.currentTarget.value);
										}}
										placeholder={"Search for round.."}
										className={cx("search")}
										value={roundValue}
									/>
									<button onClick={handleSearch} className={cx("search-button")}>
										<SearchIcon className={cx("search-button-icon")} />
									</button>
								</li>
							</ul> */}
						<>
							<div className={cx("random")}>
								<button disabled={disabledSubmit} className={cx("button-random", disabledSubmit && "button-random-disabled")} onClick={download}>
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