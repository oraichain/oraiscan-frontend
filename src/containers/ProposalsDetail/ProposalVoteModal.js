import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useHistory} from "react-router-dom";
import PropTypes from "prop-types";
import cn from "classnames/bind";
import Dialog from "@material-ui/core/Dialog";
import copy from "copy-to-clipboard";
import {showAlert} from "src/store/modules/global";
import InfoRow from "src/components/common/InfoRow";
import consts from "src/constants/consts";
import CopyIcon from "src/icons/CopyIcon";
import styles from "./ProposalModal.module.scss";
import SelectBox from "src/components/common/SelectBox";

const cx = cn.bind(styles);

const ProposalVoteModal = ({open, onClose}) => {
	const [fieldValue, setFieldValue] = useState("VOTE_OPTION_YES");

	const fields = [
		{
			label: "Yes",
			value: "VOTE_OPTION_YES",
		},
		{
			label: "Abstain",
			value: "VOTE_OPTION_ABSTAIN",
		},
		{
			label: "No",
			value: "VOTE_OPTION_NO",
		},
		{
			label: "No with veto",
			value: "VOTE_OPTION_NO_WITH_VETO",
		},
	];

	const onVote = () => {};

	// const {
	//     handleSubmit,
	//     register,
	//     control,
	//     formState: { errors },
	// } = useForm({ defaultValues, resolver: yupResolver(schema) });

	return (
		<Dialog open={open} onClose={onClose} maxWidth='lg' fullWidth={true}>
			{/* <form onSubmit={handleSubmit(onVote)}>
                <div className={cx("tx_response")}>
                    <div className={cx("field")}>
                        <SelectBox value={fieldValue} data={fields} onChange={setFieldValue} />
                    </div>
                </div>
            </form> */}
		</Dialog>
	);
};

ProposalVoteModal.propTypes = {
	data: PropTypes.any,
};

ProposalVoteModal.defaultProps = {};

export default ProposalVoteModal;
