import React, { FC, useEffect, useState } from "react";
import { TextField, Button, Card, CardContent, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../../../../store/ducks/user/selectors";
import { updateUserAboutRequest } from "../../../../../store/ducks/user/sagas";
import { updateUserAbout } from "../../../../../store/ducks/user/actionCreators";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 500,
        margin: "auto",
        marginTop: theme.spacing(4),
        padding: theme.spacing(2),
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    },
    textField: {
        marginBottom: theme.spacing(2)
    },
    buttonGroup: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: theme.spacing(2),
        width: "150px",
        marginLeft: "auto"
    }
}));

interface IntroduceProfileProps {
    onShareClick: () => void;
}

const IntroduceProfile: FC<IntroduceProfileProps> = ({ onShareClick }) => {
    const classes = useStyles();
    const userData = useSelector(selectUserData);
    const dispatch = useDispatch();
    const [text, setText] = useState<string>("");
    useEffect(() => {
        if (userData) {
            setText(userData.about);
        }
    }, [userData]);
    const handleShareClick = () => {
        if (text.trim() === "") {
            alert("Bạn chưa nhập gì cả!");
        } else {
            dispatch(updateUserAbout({ about: text }));
        }
    };

    const handleCancelClick = () => {
        setText("");
    };

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                    Giới thiệu về bản thân
                </Typography>
                <TextField
                    className={classes.textField}
                    placeholder="Viết gì đó về bạn..."
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <Box className={classes.buttonGroup}>
                    <Button variant="contained" color="primary" onClick={handleShareClick}>
                        Chia sẻ
                    </Button>
                    <Button variant="outlined" color="primary" onClick={handleCancelClick}>
                        Hủy
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default IntroduceProfile;
