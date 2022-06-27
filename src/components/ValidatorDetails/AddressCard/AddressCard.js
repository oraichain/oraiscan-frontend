import React, { memo } from "react";
import classNames from "classnames/bind";
import Address from "src/components/common/Address";
import { logoBrand } from "src/constants/logoBrand";
import styles from "./AddressCard.scss";
import aiIcon from "src/assets/common/ai_ic.svg";
import { useGet } from "restful-react";
import checkIcon from "src/assets/validatorDetails/check.svg";
import CheckIcon from "src/icons/Validators/CheckIcon";
import Upload from 'rc-upload';
import RejectedIcon from "src/icons/Proposals/RejectedIcon";
import keccak256 from 'keccak256';
import secp256k1 from 'secp256k1';
import * as api from "src/lib/api";
import { notification } from 'antd';
const cx = classNames.bind(styles);

const AddressCard = memo(({ moniker, operatorAddress, address, isInactive }) => {
	const [src, setSrc] = React.useState('');
	const logoItem = logoBrand.find(it => it.operatorAddress === operatorAddress);
	const [dataDetails, setDataDetails] = React.useState({ image: '', nonce: 0 });
	const [logoURL, setLogoURL] = React.useState('');
	// const logoURL = src ? src : dataDetails?.image ? dataDetails?.image : logoItem.logo ? logoItem.logo : "";
	const logoName = moniker || "";

	React.useEffect(() => {
		fetchImages();
	}, []);

	const fetchImages = async () => {
		const detail = await api.getImagesValidator(operatorAddress);
		if (detail && detail.data && detail.data.image) {
			setLogoURL(detail.data.image);
		} else {
			setLogoURL(logoItem?.logo ? logoItem.logo : "")
		}
		setDataDetails(detail?.data)
	};

	React.useEffect(() => {
		if (src !== '') {
			fetchImages();
		}
	}, [src]);

	const restrictFile = () => {
		notification.info({
			message: 'Upload Image Validator',
			description: 'File type is not in the correct format',
		});
		setTimeout(() => {
			notification.destroy();
		}, 5000);
	}

	const props = {
		action: async (file) => {
			const restrict = file?.type?.split('/');
			if (restrict?.[0] !== "image" || restrict?.[1] === "svg+xml") {
				return restrictFile();
			}
			// TODO: change to encode decode bech32
			const sender = '';
			const formData = new FormData();
			const buff = Buffer.from(
				JSON.stringify({
					nonce: dataDetails?.nonce,
					address: sender?.sender,
				})
			);
			const mess = keccak256(buff);
			const sigObj = secp256k1.ecdsaSign(mess, sender?.privateKey);
			const signature_hash = Buffer.from(sigObj?.signature).toString("base64")
			formData.append('image', file);
			formData.append('address', sender?.sender);
			formData.append('signature_hash', signature_hash);
			try {
				const uploadImages = await api.uploadImagesValidator({
					method: "post",
					data: formData,
					headers: { "Content-Type": "multipart/form-data" },
				})
				if (uploadImages?.data?.status) {
					notification.success({
						message: 'Upload Image Validator',
						description:
							uploadImages?.data?.status,
					});
				} else if (uploadImages?.status) {
					notification.info({
						message: 'Upload Image Validator',
						description: uploadImages?.data,
					});
				}
			} catch (error) {
				notification.error({
					message: 'Upload Image Validator',
					description: error?.response?.data,
				});
			}

			setTimeout(() => {
				notification.destroy();
			}, 5000);
			setSrc(URL.createObjectURL(file))
		},
		multiple: true,
		onStart(file) {
			console.log('onStart', file, file.name);
		},
		onSuccess(result) {
			console.log('onSuccess', result);
		},
		onError(err) {
			console.log('onError', err);
		},
	};

	const renderValidatorStatus = () => {
		if (isInactive === true) {
			return (
				<>
					<div className={cx("validator-status-inactive")}>
						<RejectedIcon className={cx("validator-status-inactive-icon")}></RejectedIcon>
						<span className={cx("validator-status-inactive-text")}>Inactive</span>
					</div>
				</>
			);
		} else
			return (
				<>
					<div className={cx("validator-status-active")}>
						<CheckIcon className={cx("validator-status-active-icon")}></CheckIcon>
						<span className={cx("validator-status-active-text")}>Active</span>
					</div>
				</>
			);
	};

	return (
		<div className={cx("address-card")}>
			<div className={cx("address-card-header")}>
				<div className={cx("validator-account")}>
					<Upload {...props} >
						<div className={cx("validator-account-images")} >
							{logoURL && <img alt='/' className={cx("validator-account-icon")} src={logoURL} />}
							{!logoURL && <div className={cx("logo-custom")} > {logoName.substring(0, 3).toUpperCase()} </div>}
						</div>
					</Upload>
					<span className={cx("validator-account-name")}>{moniker?.length > 22 ? moniker?.substring(0, 18) + "..." : moniker}</span>
				</div>
				{renderValidatorStatus()}
			</div>
			<div className={cx("address-card-body")}>
				<div className={cx("address")}>
					<div className={cx("address-type")}>Operator address</div>
					<div className={cx("address-value")}>
						<Address address={operatorAddress} size='md' showCopyIcon={true} />
					</div>
				</div>
				<div className={cx("address")}>
					<div className={cx("address-type")}>Address</div>
					<div className={cx("address-value")}>
						<Address address={address} size='md' showCopyIcon={true} />
					</div>
				</div>
			</div>
		</div>
	);
});

export default AddressCard;
