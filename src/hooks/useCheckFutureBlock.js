import React, {useEffect} from "react";
import {_} from "src/lib/scripts";
import {useSelector} from "react-redux";

export default function useCheckFutureBlock(height) {
	const [isFutureBlock, setIsFutureBlock] = React.useState(undefined);
	const [remainingBlock, setRemainingBlock] = React.useState(undefined);
	const { status } = useSelector(state => state.blockchain);

    useEffect(() => {
        if(status) {
            const isFutureBlock = status.latest_block_height < height
            setIsFutureBlock(isFutureBlock)
            if(isFutureBlock) {
                setRemainingBlock(height - status.latest_block_height)
            }
        }
    },[status])

	return [isFutureBlock, remainingBlock];
}
