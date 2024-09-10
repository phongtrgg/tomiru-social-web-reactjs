import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Divider } from "@material-ui/core";

import RetweetsCount from "./RetweetsCount/RetweetsCount";
import QuotesCount from "./QuotesCount/QuotesCount";
import LikesCount from "./LikesCount/LikesCount";
import { useFullTweetStyles } from "../FullTweetStyles";
import { selectlikesCount, selectRetweetsCount } from "../../../store/ducks/tweet/selectors";

const TweetInteractionCount = (): ReactElement => {
    const classes = useFullTweetStyles();
    const likesCount = useSelector(selectlikesCount);
    const retweetsCount = useSelector(selectRetweetsCount);

    return (
        <>
            {(retweetsCount !== 0 || likesCount !== 0) && (
                <>
                    {/* <Divider /> */}
                    <div className={classes.content}>
                        <RetweetsCount />
                        <QuotesCount />
                        <LikesCount />
                    </div>
                </>
            )}
        </>
    );
};

export default TweetInteractionCount;
