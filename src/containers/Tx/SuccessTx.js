/* eslint-disable react-hooks/exhaustive-deps */
import Container from "@material-ui/core/Container";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import cn from "classnames/bind";
import { useParams } from "react-router-dom";
import NavigateBackBar from "src/components/common/NavigateBackBar";
import NotFound from "src/components/common/NotFound";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import TitleWrapper from "src/components/common/TitleWrapper";
import TogglePageBar from "src/components/common/TogglePageBar";
import TxData from "src/components/Tx/TxData";
import TxDataSkeleton from "src/components/Tx/TxData/TxDataSkeleton";
import TxInfo from "src/components/Tx/TxInfo";
import TxInfoSkeleton from "src/components/Tx/TxInfo/TxInfoSkeleton";
import styles from "./Tx.module.scss";
import { useGetTx } from "./useGetTx";

const cx = cn.bind(styles);

const SuccessTx = () => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const params = useParams();
	const txHash = params?.["tx"];

	const { loading, data } = useGetTx(txHash);

	let titleSection;
	let txInfo;
	let txData;

	titleSection = isLargeScreen ? (
		<Container fixed>
			<TitleWrapper>
				<PageTitle title={"Transactions detail"} />
				<StatusBox />
			</TitleWrapper>
		</Container>
	) : (
		<>
			<TogglePageBar type='transactions' />
			<NavigateBackBar type='transactions' />
		</>
	);

	if (loading) {
		txInfo = <TxInfoSkeleton />;
		txData = <TxDataSkeleton />;
	} else if (!data) {
		return <NotFound message={"Sorry! Tx Not Found"} />;
	} else {
		txInfo = <TxInfo data={data} />;
		txData = <TxData data={data} />;
	}

	return (
		<>
			{titleSection}
			<Container fixed className={cx("tx")}>
				{txInfo}
				{txData}
			</Container>
		</>
	);
};

SuccessTx.propTypes = {};

SuccessTx.defaultProps = {};

export default SuccessTx;
