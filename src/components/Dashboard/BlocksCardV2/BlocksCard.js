import cn from "classnames/bind";
import { NavLink } from "react-router-dom";
import BlocksTableData from "src/components/BlockList/BlockTableWrapper/BlocksCard";
import consts from "src/constants/consts";
import styles from "./BlocksCard.module.scss";

const cx = cn.bind(styles);

const BlocksCardV2 = () => {
	return (
		<div className={cx("blocks-card")}>
			<div className={cx("blocks-card-header")}>
				<span className={cx("title")}>Blocks</span>
				<NavLink to={consts.PATH.BLOCKLIST} className={cx("show-more")}>
					Show more
				</NavLink>
			</div>
			<div className={cx("blocks-card-body")}>
				<BlocksTableData />
			</div>
		</div>
	);
};

export default BlocksCardV2;
