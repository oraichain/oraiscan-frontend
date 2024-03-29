import React from "react";
import { JSONTree } from "react-json-tree";
import cn from "classnames/bind";
import { fromBech32 } from "@cosmjs/encoding";
import styles from "./ReactJson.module.scss";

const cx = cn.bind(styles);

export const formatAmountWithCurrency = inputString => {
	const matches = inputString.match(/^(\d+)(.*)$/);

	if (matches) {
		const numberPart = matches[1];
		const unitPart = matches[2];

		const resultString = numberPart + " " + unitPart;

		return resultString;
	} else {
		return inputString;
	}
};

export const ValueItem = raw => {
	if (typeof raw === "string") {
		if (raw.match(/^https?:\/\//)) {
			return (
				<a target='_blank' href={raw}>
					{raw}
				</a>
			);
		}
		// check is bech32 address
		try {
			const { prefix } = fromBech32(raw);
			if (prefix.startsWith("orai")) {
				return (
					<a target='_blank' href={`/${prefix === "oraivaloper" ? "validators" : "account"}/${raw}`}>
						{raw}
					</a>
				);
			}
		} catch {
			return formatAmountWithCurrency(raw);
		}
	}
	return raw;
};

const ReactJson = ({ style, name, theme, displayObjectSize, collapsed, displayDataTypes, src, sortKeys, quotesOnKeys }) => {
	return (
		<div className={cx("json-viewer")} style={style}>
			<JSONTree
				data={src}
				hideRoot
				theme={theme}
				collectionLimit={displayObjectSize}
				shouldExpandNodeInitially={(keyPath, data, level) => {
					return !collapsed || level < collapsed;
				}}
				sortObjectKeys={sortKeys}
				valueRenderer={(_, raw) => ValueItem(raw)}
			/>
		</div>
	);
};

export default ReactJson;
