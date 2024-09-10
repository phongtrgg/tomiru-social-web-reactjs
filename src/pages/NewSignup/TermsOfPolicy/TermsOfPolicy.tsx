import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import iconTomiru from "../../../assets/icontomiru.png";
import DoneIcon from '@mui/icons-material/Done';
import { Button } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    rootContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    header:{
        backgroundColor: "white",
        marginTop: "30px"
    },
    termsContainer: {
        height: "65vh",
        width: "40%",
        backgroundColor: "#E7E7E8",
        borderRadius: 18,
        marginTop: 50,

    },
    title: {
        fontSize: "1.7rem",
        fontWeight: 700,
        textAlign: "center",
        marginLeft: 30,
        marginRight: 30,
        marginTop: 50
    },
    terms: {
        display: "flex",
        alignItems: "center",
        marginBottom: 10,
        marginLeft: 50,
        width: "100%",
    },
    termsContent: {
        marginLeft: 20,
        fontSize: "1rem",
        fontWeight: 500
    },
    doneIcon: {
        marginRight: 20,
        fontSize: 10,
        marginTop: 5,
        backgroundColor:"#E7E7E8",
        borderRadius: 4,
        border:"1px solid gray",
    },
    allBtn: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
    },
    btn1: {
        marginTop: theme.spacing(2),
        border: "1px solid #0D0D0D",
        height: 45,
        "&:hover": {
            // backgroundColor: "#0d8bec"
        },
        width: 230,
        
    },
    btn: {
        marginTop: theme.spacing(2),
        backgroundColor: "#1da1f2",
        height: 45,
        color: "#fff",
        "&:hover": {
            backgroundColor: "#0d8bec"
        },
        width: 230,
        
    }
}));

const TermsOfPolicy: React.FC = () => {
    const classes = useStyles();

    return (
        <>
            <header className={classes.header}>
                <div className="logo">
                    <img src={iconTomiru} alt="" width={25} height={35} />
                    <p style={{ marginLeft: 10, fontSize: 20, fontWeight: 600, textTransform: "uppercase" }}>Tomiru</p>
                </div>
            </header>

            <div className={classes.rootContainer}>
                <div className={classes.termsContainer}>
                    <h1 className={classes.title}>BẠN CẦN ĐỒNG Ý CÁC ĐIỀU KHOẢN SAU ĐÂY ĐỂ CÓ THỂ TIẾP TỤC</h1>
                    <div className={classes.terms}>
                        <button className={classes.doneIcon}> <DoneIcon/> </button>
                        <p className={classes.termsContent}> Tôi xác nhận rằng tôi đã đủ 16 tuổi để tham gia Tomiru.</p>
                    </div>
                    <div className={classes.terms}>
                        <button className={classes.doneIcon}> <DoneIcon /> </button>
                        <p className={classes.termsContent}> Tài khoản của tôi sẽ bị khóa nếu không KYC đúng quy định.</p>
                    </div>
                    <div className={classes.terms}>
                        <button className={classes.doneIcon}> <DoneIcon /> </button>
                        <p className={classes.termsContent}>
                            {" "}
                            Tài khoản của tôi và các tài khoản liên quan sẽ bị thu hồi <br /> TOMXU nếu vi phạm quy tắc và điều
                            khoản sử dụng của Tomiru.
                        </p>
                    </div>
                    <div className={classes.allBtn}>
                        <Button className={classes.btn1}>Hủy</Button>
                        <Button className={classes.btn}>Đồng ý</Button>
                    </div>
                   
                </div>
            </div>
        </>
    );
};

export default TermsOfPolicy;
