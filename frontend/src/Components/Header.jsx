import React from 'react'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { useState } from 'react';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import {logout} from '../Redux/actions/authAction';
import {useDispatch , useSelector } from "react-redux";
import {Link} from "react-router-dom";
import Search from "../Components/Search"
import ModalCreatPost from './ModalCreatPost';
import NotifyModal from './NotifyModal';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const Header = () => {

   const dispatch = useDispatch()

   const auth = useSelector(state => state.authReducer)

   const theme = useSelector(state => state.themeReducer)

   const [tmp , setTmp] = useState(theme)

   const handleShowCreatPost = () => setShow(true);

   const handleCloseCreatPost = () => setShow(false);

   const [anchorEl, setAnchorEl] = useState(null);

   const [showInfo , setShowInfo] = useState(false);

   const [showNotify , setShowNotify] = useState(false);




   const handleClickProfile = (event) => {
     setAnchorEl(event.currentTarget);
     setShowInfo(true)
   };

   const handleClickNotify = (event) => {
    setAnchorEl(event.currentTarget);
    setShowNotify(true)
  };

   const handleClose = () => {
     setAnchorEl(null);
     setShowInfo(false)
     setShowNotify(false)
   };

   const NavLinks = [
    
      {
         icon : <HomeRoundedIcon/>,
         path : "/"
      },

      {
        icon : <SendOutlinedIcon/>,
        path : "/inbox"
      },

      {
        icon : <AddBoxOutlinedIcon/>,
        // path : "/createnewpost"
        onClick : handleShowCreatPost
      },

      {
        icon : <ExploreOutlinedIcon/>,
        path : "/explore"
      },

      {
        icon : <FavoriteBorderOutlinedIcon/>,
        // path : "/liked"
        onClick : handleClickNotify
      },
   ]
 
  
   const [show, setShow] = useState(false);

   const handleLightMode = () => {
    setTmp('Light')
    dispatch({type: 'Light'})
   }

   const handleDarkMode = () => {
    setTmp('Dark')
    dispatch({type: 'Dark'})
   }

    
    return (
      <React.Fragment>
        <div className="header flex items-center justify-center border-solid border-b">
            <div className="header__wrapper w-full p-3 flex items-center justify-between sm:w-2/3 gap-2">
              
              <Link to = "/">
                  <div className={`${tmp === 'Dark' && 'bg-white'} header__logo w-28 cursor-pointer`}>
                      <img src= {require("../Assets/Img/logo.png")} alt="" />
                  </div>
              </Link>
                

                <Search/>

                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                  
                        {
                            NavLinks.map((item, index) => {
                              return (
                                 <Link to = {item?.path} >
                                      <Typography onClick={item?.onClick} className="cursor-pointer" sx={{ minWidth: 42 }}>{item.icon}</Typography>
                                 </Link>
                              )
                            })
                        }
                
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClickProfile}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={showInfo ? 'account-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={showInfo ? 'true' : undefined}
                    >
                      <Avatar sx={{ width: 32, height: 32 }}>{auth.user ?  auth.user.fullname.split('')[0] : "M"}</Avatar>
                    </IconButton>
                  </Tooltip>

                  <NotifyModal handleClose = {handleClose} anchorEl = {anchorEl} open = {showNotify}/>
                </Box>
            </div>
        </div>

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={showInfo}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
         <Link to={`/profile/${auth?.user?._id}`}>
            <MenuItem>
              <Avatar /> Profile
            </MenuItem>
         </Link> 
    
          {
                  
               tmp === 'Dark' ?
               <MenuItem  onClick={() => handleLightMode()}>
                   <ListItemIcon>
                         <LightModeIcon fontSize="small" />
                   </ListItemIcon>
                     Light Mode
              </MenuItem>
             :
             <MenuItem onClick={() => handleDarkMode()} >
               <ListItemIcon>
                 <DarkModeIcon fontSize="small" />
               </ListItemIcon>
                 Dark Mode
            </MenuItem>
          }
        <Link to = '/login'>
            <MenuItem onClick={() => dispatch(logout())} >
              
              <ListItemIcon  >
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
        </Link>
        </Menu>
           <ModalCreatPost show = {show} handleClose= {handleCloseCreatPost}  />
      </React.Fragment>
    );
 }

export default Header