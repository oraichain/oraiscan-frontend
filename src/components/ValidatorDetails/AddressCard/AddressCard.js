import React, { memo } from "react";
import classNames from "classnames/bind";
import Address from "src/components/common/Address";
import { logoBrand } from "src/constants/logoBrand";
import aiIcon from "src/assets/common/ai_ic.svg";
import { useGet } from "restful-react";
import checkIcon from "src/assets/validatorDetails/check.svg";
import CheckIcon from "src/icons/Validators/CheckIcon";
import Upload from "rc-upload";
import RejectedIcon from "src/icons/Proposals/RejectedIcon";
import keccak256 from "keccak256";
import secp256k1 from "secp256k1";
import * as api from "src/lib/api";
import { notification } from "antd";
import consts from "src/constants/consts";
import { network } from "src/lib/config/networks";
import styles from "./AddressCard.module.scss";
import { sha256 } from "js-sha256";

const cx = classNames.bind(styles);

const AddressCard = memo(({ moniker, operatorAddress, address, isInactive }) => {
	const [src, setSrc] = React.useState("");
	const logoItem = logoBrand.find(it => it.operatorAddress === operatorAddress);
	const [dataDetails, setDataDetails] = React.useState({ image: "", nonce: 0 });
	const [logoURL, setLogoURL] = React.useState("");
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
			setLogoURL(logoItem?.logo ? logoItem.logo : "");
		}
		setDataDetails(detail?.data);
	};

	React.useEffect(() => {
		if (src !== "") {
			fetchImages();
		}
	}, [src]);

	const restrictFile = () => {
		notification.info({
			message: "Upload Image Validator",
			description: "File type is not in the correct format",
		});
		setTimeout(() => {
			notification.destroy();
		}, 5000);
	};

	const sortObject = obj => {
		if (typeof obj !== "object" || obj === null) return obj;

		if (Array.isArray(obj)) return obj.map(sortObject);

		return Object.fromEntries(
			Object.entries(obj)
				.sort(([k1], [k2]) => k1.localeCompare(k2))
				.map(([k, v]) => [k, sortObject(v)])
		);
	};

	const getSignDoc = (data, signer) => {
		return sortObject({
			chain_id: "",
			account_number: "0",
			sequence: "0",
			fee: {
				gas: "0",
				amount: [],
			},
			msgs: [
				{
					type: "sign/MsgSignData",
					value: {
						signer,
						data: Buffer.from(data).toString("base64"),
					},
				},
			],
			memo: "",
		});
	};

	const props = {
		action: async file => {
			const restrict = file?.type?.split("/");
			console.log({
				restrict,
			});
			if (restrict?.[0] !== "image" || restrict?.[1] === "svg+xml") {
				return restrictFile();
			}
			const keplr = await window.Keplr.getKeplr();
			if (!keplr) throw consts.INSTALL_KEPLR_FIRST;
			const key = await keplr.getKey(network.chainId);
			const sender = key?.bech32Address;
			const formData = new FormData();

			const utcTimestamp = new Date().getTime();
			var response = {};
			const data = JSON.stringify(getSignDoc("foobar", sender));
			const msg = Buffer.from(sha256.digest(data)).toString("base64");
			try {
				response = await keplr.signArbitrary(network.chainId, sender, "foobar");
				formData.append("image", file);
				formData.append("address", sender);
				formData.append("signature_hash", response.signature);
				formData.append("msg", msg);

				const uploadImages = await api.uploadImagesValidator({
					method: "post",
					data: formData,
					headers: { "Content-Type": "multipart/form-data" },
				});
				if (uploadImages?.data?.status) {
					notification.success({
						message: "Upload Image Validator",
						description: uploadImages?.data?.status,
					});
				} else if (uploadImages?.status) {
					notification.info({
						message: "Upload Image Validator",
						description: uploadImages?.data,
					});
				}
			} catch (error) {
				console.log({ error });
				notification.error({
					message: "Upload Image Validator",
					description: error?.response?.data,
				});
			}
			setTimeout(() => {
				notification.destroy();
			}, 5000);
			setSrc(URL.createObjectURL(file));
		},
		multiple: true,
		onStart(file) {
			console.log("onStart", file, file.name);
		},
		onSuccess(result) {
			console.log("onSuccess", result);
		},
		onError(err) {
			console.log("onError", err);
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
					<Upload {...props}>
						<div className={cx("validator-account-images")}>
							{logoURL && <img alt='/' className={cx("validator-account-icon")} src={logoURL} />}
							{!logoURL && <div className={cx("logo-custom")}> {logoName.substring(0, 3).toUpperCase()} </div>}
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
