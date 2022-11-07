import React, {memo} from "react";
import classNames from "classnames/bind";

import {ReactComponent as InformationIcon} from "src/assets/icons/information.svg";

import styles from "./Information.module.scss";

const cx = classNames.bind(styles);

const Information = memo(({name, owner, description, test, isDesktop}) => {
	if (isDesktop) {
		return (
			<div className={cx("information")}>
				<div className={cx("title")}>
					<a href='/'>#FAKE</a> {name}
				</div>

				<div className={cx("content")}>
					<div className={cx("content__title")}>Information</div>
					<div className={cx("content__main")}>
						<div className={cx("content__owner")}>
							<strong>
								{" "}
								Owner <InformationIcon />{" "}
							</strong>
							<svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<path
									fillRule='evenodd'
									clipRule='evenodd'
									d='M9.6875 1.875C5.37318 1.875 1.875 5.37318 1.875 9.6875C1.875 14.0018 5.37318 17.5 9.6875 17.5C14.0018 17.5 17.5 14.0018 17.5 9.6875C17.5 5.37318 14.0018 1.875 9.6875 1.875ZM3.125 9.6875C3.125 6.06354 6.06354 3.125 9.6875 3.125C13.3115 3.125 16.25 6.06354 16.25 9.6875C16.25 13.3115 13.3115 16.25 9.6875 16.25C6.06354 16.25 3.125 13.3115 3.125 9.6875ZM8.59375 7.96875C8.24857 7.96875 7.96875 8.24857 7.96875 8.59375C7.96875 8.93893 8.24857 9.21875 8.59375 9.21875H9.21875V12.6562H8.125C7.77982 12.6562 7.5 12.9361 7.5 13.2812C7.5 13.6264 7.77982 13.9062 8.125 13.9062H11.5625C11.9077 13.9062 12.1875 13.6264 12.1875 13.2812C12.1875 12.9361 11.9077 12.6562 11.5625 12.6562H10.4688V8.59375C10.4688 8.24857 10.1889 7.96875 9.84375 7.96875H8.59375ZM9.12325 5.24929C9.29027 5.13769 9.48663 5.07812 9.6875 5.07812C9.95686 5.07812 10.2152 5.18513 10.4057 5.3756C10.5961 5.56606 10.7031 5.82439 10.7031 6.09375C10.7031 6.29462 10.6436 6.49099 10.532 6.658C10.4204 6.82502 10.2617 6.9552 10.0762 7.03207C9.89058 7.10894 9.68638 7.12905 9.48936 7.08986C9.29235 7.05068 9.11138 6.95395 8.96935 6.81191C8.82731 6.66987 8.73058 6.4889 8.69139 6.29189C8.6522 6.09488 8.67231 5.89067 8.74919 5.70509C8.82606 5.51951 8.95623 5.36089 9.12325 5.24929Z'
									fill='#9A9A9A'
								/>
							</svg>
							<a href='/'>{owner}</a>
						</div>

						<div className={cx("content__des")}>
							<div className={cx("content__des-title")}>Description</div>
							<div className={cx("content__des-content")}>{description}</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className={cx("information")}>
			<div className={cx("title")}>
				<a href='/'>#FAKE</a> {name}
			</div>
			<div className={cx("hr")}></div>
			<div className={cx("content")}>
				<div className={cx("content__main")}>
					<div className={cx("content__owner")}>
						<div>
							<strong className={cx("content__owner-title")}>
								{" "}
								Owner <InformationIcon />{" "}
							</strong>
						</div>
						<div>
							<a href='/'>{owner}</a>
						</div>
					</div>

					<div className={cx("content__des")}>
						<div className={cx("content__des-title")}>Description</div>
						<div className={cx("content__des-content")}>{description}</div>
					</div>
				</div>
			</div>
		</div>
	);
});

export default Information;
