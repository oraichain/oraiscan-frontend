import React, {memo} from "react";
import classNames from "classnames/bind";

import styles from "./PageNumber.scss";

const cx = classNames.bind(styles);

const PageNumber = memo(({page = 1, update = () => {}, totalPages = 1}) => {
	return (
		<div className={cx("container")}>
			<div className={cx("normal-text")} onClick={() => update(-1)}>
				{"<"}
			</div>
			{page > 1 && (
				<div className={cx("normal-text")} onClick={() => update(-1)}>
					{page - 1}
				</div>
			)}
			<div className={cx("current-page")}>{page}</div>
			{page < totalPages && (
				<div className={cx("normal-text")} onClick={() => update(1)}>
					{page + 1}
				</div>
			)}
			<div className={cx("normal-text")} onClick={() => update(1)}>
				{">"}
			</div>
		</div>
	);
});

export default PageNumber;
