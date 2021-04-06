import React from "react";
import PropTypes from "prop-types";
import cn from "classnames/bind";
import NavBar from "src/components/Header/NavBar/NavBar";
import styles from "./Header.module.scss";
const cx = cn.bind(styles);

const Header = ({toggleSearchArea}) => {
	return (
		<>
			<div className={cx("clear-fixed")}></div>
			<div className={cx("header")}>
				<NavBar toggleSearchArea={toggleSearchArea} />
			</div>
		</>
	);
};

Header.propTypes = {
	toggleSearchArea: PropTypes.func,
};
Header.defaultProps = {};

export default Header;
