import React, { memo, ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import ActionIconButton from "../../../components/ActionIconButton/ActionIconButton";
import { useGlobalStyles } from "../../../util/globalClasses";
import { selectUserProfileId } from "../../../store/ducks/userProfile/selectors";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
interface AddFriendButtonProps {
    actionType: "add" | "confirm" | "cancel";
}

const AddFriendButton = memo(({ actionType }: AddFriendButtonProps): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const dispatch = useDispatch();
    const history = useHistory();
    const userProfileId = useSelector(selectUserProfileId);

    let icon;
    let actionText;

    switch (actionType) {
        case "add":
            icon = <PersonAddAltOutlinedIcon />;
            actionText = "Thêm bạn";
            break;
        case "confirm":
            icon = <CheckIcon />;
            actionText = "Xác nhận kết bạn";
            break;
        case "cancel":
            icon = <CloseIcon />;
            actionText = "Hủy kết bạn";
            break;
        default:
            icon = <PersonAddAltOutlinedIcon />;
            actionText = "Thêm bạn";
            break;
    }

    const handlerSubmit = () => {
        switch (actionType) {
            case "add":
                break;
            case "confirm":
                break;
            case "cancel":
                break;
            default:
                break;
        }
    };

    return (
        <span className={globalClasses.userPageIconButton}>
            <ActionIconButton actionText={actionText} icon={icon} onClick={handlerSubmit} />
        </span>
    );
});

export default AddFriendButton;
