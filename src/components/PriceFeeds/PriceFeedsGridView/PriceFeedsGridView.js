import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import cn from "classnames/bind";
import {_} from "src/lib/scripts";
import NumberFormat from "react-number-format";
import CheckIcon from "src/icons/CheckIcon";
import TimesIcon from "src/icons/TimesIcon";
import {getTotalTime, setAgoTime} from "src/lib/scripts";
import styles from "./PriceFeedsGridView.module.scss";

const cx = cn.bind(styles);

const PriceFeedsGridView = ({data, lastUpdate}) => {
	const [initData, setInitData] = useState([
		{
			name: "BTC",
			price: 0,
			status: "Inactive",
		},
		{
			name: "ETH",
			price: 0,
			status: "Inactive",
		},
		{
			name: "BNB",
			price: 0,
			status: "Inactive",
		},
		{
			name: "XRP",
			price: 0,
			status: "Inactive",
		},
		{
			name: "DOGE",
			price: 0,
			status: "Inactive",
		},
		{
			name: "LINK",
			price: 0,
			status: "Inactive",
		},
		{
			name: "UNI",
			price: 0,
			status: "Inactive",
		},
		{
			name: "USDC",
			price: 0,
			status: "Inactive",
		},
		{
			name: "BUSD",
			price: 0,
			status: "Inactive",
		},
		{
			name: "DAI",
			price: 0,
			status: "Inactive",
		},
		{
			name: "USDT",
			price: 0,
			status: "Inactive",
		},
		{
			name: "ORAI",
			price: 0,
			status: "Inactive",
		},
	]);

	useEffect(() => {
		const newData = initData.map(value => {
			const findedPair = data.find(v => v.name === value.name);
			if (findedPair) {
				value = {...value, ...findedPair, status: "Active"};
			}
			return value;
		});
		setInitData(newData);
	}, [data]);

	return (
		<div className={cx("price-feeds")}>
			<div className={cx("price-feeds-header")}>
				<span className={cx("price-feeds-header-name")}>Offer the precise and fast prices of famous cryptocurrencies powered by the AI Oracle technology.</span>
			</div>

			<div className={cx("price-feeds-body")}>
				<Grid container spacing={2}>
					{initData?.map(({name, price, status}, key) => {
						return (
							<Grid item lg={3} md={4} sm={12} xs={12} key={key}>
								<div className={cx("price-feeds-card")}>
									<div className={cx("price-feeds-card-pair")}>
										<img src={`/icons/price-feed/${name}.svg`} className={cx("price-feeds-card-pair-icon")} alt='' />
										<div className={cx("price-feeds-card-pair-text")}>{name} / USD</div>
									</div>
									<div className={cx("price-feeds-card-price")}>
										<NumberFormat value={price.toFixed(7)} displayType={"text"} thousandSeparator={true} prefix='$' />
									</div>
									<div className={cx("price-feeds-card-info")}>
										<div className={cx("price-feeds-card-info-item")}>
											<div className={cx("price-feeds-card-info-item-header")}>Status</div>
											<div className={cx("price-feeds-card-info-item-body")}>
												{status === "Active" ? (
													<CheckIcon className={cx("status-icon", "status-icon-active")} />
												) : (
													<TimesIcon className={cx("status-icon", "status-icon-inactive")} />
												)}
												<div className={cx("status-text")}>{status}</div>
											</div>
										</div>
										<div className={cx("price-feeds-card-info-item")}>
											<div className={cx("price-feeds-card-info-item-header")}>Last update</div>
											<div className={cx("price-feeds-card-info-item-body")}>{setAgoTime(lastUpdate) + " (" + getTotalTime(lastUpdate) + ")"}</div>
										</div>
									</div>
								</div>
							</Grid>
						);
					})}
				</Grid>
			</div>
		</div>
	);
};

PriceFeedsGridView.propTypes = {
	data: PropTypes.any,
};
PriceFeedsGridView.defaultProps = {
	data: [],
};

export default PriceFeedsGridView;
