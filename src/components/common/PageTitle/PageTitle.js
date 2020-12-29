import React, {memo} from "react";
import classNames from "classnames/bind";
import styles from "./PageTitle.scss";

const cx = classNames.bind(styles);

const PageTitle = memo(({title}) => <h2 className={cx("pageTitle")}>{title}</h2>);

export default PageTitle;
