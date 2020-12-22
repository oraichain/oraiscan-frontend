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
import CircleChartCard from "src/components/common/CircleChartCard";
import DelegatorCard from "src/components/Account/DelegatorCard";
import UnbondingCard from "src/components/Account/UnbondingCard";
import TransactionCard from "src/components/Account/TransactionCard";
import styles from "./Account.scss";
import qrIcon from "src/assets/common/qr_ic.svg";
import copyIcon from "src/assets/common/copy_ic.svg";
import questionIcon from "src/assets/common/question_ic.svg";

const Account = props => {
	const cx = cn.bind(styles);
	const account = props?.match?.params?.account ?? 0;
	const path = `${consts.API.ACCOUNT}/${account}`;
	const {data} = useGet({
		path: path,
	});

	console.log("ACOUNT", data);

	return (
		<Container fixed className={cx("validator-list")}>
			<TitleWrapper>
				<PageTitle title={"Account Detail"} />
			</TitleWrapper>
			<Grid container spacing={2} className={cx("card-list")}>
				<Grid item lg={4} md={12}>
					<AddressCard
						headerIcon={qrIcon}
						headerTitle='QR Code'
						addresses={[
							{
								title: "Address",
								icon: copyIcon,
								value: "cosmos15v6k4u60xetq9a2frkzaasyu2nfru5efaj5mg6",
							},
							{
								title: "Reward Address",
								icon: questionIcon,
								value: "cosmos15v6k4u60xetq9a2frkzaasyu2nfru5efaj5mg6",
							},
						]}
						minHeight='220px'
					/>
				</Grid>

				<Grid item lg={8} md={12}>
					<CircleChartCard
						totalOrai='11050300.54'
						unitPrice='17.54'
						chartName='Chart 0134765'
						availablePercent='12.67'
						delegatedPercent='81.96'
						unbondingPercent='0.00'
						rewardPercent='5.37'
						minHeight='220px'
					/>
				</Grid>
			</Grid>

			<Grid container spacing={2}>
				<Grid item md={6} sm={12}>
					<DelegatorCard account={account} />
				</Grid>
				<Grid item md={6} sm={12}>
					<UnbondingCard account={account} />
				</Grid>
				<Grid item md={12}>
					<TransactionCard account={account} />
				</Grid>
			</Grid>
			{/* <Skeleton variant='rect' animation='wave' height={400} /> */}
		</Container>
	);
};

export default Account;
