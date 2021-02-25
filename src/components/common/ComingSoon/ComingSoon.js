import React, {memo} from "react";
import cn from "classnames/bind";
import styles from "./ComingSoon.scss";

const cx = cn.bind(styles);

const ComingSoon = memo(({text = "COMING SOON"}) => <h1 className={cx("coming-soon")}>{text}</h1>);

export default ComingSoon;
