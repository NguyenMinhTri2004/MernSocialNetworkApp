import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import IconButton from '@mui/joy/IconButton';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import {useDispatch , useSelector} from "react-redux"
import ModalCreatPost from "./ModalCreatPost"
import {useState} from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteComment } from '../Redux/actions/commentAction';
import {deletePost} from "../Redux/actions/postAction"
import {BASE_URL} from "../Utils/config"

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

const ModalAuthPost =  ({post , comment , setOnEdit}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch()
  const auth = useSelector(state => state.authReducer)
  const socket = useSelector(state => state.socketReducer)
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditPost = ()  => {
    if(post && !comment){
      handleShowCreatPost()
    }else {
      setOnEdit(true)
    }
  }

  const handleRemove = () => {
    
    if(post && !comment){
      dispatch(deletePost({post , auth , socket}))
      handleClose()
    }else {
      dispatch(deleteComment({post , auth , comment , socket}))
    }
  }

  const [showModalCreatPost, setShowModalCreatPost] = useState(false);


  const handleShowCreatPost = () => setShowModalCreatPost(true);

  const handleCloseCreatPost = () => setShowModalCreatPost(false);

  const handleCopyLink = () => {
      navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`)
      handleClose()
  }

  return (
    <div className = "ml-auto" >
       <IconButton variant="plain" color="neutral" size="sm" sx={{ ml: 'auto' }}
        onClick={handleClick}
      >
         <MoreHoriz />
     </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleEditPost} disableRipple>
          <EditIcon />
          Edit
        </MenuItem>
        { <Divider sx={{ my: 0.5 }} /> }
        <MenuItem onClick={handleRemove} disableRipple>
          <DeleteIcon />
          Delete
        </MenuItem>
        { <Divider sx={{ my: 0.5 }} /> }
        {
          post && !comment 
          && <MenuItem onClick={handleCopyLink} disableRipple>
              <MoreHorizIcon />
                Copy Link
            </MenuItem>
        }
        
      </StyledMenu>

    

      <ModalCreatPost show = {showModalCreatPost} handleClose= {handleCloseCreatPost} post = {post}  />
    </div>
  );
}

export default ModalAuthPost
