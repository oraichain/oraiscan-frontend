import React, {memo} from "react";
import cn from "classnames/bind";
import SearchIcon from "src/icons/SearchIcon";
import styles from "./SearchInput.module.scss";

const cx = cn.bind(styles);

const SearchInput = memo(({className, placeholder, value = "", readOnly = false, onChange}) => (
	<div className={cx("search-input", className)}>
		<input type='text' className={cx("text-field")} placeholder={placeholder} value={value} readOnly={readOnly} onChange={onChange} />
		<SearchIcon className={cx("search-icon")} />
	</div>
));

export default SearchInput;
