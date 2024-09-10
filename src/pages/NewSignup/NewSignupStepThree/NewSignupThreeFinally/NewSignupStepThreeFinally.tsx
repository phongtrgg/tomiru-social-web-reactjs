import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Typography,  } from "@material-ui/core";
import iconTomiru from "../../../../assets/icontomiru.png";
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
    header:{
        backgroundColor:"white",
        marginTop:"30px"
    },
    formContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: 400,
        width: "100%",
        padding: theme.spacing(4),
        borderRadius: 8
    },
    title: {
        marginBottom: theme.spacing(2),
        marginRight: theme.spacing(9),
        fontSize: "2.8rem",
        width: "80%",
        fontWeight: 700
    },
   
    inputField: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(3)
    },
    input: {
        width: '100%',
        padding: '10px 40px 10px 10px',
        borderRadius: 4,
        border: '1px solid #ccc',
        fontSize: '1rem',
        marginTop: 10
    },
    inputLabel: {
        opacity: 0.6
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
   
    inputContainer: {
        alignItems: "center",
        width: '100%',
        marginTop: 20
    },
   
    
}));

const NewSignupStepThreeFinally: React.FC = () => {
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
            <div style={{ display: "flex", marginLeft: 600,justifyContent: "space-between", cursor: "pointer", width: 330 }}>
                 <Link to="/account/signup_step_three">
                    <ArrowBackIosIcon />
                </Link>
            </div>
            <div className={classes.root}>
                <div className={classes.formContainer}>
                    <Typography variant="h5" className={classes.title}>
                        Đăng ký
                    </Typography>

                    <div className={classes.inputContainer}>
                    <label className={classes.inputLabel}> Mã  2FA *</label>
                        <input
                            className={classes.input}
                            type="text"
                            placeholder="Mã 2FA"
                            value={verificationCode}
                            onChange={handleCodeChange}
                        />
                    </div>
                    <br />
                    {copied && <Typography color="primary">Mã đã được sao chép!</Typography>}

                    <Link to='/account/terms_of_policy' style={{width: "100%"}}>
                        <Button variant="contained" fullWidth className={classes.button} onClick={handleSubmit}>
                            Tiếp tục
                        </Button>
                    </Link>
                   
                </div>
            </div>
        </>
    );
};

export default NewSignupStepThreeFinally;
