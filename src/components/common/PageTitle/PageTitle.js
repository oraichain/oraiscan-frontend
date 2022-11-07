import React, {memo} from "react";
import classNames from "classnames/bind";
import styles from "./PageTitle.module.scss";

const cx = classNames.bind(styles);

const PageTitle = memo(({title = null}) => <h2 className={cx("pageTitle")}>{title}</h2>);

export default PageTitle;
