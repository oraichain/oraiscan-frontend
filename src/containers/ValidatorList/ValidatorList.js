import React, { useState } from "react";
import { useGet } from "restful-react";

import Container from "@material-ui/core/Container";
import cn from "classnames/bind";
import { formatInteger, formatSeconds } from "src/helpers/helper";

import consts from "src/constants/consts";
import Spinner from "src/components/common/Spinner";
import Skeleton from "react-skeleton-loader";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import StatusCardList from "src/components/common/StatusCardList";
import ButtonGroup from "src/components/common/ButtonGroup";
import SearchInput from "src/components/common/SearchInput";
import ValidatorTable from "src/components/ValidatorList/ValidatorTable";
import Pagination from "src/components/common/Pagination";
import styles from "./ValidatorList.scss";
import heightIcon from "src/assets/validators/height_ic.svg";
import validatorsIcon from "src/assets/validators/validators_ic.svg";
import bondedTokensIcon from "src/assets/validators/bonded_tokens_ic.svg";
import blockTimeIcon from "src/assets/validators/block_time_ic.svg";

const cx = cn.bind(styles);

const ValidatorList = props => {
	const [buttonGroupData, setButtonGroupData] = useState([
		{
			label: "Active",
			onClick: selectedIndex => {
				setButtonGroupData(getButtonGroupData(selectedIndex));
			},
			active: true,
		},
		{
			label: "Inactive",
			onClick: selectedIndex => {
				setButtonGroupData(getButtonGroupData(selectedIndex));
			},
			active: false,
		},
	]);

	const getButtonGroupData = selectedIndex => {
		return buttonGroupData.map((item, index) => {
			if (selectedIndex === index) {
				return Object.assign({}, item, { active: true });
			}
			return Object.assign({}, item, { active: false });
		});
	};

	const { data: validators } = useGet({
		path: consts.API.VALIDATORS,
	});

	const { data: status } = useGet({
		path: consts.API.STATUS,
	});

	if (!validators || !status) {
		return (
			<Container fixed className={cx("validator-list")}>
				<TitleWrapper>
					<PageTitle title={"Validators"} />
				</TitleWrapper>
				<Skeleton />
			</Container>
		);
	}

	console.log("VALIDATOR", validators);

	return (
		<Container fixed className={cx("validator-list")}>
			<TitleWrapper>
				<PageTitle title={"Validators"} />
				<StatusBox />
			</TitleWrapper>
			<StatusCardList
				data={[
					{
						icon: heightIcon,
						label: "Height",
						value: status?.latest_block_height ? formatInteger(status.latest_block_height) : "-",
					},
					{
						icon: validatorsIcon,
						label: "Validators",
						value: status?.total_validator_num ? status.total_validator_num + "/" + status.total_validator_num : "",
					},
					{
						icon: bondedTokensIcon,
						label: "Bonded Tokens",
						value: "-",
					},
					{
						icon: blockTimeIcon,
						label: "Block Time",
						value: status?.block_time ? formatSeconds(status.block_time) + "s" : "-",
					},
				]}
			/>
			<div className={cx("filter-section")}>
				<ButtonGroup data={buttonGroupData} rootClassName={cx("mr-18px")} />
				<SearchInput
					placeholder='Search validators'
					onChange={() => {
						alert("change");
					}}
				/>
			</div>
			<ValidatorTable data={validators} />
			<Pagination />
		</Container>
	);
};

export default ValidatorList;
