import React, {memo, useState} from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import OutsideClickHandler from "react-outside-click-handler";
import classNames from "classnames/bind";
import DownAngleIcon from "src/icons/DownAngleIcon";
import styles from "./SelectBox.module.scss";

const cx = classNames.bind(styles);

const SelectBox = ({value, data, onChange}) => {
	const [showDropdown, setShowDropdown] = useState(false);

	const selectedItem = data.find(item => item.value.toString() === value.toString());
	return (
		<OutsideClickHandler
			onOutsideClick={() => {
				setShowDropdown(false);
			}}>
			<div className={cx("select-box")}>
				<div
					className={cx("selected-item")}
					onClick={() => {
						setShowDropdown(!showDropdown);
					}}>
					{!_.isNil(selectedItem?.label) && <div className={cx("selected-item-label")}>{selectedItem.label}</div>}
					<DownAngleIcon className={cx("arrow")} />
				</div>
				{showDropdown && (
					<div className={cx("list")}>
						{data.map((item, index) => (
							<div
								key={"list-item-" + index}
								className={cx("list-item")}
								onClick={() => {
									onChange(item.value);
									setShowDropdown(false);
								}}>
								{item.label}
							</div>
						))}
					</div>
				)}
			</div>
		</OutsideClickHandler>
	);
};

SelectBox.propTypes = {
	value: PropTypes.any,
	data: PropTypes.any,
	onChange: PropTypes.func,
};

SelectBox.defaultProps = {
	data: [],
};

export default SelectBox;
