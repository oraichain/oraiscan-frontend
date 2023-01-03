import React, { useEffect, useMemo, useState } from 'react';
import SuccessIcon from "src/icons/SuccessIcon";
import styles from "./ComponentContract.module.scss";
import Grid from "@material-ui/core/Grid";
import CopyVerifiedIcon from "src/icons/CopyContractIcon";
import DownArrowIcon from "src/icons/DownArrowIcon";
import BiCodeSlashIcon from "src/icons/BiCodeSlashIcon";
import LinkChainIcon from 'src/icons/LinkChainIcon'
import classNames from "classnames/bind";
import DownAngleIcon from "src/icons/DownAngleIcon";
import _ from "lodash";
import ReactJson from "react-json-view";
import { themeIds } from "src/constants/themes";
import PropTypes from "prop-types";
import { Button, Collapse } from "@material-ui/core";
import VectorIcon from 'src/icons/VectorIcon';

const heightDefault = 300;
const heightCollase = 600;
const cx = classNames.bind(styles);

export const ItemCodeContract = ({ contractName, compilerVersion, contractVerification }) => {
	return (
		<div className={cx("header")}>
			<div className={cx("title")}>
				{contractVerification === "VERIFIED" ? (
					<>
						{" "}
						<SuccessIcon />
						<div style={{ width: 4 }} />
					</>
				) : (
					<div style={{ width: 24 }} />
				)}{" "}
				Contract Source Code: {contractVerification}
			</div>
			<Grid container spacing={2}>
				<Grid item lg={6} xs={12}>
					<div className={cx("contract-preview")}>
						<table>
							<tbody>
								<tr>
									<td>
										<div className={cx("item-title")}>Contract Name:</div>
									</td>
									<td>
										<div className={cx("item-text")}>{contractName ?? "-"}</div>
									</td>
								</tr>
								<tr>
									<td>
										<div className={cx("item-title")}>Compiler Version:</div>
									</td>
									<td>
										<div className={cx("item-text")}>{compilerVersion ?? "-"}</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</Grid>
				<Grid item lg={6} xs={12}>
					<div className={cx("contract-preview")}>
						<table>
							<tbody>
								<tr>
									<td>
										<div className={cx("item-title")}>Optimization Enabled:</div>
									</td>
									<td>
										<div className={cx("item-text")}>Yes with 200 runs</div>
									</td>
								</tr>
								<tr>
									<td>
										<div className={cx("item-title")}>Other Settings:</div>
									</td>
									<td>
										<div className={cx("item-text")}>Default evmVersion, MIT license</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</Grid>
			</Grid>
		</div>
	);
}

export const DropDownContract = ({ refDrop, refSelect, value, setValue, arrayList }) => {
	const handleChange = (item) => {
		hideList();
		setValue(item);
	}
	const showList = () => {
		if (!_.isNil(refDrop.current)) {
			refDrop.current.style.display = "block";
		}
	};
	const hideList = () => {
		if (!_.isNil(refDrop.current)) {
			refDrop.current.style.display = "none";
		}
	};
	const clickListener = event => {
		if (refSelect?.current?.contains?.(event?.target)) {
			if (refDrop?.current?.style?.display === "block") {
				hideList();
			} else {
				showList();
			}
			return;
		}
		if (!_.isNil(refDrop.current) && !refDrop?.current?.contains?.(event?.target)) {
			hideList();
		}
	};

	useEffect(() => {
		document.addEventListener("click", clickListener, true);

		return () => {
			document.removeEventListener("click", clickListener);
		};
	}, []);

	return (
		<div className={cx("dropdown-contract")}>
			<div className={cx("selected-item")} ref={refSelect}>
				<input type='text' className={cx("text-field")} value={value} readOnly />
				<DownAngleIcon className={cx("arrow")} />
			</div>
			<div className={cx("list")} ref={refDrop}>
				{arrayList.map((item, index) => (
					<div key={"list-item-" + index} className={cx("list-item")} onClick={() => handleChange(item)}>
						{item}
					</div>
				))}
			</div>
		</div>
	)
}

export const ItemContract = ({ linkChain, onClickCopy, onClickLinkChain, leftHeader, onClickDownArrow, label, msg, activeThemeId }) => {
	const [height, setHeight] = useState(false);
	return (
		<div className={cx("items-code")}>
			<Grid container spacing={2}>
				<Grid item lg={6} xs={12}>
					{label && <div className={cx("label")} >
						<BiCodeSlashIcon /> <div style={{ width: 6 }} /> {label}
					</div>}
				</Grid>
				<Grid item lg={6} xs={12} >
					<div className={cx("action-right")} >
						{linkChain && <><div className={cx('link')} onClick={onClickLinkChain}><LinkChainIcon /></div><div style={{ width: 16 }} /></>}
						{leftHeader ? leftHeader : <>
							<div className={cx('link')} onClick={() => onClickCopy(msg)}><CopyVerifiedIcon /> </div>
							<div style={{ width: 16 }} />
							<div className={cx('link')} onClick={() => setHeight(!height)}><DownArrowIcon style={{ transform: !height ? "rotate(0deg)" : "rotate(180deg)" }} /></div></>}
					</div>
				</Grid>
			</Grid>
			<div className={cx("source")} >
				<div className={cx("data")} style={{ maxHeight: !height ? heightDefault : heightCollase, overflow: 'auto' }}>
					{msg && <ReactJson
						style={{ backgroundColor: "transparent" }}
						name={false}
						theme={activeThemeId === themeIds.DARK ? "monokai" : "rjv-default"}
						displayObjectSize={false}
						displayDataTypes={false}
						src={msg}
						collapsed={false}
						sortKeys={true}
						quotesOnKeys={true}
					/>}
				</div>
			</div>
		</div>
	)
}

export const ReadWriteContract = ({ label, amount, type, status }) => {
    const [state, setState] = useState(false);
    useMemo(() => {
        setState(status);
    }, [status])
    return (
        <div className={cx("items")} >
            <div className={cx("header")} onClick={() => setState(!state)}>
                <div className={cx("label")}>{label}</div>
                <div className={cx("icon")}>
                    <CopyVerifiedIcon className={cx('link')} />
                    <div style={{ width: 16 }} />
                    <div onClick={() => setState(!state)}>
                        <DownArrowIcon className={cx('link')} style={{ transform: !state ? "rotate(0deg)" : "rotate(180deg)" }} />
                    </div>
                </div>
            </div>
            <Collapse in={state}>
                <div className={cx("value")}>
                    <span className={cx("amount")}>{amount} </span>
                    <span className={cx("type")}>{type}</span>
                </div>
            </Collapse>
        </div>
    );
};


export const Allowance = ({ label, onClick, owner, setOwner, spender, setSpender, onClickCopy, status }) => {
    const [state, setState] = useState(false);
    useMemo(() => {
        setState(status);
    }, [status])

    return (
        <div className={cx("items")} >
            <div className={cx("header")}  onClick={() => setState(!state)}>
                <div className={cx("label")}>{label}</div>
                <div className={cx("icon")}>
                    <div onClick={() => onClickCopy(label)}><CopyVerifiedIcon /></div>
                    <div style={{ width: 16 }} />
                    <div onClick={() => setState(!state)}>
                        <DownArrowIcon className={cx('link')} style={{ transform: !state ? "rotate(0deg)" : "rotate(180deg)" }} />
                    </div>
                </div>
            </div>
            <Collapse in={state}>
                <div className={cx("value")}>
                    <div className={cx("label-contract")}>owner (address)</div>
                    <div className={cx("input")}>
                        <input type='text' className={cx("text-field")} placeholder={''} value={owner} readOnly={false} onChange={setOwner} />
                    </div>
                    <div className={cx("label-contract")}>spender (address)</div>
                    <div className={cx("input")}>
                        <input type='text' className={cx("text-field")} placeholder={''} value={spender} readOnly={false} onChange={setSpender} />
                    </div>
                    <div className={cx("btn")}>
                        <Button variant='contained' onClick={onClick}>
                            Query
                        </Button>
                    </div>
                    <div className={cx("vector")}>
                        <VectorIcon />
                        <span className={cx("type")}> uint256</span>
                    </div>
                </div>
            </Collapse>
        </div>
    )
}


ItemContract.propTypes = {
	linkChain: PropTypes.bool,
	leftHeader: PropTypes.element,
	onClickCopy: PropTypes.func,
	onClickLinkChain: PropTypes.func,
	onClickDownArrow: PropTypes.func,
	label: PropTypes.string,
	msg: PropTypes.string,
};

ItemContract.defaultProps = {
	linkChain: false,
	leftHeader: undefined,
	label: "",
	msg: "",
	onClickCopy: () => { },
	onClickLinkChain: () => { },
	onClickDownArrow: () => { }
};