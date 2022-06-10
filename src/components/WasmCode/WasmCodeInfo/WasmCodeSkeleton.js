import * as React from "react";
import InfoRow from "src/components/common/InfoRow";
import {Skeleton} from "@material-ui/lab";

const WasmCodeSkeleton = () => {
	const titleList = ["TxHash", "Code Id", "Creator", "Time"];

	return (
		<>
			{titleList.map(val => {
				return (
					<InfoRow label={val}>
						<Skeleton width="60%" />
					</InfoRow>
				);
			})}
		</>
	);
};

export default WasmCodeSkeleton;
