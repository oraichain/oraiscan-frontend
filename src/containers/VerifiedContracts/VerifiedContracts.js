import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import cn from "classnames/bind";
import consts from "src/constants/consts";
import TogglePageBar from "src/components/common/TogglePageBar";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import Pagination from "src/components/common/Pagination";
import NoResult from "src/components/common/NoResult";
import styles from "./VerifiedContracts.module.scss";
import VerifiedContractCard from "src/components/VerifiedContracts/VerifiedContractTable";
import VerifiedContractCardList from "src/components/VerifiedContracts/VerifiedContractCardList/VerifiedContractCardList";
import * as api from "src/lib/api";
import AddIcon from "src/icons/AddIcon";
import Dialog from "@material-ui/core/Dialog";
import { useForm, Controller } from "react-hook-form";
import { ReactComponent as CloseIcon } from "src/assets/icons/close.svg";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ErrorMessage } from "@hookform/error-message";
import { handleErrorMessage } from "../../lib/scripts";
import { notification } from "antd";

const cx = cn.bind(styles);
const defaultValues = {
	title: "",
};
const schema = yup.object().shape({
	title: yup.string().required("The Title is required"),
})

const VerifiedContracts = () => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [verifiedContractData, setVerifiedContractData] = useState([]);
	const [verifiedPageId, setVerifiedPageId] = useState(1);
	const verifiedContractTotalPagesRef = useRef(null);
	const [open, setOpen] = useState(false);

	const {
		handleSubmit,
		register,
		unregister,
		control,
		formState: { errors },
		clearErrors,
	} = useForm({ defaultValues, resolver: yupResolver(schema) });

	useEffect(() => {
		(async () => {
			await getData();
		})()
	}, [])

	useEffect(() => {
		(async () => {
			await getData();
		})()
	}, [verifiedPageId])

	const getData = async () => {
		try {
			const verifiedData = await api.axiosCall({
				method: 'post',
				url: `${consts.API_CONTRACT_DEPLOY}${consts.PATH_CONTRACT.LIST}`,
				data: {
					page: verifiedPageId,
					limit: consts.REQUEST.LIMIT,
				}
			})
			setVerifiedContractData(verifiedData?.data)
		} catch (error) {
			console.log({ error });
		}
	}

	let smartContractTitleSection;
	let paginationWasmcodeSection;
	let tableVerifiedContract;
	let verfiedButton;
	let VerifiedContractSection = (
		<TitleWrapper>
			{isLargeScreen ? (
				<>
					<PageTitle title='Verified Contracts' />
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

	// const {
	// 	handleSubmit,
	// 	register,
	// 	unregister,
	// 	control,
	// 	formState: { errors },
	// 	clearErrors,
	// } = useForm({ defaultValues, resolver: yupResolver(schema) });

	if (isLargeScreen) {
		smartContractTitleSection = (
			<Container fixed>
				<TitleWrapper>
					<PageTitle title='Verified Contract' />
				</TitleWrapper>
			</Container>
		);
	} else {
		smartContractTitleSection = <TogglePageBar type='smart-contracts' />;
	}


	if (!verifiedContractData?.data?.length) {
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
			
		} catch (error) {
			console.log("error: ", error);
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
			<Dialog open={open} maxWidth='sm' fullWidth={true} aria-labelledby='create-proposal-dialog' onClose={handleClose}>
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
							<input type='text' className={cx("text-field")} name='title' ref={register} />
							<ErrorMessage errors={errors} name='title' render={({ message }) => <p className={cx("error-message")}>{message}</p>} />
						</div>
						<div className={cx("field")}>
							<label className={cx("label")} htmlFor='title'>
								Wasm File
							</label>
							<input type='file' className={cx("text-field")} name='wasm_file' ref={register} />
							<ErrorMessage errors={errors} name='wasm_file' render={({ message }) => <p className={cx("error-message")}>{message}</p>} />
						</div>


						<div className={cx("field")}>
							<label className={cx("label")} htmlFor='title'>
								Instantiate Msg Schema
							</label>
							<input type='text' className={cx("text-field")} name='title' ref={register} />
							{/* <ErrorMessage errors={errors} name='title' render={({ message }) => <p className={cx("error-message")}>{message}</p>} /> */}
						</div>
					</div>
					<div className={cx("dialog-footer")}>
						<button type='submit' className={cx("submit-button")}>
							<span className={cx("submit-button-text")}>Verified</span>
						</button>
					</div>
				</form>
			</Dialog>
		</>
	);
};

VerifiedContracts.propTypes = {};
VerifiedContracts.defaultProps = {};

export default VerifiedContracts;
