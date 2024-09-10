import React, { FC } from "react";
import { TextField, Button, Card, CardContent, Typography, Box, InputAdornment, IconButton } from "@material-ui/core";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { makeStyles } from "@material-ui/core/styles";
import qrCode1 from '../../../../assets/Signup/QR Code.png'
const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: 500,
        margin: 'auto',
        marginTop: theme.spacing(5),
        padding: theme.spacing(2),
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    },
    textField: {
        margin: theme.spacing(1, 0),
    },
    button: {
        margin: theme.spacing(1, 0),
        width: '100px',
        height: '55px',
        marginLeft: '20px',
        backgroundColor: '#1DA1F2',
        color: 'white',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    qrCode: {
        margin: theme.spacing(2, 0),
    },
    way: {
       fontWeight: 'bold',
    }
}));

const InviteCode: FC = () => {
    const classes = useStyles();

    const handleCopyClick = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Mã giới thiệu của bạn
                </Typography>
                <Typography variant="body2" gutterBottom>
                    <span className={classes.way}> Cách 1:</span> Gửi mã giới thiệu đến người dùng để họ nhập thủ công.
                </Typography>
                <TextField
                    className={classes.textField}                  
                    variant="outlined"
                    value="21989asdasdas"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => handleCopyClick("21989asdasdas")}>
                                    <FileCopyIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Typography variant="body2" gutterBottom>
                    <span className={classes.way}> Cách 2:</span> Gửi đường dẫn phía dưới để người dùng đăng ký trên mẫu đã có sẵn mã giới thiệu của bạn.
                </Typography>
                <TextField
                    className={classes.textField}
                    variant="outlined"
                    value="Linkgiailap.abc"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                            <IconButton onClick={() => handleCopyClick("Linkgiailap.abc")}>
                                <FileCopyIcon />
                            </IconButton>
                        </InputAdornment>
                        ),
                    }}
                />
                 <button  color="primary" className={classes.button}>
                        Chia sẻ
                 </button>
                <Box className={classes.qrCode}>
                    <Typography variant="body2" gutterBottom>
                        Bạn cũng có thể quét mã QR code phía dưới để đi đến trang đăng ký
                    </Typography>
                    <img src={qrCode1} alt="" width={200} height={200} />
                </Box>
            </CardContent>
        </Card>
    );
};

export default InviteCode;
