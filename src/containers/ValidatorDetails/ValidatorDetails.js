import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import IC_CHECK from "src/assets/validatorDetails/check.svg";
import ORAI_LOGO from "src/assets/common/orai_favicon.png";
import IC_PASTE from "src/assets/validatorDetails/paste.svg";
import IC_BLOCKS from "src/assets/validatorDetails/blocks.svg";
import IC_GOOD_BLOCK from "src/assets/validatorDetails/good_block.svg";
import IC_BAD_BLOCK from "src/assets/validatorDetails/bad_block.svg";
import Axios from "axios";
import { getDelegators, getMissedBlocks, getProposedBlocks, getValidator } from "src/lib/api";
import { commafy, formatTime } from "src/helpers/helper";
import cn from "classnames/bind";
import styles from "./ValidatorDetails.scss";
import Table from "src/components/ValidatorDetails/Table";
import CardHeader from "src/components/ValidatorDetails/CardHeader";
import ColumnsInfo from "src/components/ValidatorDetails/ColumnsInfo";
import StatusBox from "src/components/common/StatusBox";

const cx = cn.bind(styles);

export default function (props) {
  const history = useHistory();
  const contentRef = useRef(null);
  const [validatorDetails, setValidatorDetails] = useState({
    accountAddress: "--",
    consensusAddress: "--",
    operatorAddress: "--",
    votingPower: "--",
    bondedHeight: 0,
    commission: "--",
    details: "--",
    website: "--",
    proposedBlocks: [],
    delegators: [],
    missedBlocks: [],
    onClick: []
  });

  let events = [
    {
      height: 209610,
      txHash: "608080F5...33E8E8A9",
      amount: 0.00037,
      time: "1h ago",
    },
    {
      height: 209610,
      txHash: "608080F5...33E8E8A9",
      amount: 0.00037,
      time: "1h ago",
    },
    {
      height: 209610,
      txHash: "608080F5...33E8E8A9",
      amount: 0.00037,
      time: "1h ago",
    },
    {
      height: 209610,
      txHash: "608080F5...33E8E8A9",
      amount: 0.00037,
      time: "1h ago",
    },
    {
      height: 209610,
      txHash: "608080F5...33E8E8A9",
      amount: 0.00037,
      time: "1h ago",
    },
    {
      height: 209610,
      txHash: "608080F5...33E8E8A9",
      amount: -0.00037,
      time: "1h ago",
    },
    {
      height: 209610,
      txHash: "608080F5...33E8E8A9",
      amount: -0.00037,
      time: "1h ago",
    },
  ];

  const blockMatrix = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const copyToClipboard = () => {
    if (contentRef && contentRef?.current) {
      const contentElement = contentRef.current;
      contentElement.select();
      contentElement.setSelectionRange(0, 99999); /* For mobile devices */
      document.execCommand("copy");
    }
  };

  const fetchValidatorData = async () => {
    let info = {};
    let validatorInfo = props.match.params.validator;
    let commonInfo = await getValidator(validatorInfo, Axios.CancelToken.source().token);
    let delegators = await getDelegators(validatorInfo, 1, Axios.CancelToken.source().token);
    let blocks = await getProposedBlocks(validatorInfo, 1, Axios.CancelToken.source().token);
    let missedBlocks = await getMissedBlocks(validatorInfo, Axios.CancelToken.source().token);
    info.accountAddress = commonInfo?.data?.account_address === "" ? "--" : commonInfo?.data?.account_address;
    info.operatorAddress = commonInfo?.data?.operator_address === "" ? "--" : commonInfo?.data?.operator_address;
    info.consensusAddress = commonInfo?.data?.consensus_address;
    info.votingPower = `6.56% (${commafy(commonInfo?.data?.voting_power)} ORAI)`;
    info.bondedHeight = commonInfo?.data?.bond_height;
    info.commission = `${Number((parseFloat(commonInfo?.data?.commission_rate) * 100).toFixed(2))}%`;
    info.details = commonInfo?.data?.description?.details === "" ? "--" : commonInfo?.data?.description?.details;
    info.website = commonInfo?.data?.description?.website === "" ? "--" : commonInfo?.data?.description?.website;
    if (delegators?.data?.data !== null) {
      let arrDelegators = [];
      let arrOnClick = [];
      delegators.data.data.forEach(delegator => {
        arrDelegators.push([
          delegator?.delegator_address.slice(0, 14) + "..." + delegator?.delegator_address.slice(delegator?.delegator_address.length - 10, delegator?.delegator_address.length),
          commafy(delegator?.amount) + " ORAI",
          Number((delegator?.shares / delegator?.amount) * 100).toFixed(2) + "%"
        ]);
        arrOnClick.push(() => history.push(`/account/${delegator?.delegator_address}`));
      });
      info.delegators = arrDelegators;
      info.onClick = arrOnClick;
    }
    if (blocks?.data?.data !== null) {
      let arrProposedBlocks = [];
      blocks.data.data.forEach(block => {
        arrProposedBlocks.push([
          block?.height,
          block?.block_hash.slice(0, 10) + "..." + block?.block_hash.slice(block?.block_hash.length - 10, block?.block_hash.length),
          block?.total_txs,
          formatTime(block?.timestamp)
        ]);
      });
      info.proposedBlocks = arrProposedBlocks;
    }
    setValidatorDetails({
      accountAddress: info?.accountAddress,
      consensusAddress: info?.consensusAddress,
      operatorAddress: info?.operatorAddress,
      votingPower: info?.votingPower,
      bondedHeight: info?.bondedHeight,
      commission: info?.commission,
      details: info?.details,
      website: info?.website,
      proposedBlocks: info?.proposedBlocks,
      delegators: info?.delegators,
      missedBlocks: [92, 93, 95, 96, 97, 98, 99],   // currently faked
      onClick: info?.onClick
    });
  };

  React.useEffect(() => {
    fetchValidatorData();
  }, [props.match.params.validator]);

  return (
    <div className={cx("screen")}>
      <div className={cx("content-area")}>
        <div className={cx("header")}>
          <div className={cx("huge-title")}>Validators</div>
          <StatusBox />
        </div>
        <div className={cx("row-of-cards")}>
          <div className={cx("left-card")}>
            <div className={cx("main-info")}>
              <div className={cx("name-container")}>
                <img src={ORAI_LOGO} height={30} width={30} />
                <div className={cx("title")}>Orai Staking</div>
              </div>
              <div className={cx("status-container")}>
                <img src={IC_CHECK} />
                <div className={cx("status-txt")}>Active</div>
              </div>
            </div>
            <div className={cx("left-title-container")}>
              <div className={cx("left-title")}>Operator address</div>
              <img
                src={IC_PASTE}
                className={cx("ic-paste")}
                onClick={() => copyToClipboard()} />
            </div>
            <input
              type="text"
              ref={contentRef}
              className={cx("addr-txt")}
              onClick={() => history.push(`/validators/${validatorDetails.operatorAddress}`)}
              value={validatorDetails.operatorAddress} />
            <div className={cx("left-title")}>Address</div>
            <div
              className={cx("addr-txt")}
              onClick={() => history.push(`/account/${validatorDetails.accountAddress}`)}>
              {validatorDetails.accountAddress}
            </div>
          </div>
          <div className={cx("right-card")}>
            <ColumnsInfo
              width={[6, 7, 8]}
              data={[
                [
                  { key: "Website", value: validatorDetails.website, link: true },
                  { key: "Commission", value: validatorDetails.commission, link: false },
                  { key: "Uptime", value: "100%", link: false }
                ],
                [
                  { key: "Voting power", value: validatorDetails.votingPower, link: false },
                  { key: "Bonded Height", value: validatorDetails.bondedHeight, link: false },
                  { key: "Self Bonded", value: "-- ORAI (--%)", link: false }
                ],
                [
                  { key: "Details", value: validatorDetails.details, link: false },
                  { key: "", value: "Show more", link: true }
                ]
              ]} />
          </div>
        </div>
        <div className={cx("row-of-cards")}>
          <div className={cx("main-card")}>
            <CardHeader
              title={"Proposed Blocks"}
              info={"Total: 300,206 blocks"}
              icon={IC_BLOCKS} />
            <Table
              titles={["Height", "Blockhash", "Txs", "Time"]}
              data={validatorDetails.proposedBlocks}
              colFlex={[14, 33, 18, 18]} />
          </div>
          <div className={cx("main-card")}>
            <CardHeader
              title={"Missed Blocks"}
              info={"Last 100 blocks"}
              icon={IC_BLOCKS} />
            <div className={cx("blocks-matrix")}>
              {blockMatrix.map((item, rowIndex) => (
                <div key={rowIndex}>
                  {blockMatrix.map((item, colIndex) => (
                    <img
                      className={cx("block")}
                      src={validatorDetails.missedBlocks?.indexOf(rowIndex * 10 + colIndex) > 0 ? IC_BAD_BLOCK : IC_GOOD_BLOCK} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={cx("row-of-cards")}>
          <div className={cx("main-card")}>
            <CardHeader title={"Delegators"} />
            <Table
              titles={["Delegator Address", "Amount", "Share"]}
              data={validatorDetails.delegators}
              colFlex={[39, 26, 18]}
              onClick={validatorDetails.onClick} />
          </div>
          <div className={cx("main-card")}>
            <CardHeader title={"Power Events"} />
          </div>
        </div>
      </div>
    </div>
  );
}