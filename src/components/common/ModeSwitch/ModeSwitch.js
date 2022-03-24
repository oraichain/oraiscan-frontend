import React, {memo} from "react";
import {useSelector, useDispatch} from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import {themeIds} from "src/constants/themes";
import {setActiveThemeId} from "src/store/modules/activeThemeId.js";
import SunIcon from "src/icons/SunIcon";
import MoonIcon from "src/icons/MoonIcon";
import styles from "./ModeSwitch.scss";
import {Switch} from "antd";
import {ThemeSetup} from "src/helpers/helper";

const cx = classNames.bind(styles);

const ModeSwitch = memo(() => {
	const {isDarkTheme} = ThemeSetup();
	const activeThemeId = useSelector(state => state.activeThemeId);
	const dispatch = useDispatch();

	const toggleMode = () => {
		const themeId = activeThemeId === themeIds.LIGHT ? themeIds.DARK : themeIds.LIGHT;
		dispatch(setActiveThemeId(themeId));
	};

	let stateClassName;
	let iconElement;

	if (activeThemeId === themeIds.LIGHT) {
		stateClassName = "mode-switch-light";
		iconElement = <SunIcon className={cx("mode-switch-icon")} />;
	} else {
		stateClassName = "mode-switch-dark";
		iconElement = <MoonIcon className={cx("mode-switch-icon")} />;
	}

	return (
		// <div className={cx("mode-switch", stateClassName)} onClick={toggleMode}>
		// 	{iconElement}
		// </div>
		<Switch
			style={{background: isDarkTheme ? "#292B39" : "#2D2A83", marginRight: "12px"}}
			className={cx("toggle")}
			onClick={toggleMode}
			checkedChildren={<SunIcon />}
			unCheckedChildren={<MoonIcon />}
		/>
	);
});

ModeSwitch.propTypes = {};
ModeSwitch.defaultProps = {};

export default ModeSwitch;
