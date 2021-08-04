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
import drand from "src/lib/drand/drand";
import RandomnessSkeleton from "./RandomnessDetailSkeleton";
import RandomnessView from "../RandomnessView";
import styles from "./RandomnessDetail.module.scss";

const cx = cn.bind(styles);

const Randomness = () => {
	const {round} = useParams();
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

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

	useEffect(() => {
		handleGetRandomValue();
	}, []);

	const handleGetRandomValue = async () => {
		const latestData = await drand(parseInt(round), false);
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
							<RandomnessView data={data} />
						</div>
					</div>
				) : (
					<RandomnessSkeleton isLargeScreen={isLargeScreen} />
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
