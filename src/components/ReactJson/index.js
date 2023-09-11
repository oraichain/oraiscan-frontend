import React from "react";
import { JSONTree } from "react-json-tree";

const ReactJson = ({ style, name, theme, displayObjectSize, collapsed, displayDataTypes, src, sortKeys, quotesOnKeys }) => {
	return (
		<JSONTree
			data={src}
			theme={theme}
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
	);
};

export default ReactJson;
