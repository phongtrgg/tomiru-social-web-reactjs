import React, { useState } from 'react';
import { Box, Typography, Modal, TextField, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import QRCodeImage from '../../../../assets/BtnReceive/QRcode.svg';
import { style } from './modalReceiveStyle';
import { setOpenSnackBar } from '../../../../store/ducks/actionSnackbar/actionCreators';
import { useDispatch } from 'react-redux';

interface QRCodeModalProps {
    open: boolean;
    handleClose: () => void;
}

const QRCodeModalReceive: React.FC<QRCodeModalProps> = ({ open, handleClose }) => {
    const email = 'jsjcaksjdckl@gmail.com';
    const dispatch = useDispatch();

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        dispatch(setOpenSnackBar("Đã coppy thành công!"));
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={style}>
                <Box display="flex" justifyContent="end">
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Typography variant="h6" component="h2">
                        Scan QR code để nhận tiền
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="center" my={2}>
                    <img src={QRCodeImage} alt="" />
                </Box>
                <Box display="flex" justifyContent="center">
                    <Typography variant="body2" gutterBottom fontSize={16} color='#474747'>
                        Hoặc gửi theo địa chỉ
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
                    <TextField
                        value={email}
                        InputProps={{
                            readOnly: true,
                            endAdornment: (
                                <IconButton onClick={handleCopy}>
                                    <ContentCopyIcon />
                                </IconButton>
                            ),
                        }}
                        variant="outlined"
                        fullWidth
                        inputProps={{ sx: { textAlign: 'center' } }}
                    />
                </Box>
            </Box>
        </Modal>
    );
};

export default QRCodeModalReceive;
