// @ts-nocheck
import React, {memo} from "react";

// import "antd/dist/antd.css";
import "./EmptyTable.css";
import {ConfigProvider, Table} from "antd";

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
