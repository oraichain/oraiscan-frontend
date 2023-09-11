import React from "react";
import { JSONTree } from "react-json-tree";
import cn from "classnames/bind";
import styles from "./ReactJson.module.scss";

const cx = cn.bind(styles);

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
				valueRenderer={(_, raw) => {
					if (typeof raw === "string" && raw.match(/^https?:\/\//)) {
						return (
							<a target='_blank' href={raw}>
								{raw}
							</a>
						);
					}
					return raw;
				}}
			/>
		</div>
	);
};

export default ReactJson;
