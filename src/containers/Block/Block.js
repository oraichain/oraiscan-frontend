import Container from "@material-ui/core/Container";
import cn from "classnames/bind";
import {useParams} from "react-router-dom";
import CountdownRemainingBlock from "src/components/Block/CountdownRemainingBlock";
import CurrentBlock from "src/components/Block/CurrentBlock";
import {useCheckFutureBlock} from "src/hooks";
import styles from "./Block.module.scss";

const cx = cn.bind(styles);

const Block = () => {
	const params = useParams();
	const height = parseInt(params?.["height"]);

	const [isFutureBlock, remainingBlock] = useCheckFutureBlock(height);
	if(isFutureBlock === true) {
		return  <Container fixed className={cx("block")}>
					<CountdownRemainingBlock remainingBlock={remainingBlock} height={height} /> 
				</Container>
	} else if(isFutureBlock === false) {
		return <CurrentBlock height={height} />
	} else return <></>

};

Block.propTypes = {};
Block.defaultProps = {};

export default Block;
