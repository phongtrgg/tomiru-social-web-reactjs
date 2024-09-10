import React, { FC } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@mui/icons-material/Edit";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 500,
        margin: "auto",
        marginTop: theme.spacing(4),
        padding: theme.spacing(2),
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    },
    titleContent: {
        fontWeight: 700
    },
    textContent: {
        fontSize: 14
    },
    contentContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    inconEdit: {
        width: "30px",
        height: "30px",
        borderRadius: "50px",
        backgroundColor: "#DDDDDD ",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer"
    }
}));

interface ContentIntroduceProps {
    onEditClick: () => void;
}

const ContentIntroduce: FC<ContentIntroduceProps> = ({ onEditClick }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <div className={classes.contentContainer}>
                    <Typography variant="h5" component="h2" gutterBottom className={classes.titleContent}>
                        Giới thiệu về bản thân
                    </Typography>
                    <div className={classes.inconEdit} onClick={onEditClick}>
                        <EditIcon style={{ height: "17px" }} />
                    </div>
                </div>

                <Typography className={classes.textContent}>
                    I’m a Designer......... <br /> Love yourself enough to set boundaries. Your time and energy are
                    precious. <br />
                    You get to choose how you use it. You teach people how to treat you by deciding what you will and
                    won't accept
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ContentIntroduce;
