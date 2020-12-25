import React, { memo } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import classNames from "classnames/bind";
import styles from "./Footer.scss";

const Footer = memo(() => {
	const cx = classNames.bind(styles);

	return (
		<div className={cx("footer")}>
			<div className={cx("footer-top")}>
				<Container fixed>
					<div className={cx("content")}>
						<div className={cx("contact")}>
							<div className={cx("emails")}>
								<div className={cx("email")}>
									<div className={cx("email-function")}>General Inquiries</div>
									<div className={cx("email-address")}>contact@orai.io</div>
								</div>

								<div className={cx("email")}>
									<div className={cx("email-function")}>Technical Support</div>
									<div className={cx("email-address")}>support@orai.io</div>
								</div>
							</div>

							<div className={cx("address")}>
								<p>We can be mailed at:</p>
								<p>Oraichain Pte. Ltd.</p>
								<p>68 Circular Road, #02-01, 049422, Singapore</p>
							</div>
						</div>

						<div className={cx("navs")}>
							<ul className={cx("nav")}>
								<li className={cx("nav-title")}>About</li>
								<li className={cx("nav-item")}>
									<a href='https://orai.io/presentations/intro.pdf' target='_blank'>
										Introduction
									</a>
								</li>
								<li className={cx("nav-item")}>
									<a href='https://orai.io/presentations/Binance-talk-Oct28-EN.pdf' target='_blank'>
										Binance Talk
									</a>
								</li>
								<li className={cx("nav-item")}>
									<a href='https://gov.orai.io/c/knowledge-base/7' target='_blank'>
										FAQ
									</a>
								</li>
								<li className={cx("nav-item")}>
									<a href='https://orai.io/media-kit' target='_blank'>
										Media Kit
									</a>
								</li>
							</ul>

							<ul className={cx("nav")}>
								<li className={cx("nav-title")}>Product</li>
								<li className={cx("nav-item")}>
									<a href='https://liquidity.orai.io/' target='_blank'>
										LME
									</a>
								</li>
								<li className={cx("nav-item")}>
									<a href='https://scan.orai.io/' target='_blank'>
										Testnet
									</a>
								</li>
								<li className={cx("nav-item")}>
									<a href='https://yai.finance/' target='_blank'>
										yAI.Finance
									</a>
								</li>
								<li className={cx("nav-item")}>
									<a href='https://market.orai.io/oscript' target='_blank'>
										Marketpalce
									</a>
								</li>
							</ul>

							<ul className={cx("nav")}>
								<li className={cx("nav-title")}>Official Channels</li>
								<li className={cx("nav-item")}>
									<a href='https://twitter.com/oraichain' target='_blank'>
										Twitter
									</a>
								</li>
								<li className={cx("nav-item")}>
									<a href='https://t.me/oraichain' target='_blank'>
										Telegram
									</a>
								</li>
								<li className={cx("nav-item")}>
									<a href='https://www.coingecko.com/en/coins/oraichain-token' target='_blank'>
										Coingecko
									</a>
								</li>
								<li className={cx("nav-item")}>
									<a href='https://medium.com/oraichain' target='_blank'>
										Medium
									</a>
								</li>
							</ul>
						</div>
					</div>
				</Container>
			</div>
			<div className={cx("footer-bottom")}>
				<Container fixed>
					<div className={cx("content")}>
						<div className={cx("copyright")}>©2020 Oraichain Pte. Ltd. All rights reserved. Privacy Policy Customer Support</div>
						<ul className={cx("nav")}>
							<li className={cx("nav-item")}>
								<a href='/' target='_blank'>
									Privacy Policy
								</a>
							</li>

							<li className={cx("nav-item")}>
								<a href='/' target='_blank'>
									Customer Support
								</a>
							</li>

							<li className={cx("nav-item")}>
								<a href='/' target='_blank'>
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

export default Footer;
