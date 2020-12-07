import React from "react";
import cn from "classnames/bind";
import styles from "./SearchAppBar.scss";
// import _ from "lodash";
import {NavLink} from "react-router-dom";

//  components
import SearchArea from "src/components/common/SearchArea";
import {Toolbar} from "@material-ui/core";

import logo from "src/assets/header/logo.svg";

const cx = cn.bind(styles);

export default function(props) {
	return (
		<div className={cx("SearchAppBar-root")} id={"Header-fixed-id"}>
			<Toolbar className={cx("toolbar")}>
				<NavLink to='/'>
					<img src={logo} alt={"logo"} />
				</NavLink>
				<div className={cx("select-wrapper")}>
					<SearchArea propCx={cx} dropdownStyle={{position: "fixed", width: "459px"}} />
				</div>
			</Toolbar>
		</div>
	);
}
