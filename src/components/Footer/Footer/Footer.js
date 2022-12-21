import React, {memo} from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import classNames from "classnames/bind";
import TwitterIcon from "src/icons/TwitterIcon";
import FooterBackground from "src/assets/footer/footer_background.jpg";
import DecorIconDark from "src/assets/footer/decor-icon-dark.png";
import DecorIconLight from "src/assets/footer/decor-icon-light.png";
import TelegramIcon from "src/icons/TelegramIcon";
import CoinGeckoIcon from "src/icons/CoinGeckoIcon";
import DiscordIcon from "src/icons/DiscordIcon";
import GitHubIcon from "src/icons/GitHubIcon";
import MediumIcon from "src/icons/MediumIcon";
import CoinMarketCapIcon from "src/icons/CoinMarketCapIcon";
import ModeSwitch from "src/components/common/ModeSwitch";
import OraiLogo from "src/icons/OraiLogo";
import {ThemeSetup} from "src/helpers/helper";
import styles from "./Footer.module.scss";
import logoXmasLight from "src/assets/header/orai-xmas_light.svg";
const cx = classNames.bind(styles);

const Footer = memo(() => {
	const {isDarkTheme} = ThemeSetup();

	return (
		<div className={cx("footer")}>
			<img src={isDarkTheme ? DecorIconDark : DecorIconLight} className={cx("decor-icon")} />
			<img style={{opacity: isDarkTheme ? "0.3" : "1"}} src={FooterBackground} className={cx("background")} />
			<div className={cx("top-section")}>
				<Container>
					<Grid className={cx("top-section-grid")} container spacing={2}>
						<Grid className={cx("top-section-grid-1")} container item lg={3} xs={12}>
							<Grid item xs={12}>
								<div className={cx("intro")}>
									{/* <OraiLogo className={cx("intro-logo")} /> */}
									<img style={{ width: 195, height: 45}} src={logoXmasLight}></img>
									<div className={cx("intro-description")}>
										A search engine for data and service information within Oraichain network - AI Layer 1 for Data Economy and Oracle Services
									</div>
								</div>

								{/* <div className={cx("email")}>
									<div className={cx("email-function")}>Technical Support</div>
									<div className={cx("email-address")}>support@orai.io</div>
								</div> */}
							</Grid>

							{/* <Grid item xs={6}>
								<ModeSwitch />
							</Grid> */}
						</Grid>
						<Grid className={cx("top-section-grid-1")} container spacing={1} item lg={8} xs={12}>
							<Grid item lg={3} xs={6}>
								<ul className={cx("nav")}>
									<li className={cx("nav-item")}>
										<span className={cx("nav-title")}>Token</span>
									</li>
									<li className={cx("nav-item")}>
										<a className={cx("nav-link")} href='https://www.kucoin.com/trade/ORAI-USDT' target='_blank'>
											Get ORAI
										</a>
									</li>
									<li className={cx("nav-item")}>
										<a className={cx("nav-link")} href='https://scan.orai.io/validators' target='_blank'>
											Stake ORAI
										</a>
									</li>
									<li className={cx("nav-item")}>
										<a className={cx("nav-link")} href='https://blog.orai.io/introduction-to-oraichain-mobile-wallet-3e4f7cf4d331' target='_blank'>
											Oraichain Wallet
										</a>
									</li>
									<li className={cx("nav-item")}>
										<a className={cx("nav-link")} href='https://scan.orai.io/' target='_blank'>
											Oraichain Explorer
										</a>
									</li>
								</ul>
							</Grid>
							<Grid item lg={3} xs={6}>
								<ul className={cx("nav")}>
									<li className={cx("nav-item")}>
										<span className={cx("nav-title")}>Ecosystem</span>
									</li>
									<li className={cx("nav-item")}>
										<a className={cx("nav-link")} href='https://docs.orai.io/readme/system-overview' target='_blank'>
											Network
										</a>
									</li>
									<li className={cx("nav-item")}>
										<a className={cx("nav-link")} href='https://docs.orai.io/vrf/introduction' target='_blank'>
											Oraichain VRF 2.0
										</a>
									</li>
									<li className={cx("nav-item")}>
										<a className={cx("nav-link")} href='https://blog.orai.io/-eb20ca5c93fe' target='_blank'>
											OraiDEX
										</a>
									</li>
									<li className={cx("nav-item")}>
										<a
											className={cx("nav-link")}
											href='https://blog.orai.io/oraichain-data-hub-the-fundamental-hub-to-empower-data-economy-4b560bdc4752'
											target='_blank'>
											Data Hub
										</a>
									</li>
									<li className={cx("nav-item")}>
										<a
											className={cx("nav-link")}
											href='https://oraichain.cloudflareaccess.com/cdn-cgi/access/login/market.orai.io?kid=ad5fbc341766f2257f65061abedbdbaad4c14402b576d0ce269e6dbdc78ee7ca&redirect_url=%2F&meta=eyJraWQiOiI5MGJjNWNiOTMyZGYxYTlkYzEzMjk5ZDdhOTc1MDEwMWQwYzFhNzAzZDE1OTRiMzQ2YjQwOGFmZjFlOTZjYzBmIiwiYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1QifQ.eyJzZXJ2aWNlX3Rva2VuX3N0YXR1cyI6ZmFsc2UsImlhdCI6MTY0Nzk0NDY4Miwic2VydmljZV90b2tlbl9pZCI6IiIsImF1ZCI6ImFkNWZiYzM0MTc2NmYyMjU3ZjY1MDYxYWJlZGJkYmFhZDRjMTQ0MDJiNTc2ZDBjZTI2OWU2ZGJkYzc4ZWU3Y2EiLCJob3N0bmFtZSI6Im1hcmtldC5vcmFpLmlvIiwidHlwZSI6Im1ldGEiLCJuYmYiOjE2NDc5NDQ2ODIsInJlZGlyZWN0X3VybCI6IlwvIiwiaXNfZ2F0ZXdheSI6ZmFsc2UsImlzX3dhcnAiOmZhbHNlLCJhdXRoX3N0YXR1cyI6Ik5PTkUifQ.WI5uqxIJbpn9XPnDiu25v8p92vI70xR7b9UxOKnIr8Q9atb7eq9G1XU6P3IWwIKMB-ZXZoS5aZ9EJl3EKDNXp59qKrfuoLdguxV4ixRIpMy6mYJxlyoM5wSAlE-QkuId7I0XQWzNCNFUDI3ye4nIhh63dQwGzZcUx3sk8cfN-b6Tp7IiSu8xNzBzZtq0iTxWye6Y2wYRr8t15ADO_Hf_4dfDymwpEg3xxyP9TtXmGAwz8S4Bc9P5o7IAUv6c0SLawAvu16128CgTA_BSAbMbfmoG4JNpGS1BrsdzTQgO6PNp11JDv24UJgh35myTC-h_8FjhTHNwSIPDamZQOi2kYQ'
											target='_blank'>
											AI Marketplace
										</a>
									</li>
									<li className={cx("nav-item")}>
										<a className={cx("nav-link")} href='https://airight.io/' target='_blank'>
											aiRight
										</a>
									</li>
									<li className={cx("nav-item")}>
										<a className={cx("nav-link")} href='https://blog.orai.io/oraichain-roadmap-for-2022-3a6fca7ace86' target='_blank'>
											Other DApps
										</a>
									</li>
								</ul>
							</Grid>
							<Grid item lg={3} xs={6}>
								<ul className={cx("nav")}>
									<li className={cx("nav-item")}>
										<span className={cx("nav-title")}>Resources</span>
									</li>
									<li className={cx("nav-item")}>
										<a className={cx("nav-link")} href='https://docs.orai.io/' target='_blank'>
											Whitepaper
										</a>
									</li>
									<li className={cx("nav-item")}>
										<a className={cx("nav-link")} href='https://drive.google.com/file/d/1jiU7gzBD8DqqecRh_CkS3pI7bv_qTJ6B/view' target='_blank'>
											Media Kit
										</a>
									</li>
									<li className={cx("nav-item")}>
										<a className={cx("nav-link")} href='mailto:contact@orai.io' target='_blank'>
											Contact
										</a>
									</li>
									<li className={cx("nav-item")}>
										<a className={cx("nav-link")} href='https://blog.orai.io/' target='_blank'>
											Blog
										</a>
									</li>
								</ul>
							</Grid>
							<Grid item lg={3} xs={6}>
								<ul className={cx("nav")}>
									<li className={cx("nav-item")}>
										<span className={cx("nav-title")}>Build</span>
									</li>
									<li className={cx("nav-item")}>
										<a className={cx("nav-link")} href='https://docs.orai.io/developers/networks/mainnet/become-a-validator' target='_blank'>
											Validators
										</a>
									</li>
									<li className={cx("nav-item")}>
										<a className={cx("nav-link")} href='https://docs.orai.io/developers/executors/ai-executor' target='_blank'>
											Executors
										</a>
									</li>
									<li className={cx("nav-item")}>
										<a
											className={cx("nav-link")}
											href='https://blog.orai.io/oraichain-x-cosmwasm-building-open-source-ide-for-developers-of-cosmos-sdk-chains-793311f2f4be'
											target='_blank'>
											CosmWasm IDE
										</a>
									</li>
								</ul>
							</Grid>
						</Grid>
					</Grid>
					<div className={cx("social-section")}>
						<div className={cx("social-section-link")}>
							<a className={cx("nav-link", "social-link")} href='https://t.me/oraichain' target='_blank'>
								<TelegramIcon className={cx("nav-icon")} />
							</a>
							<a className={cx("nav-link", "social-link")} href='https://twitter.com/oraichain' target='_blank'>
								<TwitterIcon className={cx("nav-icon")} />
							</a>
							<a className={cx("nav-link", "social-link")} href='https://www.coingecko.com/en/coins/oraichain-token' target='_blank'>
								<DiscordIcon className={cx("nav-icon")} />
							</a>
							<a className={cx("nav-link", "social-link")} href='https://www.coingecko.com/en/coins/oraichain-token' target='_blank'>
								<GitHubIcon className={cx("nav-icon")} />
							</a>
							<a className={cx("nav-link", "social-link")} href='https://coinmarketcap.com/currencies/oraichain-token/' target='_blank'>
								<CoinMarketCapIcon className={cx("nav-icon")} />
							</a>
							<a className={cx("nav-link", "social-link")} href='https://www.coingecko.com/en/coins/oraichain-token' target='_blank'>
								<CoinGeckoIcon className={cx("nav-icon")} />
							</a>
						</div>
						<div className={cx("social-section-text")}>
							©2021 Oraichain Pte. Ltd. All rights reserved.{" "}
							<span
								style={{
									textDecoration: "underline",
									cursor: "pointer",
								}}
								onClick={() => {
									window.open("https://docs.orai.io/others/privacy-policy");
								}}>
								Privacy Policy
							</span>
						</div>
					</div>
				</Container>
			</div>
		</div>
	);
});

Footer.propTypes = {};
Footer.defaultProps = {};

export default Footer;
