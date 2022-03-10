/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useState, useEffect, useRef } from "react";
import cn from "classnames/bind";
import styles from "./AssetSearch.scss";
import _ from "lodash";
import DownAngleIcon from "src/icons/DownAngleIcon";
const cx = cn.bind(styles);

let arraySearch = ['All Assets', 'Native', 'IBC Coins'];
export default function ({ assetSearch, setAssetSearch }) {
	const selectedItemRef = useRef(null);
	const listRef = useRef(null);
	const showList = () => {
		if (!_.isNil(listRef.current)) {
			listRef.current.style.display = "block";
		}
	};

	const hideList = () => {
		if (!_.isNil(listRef.current)) {
			listRef.current.style.display = "none";
		}
	};

	const clickListener = event => {
		if (event?.target?.hasAttribute("data-assets")) {
			hideList();
			setAssetSearch(arraySearch.findIndex(e => e === event?.target?.getAttribute("data-assets")));
			return;
		}

		if (selectedItemRef?.current?.contains?.(event?.target)) {
			if (listRef?.current?.style?.display === "block") {
				hideList();
			} else {
				showList();
			}
			return;
		}

		if (!_.isNil(listRef.current) && !listRef?.current?.contains?.(event?.target)) {
			hideList();
		}
	};

	useEffect(() => {
		document.addEventListener("click", clickListener, true);

		return () => {
			document.removeEventListener("click", clickListener);
		};
	}, []);


	return (
		<div className={cx("assets__search")}>
			<div className={cx("assets__title")}>
				Assets
			</div>
			<div >
				<div className={cx("network-switcher")}>
					<div className={cx("selected-item")} ref={selectedItemRef}>
						<input type='text' className={cx("text-field")} value={arraySearch[assetSearch]} readOnly />
						<DownAngleIcon className={cx("arrow")} />
					</div>
					<div className={cx("list")} ref={listRef}>
						{arraySearch.map((item, index) => (
							<div key={"list-item-" + index} className={cx("list-item")} data-assets={item}>
								{item}
							</div>
						))}
					</div>
				</div>
			</div>

		</div>
	);
}
