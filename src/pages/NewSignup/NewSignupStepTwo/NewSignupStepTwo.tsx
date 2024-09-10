import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Typography } from "@material-ui/core";
import iconTomiru from "../../../assets/icontomiru.png";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        backgroundColor: "#fff",
        marginTop: 30
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
    content: {
        marginTop: 20
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
    resendLink: {
        marginTop: theme.spacing(2),
        fontSize: "0.875rem",
        color: theme.palette.text.secondary,
        textDecoration: "none"
    }
}));

const NewSignupStepTwo: React.FC = () => {
    const classes = useStyles();
    const [verificationCode, setVerificationCode] = useState("");

    const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVerificationCode(event.target.value);
    };

    const handleSubmit = () => {
        // Add submit logic here

        window.location.href = "/account/signup_step_three";
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
                        <span className="step"></span>
                    </div>
                </div>
            </header>
            <div style={{ display: "flex", marginLeft: 590, cursor: "pointer", width: 20 }}>
                <Link to="/account/new_signup">
                    <ArrowBackIosIcon />
                </Link>
            </div>
            <div className={classes.root}>
                <div className={classes.formContainer}>
                    <Typography variant="h5" className={classes.title}>
                        Đăng ký
                    </Typography>
                    <Typography variant="body1" className={classes.content}>
                        Chúng tôi đã gửi cho bạn một mã xác nhận vào email. Vui lòng kiểm tra email và nhập mã xác nhận
                        xuống phía dưới.
                    </Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="Mã xác nhận"
                        value={verificationCode}
                        onChange={handleCodeChange}
                        className={classes.inputField}
                    />
                    <a href="#" className={classes.resendLink}>
                        Gửi lại mã xác nhận (60s) (0/3)
                    </a>
                    {/* <Link href="#" className={classes.resendLink}>
                        Gửi lại mã xác nhận (60s) (2/3)
                    </Link> */}
                    {/* <Link href="#" className={classes.resendLink} style={{color:"red"}}>
                       Bạn đã đạt giới hạn 3 lần gửi
                    </Link> */}
                    <Link to="/account/signup_step_three" style={{ width: "100%" }}>
                        <Button variant="contained" fullWidth className={classes.button} onClick={handleSubmit}>
                            Tiếp tục
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default NewSignupStepTwo;
