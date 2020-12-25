import React, {memo} from "react";
import cn from "classnames/bind";
import styles from "./SearchInput.scss";
import searchIcon from "src/assets/common/search_ic.svg";

const cx = cn.bind(styles);

const SearchInput = memo(({placeholder, onChange}) => (
	<form>
		<div className={cx("search-input")}>
			<input type='text' placeholder={placeholder} onChange={onChange} />
			<button>
				<img src={searchIcon} alt='' />
			</button>
		</div>
	</form>
));

export default SearchInput;
