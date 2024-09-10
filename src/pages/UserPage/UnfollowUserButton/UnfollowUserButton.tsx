// import React, { memo, ReactElement, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Button } from "@material-ui/core";

// import { processFollowRequest, unfollowUser } from "../../../store/ducks/user/actionCreators";
// import {
//     selectUserProfileId,
//     selectUserProfileIsFollower,
//     selectUserProfileIsPrivateProfile
// } from "../../../store/ducks/userProfile/selectors";
// import { useUserPageStyles } from "../UserPageStyles";
// import { t } from "i18next";

// const UnfollowUserButton = memo((): ReactElement => {
//     const classes = useUserPageStyles();
//     const dispatch = useDispatch();
//     const userProfileId = useSelector(selectUserProfileId);
//     const isPrivateProfile = useSelector(selectUserProfileIsPrivateProfile);
//     const isFollower = useSelector(selectUserProfileIsFollower);
//     const [btnText, setBtnText] = useState<string>(t("following"));

//     const handleFollow = (): void => {
//         if (isPrivateProfile && !isFollower) {
//             dispatch(processFollowRequest(userProfileId!));
//         } else {
//             dispatch(unfollowUser({ userId: userProfileId! }));
//         }
//     };

//     return (
//         <Button
//             className={classes.primaryButton}
//             onClick={handleFollow}
//             onMouseOver={() => setBtnText(t("unfollow"))}
//             onMouseLeave={() => setBtnText(t("following"))}
//             color="primary"
//             variant="contained"
//             size="large"
//         >
//             {btnText}
//         </Button>
//     );
// });

// export default UnfollowUserButton;

import React, { memo, ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";

import { followUser, processFollowRequest, unfollowUser } from "../../../store/ducks/user/actionCreators";
import {
    selectUserProfileId,
    selectUserProfileIsFollower,
    selectUserProfileIsPrivateProfile
} from "../../../store/ducks/userProfile/selectors";
import { useUserPageStyles } from "../UserPageStyles";
import { t } from "i18next";

const UnfollowUserButton = memo((): ReactElement => {
    const classes = useUserPageStyles();
    const dispatch = useDispatch();
    const userProfileId = useSelector(selectUserProfileId);
    const isPrivateProfile = useSelector(selectUserProfileIsPrivateProfile);

    const isFollower = useSelector(selectUserProfileIsFollower);
    const [btnText, setBtnText] = useState<string>(t("following"));

    const handleFollow = (): void => {
        if (isPrivateProfile && !isFollower) {
            dispatch(processFollowRequest(userProfileId!));
        } else {
            dispatch(unfollowUser({ userId: userProfileId! }));
        }
    };

    return (
        <Button
            className={classes.outlinedButton}
            onClick={handleFollow}
            onMouseOver={() => setBtnText(t("unfollow"))}
            onMouseLeave={() => setBtnText(t("following"))}
            color="primary"
            variant="contained"
            size="large"
        >
            {btnText}
        </Button>
    );
});

export default UnfollowUserButton;
