import React from "react";

import IC_CHECK from "src/assets/validatorDetails/check.svg";
import BINANCE_LOGO from "src/assets/validatorDetails/binance_logo.svg";
import ORAI_LOGO from "src/assets/common/orai_favicon.png";
import IC_PASTE from "src/assets/validatorDetails/paste.svg";
import IC_BLOCKS from "src/assets/validatorDetails/blocks.svg";
import IC_SHIRT from "src/assets/validatorDetails/shirt.svg";
import IC_GOOD_BLOCK from "src/assets/validatorDetails/good_block.svg";
import IC_BAD_BLOCK from "src/assets/validatorDetails/bad_block.svg";

export default function (props) {
  let proposedBlocks = [
    {
      height: 209610,
      blockhash: "608080F5...33E8E8A9",
      txs: 0,
      time: "5m ago"
    },
    {
      height: 209610,
      blockhash: "608080F5...33E8E8A9",
      txs: 0,
      time: "5m ago"
    },
    {
      height: 209610,
      blockhash: "608080F5...33E8E8A9",
      txs: 0,
      time: "5m ago"
    },
    {
      height: 209610,
      blockhash: "608080F5...33E8E8A9",
      txs: 0,
      time: "5m ago"
    },
    {
      height: 209610,
      blockhash: "608080F5...33E8E8A9",
      txs: 0,
      time: "5m ago"
    },
    {
      height: 209610,
      blockhash: "608080F5...33E8E8A9",
      txs: 0,
      time: "5m ago"
    },
    {
      height: 209610,
      blockhash: "608080F5...33E8E8A9",
      txs: 0,
      time: "5m ago"
    }
  ];

  let events = [
    {
      height: 209610,
      txHash: "608080F5...33E8E8A9",
      amount: 0.000370,
      time: "1h ago"
    },
    {
      height: 209610,
      txHash: "608080F5...33E8E8A9",
      amount: 0.000370,
      time: "1h ago"
    },
    {
      height: 209610,
      txHash: "608080F5...33E8E8A9",
      amount: 0.000370,
      time: "1h ago"
    },
    {
      height: 209610,
      txHash: "608080F5...33E8E8A9",
      amount: 0.000370,
      time: "1h ago"
    },
    {
      height: 209610,
      txHash: "608080F5...33E8E8A9",
      amount: 0.000370,
      time: "1h ago"
    },
    {
      height: 209610,
      txHash: "608080F5...33E8E8A9",
      amount: -0.000370,
      time: "1h ago"
    },
    {
      height: 209610,
      txHash: "608080F5...33E8E8A9",
      amount: -0.000370,
      time: "1h ago"
    }
  ];

  let missedBlocks = [92, 93, 94, 95, 96, 97, 98, 99];
  let blockMatrix = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  let delegators = [
    {
      address: "608080F5...33E8E8A9",
      amount: 6784500,
      share: 56.75
    },
    {
      address: "608080F5...33E8E8A9",
      amount: 6784500,
      share: 56.75
    },
    {
      address: "608080F5...33E8E8A9",
      amount: 6784500,
      share: 56.75
    },
    {
      address: "608080F5...33E8E8A9",
      amount: 6784500,
      share: 56.75
    },
    {
      address: "608080F5...33E8E8A9",
      amount: 6784500,
      share: 56.75
    },
    {
      address: "608080F5...33E8E8A9",
      amount: 6784500,
      share: 56.75
    },
    {
      address: "608080F5...33E8E8A9",
      amount: 6784500,
      share: 56.75
    }
  ];

  return (
    <div style={{ width: "100%" }}>
      <div style={{ width: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", flexFlow: "row", height: 30, marginTop: 30, justifyContent: "space-between" }}>
          <div style={{ fontSize: 24, fontWeight: "bold" }}>Validators</div>
          <div style={styles.frameTxt}>
            <div style={{ display: "flex", flexFlow: "row" }}>
              <div style={{ fontSize: 12, marginRight: 5 }}>Price:</div>
              <div style={{ fontSize: 12, fontWeight: "bold", marginRight: 30 }}>$4.33</div>
            </div>
            <div style={{ display: "flex", flexFlow: "row" }}>
              <div style={{ fontSize: 12, marginRight: 5 }}>Height:</div>
              <div style={{ fontSize: 12, fontWeight: "bold", marginRight: 30 }}>4,374,598</div>
            </div>
            <div style={{ display: "flex", flexFlow: "row" }}>
              <div style={{ fontSize: 12, marginRight: 5 }}>Bonded:</div>
              <div style={{ fontSize: 12, fontWeight: "bold", marginRight: 30 }}>--</div>
            </div>
            <div style={{ display: "flex", flexFlow: "row" }}>
              <div style={{ fontSize: 12, marginRight: 5 }}>Inflation:</div>
              <div style={{ fontSize: 12, fontWeight: "bold" }}>--</div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexFlow: "row", justifyContent: "space-between" }}>
          <div style={{ ...styles.card, width: "33%" }}>
            <div style={{ display: "flex", flexFlow: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }}>
              <div style={{ display: "flex", flexFlow: "row", alignItems: "center" }}>
                <img src={ORAI_LOGO} height={30} width={30} />
                <div style={{ ...styles.title, marginLeft: 15 }}>Orai Staking</div>
              </div>
              <div style={{ display: "flex", flexFlow: "row", backgroundColor: "#ECFFE9", borderRadius: 2, alignItems: "center", paddingLeft: 10, paddingRight: 10, paddingTop: 6, paddingBottom: 6 }}>
                <img src={IC_CHECK} />
                <div style={{ fontSize: 12, color: "#12C90E" }}>Active</div>
              </div>
            </div>
            <div style={{ display: "flex", flexFlow: "row", marginBottom: 4 }}>
              <div style={{ fontSize: 14, fontWeight: "bold", marginRight: 5 }}>Operator address</div>
              <img src={IC_PASTE} />
            </div>
            <div style={{ fontSize: 12, marginBottom: 10 }}>cosmosvaloper</div>
            <div style={{ fontSize: 14, fontWeight: "bold", marginBottom: 4 }}>Address</div>
            <div style={{ fontSize: 12, color: "#1B57F0" }}>cosmos</div>
          </div>
          <div style={{ ...styles.card, width: "65%" }}>
            <div style={{ display: "flex", flexFlow: "row" }}>
              <div style={{ flex: 6 }}>
                <div style={{ fontSize: 12, fontWeight: "bold" }}>Website</div>
                <div style={{ fontSize: 12, color: "#1B57F0" }}>https://orai.com</div>
                <div style={{ fontSize: 12, fontWeight: "bold", marginTop: 15 }}>Commission</div>
                <div style={{ fontSize: 12 }}>2.50%</div>
                <div style={{ fontSize: 12, fontWeight: "bold", marginTop: 15 }}>Uptime</div>
                <div style={{ fontSize: 12 }}>100%</div>
              </div>
              <div style={{ flex: 7 }}>
                <div style={{ fontSize: 12, fontWeight: "bold" }}>Voting power</div>
                <div style={{ fontSize: 12 }}>6.56% (12,394,000 ORAI)</div>
                <div style={{ fontSize: 12, fontWeight: "bold", marginTop: 15 }}>Bonded Height</div>
                <div style={{ fontSize: 12 }}>--</div>
                <div style={{ fontSize: 12, fontWeight: "bold", marginTop: 15 }}>Self Bonded</div>
                <div style={{ fontSize: 12 }}>-- ORAI (--%)</div>
              </div>
              <div style={{ flex: 8 }}>
                <div style={{ fontSize: 12, fontWeight: "bold" }}>Details</div>
                <div style={{ fontSize: 12 }}>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum </div>
                <div style={{ fontSize: 12, color: "#1B57F0", marginTop: 15 }}>Show more</div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexFlow: "row", justifyContent: "space-between" }}>
          <div style={{ ...styles.card, width: "49%" }}>
            <div style={{ display: "flex", flexFlow: "row", justifyContent: "space-between" }}>
              <div style={styles.title}>Proposed Blocks</div>
              <div style={{ ...styles.frameTxt, paddingLeft: 10, paddingRight: 10 }}>
                <img src={IC_BLOCKS} />
                <div style={{ fontSize: 12, marginLeft: 5 }}>Total: 300,206 blocks</div>
              </div>
            </div>
            <div>
              <div style={{ display: "flex", flexFlow: "row", backgroundColor: "#E8EEFF", borderTopLeftRadius: 5, borderTopRightRadius: 5, marginTop: 15 }}>
                <div style={{ flex: 14, padding: 10, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                  <div style={{ fontSize: 12, fontWeight: "bold", color: "#1B57F0" }}>Height</div>
                </div>
                {/* <div style={{ width: 1, height: 30, backgroundColor: "#E7E7E7" }} /> */}
                <div style={{ flex: 33, padding: 10 }}>
                  <div style={{ fontSize: 12, fontWeight: "bold", color: "#1B57F0" }}>Blockhash</div>
                </div>
                <div style={{ flex: 18, padding: 10, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                  <div style={{ fontSize: 12, fontWeight: "bold", color: "#1B57F0" }}>Txs</div>
                </div>
                <div style={{ flex: 18, padding: 10, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                  <div style={{ fontSize: 12, fontWeight: "bold", color: "#1B57F0" }}>Time</div>
                </div>
              </div>
              {proposedBlocks.map((block, index) => (
                <div style={{ display: "flex", flexFlow: "row", backgroundColor: index % 2 === 1 ? "#F9F9F9" : "#FFF", borderBottomLeftRadius: index === proposedBlocks.length - 1 ? 5 : 0, borderBottomRightRadius: index === proposedBlocks.length - 1 ? 5 : 0 }} key={index}>
                  <div style={{ flex: 14, padding: 10, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                    <div style={{ fontSize: 12, color: "#1B57F0" }}>{block.height}</div>
                  </div>
                  {/* <div style={{ width: 1, height: 30, backgroundColor: "#E7E7E7" }} /> */}
                  <div style={{ flex: 33, padding: 10 }}>
                    <div style={{ fontSize: 12, color: "#1B57F0" }}>{block.blockhash}</div>
                  </div>
                  <div style={{ flex: 18, padding: 10, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                    <div style={{ fontSize: 12 }}>{block.txs}</div>
                  </div>
                  <div style={{ flex: 18, padding: 10, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                    <div style={{ fontSize: 12 }}>{block.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ ...styles.card, width: "49%" }}>
            <div style={{ display: "flex", flexFlow: "row", justifyContent: "space-between" }}>
              <div style={styles.title}>Missed Blocks</div>
              <div style={{ ...styles.frameTxt, paddingLeft: 10, paddingRight: 10 }}>
                <img src={IC_BLOCKS} />
                <div style={{ fontSize: 12, marginLeft: 5 }}>Last 100 blocks</div>
              </div>
            </div>
            <div style={{ marginTop: 15, display: "flex", flexDirection: "column", alignItems: "center" }}>
              {blockMatrix.map((item, rowIndex) => (
                <div key={rowIndex}>
                  {blockMatrix.map((item, colIndex) => (
                    <img src={missedBlocks.indexOf(rowIndex * 10 + colIndex) > 0 ? IC_BAD_BLOCK : IC_GOOD_BLOCK} style={{ marginLeft: 6 }} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexFlow: "row", justifyContent: "space-between", marginBottom: 30 }}>
          <div style={{ ...styles.card, width: "49%" }}>
            <div style={styles.title}>Delegators</div>
            <div style={{ display: "flex", flexFlow: "row", backgroundColor: "#E8EEFF", borderTopLeftRadius: 5, borderTopRightRadius: 5, marginTop: 15 }}>
              {/* <div style={{ width: 1, height: 30, backgroundColor: "#E7E7E7" }} /> */}
              <div style={{ flex: 39, padding: 10 }}>
                <div style={{ fontSize: 12, fontWeight: "bold", color: "#1B57F0" }}>Delegator Address</div>
              </div>
              <div style={{ flex: 26, padding: 10, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <div style={{ fontSize: 12, fontWeight: "bold", color: "#1B57F0" }}>Amount</div>
              </div>
              <div style={{ flex: 18, padding: 10, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <div style={{ fontSize: 12, fontWeight: "bold", color: "#1B57F0" }}>Share</div>
              </div>
            </div>
            {delegators.map((delegator, index) => (
              <div style={{ display: "flex", flexFlow: "row", backgroundColor: index % 2 === 1 ? "#F9F9F9" : "#FFF", borderBottomLeftRadius: index === proposedBlocks.length - 1 ? 5 : 0, borderBottomRightRadius: index === proposedBlocks.length - 1 ? 5 : 0 }} key={index}>
                {/* <div style={{ width: 1, height: 30, backgroundColor: "#E7E7E7" }} /> */}
                <div style={{ flex: 39, padding: 10 }}>
                  <div style={{ fontSize: 12, color: "#1B57F0" }}>{delegator.address}</div>
                </div>
                <div style={{ flex: 26, padding: 10, display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                  <div style={{ fontSize: 12 }}>{delegator.amount}</div>
                  <div style={{ fontSize: 12, color: "#5F51FF", marginLeft: 6 }}>ORAI</div>
                </div>
                <div style={{ flex: 18, padding: 10, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                  <div style={{ fontSize: 12 }}>{delegator.share}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ ...styles.card, width: "49%" }}>
            <div style={styles.title}>Power Events</div>

            {/* WARNING!!! The following lines are temporary commmented due to the lack of data, don't delete them! */}
            {/* <div style={{ display: "flex", flexFlow: "row", backgroundColor: "#E8EEFF", borderTopLeftRadius: 5, borderTopRightRadius: 5, marginTop: 15 }}>
            <div style={{ flex: 14, padding: 10, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
              <div style={{ fontSize: 12, fontWeight: "bold", color: "#1B57F0" }}>Height</div>
            </div>
            <div style={{ flex: 33, padding: 10 }}>
              <div style={{ fontSize: 12, fontWeight: "bold", color: "#1B57F0" }}>TxHash</div>
            </div>
            <div style={{ flex: 18, padding: 10, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
              <div style={{ fontSize: 12, fontWeight: "bold", color: "#1B57F0" }}>Amount</div>
            </div>
            <div style={{ flex: 18, padding: 10, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
              <div style={{ fontSize: 12, fontWeight: "bold", color: "#1B57F0" }}>Time</div>
            </div>
          </div> */}
            {/* {events.map((event, index) => ( */}
            {/* <div style={{ display: "flex", flexFlow: "row", backgroundColor: index % 2 === 1 ? "#F9F9F9" : "#FFF", borderBottomLeftRadius: index === proposedBlocks.length - 1 ? 5 : 0, borderBottomRightRadius: index === proposedBlocks.length - 1 ? 5 : 0 }} key={index}>
              <div style={{ flex: 14, padding: 10, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <div style={{ fontSize: 12, color: "#1B57F0" }}>{event.height}</div>
              </div>
              <div style={{ flex: 33, padding: 10 }}>
                <div style={{ fontSize: 12, color: "#1B57F0" }}>{event.txHash}</div>
              </div>
              <div style={{ flex: 18, padding: 10, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <div style={{ fontSize: 12, color: event.amount > 0 ? "#3FCC28" : "red" }}>{event.amount > 0 ? "+" : "-"}{event.amount}</div>
              </div>
              <div style={{ flex: 18, padding: 10, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <div style={{ fontSize: 12 }}>{event.time}</div>
              </div>
            </div> */}
            {/* ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    boxShadow: '5px 5px 15px 0 rgba(14, 38, 48, 0.12)',
    marginTop: 20,
    padding: 15
  },
  title: {
    fontSize: 16,
    fontWeight: "bold"
  },
  frameTxt: {
    display: "flex",
    flexFlow: "row",
    borderRadius: 5,
    backgroundColor: "#FFF",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    border: "solid 1px #C1C1C1"
  }
};
