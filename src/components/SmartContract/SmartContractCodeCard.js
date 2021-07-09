/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import SyntaxHighlighter from "react-syntax-highlighter";
import copy from "copy-to-clipboard";
import PropTypes from "prop-types";
import {agate} from "react-syntax-highlighter/dist/esm/styles/hljs";
import {foundation} from "react-syntax-highlighter/dist/esm/styles/hljs";
import Skeleton from "@material-ui/lab/Skeleton";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import classNames from "classnames/bind";
import {themeIds} from "src/constants/themes";
import {_} from "src/lib/scripts";
import useGithubSource from "src/hooks/useGithubSource";
import {showAlert} from "src/store/modules/global";
import NoResult from "src/components/common/NoResult";
import styles from "./SmartContractCodeCard.module.scss";
import copyIcon from "src/assets/common/copy_ic.svg";

const cx = classNames.bind(styles);

const SmartContractCodeCard = ({data, noShadow}) => {
	const activeThemeId = useSelector(state => state.activeThemeId);
	const dispatch = useDispatch();
	const {data: storeCodeData, loading: loadingStoreCode, error: storeCodeError, fetch: fetchStoreCode} = useGithubSource();

	useEffect(() => {
		if (!_.isNil(data?.source) && data?.source !== "") {
			const loadStoreCode = async () => {
				let source = data?.source;
				source = source?.split?.(" ")?.[0];
				fetchStoreCode(source);
			};

			loadStoreCode();
		}
	}, [data?.source]);

	let storeCodeElement;
	if (loadingStoreCode || _.isNil(data?.source)) {
		storeCodeElement = <Skeleton className={cx("skeleton-block")} variant='rect' height={200} />;
	} else {
		if (storeCodeError || (!_.isNil(data?.source) && data?.source === "")) {
			storeCodeElement = <NoResult />;
		} else {
			if (Array.isArray(storeCodeData)) {
				storeCodeElement = storeCodeData.map((item, index) => {
					return (
						<div className={cx("code-container")}>
							<Accordion key={"code-" + index}>
								<AccordionSummary expandIcon={<ExpandMoreIcon />}>
									<div className={cx("code-name")}>{item?.name ?? "-"}</div>
									<img
										src={copyIcon}
										alt=''
										className={cx("code-copy")}
										onClick={e => {
											copy(item?.content ?? "-");
											dispatch(
												showAlert({
													show: true,
													message: "Copied",
													autoHideDuration: 1500,
												})
											);
											e.stopPropagation();
										}}
									/>
								</AccordionSummary>
								<AccordionDetails>
									<SyntaxHighlighter
										customStyle={{background: "none", overflow: "auto", width: "100%"}}
										language='rust'
										style={activeThemeId === themeIds.LIGHT ? foundation : agate}>
										{item?.content ?? "-"}
									</SyntaxHighlighter>
								</AccordionDetails>
							</Accordion>
						</div>
					);
				});
			} else {
				storeCodeElement = <div>-</div>;
			}
		}
	}

	return (
		<div className={cx("code-card", {"code-card-no-shadow": noShadow})}>
			<div className={cx("code-card-header")}>
				<div className={cx("title")}>
					{/* <span
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
					</span> */}
					<span className={cx("title-text")}>Contract Source Code</span>
				</div>
			</div>
			<div className={cx("code-card-body")}>{storeCodeElement}</div>
		</div>
	);
};

SmartContractCodeCard.propTypes = {
	data: PropTypes.any,
	noShadow: PropTypes.bool,
};
SmartContractCodeCard.defaultProps = {
	noShadow: false,
};

export default SmartContractCodeCard;
