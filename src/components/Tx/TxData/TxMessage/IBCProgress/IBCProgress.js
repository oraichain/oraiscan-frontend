import { Step, StepContent, StepLabel, Stepper, Typography } from "@material-ui/core";
import axios from "axios";
import cn from "classnames/bind";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./IBCProgress.module.scss";
const cx = cn.bind(styles);


export default function IBCProgress({ dataTxs }) {
    const [IBCProgressData, setIBCProgressData] = useState()

    const parseRawEvents = (events, type) => {
        return events.find(event => event.type === type);
    };

    const getAttributeValue = (attributes, key) => {
        const attribute = attributes.find(attr => attr.key === key);
        return attribute?.value
    };

    const getIBCProgressData = async () => {
        try {
            const rawLogArray = dataTxs.raw_log ? JSON.parse(dataTxs.raw_log) : [];
            if (rawLogArray.length) {
                const eventSendPacket = parseRawEvents(rawLogArray[0].events, "send_packet")
                const src = getAttributeValue(eventSendPacket.attributes, "packet_src_channel");
                const dst = getAttributeValue(eventSendPacket.attributes, "packet_dst_channel");
                const packet = getAttributeValue(eventSendPacket.attributes, "packet_sequence");
                const path = `https://api.scan.orai.io/v2/ibc/progresses?src=${src}&dst=${dst}&packet=${packet}`
                const res = await axios.get(path);
                setIBCProgressData(res.data);
            }
        } catch (error) {
            console.log('error getIBCProgressData: ', error)
        }
    }

    useEffect(() => {
        getIBCProgressData()
    }, [dataTxs])

    if (!IBCProgressData) {
        return <></>
    }

    return (
        <Stepper className={cx("stepper")} orientation="vertical" aria-expanded>
            <Step key={0} completed expanded>
                <StepLabel>
                    Sent
                </StepLabel>
                <StepContent>
                    {IBCProgressData.tx_transfer
                        ? <NavLink className={cx("NavLink")} to={`/txs/${IBCProgressData.tx_transfer}`}>
                            <Typography>{IBCProgressData.tx_transfer}</Typography>
                        </NavLink>
                        : <Typography>{"Success"}</Typography>
                    }
                </StepContent>
            </Step>

            <Step key={1} completed expanded>
                <StepLabel>
                    Receive
                </StepLabel>
                <StepContent>
                    {IBCProgressData.tx_receive
                        ? <NavLink className={cx("NavLink")} to={`/txs/${IBCProgressData.tx_receive}`}>
                            <Typography>{IBCProgressData.tx_receive}</Typography>
                        </NavLink>
                        : <Typography>{"Success"}</Typography>
                    }
                </StepContent>
            </Step>

            {IBCProgressData.tx_acknowledgement ?
                <Step key={2} completed expanded>
                    <StepLabel>
                        Acknowledgement
                    </StepLabel>
                    <StepContent>
                        <NavLink className={cx("NavLink")} to={`/txs/${IBCProgressData.tx_acknowledgement}`}>
                            <Typography>{IBCProgressData.tx_acknowledgement}</Typography>
                        </NavLink>
                    </StepContent>
                </Step>
                : null}
        </Stepper>
    );
}