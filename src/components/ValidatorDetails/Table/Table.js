import React, { memo } from "react";
import classNames from "classnames/bind";

import styles from "./Table.scss";

const cx = classNames.bind(styles);

const Table = memo(({ titles = [], data = [], colFlex = [], onClick = [] }) => {
  return (
    <div>
      <div className={cx("header-container")}>
        {titles.map((title, colIndex) => (
          <div key={colIndex} className={cx("column")} style={{ flex: colFlex[colIndex] }}>
            <div className={cx("title")}>{title}</div>
          </div>
        ))}
      </div>
      {data.map((rowData, rowIndex) => (
        <div key={rowIndex} className={cx("data-row")}>
          {rowData.map((cellData, colIndex) => (
            <div
              key={colIndex}
              className={cx("column")}
              style={{ flex: colFlex[colIndex] }}
              onClick={onClick.length > 0 && onClick[rowIndex]}>
              <div className={cx("txt-data")}>{cellData}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
});

export default Table;

/* <div style={{ width: 1, height: 30, backgroundColor: "#E7E7E7" }} /> */