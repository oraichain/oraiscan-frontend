/* eslint-disable no-loop-func */
import React, {useState, useRef, useEffect} from "react";
import {useParams, useHistory} from "react-router-dom";
import PropTypes from "prop-types";
import {isNil} from "lodash";
import cn from "classnames/bind";
import Container from "@material-ui/core/Container";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import TogglePageBar from "src/components/common/TogglePageBar";
import RandomnessSkeleton from "./RandomnessDetailSkeleton";
import RandomnessView from "../RandomnessView";
import styles from "./RandomnessDetail.module.scss";
import {getRound, getRoundOld} from "src/lib/drand/drand";
import RandomnessViewOld from "../RandomnessViewOld";
import RandomnessSkeletonOld from "../RandomnessSkeletonOld";
import config from "src/config";

const cx = cn.bind(styles);

const Randomness = () => {
	const {round, contract} = useParams();
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const {oldRandomnessContractAddress} = config;

	let titleSection;
	if (isLargeScreen) {
		titleSection = (
			<Container fixed>
				<TitleWrapper>
					<PageTitle title={"Randomness"} />
					<StatusBox />
				</TitleWrapper>
			</Container>
		);
	} else {
		titleSection = <TogglePageBar type='randomness' />;
	}

	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);

	const DisplayRandomness = () => {
		return contract === oldRandomnessContractAddress ? <RandomnessViewOld data={data} /> : <RandomnessView data={data} />;
	};
	const DisplayRandomnessSkeleton = () => {
		return contract === oldRandomnessContractAddress ? <RandomnessSkeletonOld isLargeScreen={isLargeScreen} /> : <RandomnessSkeleton data={data} />;
	};

	useEffect(() => {
		handleGetRandomValue();
	}, []);

	const handleGetRandomValue = async () => {
		let latestData = {};
		if (contract === "orai15vwlf8y9sygv72ju8qszs8n9gnuvwa7fu77tka") latestData = await getRoundOld(round, contract);
		else latestData = await getRound(round, contract);
		setLoading(false);

		if (!isNil(latestData)) {
			setData(latestData);
		}
	};

	return (
		<>
			{titleSection}
			<Container fixed className={cx("tx")}>
				{!loading ? (
					<div className={cx("card")}>
						<h2 className={cx("card-header")}>Randomness Information</h2>
						<div className={cx("card-body")}>
							<DisplayRandomness />
						</div>
					</div>
				) : (
					<DisplayRandomnessSkeleton />
				)}
			</Container>
		</>
	);
};

Randomness.propTypes = {
	data: PropTypes.any,
};

Randomness.defaultProps = {};

export default Randomness;
