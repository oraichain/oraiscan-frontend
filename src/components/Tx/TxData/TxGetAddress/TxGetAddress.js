import * as React from "react";
import {_, refineAddress} from "src/lib/scripts";
import {NavLink} from "react-router-dom";
import DisplayLongString from "src/components/common/DisplayLongString";

export default function({address, cx}) {
	if (!_.isNil(address)) {
		const refinedAddress = refineAddress(address);
		return (
			<NavLink className={cx("blueColor")} to={`/account/${refinedAddress}`}>
				<DisplayLongString inputString={refinedAddress} />
			</NavLink>
		);
	}

	return <>-</>;
}
