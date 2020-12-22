import React, {memo} from "react";
import classNames from "classnames/bind";
import {useHistory} from "react-router-dom";

import {ReactComponent as InfoIcon} from "src/assets/icons/information.svg";

import styles from "./Infomation.scss";

const cx = classNames.bind(styles);

const Infomation = memo(({data}) => {
	const history = useHistory();
	const {name, owner, data_sources, description} = data;
	return (
		<div className={cx("infomation")}>
			<div className={cx("title")}>
				<a href='#'> #FAKE </a> {name}
			</div>

			<div className={cx("request-response")}>
				<div className={cx("box")}>
					<div className={cx("title")}> Request </div>
					<div className={cx("value")}> 186,012 </div>
				</div>
				<div className={cx("box")}>
					<div className={cx("title")}> Response Time </div>
					<div className={cx("value")}> 8,05s </div>
				</div>
			</div>

			<div className={cx("content")}>
				<div className={cx("content__title")}>Information</div>
				<div className={cx("content__main")}>
					<div className={cx("content__owner")}>
						<span>
							<strong>Onwer</strong>
							<InfoIcon />
						</span>
						<a
							href='/'
							onClick={e => {
								e.preventDefault();
								history.push(`/account/${owner}`);
							}}>
							{owner}
						</a>
					</div>

					<div className={cx("content__owner")}>
						<span>
							<strong> Data Sources </strong>
							<InfoIcon />
						</span>
						{data_sources.map(item => (
							<a
								href='/'
								onClick={e => {
									e.preventDefault();
									history.push(`/data-sources/${item}`);
								}}>
								{" "}
								#{item}{" "}
							</a>
						))}
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

export default Infomation;
