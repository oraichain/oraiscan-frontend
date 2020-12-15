import React from "react";
// import cn from "classnames/bind";
// @ts-ignore
// import styles from "./Validators.scss";
//  components
// import SearchArea from "src/components/Dashboard/SearchArea";
// import DashboardContent from "src/components/Dashboard/DashboardContent";

// const cx = cn.bind( styles );
import { InputBase } from "@material-ui/core";

import IC_VALIDATORS from "src/assets/validators/validators.svg";
import IC_HEIGHT from "src/assets/validators/height.svg";
import IC_TOKEN from "src/assets/validators/token.svg";
import IC_TIME from "src/assets/validators/time.svg";
import IC_SEARCH from "src/assets/validators/search.svg";
import IC_SORT from "src/assets/validators/sort.svg";
import IC_LOGO from "src/assets/common/orai_favicon.png";

export default function (props) {
  const [active, setActive] = React.useState(true);
  const [value, setValue] = React.useState("");

  let changeActive = React.useMemo(() => () => setActive(v => !v), []);

  const onKeyDown = React.useCallback(
    e => {
      // if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      // 	e.preventDefault();
      // 	if (dropdownState.selected <= 0 && e.key === "ArrowUp") return;
      // 	if (e.key === "ArrowDown" && dropdownState.selected >= foundAssets.length - 1) return;
      // 	if (e.key === "ArrowDown") setSelected(dropdownState.selected + 1);
      // 	else setSelected(dropdownState.selected - 1);
      // } else if (e.key === "Enter") {
      // 	if (dropdownState.selected < foundAssets.length) {
      // 		e.preventDefault();
      // 		searchFunc(foundAssets[dropdownState.selected].asset, history);
      // 		setValue("");
      // 	}
      // } else if (e.key === "Escape") {
      // 	// e.currentTarget.blur();
      // 	setValue("");
      // }
    },
    // [dropdownState.selected, foundAssets, setSelected, history]
    []
  );

  const onKeyPress = React.useCallback(
    e => {
      // if (e.key === "Enter") clickSearch();
    },
    // [clickSearch]
    []
  );

  const onChange = React.useCallback(e => {
    setValue(e.target.value);
  }, []);

  const onFocus = React.useCallback(bool => {
    // setDropdownState({show: bool, selected: 0});
    // setValue("");
  }, []);

  let data = [
    {
      validator: "Oraichain",
      votingPower: {
        votes: 12411351,
        percent: 12
      },
      cumulativeShare: 6.56,
      uptime: 100,
      commission: 2.5
    },
    {
      validator: "Oraichain",
      votingPower: {
        votes: 12411351,
        percent: 12
      },
      cumulativeShare: 6.56,
      uptime: 100,
      commission: 2.5
    },
    {
      validator: "Oraichain",
      votingPower: {
        votes: 12411351,
        percent: 12
      },
      cumulativeShare: 6.56,
      uptime: 100,
      commission: 2.5
    },
    {
      validator: "Oraichain",
      votingPower: {
        votes: 12411351,
        percent: 12
      },
      cumulativeShare: 6.56,
      uptime: 100,
      commission: 2.5
    },
    {
      validator: "Oraichain",
      votingPower: {
        votes: 12411351,
        percent: 12
      },
      cumulativeShare: 6.56,
      uptime: 100,
      commission: 2.5
    },
    {
      validator: "Oraichain",
      votingPower: {
        votes: 12411351,
        percent: 12
      },
      cumulativeShare: 6.56,
      uptime: 100,
      commission: 2.5
    },
    {
      validator: "Oraichain",
      votingPower: {
        votes: 12411351,
        percent: 12
      },
      cumulativeShare: 6.56,
      uptime: 100,
      commission: 2.5
    }
  ]
  return (
    <div style={{ marginLeft: "16.67%", marginRight: "16.67%" }}>
      <div style={{ display: "flex", flexFlow: "row", height: 30, marginTop: 30, justifyContent: "space-between" }}>
        <div style={{ fontSize: 24, fontWeight: "bold" }}>Validators</div>
        <div style={{ display: "flex", flexFlow: "row", borderRadius: 5, backgroundColor: "#FFF", width: "60%", justifyContent: "space-between", alignItems: "center", paddingLeft: 15, paddingRight: 15, border: "solid 1px #C1C1C1" }}>
          <div style={{ display: "flex", flexFlow: "row" }}>
            <div style={{ fontSize: 12, marginRight: 5 }}>Price:</div>
            <div style={{ fontSize: 12, fontWeight: "bold" }}>$4.33</div>
          </div>
          <div style={{ display: "flex", flexFlow: "row" }}>
            <div style={{ fontSize: 12, marginRight: 5 }}>Height:</div>
            <div style={{ fontSize: 12, fontWeight: "bold" }}>4,374,598</div>
          </div>
          <div style={{ display: "flex", flexFlow: "row" }}>
            <div style={{ fontSize: 12, marginRight: 5 }}>Bonded:</div>
            <div style={{ fontSize: 12, fontWeight: "bold" }}>189,132,631</div>
          </div>
          <div style={{ display: "flex", flexFlow: "row" }}>
            <div style={{ fontSize: 12, marginRight: 5 }}>Inflation:</div>
            <div style={{ fontSize: 12, fontWeight: "bold" }}>7.00%</div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexFlow: "row", justifyContent: "space-between", marginTop: 20 }}>
        <div style={{ ...styles.card, ...styles.statictics }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <img src={IC_HEIGHT} alt={"height"} height={18} width={18} />
            <div style={{ fontSize: 12, fontWeight: "bold", marginLeft: 5 }}>Height</div>
          </div>
          <div style={{ fontSize: 21, fontWeight: "bold" }}>1234</div>
        </div>
        <div style={{ ...styles.card, ...styles.statictics }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <img src={IC_VALIDATORS} alt={"validators"} height={18} width={18} />
            <div style={{ fontSize: 12, fontWeight: "bold", marginLeft: 5 }}>Validators</div>
          </div>
          <div style={{ fontSize: 21, fontWeight: "bold" }}>1234</div>
        </div>
        <div style={{ ...styles.card, ...styles.statictics }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <img src={IC_TOKEN} alt={"validators"} height={18} width={18} />
            <div style={{ fontSize: 12, fontWeight: "bold", marginLeft: 5 }}>Bonded Tokens</div>
          </div>
          <div style={{ fontSize: 21, fontWeight: "bold" }}>1234</div>
        </div>
        <div style={{ ...styles.card, ...styles.statictics }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <img src={IC_TIME} alt={"validators"} height={18} width={18} />
            <div style={{ fontSize: 12, fontWeight: "bold", marginLeft: 5 }}>Block Time</div>
          </div>
          <div style={{ fontSize: 21, fontWeight: "bold" }}>1234</div>
        </div>
      </div>
      <div style={{ display: "flex", flexFlow: "row-reverse", marginTop: 20, height: 30 }}>
        <div style={{ ...styles.card, display: "flex", flexFlow: "row", paddingLeft: 15, paddingRight: 15, alignItems: "center" }}>
          <InputBase
            style={{ fontSize: 12, marginRight: 40 }}
            placeholder={"Search validators"}
            onKeyDown={onKeyDown}
            onKeyPress={onKeyPress}
            onChange={onChange}
            value={value}
            onFocus={() => onFocus(true)} />
          <img src={IC_SEARCH} alt={"search"} />
        </div>
        <div style={{ ...styles.card, ...styles.btnActive }}>
          <div style={{ display: "flex", flexFlow: "row", border: "solid 1px #1B57F0", backgroundColor: active ? "#1B57F0" : "#FFF", paddingLeft: 15, paddingRight: 15, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, alignItems: "center" }}>
            <button style={{ fontSize: 12, color: active ? "#FFF" : "#1B57F0" }} onClick={changeActive}>Active</button>
          </div>
          <div style={{ display: "flex", flexFlow: "row", border: "solid 1px #1B57F0", backgroundColor: active ? "#FFF" : "#1B57F0", paddingLeft: 15, paddingRight: 15, borderTopRightRadius: 5, borderBottomRightRadius: 5, alignItems: "center" }}>
            <button style={{ fontSize: 12, color: active ? "#1B57F0" : "#FFF" }} onClick={changeActive}>Inactive</button>
          </div>
        </div>
      </div>
      <div style={{ ...styles.card, marginTop: 10, marginBottom: 50, alignItems: "stretch" }}>
        <div style={{ height: 60 }}>
          <div style={{ display: "flex", flexFlow: "row", height: "100%", backgroundColor: "#E7E7E7", borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
            <div style={{ flex: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ color: "#546A8A", fontWeight: "bold", fontSize: 12 }}>Rank</div>
            </div>
            <div style={{ width: 1, backgroundColor: "#C7C7C7", height: "100%" }} />
            <div style={{ flex: 9, display: "flex", alignItems: "center", paddingLeft: 15 }}>
              <div style={{ color: "#546A8A", fontWeight: "bold", fontSize: 12, marginRight: 5 }}>Validator</div>
              <img src={IC_SORT} alt={"sort"} />
            </div>
            <div style={{ width: 1, backgroundColor: "#C7C7C7", height: "100%" }} />
            <div style={{ flex: 5, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 15 }}>
              <div style={{ color: "#546A8A", fontWeight: "bold", fontSize: 12, marginRight: 5 }}>Voting power</div>
              <img src={IC_SORT} alt={"sort"} />
            </div>
            <div style={{ width: 1, backgroundColor: "#C7C7C7", height: "100%" }} />
            <div style={{ flex: 6, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 15 }}>
              <div style={{ color: "#546A8A", fontWeight: "bold", fontSize: 12 }}>Cumulative Share %</div>
            </div>
            <div style={{ width: 1, backgroundColor: "#C7C7C7", height: "100%" }} />
            <div style={{ flex: 4, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 15 }}>
              <div style={{ color: "#546A8A", fontWeight: "bold", fontSize: 12, marginRight: 5 }}>Uptime</div>
              <img src={IC_SORT} alt={"sort"} />
            </div>
            <div style={{ width: 1, backgroundColor: "#C7C7C7", height: "100%" }} />
            <div style={{ flex: 4, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 15 }}>
              <div style={{ color: "#546A8A", fontWeight: "bold", fontSize: 12, marginRight: 5 }}>Commission</div>
              <img src={IC_SORT} alt={"sort"} />
            </div>
          </div>
        </div>
        {data.map((item, index) => (
          <div key={index} style={{ height: 60 }}>
            <div style={{ width: "100%", height: 1, backgroundColor: "#C7C7C7" }} />
            <div style={{ display: "flex", flexFlow: "row", height: "100%", backgroundColor: index % 2 === 1 ? "#E7E7E7" : "#FFF", borderBottomLeftRadius: index === data.length - 1 ? 5 : 0, borderBottomRightRadius: index === data.length - 1 ? 5 : 0 }}>
              <div style={{ flex: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontWeight: "bold", fontSize: 12 }}>{index + 1}</div>
              </div>
              <div style={{ width: 1, backgroundColor: "#C7C7C7", height: "100%" }} />
              <div style={{ flex: 9, display: "flex", alignItems: "center", paddingLeft: 15 }}>
                <img src={IC_LOGO} height={15} width={15} />
                <div style={{ color: "#1B57F0", fontWeight: "bold", fontSize: 12, marginLeft: 5 }}>{item.validator}</div>
              </div>
              <div style={{ width: 1, backgroundColor: "#C7C7C7", height: "100%" }} />
              <div style={{ flex: 5, display: "flex", flexFlow: "column", alignItems: "flex-end", justifyContent: "center", paddingRight: 15 }}>
                <div style={{ fontWeight: "bold", fontSize: 12 }}>{item.votingPower.votes}</div>
                <div style={{ fontSize: 12 }}>{item.votingPower.percent}%</div>
              </div>
              <div style={{ width: 1, backgroundColor: "#C7C7C7", height: "100%" }} />
              <div style={{ flex: 6, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 15 }}>
                <div style={{ fontWeight: "bold", fontSize: 12 }}>{item.cumulativeShare}%</div>
              </div>
              <div style={{ width: 1, backgroundColor: "#C7C7C7", height: "100%" }} />
              <div style={{ flex: 4, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 15 }}>
                <div style={{ fontWeight: "bold", fontSize: 12 }}>{item.uptime}%</div>
              </div>
              <div style={{ width: 1, backgroundColor: "#C7C7C7", height: "100%" }} />
              <div style={{ flex: 4, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 15 }}>
                <div style={{ fontWeight: "bold", fontSize: 12 }}>{item.commission}%</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  statictics: {
    width: "24%",
    padding: 15
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    boxShadow: '5px 5px 15px 0 rgba(14, 38, 48, 0.12)'
  },
  btnActive: {
    display: "flex",
    flexFlow: "row",
    marginRight: "1%"
  }
};
