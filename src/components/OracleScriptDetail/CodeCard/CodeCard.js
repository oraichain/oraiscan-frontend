/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useGet} from "restful-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import copy from "copy-to-clipboard";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import {showAlert} from "src/store/modules/global";
import LeftArrowIcon from "src/icons/LeftArrowIcon";
import CopyIcon from "src/icons/CopyIcon";
import styles from "./CodeCard.module.scss";
import {agate} from "react-syntax-highlighter/dist/esm/styles/hljs";
import {foundation} from "react-syntax-highlighter/dist/esm/styles/hljs";
import {themeIds} from "src/constants/themes";

const cx = classNames.bind(styles);

const CodeCard = memo(({oracleScriptId, showRequestCard}) => {
	const activeThemeId = useSelector(state => state.activeThemeId);
	const dispatch = useDispatch();

	const codeString = `
		type OracleScript struct {
			Name        string         \`json:"name"\`
			Owner       sdk.AccAddress \`json:"owner"\`
			Description string         \`json:"description"\`
			MinimumFees sdk.Coins      \`json:"minimum_fees"\`
			DSources    []string       \`json:"data_sources"\`
			TCases      []string       \`json:"test_cases"\`
		}
	`;

	return (
		<div className={cx("code-card")}>
			<div className={cx("code-card-header")}>
				<div className={cx("title")}>
					<span className={cx("title-text")}>Code</span>
					<span
						className={cx("title-copy")}
						onClick={() => {
							copy(codeString);
							dispatch(
								showAlert({
									show: true,
									message: "Copied",
									autoHideDuration: 1500,
								})
							);
						}}>
						<CopyIcon className={cx("title-copy-icon")} />
					</span>
				</div>
				<div className={cx("button")}>
					<LeftArrowIcon className={cx("button-icon")} />
					<span className={cx("button-text")} onClick={showRequestCard}>
						Back to Request
					</span>
				</div>
			</div>
			<div className={cx("code-card-body")}>
				<SyntaxHighlighter customStyle={{background: "none"}} language='go' style={activeThemeId === themeIds.LIGHT ? foundation : agate}>
					{codeString}
				</SyntaxHighlighter>
			</div>
		</div>
	);
});

CodeCard.propTypes = {
	oracleScriptId: PropTypes.any,
	showRequestCard: PropTypes.func,
};
CodeCard.defaultProps = {};

export default CodeCard;
