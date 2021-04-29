// @ts-nocheck
import React, {memo} from "react";

// import "antd/dist/antd.css";
import "./EmptyTable.css";
import {ConfigProvider, Table} from "antd";
import NoResult from "../NoResult";

const EmptyTable = memo(({columns = []}) => {
	return <NoResult></NoResult>;
});

export default EmptyTable;
