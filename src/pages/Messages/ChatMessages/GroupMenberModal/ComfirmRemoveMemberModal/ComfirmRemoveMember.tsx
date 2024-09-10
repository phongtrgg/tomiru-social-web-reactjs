import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

interface ComfirmRemoveMemberModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ComfirmRemoveMemberModal: React.FC<ComfirmRemoveMemberModalProps> = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Xác nhận xóa thành viên khỏi nhóm</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Bạn có chắc chắn muốn xáo thành viên này không?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Hủy
        </Button>
        <Button onClick={onConfirm} color="primary" variant="contained">
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ComfirmRemoveMemberModal;
