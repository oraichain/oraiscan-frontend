import * as React from "react";
import {_, refineAddress} from "src/lib/scripts";
import {NavLink} from "react-router-dom";
import DisplayLongString from "src/components/common/DisplayLongString";

export default function({type, txData, value, cx}) {
	if (!_.isNil(value?.to_address)) {
		const to = refineAddress(value.to_address);
		return (
			<NavLink className={cx("blueColor")} to={`/account/${to}`}>
				<DisplayLongString inputString={to} />
			</NavLink>
		);
	}

	return <>-</>;
}
