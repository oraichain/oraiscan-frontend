import React from "react";
import classNames from "classnames/bind";
import styles from "./Loading.scss";

const cx = classNames.bind(styles);

const Loading = () => <div className={cx("loading")}></div>;

export default Loading;
