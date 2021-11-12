/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable no-undef */
import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import cn from "classnames/bind";
import {_} from "src/lib/scripts";
import NumberFormat from "react-number-format";
import {Tooltip} from "@material-ui/core";
import CheckIcon from "src/icons/CheckIcon";
import TimesIcon from "src/icons/TimesIcon";
import {getTotalTime, setAgoTime} from "src/lib/scripts";
import {pricePair} from "src/constants/priceFeed";
import {priceFeedNetworks} from "src/constants/priceFeed";
import TransactionModal from "../Transactions";
import styles from "./PriceFeedsGridView.module.scss";
import {isNil} from "lodash";

const cx = cn.bind(styles);

const PriceFeedsGridView = ({priceData, lastUpdate, keyword, requestData, network}) => {
	const [showData, setShowData] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [renewTimeAgo, setRenewTimeAgo] = useState(0);
	const bscRef = useRef();
	const polygonRef = useRef();

	useEffect(() => {
		if (!isNil(priceData)) {
			let newData = [];
			if (keyword) {
				priceData.map(v => {
					if (v.name.toLowerCase().includes(keyword.toLowerCase())) {
						v.price > 0 ? newData.push({...v, status: "Active"}) : newData.push({...v, status: "Inactive"});
					}
				});
			} else {
				priceData.map(v => {
					v.price > 0 ? newData.push({...v, status: "Active"}) : newData.push({...v, status: "Inactive"});
				});
			}

			setShowData(newData);
		}
	}, [priceData, keyword]);

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleOpenModal = () => {
		if (network === priceFeedNetworks.BSC_TESTNET) {
			return bscRef?.current?.click();
		}

		if (network === priceFeedNetworks.POLYGON) {
			return polygonRef?.current?.click();
		}

		setShowModal(true);
	};

	useEffect(() => {
		const renewInterval = setInterval(() => {
			setRenewTimeAgo(v => v + 1);
		}, 5000);
		return () => {
			clearInterval(renewInterval);
		};
	}, []);

	return (
		<div className={cx("price-feeds")}>
			<div className={cx("price-feeds-header")}>
				<span className={cx("price-feeds-header-name")}>Offer the precise and fast prices of famous cryptocurrencies powered by the AI Oracle technology.</span>
			</div>
			<a
				href='https://testnet.bscscan.com/address/0x13F54d67Fa23AB3CAaeF681553cD996f7E9d6237#internaltx'
				ref={bscRef}
				className={cx("bsc-link")}
				target='_blank'
				rel='noopener noreferrer'
			/>

			<a
				href='https://mumbai.polygonscan.com/address/0x95Fc3900DF04103abd466F276ff8DF98508af708#code'
				ref={polygonRef}
				className={cx("bsc-link")}
				target='_blank'
				rel='noopener noreferrer'
			/>

			<div className={cx("price-feeds-body")}>
				<Grid container spacing={2}>
					{showData?.map(({name, price, status}, key) => {
						return (
							<Grid item lg={3} md={4} sm={12} xs={12} key={key}>
								<div className={cx("price-feeds-card")}>
									<div className={cx("price-feeds-card-pair")}>
										<img src={`/icons/price-feed/${name}.png`} className={cx("price-feeds-card-pair-icon")} alt='' />
										<div className={cx("price-feeds-card-pair-text")}>{name} / USD</div>
									</div>
									<div className={cx("price-feeds-card-price")} onClick={handleOpenModal}>
										<NumberFormat value={price.toFixed(7)} displayType={"text"} thousandSeparator={true} prefix='$' />
									</div>
									<div className={cx("price-feeds-card-info")}>
										<div className={cx("price-feeds-card-info-item")}>
											<div className={cx("price-feeds-card-info-item-wrap")}>
												<div className={cx("price-feeds-card-info-item")}>
													<div className={cx("price-feeds-card-info-item-header")}>Status</div>
													<div className={cx("price-feeds-card-info-item-wrap-body")}>
														{status === "Active" ? (
															<CheckIcon className={cx("status-icon", "status-icon-active")} />
														) : (
															<TimesIcon className={cx("status-icon", "status-icon-inactive")} />
														)}
														<div className={cx("status-text")}>{status}</div>
													</div>
												</div>
												<div className={cx("price-feeds-card-info-item")}>
													<div className={cx("price-feeds-card-info-item-header")}>Last updated</div>
													<div className={cx("price-feeds-card-info-item-body")}>
														<Tooltip title={`${getTotalTime(lastUpdate)}`} arrow placement='top-start'>
															<span> {setAgoTime(lastUpdate)} </span>
														</Tooltip>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</Grid>
						);
					})}
				</Grid>
			</div>

			<TransactionModal open={showModal} closeDialog={handleCloseModal} requestData={requestData} />
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
