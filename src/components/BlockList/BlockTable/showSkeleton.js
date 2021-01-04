import React, {memo} from "react";
import classNames from "classnames/bind";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Skeleton, {SkeletonTheme} from "react-loading-skeleton";

const ShowSkeleton = () => {
	return (
		<TableContainer
			style={{
				padding: "15px 20px",
				borderRadius: "5px",
				backgroundColor: "#ffffff",
				boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
			}}>
			<Table aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell align='left'>TxHash</TableCell>
						<TableCell align='left'>Type</TableCell>
						<TableCell>Result</TableCell>
						<TableCell align='right'>Amount</TableCell>
						<TableCell align='right'>Fee</TableCell>
						<TableCell align='right'>Height</TableCell>
						<TableCell align='right'>Time</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{Array(10)
						.fill()
						.map((item, index) => (
							<TableRow key={index}>
								<TableCell align='left' component='th' scope='row'>
									<Skeleton />
								</TableCell>
								<TableCell align='left'>
									<Skeleton />
								</TableCell>
								<TableCell>
									<Skeleton />
								</TableCell>
								<TableCell align='right'>
									<Skeleton />
								</TableCell>
								<TableCell align='right'>
									<Skeleton />
								</TableCell>
								<TableCell align='right'>
									<Skeleton />
								</TableCell>
								<TableCell align='right'>
									<Skeleton />
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default ShowSkeleton;
