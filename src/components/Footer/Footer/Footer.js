import React, {memo} from "react";
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
					<Grid container spacing={2}>
						<Grid container item lg={6} md={12}>
							<Grid item lg={5} md={6}>
								<div className={cx("email")}>
									<div className={cx("email-function")}>General Inquiries</div>
									<div className={cx("email-address")}>contact@orai.io</div>
								</div>

								<div className={cx("email")}>
									<div className={cx("email-function")}>Technical Support</div>
									<div className={cx("email-address")}>support@orai.io</div>
								</div>
							</Grid>

							<Grid item lg={7} md={6}>
								<div className={cx("address")}>
									<p>We can be mailed at:</p>
									<p>
										Oraichain Pte. Ltd.
										<p>68 Circular Road, #02-01, 049422, Singapore</p>
									</p>
								</div>
							</Grid>
						</Grid>
						<Grid container item lg={6} md={12}>
							<Grid item sm={4} xs={12}>
								<ul className={cx("nav")}>
									<li className={cx("nav-title")}>About</li>
									<li className={cx("nav-item")}>
										<a href='https://orai.io/presentations/intro.pdf' target='_blank'>
											Introduction
										</a>
									</li>
									<li className={cx("nav-item")}>
										<a href='https://orai.io/presentations/Binance-talk-Oct28-EN.pdf' target='_blank'>
											Binance Task
										</a>
									</li>
									<li className={cx("nav-item")}>
										<a href='https://gov.orai.io/c/knowledge-base/7' target='_blank'>
											FAQ
										</a>
									</li>
									<li className={cx("nav-item")}>
										<a href='https://drive.google.com/drive/u/0/folders/16AOw7DJNkLp4IryQEpp1kfzGdhoJWBc_' target='_blank'>
											Media Park
										</a>
									</li>
								</ul>
							</Grid>

							<Grid item sm={4} xs={12}>
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
							</Grid>

							<Grid item sm={4} xs={12}>
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
							</Grid>
						</Grid>
					</Grid>
				</Container>
			</div>
			<div className={cx("footer-bottom")}>
				<Container fixed>
					<div className={cx("space-around")}>
						<div className={cx("copyright")}>©2020 Oraichain Pte. Ltd. All rights reserved. Privacy Policy Customer Support</div>
						<div className={cx("navbar")}>
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
					</div>
				</Container>
			</div>
		</div>
	);
});

export default Footer;
