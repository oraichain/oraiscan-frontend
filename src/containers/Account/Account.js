import React, {useState} from "react";
import {useGet} from "restful-react";
import Container from "@material-ui/core/Container";
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

	return (
		<Container fixed className={cx("validator-list")}>
			<TitleWrapper>
				<PageTitle title={"Account Detail"} />
			</TitleWrapper>
			<Grid container spacing={2} className={cx("card-list")}>
				<Grid item lg={4} xs={12}>
					{addressData ? (
						<AddressCard
							headerIcon={qrIcon}
							headerTitle='QR Code'
							addresses={[
								{
									title: "Address",
									icon: copyIcon,
									value: addressData?.address ?? "-",
								},
								{
									title: "Reward Address",
									icon: questionIcon,
									value: addressData?.address ?? "-",
								},
							]}
							minHeight={addressCardMinHeight + "px"}
						/>
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
		</Container>
	);
};

export default Account;
