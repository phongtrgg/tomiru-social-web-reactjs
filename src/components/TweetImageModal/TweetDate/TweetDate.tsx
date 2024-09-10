import React, { memo, ReactElement } from "react";
import { useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import format from "date-fns/format";
import usLang from "date-fns/locale/en-US/index";

import { selectTweetCreatedAt } from "../../../store/ducks/tweet/selectors";
import { HOUR_MINUTE_AMPM, MONTH_DAY_YEAR } from "../../../constants/common-constants";

const TweetDate = memo((): ReactElement => {
    const createdAt = useSelector(selectTweetCreatedAt);

    return (
        <Typography style={{ marginBottom: 16 }}>
            <Typography variant={"subtitle1"} component={"span"}>
                {format(new Date(createdAt!), HOUR_MINUTE_AMPM, { locale: usLang })} ·
            </Typography>
            <Typography variant={"subtitle1"} component={"span"}>
                {format(new Date(createdAt!), MONTH_DAY_YEAR)}
            </Typography>
        </Typography>
    );
});

export default TweetDate;
