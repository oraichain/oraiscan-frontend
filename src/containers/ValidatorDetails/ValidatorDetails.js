import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import IC_CHECK from "src/assets/validatorDetails/check.svg";
import ORAI_LOGO from "src/assets/common/orai_favicon.png";
import IC_PASTE from "src/assets/validatorDetails/paste.svg";
import IC_BLOCKS from "src/assets/validatorDetails/blocks.svg";
import IC_GOOD_BLOCK from "src/assets/validatorDetails/good_block.svg";
import IC_BAD_BLOCK from "src/assets/validatorDetails/bad_block.svg";
import Axios from "axios";
import { getDelegators, getMissedBlocks, getProposedBlocks, getValidator, getValidatorAnalytics } from "src/lib/api";
import { commafy, formatOrai, formatTime } from "src/helpers/helper";
import cn from "classnames/bind";
import styles from "./ValidatorDetails.scss";
import Table from "src/components/ValidatorDetails/Table";
import CardHeader from "src/components/ValidatorDetails/CardHeader";
import ColumnsInfo from "src/components/ValidatorDetails/ColumnsInfo";
import PageNumber from "src/components/ValidatorDetails/PageNumber";
import StatusBox from "src/components/common/StatusBox";
import { useDispatch, useSelector } from "react-redux";
import copy from "copy-to-clipboard";
import { showAlert } from "src/store/modules/global";

const cx = cn.bind(styles);

export default function (props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const operatorAddrRef = useRef(null);
  const accountAddrRef = useRef(null);
  const totalTokensBonded = useSelector(state => state?.blockchain?.statusBox?.bonded);
  const [proposedBlocksPage, setProposedBlocksPage] = useState(1);
  const [delegatorsPage, setDelegatorsPage] = useState(1);
  const [validatorDetails, setValidatorDetails] = useState({
    moniker: "--",
    accountAddress: "--",
    consensusAddress: "--",
    operatorAddress: "--",
    votingPower: "--",
    tokens: 0,
    bondedHeight: 0,
    commission: "--",
    details: "--",
    website: "--",
    totalBlocks: "Total: 0 blocks",
    totalBlockPages: 1,
    totalDelegatorPages: 1,
    proposedBlocks: [],
    delegators: [],
    missedBlocks: [],
    uptime: "--",
    selfBonded: "--",
    onClickBlock: [],
    onClickDelegator: [],
  });

  const blockMatrix = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const copyToClipboard = content => {
    copy(content);
    dispatch(
      showAlert({
        show: true,
        message: "Copied",
        autoHideDuration: 1500,
      })
    );
  };

  const fetchCommonData = async (validatorInfo) => {
    let info = {};
    let commonInfo = await getValidator(validatorInfo, Axios.CancelToken.source().token);
    let analytics = await getValidatorAnalytics(Axios.CancelToken.source().token);
    console.log(totalTokensBonded, commonInfo.data.tokens);
    info.moniker = commonInfo?.data?.moniker === "" ? "--" : commonInfo?.data?.moniker;
    info.accountAddress = commonInfo?.data?.account_address === "" ? "--" : commonInfo?.data?.account_address;
    info.operatorAddress = commonInfo?.data?.operator_address === "" ? "--" : commonInfo?.data?.operator_address;
    info.consensusAddress = commonInfo?.data?.consensus_address;
    info.votingPower = `${totalTokensBonded !== undefined ? Math.round(parseFloat(commonInfo?.data?.tokens) * 10000.0 / parseFloat(totalTokensBonded)) / 100.0 : "--"}% (${commafy(commonInfo?.data?.voting_power)} ORAI)`;
    info.tokens = parseFloat(commonInfo?.data?.tokens);
    info.bondedHeight = commonInfo?.data?.bond_height;
    info.commission = `${Number((parseFloat(commonInfo?.data?.commission_rate) * 100).toFixed(2))}%`;
    info.details = commonInfo?.data?.description?.details === "" ? "--" : commonInfo?.data?.description?.details;
    info.website = commonInfo?.data?.description?.website === "" ? "--" : commonInfo?.data?.description?.website;
    info.uptime = `${analytics?.data?.find(validator => validator?.account_address === info.accountAddress)?.coverage * 100}%`;
    return info;
  };

  const fetchProposedBlocks = async (operatorAddress) => {
    let info = {};
    if (operatorAddress != "--") {
      let blocks = await getProposedBlocks(operatorAddress, proposedBlocksPage, Axios.CancelToken.source().token);
      info.totalBlocks = `Total: ${commafy(blocks?.data?.page?.total_item)} blocks`;
      info.totalBlockPages = blocks?.data?.page?.total_page;
      if (blocks?.data?.data !== null && blocks?.data?.data !== undefined) {
        let arrProposedBlocks = [];
        let arrOnClick = [];
        blocks.data.data.forEach(block => {
          arrProposedBlocks.push([
            block?.height,
            block?.block_hash.slice(0, 10) + "..." + block?.block_hash.slice(block?.block_hash.length - 10, block?.block_hash.length),
            block?.num_txs,
            formatTime(block?.timestamp),
          ]);
          arrOnClick.push(() => history.push(`/blocks/${block?.height}`));
        });
        info.proposedBlocks = arrProposedBlocks;
        info.onClickBlock = arrOnClick;
      }
    }
    return info;
  };

  const fetchDelegators = async (operatorAddress, accountAddress) => {
    let info = {};
    if (operatorAddress !== "--") {
      let delegators = await getDelegators(operatorAddress, delegatorsPage, Axios.CancelToken.source().token);
      info.selfBonded = `${formatOrai(delegators?.data?.data?.find(delegator => delegator.delegator_address === accountAddress)?.amount)} ORAI`;
      info.totalDelegatorPages = delegators?.data?.page?.total_page;
      if (delegators?.data?.data !== null && delegators?.data?.data !== undefined) {
        let arrDelegators = [];
        let arrOnClick = [];
        delegators.data.data.forEach(delegator => {
          arrDelegators.push([
            delegator?.delegator_address.slice(0, 14) +
            "..." +
            delegator?.delegator_address.slice(delegator?.delegator_address.length - 10, delegator?.delegator_address.length),
            formatOrai(delegator?.amount) + " ORAI",
            Number((delegator?.shares / delegator?.amount) * 100).toFixed(2) + "%",
          ]);
          arrOnClick.push(() => history.push(`/account/${delegator?.delegator_address}`));
        });
        info.delegators = arrDelegators;
        info.onClickDelegator = arrOnClick;
      }
    }
    return info;
  };

  const setAllData = (info) => {
    setValidatorDetails({
      moniker: info?.moniker,
      accountAddress: info?.accountAddress,
      consensusAddress: info?.consensusAddress,
      operatorAddress: info?.operatorAddress,
      votingPower: info?.votingPower,
      tokens: info?.tokens,
      bondedHeight: info?.bondedHeight,
      commission: info?.commission,
      details: info?.details,
      website: info?.website,
      totalBlocks: info?.totalBlocks,
      totalBlockPages: info?.totalBlockPages,
      totalDelegatorPages: info?.totalDelegatorPages,
      proposedBlocks: info?.proposedBlocks,
      delegators: info?.delegators,
      missedBlocks: [92, 93, 95, 96, 97, 98, 99], // currently faked
      uptime: info?.uptime,
      selfBonded: info?.selfBonded,
      onClickBlock: info?.onClickBlock,
      onClickDelegator: info?.onClickDelegator
    });
  };

  React.useEffect(() => {
    const getAllData = async () => {
      let info = await fetchCommonData(props.match.params.validator);
      Object.assign(info, await fetchProposedBlocks(info.operatorAddress));
      Object.assign(info, await fetchDelegators(info.operatorAddress, info.accountAddress));
      setAllData(info);
    };
    getAllData();
  }, [props.match.params.validator, totalTokensBonded]);

  React.useEffect(() => {
    const getBlocks = async () => {
      let info = { ...validatorDetails };
      Object.assign(info, await fetchProposedBlocks(info.operatorAddress));
      setAllData(info);
    };
    getBlocks();
  }, [proposedBlocksPage, validatorDetails.operatorAddress]);

  React.useEffect(() => {
    const getDelegators = async () => {
      let info = { ...validatorDetails };
      Object.assign(info, await fetchDelegators(info.operatorAddress, info.accountAddress));
      setAllData(info);
    };
    getDelegators();
  }, [delegatorsPage, validatorDetails.operatorAddress]);

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
                <img src={ORAI_LOGO} height={30} width={30} alt='' />
                <div className={cx("title")}>{validatorDetails.moniker}</div>
              </div>
              <div className={cx("status-container")}>
                <img src={IC_CHECK} alt='' />
                <div className={cx("status-txt")}>Active</div>
              </div>
            </div>
            <div className={cx("left-title")}>Operator address</div>
            <div className={cx("left-title-container")}>
              <div className={cx("addr-txt")} onClick={() => history.push(`/validators/${validatorDetails.operatorAddress}`)}>
                {validatorDetails.operatorAddress}
              </div>
              <img src={IC_PASTE} className={cx("ic-paste")} onClick={() => copyToClipboard(validatorDetails.operatorAddress)} alt='' />
            </div>
            <div className={cx("left-title")}>Address</div>
            <div className={cx("left-title-container")}>
              <div className={cx("addr-txt")} onClick={() => history.push(`/account/${validatorDetails.accountAddress}`)}>
                {validatorDetails.accountAddress}
              </div>
              <img src={IC_PASTE} className={cx("ic-paste")} onClick={() => copyToClipboard(validatorDetails.accountAddress)} alt='' />
            </div>
          </div>
          <div className={cx("right-card")}>
            <ColumnsInfo
              width={[6, 7, 8]}
              data={[
                [
                  { key: "Website", value: validatorDetails.website, link: true },
                  { key: "Commission", value: validatorDetails.commission, link: false },
                  { key: "Uptime", value: validatorDetails.uptime, link: false },
                ],
                [
                  { key: "Voting power", value: validatorDetails.votingPower, link: false },
                  { key: "Bonded Height", value: validatorDetails.bondedHeight, link: false },
                  { key: "Self Bonded", value: validatorDetails.selfBonded, link: false },
                ],
                [
                  { key: "Details", value: validatorDetails.details, link: false },
                  // { key: "", value: "Show more", link: true },
                ],
              ]}
            />
          </div>
        </div>
        <div className={cx("row-of-cards")}>
          <div className={cx("main-card")}>
            <CardHeader
              title={"Proposed Blocks"}
              info={validatorDetails.totalBlocks}
              icon={IC_BLOCKS} />
            <Table
              titles={["Height", "Blockhash", "Txs", "Time"]}
              data={validatorDetails.proposedBlocks}
              colFlex={[14, 33, 18, 18]}
              onClick={validatorDetails.onClickBlock} />
            <PageNumber
              page={proposedBlocksPage}
              totalPages={validatorDetails.totalBlockPages}
              update={value => setProposedBlocksPage(Math.max(1, Math.min(validatorDetails.totalBlockPages, proposedBlocksPage + value)))} />
          </div>
          <div className={cx("main-card")}>
            <CardHeader title={"Missed Blocks"} info={"Last 100 blocks"} icon={IC_BLOCKS} />
            <div className={cx("blocks-matrix")}>
              {blockMatrix.map((item, rowIndex) => (
                <div key={rowIndex}>
                  {blockMatrix.map((item, colIndex) => (
                    <img
                      className={cx("block")}
                      src={validatorDetails.missedBlocks?.indexOf(rowIndex * 10 + colIndex) > 0 ? IC_BAD_BLOCK : IC_GOOD_BLOCK}
                      alt=''
                    />
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
              onClick={validatorDetails.onClickDelegator} />
            <PageNumber
              page={delegatorsPage}
              totalPages={validatorDetails.totalDelegatorPages}
              update={value => setDelegatorsPage(Math.max(1, Math.min(validatorDetails.totalDelegatorPages, delegatorsPage + value)))} />
          </div>
          <div className={cx("main-card")}>
            <CardHeader title={"Power Events"} />
          </div>
        </div>
      </div>
    </div>
  );
}
