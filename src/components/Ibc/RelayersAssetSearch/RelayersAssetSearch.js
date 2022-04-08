/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useState, useEffect, useRef} from "react";
import cn from "classnames/bind";
import styles from "./RelayersAssetSearch.scss";
import _ from "lodash";
import DownAngleIcon from "src/icons/DownAngleIcon";
const cx = cn.bind(styles);

const assetsNetworks = ["Received", "Transfer"];
export default function({assetSearch, setAssetSearch, total}) {
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
		if (event?.target?.hasAttribute("data-relayers-assets")) {
			hideList();
			setAssetSearch(assetsNetworks.findIndex(e => e === event?.target?.getAttribute("data-relayers-assets")));
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
				Relayed Assets <span  className={cx("assets__total")}>{total}</span>
			</div>
			<div className={cx("assets__form")}>
				<div className={cx("network-switcher")}>
					<div className={cx("selected-item")} ref={selectedItemRef}>
						<input type='text' className={cx("text-field")} value={assetsNetworks[assetSearch]} readOnly />
						<DownAngleIcon className={cx("arrow")} />
					</div>
					<div className={cx("list")} ref={listRef}>
						{assetsNetworks.map((item, index) => (
							<div key={"list-item-" + index} className={cx("list-item")} data-relayers-assets={item}>
								{item}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
