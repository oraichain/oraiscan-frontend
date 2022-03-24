import React, { useState, lazy } from "react";
import Container from "@material-ui/core/Container";
import cn from "classnames/bind";
import styles from "./OracleAI.scss";
import FilterSection from "src/components/common/FilterSection";

const Executors = lazy(() => import('src/containers/Executors'));
const OracleRequests = lazy(() => import(`src/containers/OracleRequests`));
const cx = cn.bind(styles);

let tabsOracle = ["AI Request", "AI Executors"]
export default function () {
    const [status, setStatus] = useState("AI Request");
    let filterSection;
    let tableOracle;
    let filterData = tabsOracle.map(value => {
        const filterItem = {
            label: value,
            value: value,
        };
        return filterItem;
    });

    filterSection = (
        <Container fixed className={cx("oracle")}>
            <FilterSection
                className={cx("filter-section")}
                data={filterData}
                value={status}
                onChange={value => {
                    setStatus(value);
                }}
            />
        </Container>
    );

    switch (status) {
        case "AI Request":
            tableOracle = <OracleRequests />
            break;
        case "AI Executors":
            tableOracle = <Executors />
            break;
        default:
            tableOracle = <> </>
            break;
    }

    return (
        <>
            {filterSection}
            {tableOracle}
        </>
    );
}
