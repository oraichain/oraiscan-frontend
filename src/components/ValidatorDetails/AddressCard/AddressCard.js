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
import consts from 'src/constants/consts';
import { network } from "src/lib/config/networks";
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

	const getFixedAminoSignDoc = (chainId) => {
		return {
			account_number: "0",
			chain_id: chainId,
			fee: { amount: [{ amount: "0", denom: "orai" }], gas: "200000" },
			memo: "submit",
			msgs: [{
				type: "cosmos-sdk/MsgSend", value: {
					amount: [{ amount: "0", denom: "foobar" }],
					from_address: "foobar",
					to_address: "foobar"
				}
			}],
			sequence: "0"
		};
	}

	const getFixedSignDoc = (chainId) => {
		return {
			bodyBytes: Uint8Array.from([
				10, 61, 10, 28, 47, 99, 111, 115, 109, 111, 115, 46,
				98, 97, 110, 107, 46, 118, 49, 98, 101, 116, 97, 49,
				46, 77, 115, 103, 83, 101, 110, 100, 18, 29, 10, 6,
				102, 111, 111, 98, 97, 114, 18, 6, 102, 111, 111, 98,
				97, 114, 26, 11, 10, 6, 102, 111, 111, 98, 97, 114,
				18, 1, 48, 18, 6, 115, 117, 98, 109, 105, 116
			]),
			authInfoBytes: Uint8Array.from([
				10, 78, 10, 70, 10, 31, 47, 99, 111, 115, 109, 111,
				115, 46, 99, 114, 121, 112, 116, 111, 46, 115, 101, 99,
				112, 50, 53, 54, 107, 49, 46, 80, 117, 98, 75, 101,
				121, 18, 35, 10, 33, 2, 92, 51, 66, 167, 70, 56,
				216, 64, 133, 48, 180, 69, 85, 89, 166, 158, 108, 171,
				124, 137, 250, 106, 100, 171, 219, 241, 112, 201, 253, 156,
				117, 58, 18, 4, 10, 2, 8, 1, 18, 15, 10, 9,
				10, 4, 111, 114, 97, 105, 18, 1, 48, 16, 192, 154,
				12
			]),
			chainId,
			accountNumber: 0,
		};
	}

	const props = {
		action: async (file) => {
			const restrict = file?.type?.split('/');
			if (restrict?.[0] !== "image" || restrict?.[1] === "svg+xml") {
				return restrictFile();
			}
			const keplr = await window.Keplr.getKeplr();
			if (!keplr) throw consts.INSTALL_KEPLR_FIRST;
			const key = await keplr.getKey(network.chainId);
			const sender = key?.bech32Address;
			const isLedger = key?.isNanoLedger;
			const formData = new FormData();

			const utcTimestamp = new Date().getTime();
			const timestamp = utcTimestamp.toString();

			var response = {};
			var signDoc = {};
			var postData = {};

			if (!isLedger) {
				signDoc = getFixedAminoSignDoc(network.chainId);
				response = await keplr.signAmino(network.chainId, sender, {
					...signDoc,
					account_number: timestamp
				})
				postData = {
					isAmino: true,
					data: response?.signed,
				}
			} else {
				signDoc = getFixedSignDoc(network.chainId);
				response = await keplr.signDirect(network.chainId, sender, {
					...signDoc,
					accountNumber: timestamp
				})
				postData = {
					isAmino: false,
					data: { ...response?.signed, bodyBytes: Buffer.from(response?.signed.bodyBytes).toString('base64'), authInfoBytes: Buffer.from(response?.signed.authInfoBytes).toString('base64') },
				}
			}
			const signature_hash = response?.signature?.signature;

			formData.append('image', file);
			formData.append('address', sender);
			formData.append('signature_hash', signature_hash);
			formData.append('post_data', JSON.stringify(postData));
			formData.append('account_number', timestamp);
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
