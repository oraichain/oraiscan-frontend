/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useMemo} from "react";
// import {Col, Row} from "antd";

import styles from "./Footer.scss";
import classNames from "classnames/bind";
// import consts from "src/constants/consts";

// import footerLogo from "src/assets/footer/mintscan_footer_logo.svg";
// import googleIcon from "src/assets/footer/playstore_btn.svg";
// import iosIcon from "src/assets/footer/appstore_btn.svg";
// import webWalletIcon from "src/assets/footer/wallet_btn.svg";
// import githubIcon from "src/assets/footer/github_btn.svg";
// import mediumIcon from "src/assets/footer/medium_btn.svg";
// import telegramIcon from "src/assets/footer/telegram_btn.svg";
// import emailIcon from "src/assets/footer/email_btn.svg";

const cx = classNames.bind(styles);

export default function(props) {
	const render = (
		<div className={cx("footer")}>
			<div className={cx("footer-top")}>
				<div className={cx("col-2")}>
					<div className={cx("sub-footer-1")}>
						<p>
							<b>General Inquiries</b>
						</p>
						<p>
							<u style={{cursor: "pointer"}}>contact@orai.io</u>
						</p>
					</div>
					<div style={{paddingTop: "10px"}}>
						<p>
							<b>Technical support</b>
						</p>
						<p>
							<u style={{cursor: "pointer"}}>support@orai.io</u>
						</p>
					</div>
				</div>

				<div className={cx("col-4")}>
					<div className={cx("sub-footer-2")}>
						<p>We can be mailed at:</p>
						<p>Oraichain Pte. Ltd.</p>
						<p>68 Circular Road, #02-01, 049422, Singapore</p>
					</div>
				</div>

				<div className={cx("col-2")}>
					<p style={{fontSize: "16px"}}>
						<b>About</b>
					</p>
					<div className={cx("sub-footer-3")}>
						<p>
							<a style={{color: "#8AA2C9"}} href='https://orai.io/presentations/intro.pdf' target='_blank'>
								Introduction
							</a>
						</p>
						<p>
							<a style={{color: "#8AA2C9"}} href='https://orai.io/presentations/Binance-talk-Oct28-EN.pdf' target='_blank'>
								Binance Task
							</a>
						</p>
						<p style={{color: "#8AA2C9"}}>
							<a href='https://gov.orai.io/c/knowledge-base/7' className={cx("link-style")} target='_blank'>
								FAQ
							</a>
						</p>
						<p>
							<a style={{color: "#8AA2C9"}} href='https://drive.google.com/drive/u/0/folders/16AOw7DJNkLp4IryQEpp1kfzGdhoJWBc_' target='_blank'>
								Media Park
							</a>
						</p>
					</div>
				</div>

				<div className={cx("col-2")}>
					<p style={{fontSize: "16px"}}>
						<b>Product</b>
					</p>
					<div className={cx("sub-footer-3")}>
						<p><a style={{ color: '#8AA2C9' }} href="https://liquidity.orai.io/" target="_blank">LME</a></p>
						<p><a style={{ color: '#8AA2C9' }} href="https://scan.orai.io/" target="_blank">Testnet</a></p>
						<p><a style={{ color: '#8AA2C9' }} href="https://yai.finance/" target="_blank">yAI.Finance</a></p>
						<p><a style={{ color: '#8AA2C9' }} href="https://market.orai.io/oscript" target="_blank">Marketpalce</a></p>
					</div>
				</div>
				<div className={cx("col-2")}>
					<p style={{fontSize: "16px"}}>
						<b>Official Channels</b>
					</p>
					<div className={cx("sub-footer-3")}>
						<p>
							<a style={{color: "#8AA2C9"}} href='https://twitter.com/oraichain' target='_blank'>
								Twitter
							</a>
						</p>
						<p>
							<a style={{color: "#8AA2C9"}} href='https://t.me/oraichain' target='_blank'>
								Telegram
							</a>
						</p>
						<p>
							<a style={{color: "#8AA2C9"}} href='https://www.coingecko.com/en/coins/oraichain-token' target='_blank'>
								Coingecko
							</a>
						</p>
						<p>
							<a style={{color: "#8AA2C9"}} href='https://medium.com/oraichain' target='_blank'>
								Medium
							</a>
						</p>
					</div>
				</div>
			</div>

			<div className={cx("footer-bottom")}>
				<div>
					<p>©2020 Oraichain Pte. Ltd. All rights reserved.</p>
				</div>

				<div className={cx("privacy")}>
					<p>
						<a style={{color: "#99AAC2"}} href=''>
							Privacy Policy
						</a>
					</p>
					<p>
						<a style={{color: "#99AAC2"}} href=''>
							Customer Support
						</a>
					</p>
					<p>
						<a style={{color: "#99AAC2"}} href=''>
							Careers
						</a>
					</p>
				</div>
			</div>
		</div>
		// <footer className={cx("footerWrapper")}>
		// 	<div className={cx("footer")}>
		// 		<div className={cx("footer-left")}>
		// 			<a>
		// 				<img src={footerLogo} alt='cosmostation_logo' />
		// 			</a>
		// 			<div className={cx("wallet-link-wrapper")}>
		// 				<p className={cx("title")}>Download Cosmostation Wallet</p>
		// 				<div className={cx("btn-wrapper")}>
		// 					<a href={consts.LINK.GOOGLE} target='_blank' rel='noopener noreferrer'>
		// 						<div className={cx("wallet-link-btn")}>
		// 							<img src={googleIcon} alt='playstore' />
		// 						</div>
		// 					</a>
		// 					<a href={consts.LINK.IOS} target='_blank' rel='noopener noreferrer'>
		// 						<div className={cx("wallet-link-btn")}>
		// 							<img src={iosIcon} alt='appstore' />
		// 						</div>
		// 					</a>
		// 					<a href={consts.LINK.IOS} target='_blank' rel='noopener noreferrer'>
		// 						<div className={cx("wallet-link-btn", "web")}>
		// 							<img className={cx("web-icon")} src={webWalletIcon} alt='webwallet' />
		// 							<span className={cx("web-title")}>Web Wallet</span>
		// 						</div>
		// 					</a>
		// 				</div>
		// 			</div>
		// 		</div>

		// 		<div className={cx("footer-right")}>
		// 			<ul className={cx("social")}>
		// 				<li>
		// 					<a rel='noopener noreferrer' href='https://github.com/cosmostation' id='github' title='Github' target='_blank'>
		// 						<img src={githubIcon} alt='github' />
		// 					</a>
		// 				</li>
		// 				<li>
		// 					<a rel='noopener noreferrer' href='https://medium.com/cosmostation' id='medium' title='Medium' target='_blank'>
		// 						<img src={mediumIcon} alt='medium' />
		// 					</a>
		// 				</li>
		// 				<li>
		// 					<a rel='noopener noreferrer' href='https://t.me/cosmostation' id='telegram' title='Telegram' target='_blank'>
		// 						<img src={telegramIcon} alt='telegram' />
		// 					</a>
		// 				</li>
		// 				<li>
		// 					<a rel='noopener noreferrer' href='mailto:support@cosmostation.io' id='mail' title='Mail' target='_blank'>
		// 						<img src={emailIcon} alt='email' />
		// 					</a>
		// 				</li>
		// 			</ul>
		// 			<div className={cx("rights")}>
		// 				<div className={cx("footer-copyright")} onClick={e => window.open(consts.LINK.COSMOSTATION)}>
		// 					© CØSMOSTATION 2020
		// 				</div>
		// 			</div>
		// 		</div>
		// 	</div>

		// </footer>
	);
	return useMemo(() => render, [render]);
}