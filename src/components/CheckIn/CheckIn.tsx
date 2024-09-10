import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { List, ListItem, Paper, Typography } from "@material-ui/core";

import { selectIsTagsLoading, selectTagsItems } from "../../store/ducks/tags/selectors";
import { useTagsStyles } from "./CheckInStyles";
import { CalendarIcon } from "../../icons";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import CheckInButton from "../Buttons/CheckInButton/CheckInButton";
import { useTranslation } from "react-i18next";

const CheckIn = (): ReactElement => {
    const classes = useTagsStyles();

    const tags = useSelector(selectTagsItems);
    const isTagsLoading = useSelector(selectIsTagsLoading);
    const { t } = useTranslation();

    return (
        <>
            <Paper className={classes.container}>
                <Paper className={classes.header} variant="outlined">
                    <div className={classes.header1}>
                        <EditCalendarIcon />
                        <Typography>{t("check-in")}</Typography>
                    </div>
                    <CheckInButton />
                </Paper>
            </Paper>
        </>
    );
};

export default CheckIn;
