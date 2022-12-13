import React, { memo, useEffect, useRef } from "react";
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

const cx = classNames.bind(styles);

const ItemCodeContract = () => {
	return (
		<div className={cx("header")}>
			<div className={cx("title")}><SuccessIcon /> Contract Source Code Verified</div>
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
										<div className={cx("item-text")}>Outcry</div>
									</td>
								</tr>
								<tr>
									<td>
										<div className={cx("item-title")}>Compiler Version:</div>
									</td>
									<td>
										<div className={cx("item-text")}>v0.8.16+commit.07a7930e</div>
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

const ItemContract = ({ linkChain, onClickCopy, onClickLinkChain, leftHeader, onClickDownArrow, label }) => {
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
							<div className={cx('link')} onClick={onClickCopy}><CopyVerifiedIcon /> </div>
							<div style={{ width: 16 }} />
							<div className={cx('link')} onClick={onClickDownArrow}><DownArrowIcon /></div></>}
					</div>
				</Grid>
			</Grid>
			<div className={cx("source")} >
				<div className={cx("data")}>
					{
						JSON.stringify('[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":" }][{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":" }][{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":" }][{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":" }][{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":" }][{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":" }][{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":" }][{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":" }][{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":" }][{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":" }]')
					}
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

const CodeContract = memo(() => {
	const selectDropdownCode = useRef(null);
	const selectDropdownMore = useRef(null);
	const selectDropdownAudit = useRef(null);

	const refDropdownCode = useRef(null);
	const refDropdownMore = useRef(null);
	const refDropdownAudit = useRef(null);

	const [valueCode, setValueCode] = React.useState('Code');
	const [valueMore, setValueMore] = React.useState('More Option');
	const [valueAudit, setValueAudit] = React.useState('Export ABI')

	return (
		<div>
			<ItemCodeContract />
			<div className={cx("flex")}>
				<RegularFileIcon /> <span style={{ width: 4 }} />Contract Source Code
			</div>
			<div className={cx("flex")}>
				<DropDownContract refDrop={refDropdownCode} refSelect={selectDropdownCode} value={valueCode} setValue={setValueCode} arrayList={[1, 2, 3]} />
				<DropDownContract refDrop={refDropdownMore} refSelect={selectDropdownMore} value={valueMore} setValue={setValueMore} arrayList={[1, 2, 3]} />
			</div>

			<ItemContract linkChain />
			<div className={cx("flex")}>
				<RegularFileIcon />	<span style={{ width: 4 }} /> Contract Security Audit
			</div>
			<div className={cx("flex")}>
				<DropDownContract refDrop={refDropdownAudit} refSelect={selectDropdownAudit} value={valueAudit} setValue={setValueAudit} arrayList={[1, 2, 3]} />
			</div>
			<ItemContract label="Contract ABI" />
			<ItemContract label="Contract Creation Code" />
		</div>
	);
});


ItemContract.propTypes = {
	linkChain: PropTypes.bool,
	leftHeader: PropTypes.element,
	onClickCopy: PropTypes.func,
	onClickLinkChain: PropTypes.func,
	onClickDownArrow: PropTypes.func,
	label: PropTypes.string
};

ItemContract.defaultProps = {
	linkChain: false,
	leftHeader: undefined,
	label: "",
	onClickCopy: () => { },
	onClickLinkChain: () => { },
	onClickDownArrow: () => { }
};

export default CodeContract;
