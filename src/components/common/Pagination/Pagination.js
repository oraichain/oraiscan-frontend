import React, {memo} from "react";
import {usePagination} from "@material-ui/lab/Pagination";
import classNames from "classnames/bind";
import {noop} from "lodash";
import styles from "./Pagination.scss";
import {ReactComponent as FirstButtonIcon} from "src/assets/pagination/first_button_ic.svg";
import {ReactComponent as LastButtonIcon} from "src/assets/pagination/last_button_ic.svg";
import {ReactComponent as PrevButtonIcon} from "src/assets/pagination/prev_button_ic.svg";
import {ReactComponent as NextButtonIcon} from "src/assets/pagination/next_button_ic.svg";

const cx = classNames.bind(styles);

const Pagination = memo(({pages, onChange = noop}) => {
	const {items} = usePagination({
		count: pages,
		showFirstButton: true,
		showLastButton: true,
		onChange,
	});

	const getButtonIcon = type => {
		let ButtonIcon;
		switch (type) {
			case "first":
				ButtonIcon = FirstButtonIcon;
				break;
			case "last":
				ButtonIcon = LastButtonIcon;
				break;
			case "next":
				ButtonIcon = NextButtonIcon;
				break;
			case "previous":
				ButtonIcon = PrevButtonIcon;
				break;
			default:
				return null;
		}
		return <ButtonIcon />;
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
