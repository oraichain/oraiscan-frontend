import React, {useState, useRef} from "react";
import {NavLink} from "react-router-dom";
import copy from "copy-to-clipboard";
import {useDispatch} from "react-redux";
import {showAlert} from "src/store/modules/global";
import {_, refineAddress} from "src/lib/scripts";
import DisplayLongString from "src/components/common/DisplayLongString";
import copyIcon from "src/assets/common/copy_ic.svg";

export default function({address, cx, link}) {
	const dispatch = useDispatch();

	if (!_.isNil(address) && !_.isEmpty(address)) {
		const refinedAddress = refineAddress(address);
		return (
			<>
				{link ? (
					<NavLink className={cx("blueColor")} to={`/account/${refinedAddress}`}>
						<DisplayLongString inputString={refinedAddress} />
					</NavLink>
				) : (
					<DisplayLongString inputString={refinedAddress} />
				)}
				<img
					src={copyIcon}
					alt=''
					className={cx("copy-icon")}
					onClick={() => {
						copy(refinedAddress);
						dispatch(
							showAlert({
								show: true,
								message: "Copied",
								autoHideDuration: 1500,
							})
						);
					}}
				/>
			</>
		);
	}

	return <>-</>;
}
