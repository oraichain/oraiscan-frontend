import React, {useState, useRef} from "react";
import {useGet} from "restful-react";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import cn from "classnames/bind";
import consts from "src/constants/consts";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import AddressCard from "src/components/common/AddressCard";
import CoinsCard from "src/components/common/CoinsCard";
import DelegatorCard from "src/components/Account/DelegatorCard";
import UnbondingCard from "src/components/Account/UnbondingCard";
import TransactionCard from "src/components/Account/TransactionCard";
import styles from "./Account.scss";
import qrIcon from "src/assets/common/qr_ic.svg";
import copyIcon from "src/assets/common/copy_ic.svg";
import questionIcon from "src/assets/common/question_ic.svg";

const Account = props => {
	const addressCardMinHeight = 220;
	const coinsCardMinHeight = 220;

	const cx = cn.bind(styles);
	const account = props?.match?.params?.account ?? 0;
	const addressPath = `${consts.API.ACCOUNT}/${account}`;
	const coinsPath = `${consts.API.ACCOUNT_COINS}/${account}`;
	const {data: addressData} = useGet({
		path: addressPath,
	});

	const {data: coinsData} = useGet({
		path: coinsPath,
	});

	const contentRef = useRef(null);
	const [open, setOpen] = useState(false);

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	const addresses = [
		{
			title: "Address",
			icon: copyIcon,
			value: addressData?.address ?? "-",
			onClick: function() {
				copyToClipboard(this.value);
			},
		},
		{
			title: "Reward Address",
			icon: questionIcon,
			value: addressData?.address ?? "-",
			onClick: function() {
				copyToClipboard(this.value);
			},
		},
	];

	const copyToClipboard = content => {
		if (contentRef && contentRef?.current) {
			const contentElement = contentRef.current;
			contentElement.value = content;
			contentElement.select();
			contentElement.setSelectionRange(0, 99999); /* For mobile devices */
			document.execCommand("copy");
			setOpen(true);
		}
	};

	return (
		<Container fixed className={cx("account")}>
			<TitleWrapper>
				<PageTitle title={"Account Detail"} />
				<StatusBox />
			</TitleWrapper>
			<Grid container spacing={2} className={cx("card-list")}>
				<Grid item lg={4} xs={12}>
					{addressData ? (
						<AddressCard headerIcon={qrIcon} headerTitle='QR Code' addresses={addresses} minHeight={addressCardMinHeight + "px"} />
					) : (
						<Skeleton variant='rect' animation='wave' height={addressCardMinHeight} />
					)}
				</Grid>

				<Grid item lg={8} xs={12}>
					{coinsData ? (
						<CoinsCard
							total={coinsData.total}
							price={coinsData.price}
							available={coinsData.available}
							delegated={coinsData.delegated}
							unbonding={coinsData.unbonding}
							reward={coinsData.reward}
							denom={coinsData.denom}
							minHeight={coinsCardMinHeight + "px"}
						/>
					) : (
						<Skeleton variant='rect' animation='wave' height={coinsCardMinHeight} />
					)}
				</Grid>
			</Grid>

			<Grid container spacing={2}>
				<Grid item md={6} xs={12}>
					<DelegatorCard account={account} />
				</Grid>
				<Grid item md={6} xs={12}>
					<UnbondingCard account={account} />
				</Grid>
				<Grid item xs={12}>
					<TransactionCard account={account} />
				</Grid>
			</Grid>

			<input type='text' className={cx("content-input")} ref={contentRef} />
			<Snackbar
				anchorOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
				autoHideDuration={400}
				message='Copied'
			/>
		</Container>
	);
};

export default Account;
