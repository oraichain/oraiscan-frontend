import dashboard from "src/assets/header/dashboard_ic_none.svg";
import dashboardOn from "src/assets/header/dashboard_ic.svg";
import validators from "src/assets/header/validators_ic_none.svg";
import validatorsOn from "src/assets/header/validators_ic.svg";
import blocks from "src/assets/header/blocks_ic_none.svg";
import blocksOn from "src/assets/header/blocks_ic.svg";
import txs from "src/assets/header/transations_ic_none.svg";
import txsOn from "src/assets/header/transations_ic.svg";

export default {
	on: [dashboardOn, validatorsOn, blocksOn, txsOn],
	off: [dashboard, validators, blocks, txs],
};
