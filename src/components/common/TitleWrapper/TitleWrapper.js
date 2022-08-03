import React from "react";
import classNames from "classnames/bind";
import styles from "./TitleWrapper.module.scss";

const cx = classNames.bind(styles);

const TitleWrapper = ({children}) => <div className={cx("title-wrapper")}>{children}</div>;

export default TitleWrapper;
