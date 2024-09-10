import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Typography } from "@material-ui/core";
import iconTomiru from "../../../assets/icontomiru.png";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Qr from "../../../assets/Signup/QR Code.png";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        backgroundColor: "#fff",
        marginTop: 15
    },
    header: {
        backgroundColor: "white",
        marginTop: "30px"
    },
    formContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: 400,
        width: "100%",
        padding: theme.spacing(4),
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        borderRadius: 8
    },
    title: {
        marginBottom: theme.spacing(2),
        marginRight: theme.spacing(9),
        fontSize: "2.8rem",
        width: "80%",
        fontWeight: 700
    },
    title2: {
        marginBottom: theme.spacing(2),
        marginRight: theme.spacing(9),
        fontSize: "1.4rem",
        width: "60%",
        fontWeight: 700
    },
    content: {
        marginTop: 10
    },
    inputField: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(3)
    },
    button: {
        marginTop: theme.spacing(2),
        backgroundColor: "#1da1f2",
        height: 50,
        color: "#fff",
        "&:hover": {
            backgroundColor: "#0d8bec"
        }
    },
    button2: {
        marginTop: theme.spacing(0),
        backgroundColor: "#1da1f2",
        height: 35,
        width: 90,
        color: "#fff",
        "&:hover": {
            backgroundColor: "#0d8bec"
        }
    },
    inputContainer: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        marginTop: 20
    },
    copyIcon: {
        cursor: "pointer",
        marginLeft: theme.spacing(1)
    }
}));

const NewSignupStepThree: React.FC = () => {
    const classes = useStyles();
    const [verificationCode, setVerificationCode] = useState("");
    const [copied, setCopied] = useState(false);

    const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVerificationCode(event.target.value);
    };

    const handleSubmit = () => {
        // Add submit logic here
    };

    return (
        <>
            <header className={classes.header}>
                <div className="logo">
                    <img src={iconTomiru} alt="" width={25} height={35} />
                    <p style={{ marginLeft: 10, fontSize: 20, fontWeight: 600, textTransform: "uppercase" }}>Tomiru</p>
                    <div className="progress-bar">
                        <span className="stepActive"></span>
                        <span className="stepActive"></span>
                        <span className="stepActive"></span>
                    </div>
                </div>
            </header>
            <div
                style={{
                    display: "flex",
                    marginLeft: 590,
                    justifyContent: "space-between",
                    cursor: "pointer",
                    width: 330
                }}
            >
                <Link to="/account/signup_step_two">
                    <ArrowBackIosIcon />
                </Link>
                <Button className={classes.button2}>Bỏ qua</Button>
            </div>
            <div className={classes.root}>
                <div className={classes.formContainer}>
                    <Typography variant="h5" className={classes.title}>
                        Đăng ký
                    </Typography>

                    <Typography variant="body1" className={classes.content}>
                        <p className={classes.title2}>Thiết lập 2FA</p>
                        Thiết lập qua công cụ của bên thứ ba <br />
                        Vui lòng dùng ứng dụng xác thực của bạn (chẳng hạn như Authy hoặc Google Authenticator) để quét
                        mã QR này
                    </Typography>
                    <img src={Qr} alt="" style={{ marginTop: 20, marginRight: 155 }} />

                    <div className={classes.inputContainer}>
                        <TextField
                            label="Nhập mã "
                            variant="outlined"
                            fullWidth
                            value={verificationCode}
                            onChange={handleCodeChange}
                        />
                        <CopyToClipboard text={verificationCode} onCopy={() => setCopied(true)}>
                            <ContentCopyIcon className={classes.copyIcon} />
                        </CopyToClipboard>
                    </div>
                    <br />
                    {copied && <Typography color="primary">Mã đã được sao chép!</Typography>}
                    <Link to="/account/signup_step_three_finally" style={{ width: "100%" }}>
                        <Button variant="contained" fullWidth className={classes.button} onClick={handleSubmit}>
                            Tiếp tục
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default NewSignupStepThree;
