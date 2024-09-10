import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { useMoreSettingGroupMemberStyles } from './MoreSettimgGroupMember';
import LeaveChatGroupModal from '../../ChatMessage/LeaveChatGroupModal/LeaveChatGroupModal';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenSnackBar } from "../../../../../store/ducks/actionSnackbar/actionCreators";
import { removeMember, resetChatError } from '../../../../../store/ducks/chats/actionCreators';
import { PROFILE } from '../../../../../constants/path-constants';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../../../../store/store';


interface MoreSettingGroupMemberProps {
  idMember?: number
  chatId?: number
}


const MoreSettingGroupMember: React.FC<MoreSettingGroupMemberProps> = React.memo(({ idMember, chatId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useMoreSettingGroupMemberStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [removeMemberIds, setRemoveMemberIds] = useState<number[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const error = useSelector((state: RootState) => state.chats.error);


  const options = [
    { label: 'Xem trang cá nhân', icon: <AccountCircleIcon className={classes.iconPerson} />},
    { label: 'Xóa thành viên' , icon: <PersonRemoveIcon  className={classes.deleteMember}/> },
  ];

  const handleMenuItemClick = useCallback((option: string) => {
    if (option === 'Xóa thành viên') {
      setIsModalOpen(true);
    } else if(option === 'Xem trang cá nhân' && idMember !== undefined) {
      history.push(`${PROFILE}/${idMember}`);
    }
    setAnchorEl(null);
  }, [history, idMember]);

  const handleConfirmRemoveMember = useCallback(() => {
    if (chatId && idMember !== undefined) {
      setRemoveMemberIds(prevRemoveMemberIds => [...prevRemoveMemberIds, idMember]);
      setIsModalOpen(false);
    }
  }, [chatId, idMember]);

  useEffect(() => {
    if (removeMemberIds.length > 0 && chatId && idMember !== undefined) {
      dispatch(removeMember(chatId, removeMemberIds));
    }
  }, [removeMemberIds, chatId, idMember, dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(setOpenSnackBar(error));
      dispatch(resetChatError())
      setRemoveMemberIds([]);
    } else if (removeMemberIds.length > 0) {
      dispatch(setOpenSnackBar("Xóa thành viên thành công!"));
    }
  }, [error, removeMemberIds, dispatch]);

  return (
    <>
      <div>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={(event) => setAnchorEl(event.currentTarget)}
        >
          <MoreHorizIcon />
        </IconButton>
       
        <Menu
          id="long-menu"
          MenuListProps={{ 'aria-labelledby': 'long-button' }}
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          PaperProps={{
            style: {
              width: '30ch',
              marginTop: "18px",
              marginLeft: "23px",
              borderRadius: "10px",
            },
          }}
          getContentAnchorEl={null}
        >
          {options.map((option) => (
            <MenuItem 
              className={classes.menuItem} 
              key={option.label}
              onClick={() => handleMenuItemClick(option.label)}
            >
              {option.icon}
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      </div>
      <LeaveChatGroupModal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleConfirmRemoveMember} 
      />
    </>
  );
});

export default MoreSettingGroupMember;
