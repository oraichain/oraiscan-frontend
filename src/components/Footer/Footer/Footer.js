import React, {memo} from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import classNames from "classnames/bind";
import styles from "./Footer.scss";
import TwitterIcon from "src/icons/TwitterIcon";
import TelegramIcon from "src/icons/TelegramIcon";
import CoinGeckoIcon from "src/icons/CoinGeckoIcon";
import MediumIcon from "src/icons/MediumIcon";
import CoinMarketCapIcon from "src/icons/CoinMarketCapIcon";
// import ModeSwitch from "src/components/common/ModeSwitch";

const cx = classNames.bind(styles);

const Footer = memo(() => {
	return (
		<div className={cx("footer")}>
			<div className={cx("top-section")}>
				<Container>
					<Grid container spacing={2}>
						<Grid container item lg={6} xs={12}>
							<Grid item xs={6}>
								<div className={cx("email")}>
									<div className={cx("email-function")}>General Inquiries</div>
									<div className={cx("email-address")}>contact@orai.io</div>
								</div>

								<div className={cx("email")}>
									<div className={cx("email-function")}>Technical Support</div>
									<div className={cx("email-address")}>support@orai.io</div>
								</div>
							</Grid>

							<Grid item xs={6}>
								<div className={cx("address")}>
									<p>We can be mailed at:</p>
									<p>Oraichain Pte. Ltd.</p>
									<p>68 Circular Road, #02-01,</p>
									<p>049422, Singapore</p>
								</div>
								{/* <ModeSwitch /> */}
							</Grid>
						</Grid>
						<Grid container item lg={6} xs={12}>
							<Grid item lg={4} xs={6}>
								<ul className={cx("nav")}>
									<li className={cx("nav-item")}>
										<span className={cx("nav-title")}>About</span>
									</li>
									<li className={cx("nav-item")}>
										<a className={cx("nav-link")} href='https://orai.io/presentations/intro.pdf' target='_blank'>
											Introduction
										</a>
									</li>
									<li className={cx("nav-item")}>
										<a className={cx("nav-link")} href='https://orai.io/presentations/Binance-talk-Oct28-EN.pdf' target='_blank'>
											Binance Talk
										</a>
									</li>
									<li className={cx("nav-item")}>
										<a className={cx("nav-link")} href='https://gov.orai.io/c/knowledge-base/7' target='_blank'>
											FAQ
										</a>
									</li>
									<li className={cx("nav-item")}>
										<a className={cx("nav-link")} href='https://orai.io/media-kit' target='_blank'>
											Media Kit
										</a>
									</li>
								</ul>
							</Grid>
							<Grid item lg={4} xs={6}>
								<ul className={cx("nav")}>
									<li className={cx("nav-item")}>
										<span className={cx("nav-title")}>Product</span>
									</li>
									<li className={cx("nav-item")}>
										<a className={cx("nav-link")} href='https://scan.orai.io/' target='_blank'>
											LMP
										</a>
									</li>
									<li className={cx("nav-item")}>
										<a className={cx("nav-link")} href='https://liquidity.orai.io/' target='_blank'>
											LME
										</a>
									</li>
									<li className={cx("nav-item")}>
										<a className={cx("nav-link")} href='https://yai.finance/' target='_blank'>
											yAI.Finance
										</a>
									</li>
									<li className={cx("nav-item")}>
										<a className={cx("nav-link")} href='https://market.orai.io/oscript' target='_blank'>
											Marketplace
										</a>
									</li>
									<li className={cx("nav-item")}>
										<a className={cx("nav-link")} href='https://scan.orai.io/' target='_blank'>
											Oraiscan
										</a>
									</li>
								</ul>
							</Grid>
							<Grid item lg={4} xs={6}>
								<ul className={cx("nav")}>
									<li className={cx("nav-item")}>
										<span className={cx("nav-title")}>Official Channels</span>
									</li>
									<li className={cx("nav-item")}>
										<a className={cx("nav-link")} href='https://twitter.com/oraichain' target='_blank'>
											<TwitterIcon className={cx("nav-icon")} /> Twitter
										</a>
									</li>
									<li className={cx("nav-item")}>
										<a className={cx("nav-link")} href='https://t.me/oraichain' target='_blank'>
											<TelegramIcon className={cx("nav-icon")} /> Telegram
										</a>
									</li>
									<li className={cx("nav-item")}>
										<a className={cx("nav-link")} href='https://www.coingecko.com/en/coins/oraichain-token' target='_blank'>
											<CoinGeckoIcon className={cx("nav-icon")} /> Coingecko
										</a>
									</li>
									<li className={cx("nav-item")}>
										<a className={cx("nav-link")} href='https://medium.com/oraichain' target='_blank'>
											<MediumIcon className={cx("nav-icon")} /> Medium
										</a>
									</li>
									<li className={cx("nav-item")}>
										<a className={cx("nav-link")} href='https://coinmarketcap.com/currencies/oraichain-token/' target='_blank'>
											<CoinMarketCapIcon className={cx("nav-icon")} /> CoinMarketCap
										</a>
									</li>
								</ul>
							</Grid>
						</Grid>
					</Grid>
				</Container>
			</div>
			<div className={cx("bottom-section")}>
				<Container fixed>
					<div className={cx("bottom-section-body")}>
						<div className={cx("copy-right")}>©2020 Oraichain Pte. Ltd. All rights reserved.</div>
						<ul className={cx("nav")}>
							<li className={cx("nav-item")}>
								<a className={cx("nav-link")} href='https://orai.io/privacy' target='_blank'>
									Privacy Policy
								</a>
							</li>

							<li className={cx("nav-item")}>
								<a className={cx("nav-link")} href='/' target='_blank'>
									Customer Support
								</a>
							</li>

							<li className={cx("nav-item")}>
								<a className={cx("nav-link")} href='/' target='_blank'>
									Careers
								</a>
							</li>
						</ul>
					</div>
				</Container>
			</div>
		</div>
	);
});

Footer.propTypes = {};
Footer.defaultProps = {};

export default Footer;
