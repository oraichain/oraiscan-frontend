import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import cn from "classnames/bind";
import consts from "src/constants/consts";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import Pagination from "src/components/common/Pagination";
import NoResult from "src/components/common/NoResult";
import styles from "./VerifiedContracts.module.scss";
import VerifiedContractCard from "src/components/VerifiedContracts/VerifiedContractTable";
import VerifiedContractCardList from "src/components/VerifiedContracts/VerifiedContractCardList/VerifiedContractCardList";
import VerifiedContractTableSkeleton from 'src/components/VerifiedContracts/VerifiedContractTable/VerifiedContractTableSkeleton';
import VerifiedContractCardListSkeleton from 'src/components/VerifiedContracts/VerifiedContractCardList/VerifiedContractCardListSkeleton';
import * as api from "src/lib/api";
import AddIcon from "src/icons/AddIcon";
import Dialog from "@material-ui/core/Dialog";
import { useForm } from "react-hook-form";
import { ReactComponent as CloseIcon } from "src/assets/icons/close.svg";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ErrorMessage } from "@hookform/error-message";
import { handleErrorMessage } from "../../lib/scripts";
import { notification } from "antd";
import LoadingOverlay from "src/components/common/LoadingOverlay";
import { makeStyles } from '@material-ui/core/styles';

const cx = cn.bind(styles);
const defaultValues = {
	contract_address: "",
	wasm_file: undefined,
};
const schema = yup.object().shape({
	contract_address: yup.string().required("The Contract Address is required"),
	github_commit: yup.string().required("The Github Commit is required"),
});

const useStyles = makeStyles({
	root: {
		"&:hover": {
			backgroundColor: "transparent",
		},
	},
	icon: {
		borderRadius: 5,
		marginLeft: 3,
		width: 22,
		height: 22,
		boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
		border: "1px solid #405d78 "

	},
	checkedIcon: {
		backgroundColor: '#7664E4',
		'&:before': {
			display: 'block',
			marginLeft: -1,
			marginTop: -1,
			width: 22,
			height: 22,
			backgroundImage:
				"url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
				" fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
				"1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
			content: '""',
		},
		'input:hover ~ &': {
			backgroundColor: '#7664E4',
		},
	},
});


const VerifiedContracts = () => {
	const theme = useTheme();
	const classes = useStyles();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [verifiedContractData, setVerifiedContractData] = useState([]);
	const [verifiedPageId, setVerifiedPageId] = useState(1);
	const [loading, setLoading] = useState(false);
	const verifiedContractTotalPagesRef = useRef(null);
	const [open, setOpen] = useState(false);
	const [loadingTransaction, setLoadingTransaction] = useState(false);
	const {
		handleSubmit,
		register,
		unregister,
		control,
		formState: { errors },
		clearErrors,
	} = useForm({ defaultValues, resolver: yupResolver(schema) });

	useEffect(() => {
		(async () => await getData())()
	}, [verifiedPageId]);

	const getData = useCallback(async () => {
		try {
			setLoading(true);
			const verifiedData = await api.axiosCall({
				method: 'post',
				url: `${consts.API_CONTRACT_DEPLOY}${consts.PATH_CONTRACT.LIST}`,
				data: {
					page: verifiedPageId,
					size: consts.REQUEST.LIMIT,
				}
			});
			setLoading(false);
			setVerifiedContractData(verifiedData?.data)
		} catch (error) {
			console.log({ error });
			setLoading(false);
		}
	}, [verifiedPageId])

	let paginationWasmcodeSection;
	let tableVerifiedContract;
	let verfiedButton;
	let VerifiedContractSection = (
		<TitleWrapper>
			{isLargeScreen ? (
				<>
					<PageTitle title={"Verified Contracts"} />
					<StatusBox />
				</>
			) : (
				<>
					<StatusBox />
					<PageTitle title='Verified Contracts' />
				</>
			)}
		</TitleWrapper>
	);


	if (loading) {
		tableVerifiedContract = isLargeScreen ? <VerifiedContractTableSkeleton /> : <VerifiedContractCardListSkeleton />;
	} else if (!verifiedContractData?.data?.length) {
		tableVerifiedContract = <NoResult />
		verifiedContractTotalPagesRef.current = null;
	} else {
		if (!isNaN(verifiedContractData?.meta?.counts)) {
			verifiedContractTotalPagesRef.current = verifiedContractData?.meta?.counts
		} else {
			verifiedContractTotalPagesRef.current = null;
		}
		if (Array.isArray(verifiedContractData?.data) && verifiedContractData?.data?.length > 0) {
			tableVerifiedContract = isLargeScreen ? <VerifiedContractCard data={verifiedContractData.data} /> : <VerifiedContractCardList data={verifiedContractData.data} />
		} else {
			tableVerifiedContract = <NoResult />;
		}
	}

	paginationWasmcodeSection = verifiedContractTotalPagesRef.current ? (
		<Pagination pages={Math.ceil(verifiedContractTotalPagesRef.current / consts.REQUEST.LIMIT)} page={verifiedPageId} onChange={(e, page) => setVerifiedPageId(page)} />
	) : (
		<></>
	);


	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	verfiedButton = (
		<div className={cx("verified-button")} onClick={handleOpen}>
			<span className={cx("verified-button-text")}>Verify Contract</span>
			<AddIcon className={cx("verified-button-icon")} />
		</div>
	);

	const onSubmit = async data => {
		try {
			setLoadingTransaction(true);
			const verified = await api.axiosCall({
				method: "post",
				url: `${consts.API_CONTRACT_DEPLOY}${consts.PATH_CONTRACT.LIST}/verify`,
				data: {
					contract_address: data?.contract_address,
					github_commit: data?.github_commit,
					github_org: data?.github_org,
					github_repo: data?.github_repo,
					compiler_version: data?.compiler_version,
				},
				headers: {},
			});
			setLoadingTransaction(false);
			handleClose();
			if (verified?.data?.data?.contract_verification) {
				notification.success({
					message: "Verified Contract",
					description: verified?.data?.data?.contract_verification,
				});
				await getData();
			} else {
				if (verified?.data?.error?.Code == "E014") {
					notification.info({
						message: "Verified Contract",
						description: verified?.data?.error?.Message,
					});
				} else {
					notification.error({
						message: "Verified Contract",
						description: verified?.data?.error?.Message,
					});
				}
			}
		} catch (error) {
			console.log("error: ", error);
			setLoadingTransaction(false);
			handleClose();
			notification.error({ message: handleErrorMessage(error) });
		}
	}

	return (
		<>
			<Container fixed className={cx("smart-contracts")}>
				{VerifiedContractSection}
				{verfiedButton}
			</Container>
			<Container fixed className={cx("smart-contracts")}>
				{tableVerifiedContract}
				{paginationWasmcodeSection}
			</Container>
			<Dialog open={open} maxWidth='sm' fullWidth={true} aria-labelledby='verified--dialog' onClose={handleClose}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={cx("dialog-header")}>
						<div className={cx("close-button")} onClick={handleClose}>
							<CloseIcon />
						</div>
					</div>
					<div className={cx("dialog-body")}>
						<div className={cx("field")}></div>
						<div className={cx("field")}>
							<label className={cx("label")} htmlFor='title'>
								Contract Address
							</label>
							<input type='text' className={cx("text-field")} placeholder="orai1wgclpy30tv7300xu0rtwjs930n73h8qv5qk522" name='contract_address' ref={register} />
							<ErrorMessage errors={errors} name='contract_address' render={({ message }) => <p className={cx("error-message")}>{message}</p>} />
						</div>
						<div className={cx("field")}>
							<label className={cx("label")} htmlFor='title'>
								Github Commit
							</label>
							<input type='text' className={cx("text-field")} placeholder="572ddabe691bb1d2fd927830e2f455e66d44cda1" name='github_commit' ref={register} />
							<ErrorMessage errors={errors} name='github_commit' render={({ message }) => <p className={cx("error-message")}>{message}</p>} />
						</div>
						<div className={cx("field")}>
							<label className={cx("label")} htmlFor='title'>
								Github Org
							</label>
							<input type='text' className={cx("text-field")} name='github_org' placeholder="oraichain" ref={register} />
							<ErrorMessage errors={errors} name='github_org' render={({ message }) => <p className={cx("error-message")}>{message}</p>} />
						</div>
						<div className={cx("field")}>
							<label className={cx("label")} htmlFor='title'>
								Github Repo
							</label>
							<input type='text' className={cx("text-field")} name='github_repo' placeholder="oraiscan-frontend" ref={register} />
							<ErrorMessage errors={errors} name='github_repo' render={({ message }) => <p className={cx("error-message")}>{message}</p>} />
						</div>
						<div className={cx("field")}>
							<label className={cx("label")} htmlFor='title'>
								Compiler Version
							</label>
							<input type='text' className={cx("text-field")} name='compiler_version' placeholder="cosmwasm/workspace-optimizer:0.12.10" ref={register} />
							<ErrorMessage errors={errors} name='compiler_version' render={({ message }) => <p className={cx("error-message")}>{message}</p>} />
						</div>
					</div>
					<div className={cx("dialog-footer")}>
						<button type='submit' className={cx("submit-button")}>
							<span className={cx("submit-button-text")}>Verify</span>
						</button>
					</div>
				</form>
			</Dialog>
			{loadingTransaction && <LoadingOverlay />}
		</>
	);
};

VerifiedContracts.propTypes = {};
VerifiedContracts.defaultProps = {};

export default VerifiedContracts;
