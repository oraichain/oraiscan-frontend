import React, {memo} from "react";
import {usePagination} from "@material-ui/lab/Pagination";
import classNames from "classnames/bind";
import styles from "./Pagination.scss";
import firstButtonIcon from "src/assets/pagination/first_button_ic.svg";
import lastButtonIcon from "src/assets/pagination/last_button_ic.svg";
import prevButtonIcon from "src/assets/pagination/prev_button_ic.svg";
import nextButtonIcon from "src/assets/pagination/next_button_ic.svg";

const cx = classNames.bind(styles);

const Pagination = memo(() => {
	const {items} = usePagination({
		count: 10,
		showFirstButton: true,
		showLastButton: true,
	});

	const getButtonIcon = type => {
		let buttonIcon;
		switch (type) {
			case "first":
				buttonIcon = firstButtonIcon;
				break;
			case "last":
				buttonIcon = lastButtonIcon;
				break;
			case "next":
				buttonIcon = nextButtonIcon;
				break;
			case "previous":
				buttonIcon = prevButtonIcon;
				break;
			default:
				return null;
		}

		return <img src={buttonIcon} alt='' />;
	};

	return (
		<nav>
			<ul className={cx("pagination")}>
				{items.map(({page, type, selected, ...item}, index) => {
					let children = null;
					switch (type) {
						case "start-ellipsis":
						case "end-ellipsis":
							children = "…";
							break;
						case "page":
							children = (
								<button type='button' className={cx("page-button", {active: selected})} {...item}>
									{page}
								</button>
							);
							break;
						default:
							children = (
								<button type='button' {...item}>
									{getButtonIcon(type)}
								</button>
							);
							break;
					}

					return (
						<li key={index} className={cx("pagination-item")}>
							{children}
						</li>
					);
				})}
			</ul>
		</nav>
	);
});

export default Pagination;
