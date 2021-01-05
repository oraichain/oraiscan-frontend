import React, { memo } from "react";
import classNames from "classnames/bind";

import styles from "./ColumnsInfo.scss";

const cx = classNames.bind(styles);

const ColumnsInfo = memo(({ width = [], data = [] }) => {
  return (
    <div className={cx("main-container")}>
      {data.map((col, colIndex) => (
        <div key={colIndex} style={{ flex: width[colIndex] }}>
          {col.map((item, rowIndex) => (
            <div key={rowIndex} className={cx("row")}>
              {item.key !== "" &&
                <div className={cx("title")}>{item.key}</div>
              }
              <div style={{ fontSize: 12, color: item.link ? "#1B57F0" : "#000" }}>{item.value}</div>
            </div>
          ))}
        </div>
      ))}
    </div >
  );
});

export default ColumnsInfo;