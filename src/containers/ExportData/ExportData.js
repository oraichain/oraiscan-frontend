// @ts-nocheck
import * as React from "react";
import {useState, useEffect, useRef} from "react";
import {useParams} from "react-router";
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

const cx = cn.bind(styles);

const ExportData = ({}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [showModal, setShowModal] = useState(false);
	const [txResponse, setTxResponse] = useState({});
	const [startDate, setStartDate] = useState(Date.now());
	const [endDate, setEndDate] = useState(Date.now());
	const params = useParams();
	const account = params?.["account"];

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
									minDate={Date.now()}
									selected={startDate}
									endDate={startDate}
									onChange={date => {
										setStartDate(date);
									}}
									popperClassName={cx("datepicker")}
									wrapperClassName={cx("datepicker-wrapper")}
									dateFormat='MMMM d, yyyy h:mm aa'
									// maxDate={new Date().setDate(new Date().getDate() + 7)}
								/>
								<CalendarIcon className={cx("calendar-icon")} />
							</div>
							<span className={cx("divider-text")}>To</span>
							<div style={{marginLeft: 20}} className={cx("date")}>
								<DatePicker
									minDate={Date.now()}
									selected={endDate}
									endDate={endDate}
									onChange={date => {
										setEndDate(date);
									}}
									popperClassName={cx("datepicker")}
									wrapperClassName={cx("datepicker-wrapper")}
									dateFormat='MMMM d, yyyy h:mm aa'
									// maxDate={new Date().setDate(new Date().getDate() + 7)}
								/>
								<CalendarIcon className={cx("calendar-icon")} />
							</div>
						</div>
						<script src='https://www.google.com/recaptcha/api.js'></script>
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
								<div className={cx("button-random")} onClick={download}>
									Download
								</div>
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
