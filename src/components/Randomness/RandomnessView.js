/* eslint-disable no-loop-func */
/* eslint-disable no-undef */
import * as React from "react";
import {useState, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useHistory} from "react-router-dom";
import PropTypes from "prop-types";
import cn from "classnames/bind";
import axios from "axios";
import copy from "copy-to-clipboard";
import {showAlert} from "src/store/modules/global";
import {_} from "src/lib/scripts";
import CopyIcon from "src/icons/CopyIcon";
import InfoRow from "src/components/common/InfoRow";
import consts from "src/constants/consts";
import config from "src/config";
import {generateRandomString} from "src/helpers/helper";
import styles from "./Randomness.module.scss";

const cx = cn.bind(styles);

const RandomnessView = ({ data, errorMessage }) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const randomValueRef = useRef(null);
	const [txhash, setTxhash] = useState(null);

    const handelGetTx = async () => {
        const {randomnessContractAddress} = config;
        const apiGetTx = `${consts.LCD_API_BASE}${consts.LCD_API.TXS}?events=wasm.round%3D%27${data?.latest?.round}%27&events=wasm.contract_address%3D%27${randomnessContractAddress}%27`;
		const tx = await axios.get(apiGetTx);
		setTxhash(tx?.data?.tx_responses?.[0]?.txhash);
	};

	const handleClickTx = () => {
		history.push("/txs/" + txhash);
	};

    useEffect(() => {
		data?.latest?.round && handelGetTx();
	}, [data?.latest?.round]);

    useEffect(() => {
        function rotateWordAnimation() {
            let currentValue = Array.from(randomValueRef.current.innerHTML);
            let timeOut = 0;
            for (let i = 0; i < currentValue.length; i++) {
                timeOut += 30;
                let interval = setInterval(() => {
                    let newValue = generateRandomString(1);
                    currentValue[i] = newValue;
                    if (randomValueRef.current) {
                        randomValueRef.current.innerHTML = currentValue.join("");
                    }
                }, 50);
                setTimeout(() => {
                    currentValue[i] = Array.from(data?.latest?.randomness)?.[i];
                    if (randomValueRef.current) {
                        randomValueRef.current.innerHTML = currentValue.join("");
                    }
                    clearInterval(interval);
                }, 500 + timeOut);
            }
        }
        if (randomValueRef.current && randomValueRef.current.innerHTML) {
            rotateWordAnimation();
        }
        
    }, [data?.latest?.randomness])

	return (
		<>
			<InfoRow label='Random Seed (User Input)'>
				<div className={cx("input-text")}>{data?.latest?.user_input ? data.latest.user_input : "-"}</div>
			</InfoRow>
            <InfoRow label='Random Value'>
                <div className={cx("address")}>
                    <span ref={randomValueRef} className={cx("address-value")}>
                        {data?.latest?.randomness}
                    </span>
                    <span
                        className={cx("address-copy")}
                        onClick={() => {
                            copy(data?.latest?.randomness);
                            dispatch(
                                showAlert({
                                    show: true,
                                    message: "Copied",
                                    autoHideDuration: 1500,
                                })
                            );
                        }}>
                        <CopyIcon />
                    </span>
                </div>
            </InfoRow>
            <InfoRow label='Signature'>
                <div className={cx("status")}>
                    <span className={cx("status-text")}>{data?.latest?.signature}</span>
                </div>
            </InfoRow>
            <InfoRow label='Public Key'>{_.isNil(data?.pubkey) ? "-" : <div className={cx("public-key")}>{data?.pubkey}</div>}</InfoRow>
            <InfoRow label='Transaction Hash'>
                <div className={cx("public-key", "pointer")} onClick={handleClickTx}>
                    <span className={cx("public-key")}>{txhash}</span>
                </div>
            </InfoRow>
            <InfoRow label='Current Fees'>
                {_.isNil(data?.currentFees) ? (
                    "-"
                ) : (
                    <>
                        <div className={cx("current-fees")}>
                            <span>{data?.currentFees / 10 ** 6}</span>
                            <span className={cx("denom")}>ORAI</span>
                        </div>
                        {errorMessage && <div className={cx("error-message")}>{"Your balance must be larger than fees"}</div>}
                    </>
                )}
            </InfoRow>
            <InfoRow label='Current Round'>
                {_.isNil(data?.latest?.round) ? "-" : <div className={cx("public-key")}>{data?.latest?.round}</div>}
            </InfoRow>
		</>
	);
};

RandomnessView.propTypes = {
	data: PropTypes.any,
};

RandomnessView.defaultProps = {};

export default RandomnessView;
