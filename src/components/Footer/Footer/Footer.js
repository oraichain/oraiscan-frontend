import React, { memo } from "react";
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
import { ThemeSetup } from "src/helpers/helper";
import styles from "./Footer.module.scss";
const cx = classNames.bind(styles);

const Footer = memo(() => {
	const { isDarkTheme } = ThemeSetup();

	return (
		<div className={cx("footer")}>
			<img src={isDarkTheme ? DecorIconDark : DecorIconLight} className={cx("decor-icon")} />
			<img style={{ opacity: isDarkTheme ? "0.3" : "1" }} src={FooterBackground} className={cx("background")} />
			<div className={cx("top-section")}>
				<Container>
					<Grid className={cx("top-section-grid")} container spacing={2}>
						<Grid className={cx("top-section-grid-1")} container item lg={3} xs={12}>
							<Grid item xs={12}>
								<div className={cx("intro")}>
									<OraiLogo className={cx("intro-logo")} />
									<div className={cx("intro-description")}>
										A search engine for data and service information within Oraichain network - AI Layer 1 for Data Economy and oracle Services
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
										<a className={cx("nav-link")} href='https://docs.orai.io/readme/tokenomics' target='_blank'>
											Contracts
										</a>
									</li>
									<li className={cx("nav-item")}>
										<a className={cx("nav-link")} href='https://orai.io/control-center' target='_blank'>
											Get ORAI
										</a>
									</li>
									<li className={cx("nav-item")}>
										<a className={cx("nav-link")} href='https://scan.orai.io/validators' target='_blank'>
											Stake ORAI
										</a>
									</li>
									<li className={cx("nav-item")}>
										<a className={cx("nav-link")} href='https://orai.io/ecosystem' target='_blank'>
											OWallet
										</a>
									</li>
									<li className={cx("nav-item")}>
										<a className={cx("nav-link")} href='https://oraidex.io/' target='_blank'>
											OraiDex
										</a>
									</li>
									<li className={cx("nav-item")}>
										<a className={cx("nav-link")} href='https://oraidex.io/bridge' target='_blank'>
											OraiBridge
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
										<a className={cx("nav-link")} href='https://scan.orai.io/' target='_blank'>
											Mainnet
										</a>
									</li>
									<li className={cx("nav-item")}>
										<a className={cx("nav-link")} href='https://cupiee.com/' target='_blank'>
											Cupiee
										</a>
									</li>
									<li className={cx("nav-item")}>
										<a className={cx("nav-link")} href='https://defilens.ai/' target='_blank'>
											DeFi Lens
										</a>
									</li>
									<li className={cx("nav-item")}>
										<a className={cx("nav-link")} href='https://docs.orai.io/vrf/introduction' target='_blank'>
											Oraichain VRF 2.0
										</a>
									</li>
									<li className={cx("nav-item")}>
										<a className={cx("nav-link")} href='https://airight.io/' target='_blank'>
											aiRight
										</a>
									</li>
									<li className={cx("nav-item")}>
										<a className={cx("nav-link")} href='https://kawaii.global/' target='_blank'>
											Kawaiiverse
										</a>
									</li>

									<li className={cx("nav-item")}>
										<a className={cx("nav-link")} href='https://docs.orai.io/readme/tokenomics' target='_blank'>
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
										{/* <a className={cx("nav-link")} href='https://drive.google.com/file/d/1jiU7gzBD8DqqecRh_CkS3pI7bv_qTJ6B/view' target='_blank'> */}
										<a className={cx("nav-link")} href='https://orai.io/branding' target='_blank'>
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
									<li className={cx("nav-item")}>
										<a className={cx("nav-link")} href='https://t.me/SamORAI_bot' target='_blank'>
											Support
										</a>
									</li>
									<li className={cx("nav-item")}>
										<a className={cx("nav-link")} href='https://oraichainlabs.org/' target='_blank'>
											Team
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
									<li className={cx("nav-item")}>
										<a
											className={cx("nav-link")}
											href='https://blog.orai.io/introducing-oraichain-for-dapps-accelerator-program-9612c0d28c16'
											target='_blank'>
											Accelerator Program
										</a>
									</li>
									<li className={cx("nav-item")}>
										<a
											className={cx("nav-link")}
											href='https://oraichain.notion.site/Oraichain-Labs-Careers-b14d9467f9604b3d9cf9a3282730cec5'
											target='_blank'>
											Careers
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
							<a className={cx("nav-link", "social-link")} href='https://discord.gg/vbv98nY7Cv' target='_blank'>
								<DiscordIcon className={cx("nav-icon")} />
							</a>
							<a className={cx("nav-link", "social-link")} href='https://github.com/oraichain' target='_blank'>
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
							©️ 2020 - {new Date().getFullYear()} Oraichain Foundation. All rights reserved.{" "}
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
