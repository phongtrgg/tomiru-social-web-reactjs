import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography, IconButton, InputAdornment, Link } from "@material-ui/core";
import iconTomiru from '../../../assets/icontomiru.png';

const useNewLoginStyles = makeStyles((theme) => ({
    header: {
        backgroundColor: "white",
        paddingTop: 20
    },
    titleHeader: {
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 600,
        textTransform: "uppercase"
    },
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        backgroundColor: "#fff",
        marginTop: 80
    },
    formContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: 400,
        width: "100%",
        padding: theme.spacing(4),
        borderRadius: 8,
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
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
        width: "100%",
        padding: "10px 40px 10px 10px",
        borderRadius: 4,
        border: "1px solid #ccc",
        fontSize: "14px",
        marginTop: 10,
        outline: "none"
    },
    inputLabel: {
        opacity: 0.6
    },
    inputFieldInfor: {
        marginTop: 10,
        position: "relative"
    },
    button: {
        marginTop: theme.spacing(5),
        backgroundColor: "#1da1f2",
        height: 50,
        color: "#fff",
        "&:hover": {
            backgroundColor: "#0d8bec"
        }
    },
    inputContainer: {
        alignItems: "center",
        width: "100%",
        marginTop: 20
    },
   
}));

const NewLoginFACode: React.FC = () => {
    const classes = useNewLoginStyles();


    return (
        <>
            <header className={classes.header}>
                <div className="logo">
                    <img src={iconTomiru} alt="" width={25} height={35} />
                    <p className={classes.titleHeader}>Tomiru</p>
                </div>
            </header>

            <div className={classes.root}>
                <div className={classes.formContainer}>
                    <Typography variant="h5" className={classes.title}>
                        Đăng Nhập
                    </Typography>

                    <div className={classes.inputContainer}>
                        <div className={classes.inputFieldInfor}>
                            <label className={classes.inputLabel}> Mã 2FA *</label>
                            <input className={classes.input} type="text" placeholder="Mã 2FA" />
                        </div>
                    </div>

                    <Button variant="contained" fullWidth className={classes.button}>
                        Tiếp tục
                    </Button>
                </div>
            </div>
        </>
    );
};

export default NewLoginFACode;
