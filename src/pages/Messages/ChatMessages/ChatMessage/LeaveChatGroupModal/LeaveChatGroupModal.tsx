import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

interface LeaveGroupDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LeaveChatGroupModal: React.FC<LeaveGroupDialogProps> = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Xác nhận xóa thành viên này</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Bạn có chắc chắn muốn xóa thành viên này không?
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

export default LeaveChatGroupModal;
