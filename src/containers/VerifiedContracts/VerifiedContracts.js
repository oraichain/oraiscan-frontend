import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
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

const cx = cn.bind(styles);
const defaultValues = {
	contract_address: "",
	wasm_file: undefined,
};
const schema = yup.object().shape({
	contract_address: yup.string().required("The Contract Address is required"),
	wasm_file: yup
		.mixed()
		.nullable()
		.notRequired()
		.test("REQUIRED", "The Wasn File is required",
			value => value.length ? value : false)
})

const VerifiedContracts = () => {
	const theme = useTheme();
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
			<span className={cx("verified-button-text")}>Verified Contract</span>
			<AddIcon className={cx("verified-button-icon")} />
		</div>
	);

	const onSubmit = async data => {
		try {
			setLoadingTransaction(true);
			const formData = new FormData();
			formData.append("instantiate_msg_schema", data?.instantiate.length ? JSON.stringify(data?.instantiate) : data?.instantiate);
			formData.append("query_msg_schema", data?.query.length ? JSON.stringify(data?.query) : data?.query);
			formData.append("execute_msg_schema", data?.execute.length ? JSON.stringify(data?.execute) : data?.execute);
			formData.append("contract_address", data?.contract_address);
			formData.append("wasm_file", data?.wasm_file?.[0]);

			const verified = await api.axiosCall({
				method: 'post',
				url: `${consts.API_CONTRACT_DEPLOY}${consts.PATH_CONTRACT.LIST}/verify`,
				data: formData,
				headers: { "Content-Type": "multipart/form-data" },
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
				notification.error({
					message: "Verified Contract",
					description: verified?.data?.error?.Message,
				});
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
						<div className={cx("field")}>
						</div>
						<div className={cx("field")}>
							<label className={cx("label")} htmlFor='title'>
								Contract Address
							</label>
							<input type='text' className={cx("text-field")} name='contract_address' ref={register} />
							<ErrorMessage errors={errors} name='contract_address' render={({ message }) => <p className={cx("error-message")}>{message}</p>} />
						</div>
						<div className={cx("field")}>
							<label className={cx("label")} htmlFor='title'>
								Wasm File
							</label>
							<input type='file' className={cx("text-field-file")} name='wasm_file' ref={register} />
							<ErrorMessage errors={errors} name='wasm_file' render={({ message }) => <p className={cx("error-message")}>{message}</p>} />
						</div>
						<div className={cx("field")}>
							<label className={cx("label")} htmlFor='title'>
								Instantiate Msg Schema
							</label>
							<textarea className={cx("text-field")} name='instantiate' ref={register}></textarea>
							<ErrorMessage errors={errors} name='instantiate' render={({ message }) => <p className={cx("error-message")}>{message}</p>} />
						</div>
						<div className={cx("field")}>
							<label className={cx("label")} htmlFor='title'>
								Query Msg Schema
							</label>
							<textarea className={cx("text-field")} name='query' ref={register} ></textarea>
							<ErrorMessage errors={errors} name='query' render={({ message }) => <p className={cx("error-message")}>{message}</p>} />
						</div>
						<div className={cx("field")}>
							<label className={cx("label")} htmlFor='title'>
								Execute Msg Schema
							</label>
							<textarea className={cx("text-field")} name='execute' ref={register} ></textarea>
							<ErrorMessage errors={errors} name='execute' render={({ message }) => <p className={cx("error-message")}>{message}</p>} />
						</div>
					</div>
					<div className={cx("dialog-footer")}>
						<button type='submit' className={cx("submit-button")}>
							<span className={cx("submit-button-text")}>Verified</span>
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
