import * as React from "react";
import {_, refineAddress} from "src/lib/scripts";
import {NavLink} from "react-router-dom";
import DisplayLongString from "src/components/common/DisplayLongString";

export default function({type, txData, value, cx}) {
	if (!_.isNil(value?.from_address)) {
		const from = refineAddress(value.from_address);
		return (
			<NavLink className={cx("blueColor")} to={`/account/${from}`}>
				<DisplayLongString inputString={from} />
			</NavLink>
		);
	}

	return <>-</>;
}
