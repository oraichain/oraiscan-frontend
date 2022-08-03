import React from "react";
import classNames from "classnames/bind";
import {makeStyles} from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "./LoadingOverlay.module.scss";

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		"& > * + *": {
			marginLeft: theme.spacing(2),
		},
	},
}));

const cx = classNames.bind(styles);

const LoadingOverlay = () => {
	const classes = useStyles();
	return (
		<div className={cx("loading-background", classes.root)}>
			<CircularProgress className={cx("loading-bar")} />
		</div>
	);
};

export default LoadingOverlay;
