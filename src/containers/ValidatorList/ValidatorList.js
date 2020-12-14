import React, {useState} from "react";
import Container from "@material-ui/core/Container";
import cn from "classnames/bind";
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

const dataRows = [
	["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
	["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
	["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
	["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
	["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
];

export default function(props) {
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
				return Object.assign({}, item, {active: true});
			}
			return Object.assign({}, item, {active: false});
		});
	};

	return (
		<Container fixed className={cx("validator-list")}>
			<TitleWrapper>
				<PageTitle title={"Validator"} />
				<StatusBox />
			</TitleWrapper>
			<StatusCardList
				data={[
					{
						icon: heightIcon,
						label: "Height",
						value: "4,353,021",
					},
					{
						icon: validatorsIcon,
						label: "Validators",
						value: "125/265",
					},
					{
						icon: bondedTokensIcon,
						label: "Bonded Tokens",
						value: "189,106,369",
					},
					{
						icon: blockTimeIcon,
						label: "Block Time",
						value: "7.38s",
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
			<ValidatorTable dataRows={dataRows} />
			<Pagination />
		</Container>
	);
}
