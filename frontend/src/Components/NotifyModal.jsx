
import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import {useDispatch , useSelector} from "react-redux"
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import {Link} from "react-router-dom"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import moment from 'moment'
import CircleIcon from '@mui/icons-material/Circle';
import {isReadNotify , TYPES , deleteAllNotifies} from '../Redux/actions/notifyAction'

const NotifyModal = ({handleClose , open , anchorEl}) => {

  const auth = useSelector(state => state.authReducer)
  const notify = useSelector(state => state.notifyReducer)  
  const dispatch = useDispatch()


  const handleIsRead = (msg) => {
    dispatch(isReadNotify({msg, auth}))
  }


  const handleSound = () => {
    dispatch({type: TYPES.UPDATE_SOUND, payload: !notify.sound})
  }

  const handleDeleteAll = () => {
    const newArr = notify.data.filter(item => item.isRead === false)
    if(newArr.length === 0) return dispatch(deleteAllNotifies(auth.token))

    if(window.confirm(`You have ${newArr.length} unread notices. Are you sure you want to delete all?`)){
        return dispatch(deleteAllNotifies(auth.token))
    }
}

  return (
    <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
         }}
        className="mt-3"
      >
        <Typography  >
            <div className="notify__modal">
                    <div className="notify__modal__header p-3 flex items-center justify-between border-b-2">
                        <span className = "text-2xl" >Notification</span>

                    {
                            notify?.sound 
                            ? <NotificationsIcon className = "cursor-pointer" onClick = {() => handleSound()} />
                            : <NotificationsOffIcon className = "cursor-pointer" onClick = {() => handleSound()}   />
                    }
                    </div>

                    <div className="notify__content w-80 h-60 overflow-y-scroll">
                         {
                            notify?.data.map((msg , index) => {
                                 return (
                                     <Link  to={`${msg.url}`} onClick ={() => handleIsRead(msg)} >
                                       <div className="notity__content__item flex item-center justify-between p-3 gap-2" key={index}>
                                          <div className="flex gap-1">
                                                <Avatar src={msg.user.avatar}  />
                                                <div className="mx-1 flex-fill">
                                                    <div>
                                                        <strong className="mr-1">{msg.user.username}</strong>
                                                        <span>{msg.text}</span>
                                                    </div>
                                                    {msg.content && <small>{msg.content.slice(0,20)}...</small>}
                                                </div>
                                          </div>

                                          <div className="flex gap-1">
                                                {
                                                    msg.image &&
                                                    <div style={{width: '30px'}}>
                                                        {
                                                            
                                                        <Avatar src={msg.image} size="medium-avatar" />
                                                        }
                                                    </div>
                                                }


                                                <small className="text-muted d-flex justify-content-between px-2">
                                                    {moment(msg.createdAt).fromNow()}
                                                    {
                                                        !msg.isRead && <CircleIcon className = "text-green-400 !text-sm " />
                                                    }
                                                </small>

                                          </div>

                                       </div>
                                    </Link>


                                   
                                 )
                            })
                         }
                    </div>

                    <div className="notify__bottom p-3 border-t-2 w-full flex items-end justify-end ">
                         <Button onClick={() => handleDeleteAll()} variant="contained">Clear</Button>
                    </div>
            </div>
        </Typography>
      </Popover>
  )
}

export default NotifyModal