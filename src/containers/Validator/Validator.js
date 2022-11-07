import React from "react";
import cn from "classnames/bind";
import {useFetch, usePrevious} from "src/hooks";
import {nilCheck} from "src/lib/scripts";

import consts from "src/constants/consts";
//  components
import PageTitle from "src/components/common/PageTitle";
import TitleWrapper from "src/components/common/TitleWrapper";
import ValidatorDetails from "src/components/Validator/Details";
import NotFound from "src/components/common/NotFound";
import TxHolders from "src/components/Validator/TxHolders";
import style from "./Validator.module.scss";

const cx = cn.bind(style);

export default function Validator(props) {
	const {asset} = props.match.params;
	const prevValidator = usePrevious(asset);
	const [state, , setUrl] = useFetch(`${consts.API_BASE}${consts.API.ASSET}${asset}`);

	// navigation(asset change)
	React.useEffect(() => {
		if (nilCheck([asset, prevValidator]) || asset === prevValidator) return;
		setUrl(`${consts.API_BASE}${consts.API.ASSET}${asset}`);
	}, [asset, prevValidator, setUrl]);
	//  navigation
	// React.useEffect(() => {
	// 	console.log("action", action, asset);
	// 	if ((action === "PUSH" || (action === "POP" && !empty(state.data))) && !state.loading) {
	// 		console.log("entered url hit");
	// 		setUrl(`${consts.API_BASE}${consts.API.ASSET}${asset}`);
	// 	}
	// }, [asset, action, setUrl, state.data, state.loading]);
	if ((!state.loading && state?.data?.asset === "") || asset === "notFound") return <NotFound />;
	return (
		<div className={cx("Validator-wrapper")}>
			<TitleWrapper>
				<PageTitle title={"Validator Details"} />
			</TitleWrapper>
			<ValidatorDetails asset={state.data ? state.data : {}} />
			<TxHolders asset={asset} />
		</div>
	);
}
