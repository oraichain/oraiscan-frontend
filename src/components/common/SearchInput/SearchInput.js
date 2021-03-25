import React, {memo} from "react";
import cn from "classnames/bind";
import styles from "./SearchInput.scss";
import searchIcon from "src/assets/common/search_ic.svg";

const cx = cn.bind(styles);

const SearchInput = memo(({className, placeholder, value = "", readOnly = false, onChange}) => (
	<form onSubmit={e => e.preventDefault()}>
		<div className={cx("search-input", className)}>
			<input type='text' placeholder={placeholder} value={value} readOnly={readOnly} onChange={onChange} />
			<button>
				<img src={searchIcon} alt='' />
			</button>
		</div>
	</form>
));

export default SearchInput;
