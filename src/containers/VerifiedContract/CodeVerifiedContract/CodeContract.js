import React, { memo, useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./CodeContract.module.scss";
import Grid from "@material-ui/core/Grid";
import SuccessIcon from "src/icons/SuccessIcon";
import CopyVerifiedIcon from "src/icons/CopyContractIcon";
import DownArrowIcon from "src/icons/DownArrowIcon";
import BiCodeSlashIcon from "src/icons/BiCodeSlashIcon";
import LinkChainIcon from 'src/icons/LinkChainIcon'
import RegularFileIcon from 'src/icons/RegularFileIcon';
import PropTypes from "prop-types";
import DownAngleIcon from "src/icons/DownAngleIcon";
import _ from "lodash";
import copy from "copy-to-clipboard";
import { showAlert } from "src/store/modules/global";
import { useDispatch, useSelector } from "react-redux";
import ReactJson from "react-json-view";
import { themeIds } from "src/constants/themes";

const cx = classNames.bind(styles);
const heightDefault = 300;
const heightCollase = 600;
const ItemCodeContract = ({ contractName, compilerVersion, contractVerification }) => {
	return (
		<div className={cx("header")}>
			<div className={cx("title")}>{contractVerification == "VERIFIED" && <SuccessIcon />} Contract Source Code Verified</div>
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
										<div className={cx("item-text")}>{contractName ?? '-'}</div>
									</td>
								</tr>
								<tr>
									<td>
										<div className={cx("item-title")}>Compiler Version:</div>
									</td>
									<td>
										<div className={cx("item-text")}>{compilerVersion ?? '-'}</div>
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
	)
}

const ItemContract = ({ linkChain, onClickCopy, onClickLinkChain, leftHeader, onClickDownArrow, label, msg, activeThemeId }) => {
	const [height, setHeight] = useState(false);
	return (
		<div className={cx("items-code")}>
			<Grid container spacing={2}>
				<Grid item lg={6} xs={12}>
					{label && <div className={cx("label")} >
						<BiCodeSlashIcon /> <span style={{ width: 6 }} /> {label}
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

const DropDownContract = ({ refDrop, refSelect, value, setValue, arrayList }) => {
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

const CodeContract = memo(({ data }) => {
	// const selectDropdownCode = useRef(null);
	// const selectDropdownMore = useRef(null);

	// const refDropdownCode = useRef(null);
	// const refDropdownMore = useRef(null);

	// const [valueCode, setValueCode] = React.useState('Code');
	// const [valueMore, setValueMore] = React.useState('More Option');
	// @ts-ignore
	const activeThemeId = useSelector(state => state.activeThemeId);
	const dispatch = useDispatch();
	const onClickCopy = (msg) => {
		copy(JSON.stringify(msg))
		dispatch(
			showAlert({
				show: true,
				message: "Copied",
				autoHideDuration: 1500,
			})
		);
	}

	return (
		<div>
			<ItemCodeContract contractName={data?.data?.contract_name} compilerVersion={data?.data?.compiler_version} contractVerification={data?.data?.contract_verification} />
			<div className={cx("flex")}>
				<RegularFileIcon /> <span style={{ width: 4 }} />Contract Source Code
			</div>
			{/* <div className={cx("flex")}>
				<DropDownContract refDrop={refDropdownCode} refSelect={selectDropdownCode} value={valueCode} setValue={setValueCode} arrayList={[1, 2, 3]} />
				<DropDownContract refDrop={refDropdownMore} refSelect={selectDropdownMore} value={valueMore} setValue={setValueMore} arrayList={[1, 2, 3]} />
			</div> */}
			<ItemContract activeThemeId={activeThemeId} label="File 1 of 3: execute msg.ison" onClickCopy={onClickCopy} msg={data?.data?.execute_msg_schema} />
			<ItemContract activeThemeId={activeThemeId} label="File 2 of 3: instantiate msg.json" onClickCopy={onClickCopy} msg={data?.data?.instantiate_msg_schema} />
			<ItemContract activeThemeId={activeThemeId} label="File 3 of 3: query msg.json" onClickCopy={onClickCopy} msg={data?.data?.query_msg_schema} />
		</div>
	);
});


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

export default CodeContract;
