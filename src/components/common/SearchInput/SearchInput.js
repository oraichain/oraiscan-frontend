import React from "react";
import cn from "classnames/bind";
import styles from "./SearchInput.scss";
import searchIcon from "src/assets/common/search_ic.svg";

const cx = cn.bind(styles);

export default function SearchInput({placeholder, onChange}) {
	return React.useMemo(
		() => (
			<form>
				<div className={cx("search-input")}>
					<input type='text' placeholder='' />
					<button>
						<img src={searchIcon} alt='' />
					</button>
				</div>
			</form>
		),
		[placeholder, onChange]
	);
}
