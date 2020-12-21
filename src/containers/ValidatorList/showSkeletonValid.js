import React, { memo } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Card, CardContent } from '@material-ui/core';

import SortIcon from "../../assets/common/sort_ic.svg";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import cn from "classnames/bind";
import styles from "./showSkeletonValid.scss";
const cx = cn.bind(styles);
const ShowSkeletonValid = () => {
    return (
        <div>
            <div className={cx("card")}>
                <div className={cx("valid-card")}>
                    <div className={cx("cart-content")}>
                        <div className={cx("cart-skeleton")}>
                            <Skeleton circle={true} height={24} width={24} />
                            <Skeleton height={16} width={`70%`} />
                        </div>
                        <Skeleton height={24} width={`40%`} />
                    </div>
                </div>
                <div className={cx("valid-card")}>
                    <div className={cx("cart-content")}>
                        <div className={cx("cart-skeleton")}>
                            <Skeleton circle={true} height={24} width={24} />
                            <Skeleton height={16} width={`70%`} />
                        </div>
                        <Skeleton height={24} width={`40%`} />
                    </div>
                </div>
                <div className={cx("valid-card")}>
                    <div className={cx("cart-content")}>
                        <div className={cx("cart-skeleton")}>
                            <Skeleton circle={true} height={24} width={24} />
                            <Skeleton height={16} width={`70%`} />
                        </div>
                        <Skeleton height={24} width={`40%`} />
                    </div>
                </div>
                <div className={cx("valid-card")}>
                    <div className={cx("cart-content")}>
                        <div className={cx("cart-skeleton")}>
                            <Skeleton circle={true} height={24} width={24} />
                            <Skeleton height={16} width={`70%`} />
                        </div>
                        <Skeleton height={24} width={`40%`} />
                    </div>
                </div>
            </div>

            <TableContainer style={{
                padding: '15px 20px',
                borderRadius: '5px',
                backgroundColor: '#ffffff',
                boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
            }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Rank</TableCell>
                            <TableCell align="left">Validator<img alt="sort-icon" src={SortIcon} style={{ paddingLeft: '10px' }} /></TableCell>
                            <TableCell align="right">Voting power<img alt="sort-icon" src={SortIcon} style={{ paddingLeft: '10px' }} /></TableCell>
                            <TableCell align="right">Cumulative Share %</TableCell>
                            <TableCell align="right">Uptime<img alt="sort-icon" src={SortIcon} style={{ paddingLeft: '10px' }} /></TableCell>
                            <TableCell align="right">Commission<img alt="sort-icon" src={SortIcon} style={{ paddingLeft: '10px' }} /></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array(10).fill().map((item, index) => (
                            <TableRow key={index}>
                                <TableCell align="left" component="th" scope="row">
                                    <Skeleton />
                                </TableCell>
                                <TableCell align="left">
                                    <Skeleton />
                                </TableCell>
                                <TableCell align="right" >
                                    <Skeleton width={`70%`}/>
                                </TableCell>
                                <TableCell align="right">
                                    <Skeleton width={`70%`}/>
                                </TableCell>
                                <TableCell align="right">
                                    <Skeleton />
                                </TableCell>
                                <TableCell align="right">
                                    <Skeleton />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default ShowSkeletonValid;
