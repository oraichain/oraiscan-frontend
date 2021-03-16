import React, {memo} from "react";
import classNames from "classnames/bind";

// import "antd/dist/antd.css";
import "./EmptyTable.css";
import {ConfigProvider, Switch, Divider, TreeSelect, Select, Cascader, Transfer, Table, List} from "antd";

const EmptyTable = memo(({columns = []}) => {
	return (
		<div>
			<ConfigProvider renderEmpty={false}>
				<div className='config-provider'>
					<Table columns={columns} />
				</div>
			</ConfigProvider>
		</div>
	);
});

export default EmptyTable;
