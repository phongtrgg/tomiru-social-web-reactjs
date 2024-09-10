import React, { memo, ReactElement, useState } from "react";
import { useSelector } from "react-redux";

import { selectlikesCount, selectRetweetsCount, selectTweetId } from "../../../store/ducks/tweet/selectors";
import UsersListModal, { UsersListModalAction } from "../../UsersListModal/UsersListModal";
import { useTweetInteractionCountStyles } from "./TweetInteractionCountStyles";
import { useModalWindow } from "../../../hook/useModalWindow";
import InteractionCount from "./InteractionCount/InteractionCount";
import { useTranslation } from "react-i18next";

const TweetInteractionCount = memo((): ReactElement => {
    const classes = useTweetInteractionCountStyles();
    const tweetId = useSelector(selectTweetId);
    const retweetsCount = useSelector(selectRetweetsCount);
    const likesCount = useSelector(selectlikesCount);
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();
    const [usersListModalAction, setUsersListModalAction] = useState<UsersListModalAction>(UsersListModalAction.LIKED);
    const { t } = useTranslation();

    const onOpenUsersModalWindow = (modalAction: UsersListModalAction): void => {
        setUsersListModalAction(modalAction);
        onOpenModalWindow();
    };

    return (
        <>
            {(retweetsCount !== 0 || likesCount !== 0) && (
                <div id={"content"} className={classes.content}>
                    <InteractionCount
                        id={"onOpenRetweetsModalWindow"}
                        title={t("retweets")}
                        interactionCount={retweetsCount ?? 0}
                        modalAction={UsersListModalAction.RETWEETED}
                        onOpenUsersModalWindow={onOpenUsersModalWindow}
                    />
                    <InteractionCount
                        id={"onOpenLikesModalWindow"}
                        title={t("like")}
                        interactionCount={likesCount ?? 0}
                        modalAction={UsersListModalAction.LIKED}
                        onOpenUsersModalWindow={onOpenUsersModalWindow}
                    />
                </div>
            )}
            <UsersListModal
                tweetId={tweetId!}
                usersListModalAction={usersListModalAction}
                visible={visibleModalWindow}
                onClose={onCloseModalWindow}
            />
        </>
    );
});

export default TweetInteractionCount;
