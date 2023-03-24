import axios from "axios";
import classNames from "classnames/bind";
import moment from "moment";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCryptoStatus} from "src/store/modules/blockchain";
import styles from "./CountdownRemainingBlock.module.scss";

const cx = classNames.bind(styles);

function Countdown({ remainingBlock }) {
	const { status } = useSelector(state => state.blockchain);
	const [remainingTime, setRemainingTime] = useState(Math.round(remainingBlock * status.block_time));
	const dispatch = useDispatch();

	useEffect(() => {
		const intervalId = setInterval(() => {
			if (remainingTime > 0) {
				setRemainingTime(prevTime => prevTime - 1);
			}
			if(remainingTime < 1) {
				const cancelToken = axios.CancelToken;
				const source = cancelToken.source();
				dispatch(getCryptoStatus(source.token));
			}
		}, 1000);

		return () => clearInterval(intervalId);
	}, [remainingTime]);

	const formatTime = time => {
		const years = Math.floor(time / (365 * 24 * 60 * 60));
		time -= years * (365 * 24 * 60 * 60);
		const months = Math.floor(time / (30 * 24 * 60 * 60));
		time -= months * (30 * 24 * 60 * 60);
		const days = Math.floor(time / (24 * 60 * 60));
		time -= days * (24 * 60 * 60);
		const hours = Math.floor(time / (60 * 60));
		time -= hours * (60 * 60);
		const minutes = Math.floor(time / 60);
		const seconds = Math.round(time % 60);

		let formattedTime = "";

		if (years > 0) {
			formattedTime += `<strong>${years.toString()}</strong>Years`;
		}

		if (months > 0) {
			formattedTime += `<strong>${months.toString()}</strong>Months `;
		}

		if (days >= 0) {
			formattedTime += `<strong>${days.toString()}</strong>Days`;
		}

		if (hours >= 0) {
			formattedTime += `<strong>${hours.toString()}</strong>Hours `;
		}

		if (minutes >= 0) {
			formattedTime += `<strong>${minutes.toString()}</strong>Mins `;
		}

		if (seconds >= 0 || formattedTime === "") {
			formattedTime += `<strong>${seconds.toString()}</strong>Secs`;
		}
		const dateTimeElement = document.getElementById("datetime");
		if (dateTimeElement) {
			dateTimeElement.innerHTML = formattedTime;
		}
	};

	formatTime(remainingTime);

	const timezoneOffset = "+0700";
	const futureTime = moment()
		.add(remainingTime, "seconds")
		.utcOffset(timezoneOffset);

	return (
		<div className={cx("countdown-time")}>
			<div id='datetime'></div>
			<div className={cx("countdown-target")}>Estimated Target Date: {moment(futureTime).format(`ddd MMM DD YYYY HH:mm:ss [GMT]Z`)}</div>
		</div>
	);
}

export default Countdown; 
