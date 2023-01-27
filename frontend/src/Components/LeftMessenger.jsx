import React , {useState , useEffect} from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import UserCard from '../Components/UserCard'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import { useHistory, useParams } from 'react-router-dom'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {getConversations} from "../Redux/actions/messAction"

const LeftMessenger = ({handleShow , handleAddUser , searchUsers }) => {

    const users = useSelector(state => state.messReducer.users)

    const auth = useSelector(state => state.authReducer)

    const message = useSelector(state => state.messReducer)

    const online = useSelector(state => state.statusReducer)

    const {id} = useParams()

    const dispatch = useDispatch()
    

    const isActive = (user) => {
     if(id === user._id) return 'active';
     return ''
     }

     
     useEffect(() => {
          if(message.firstLoad) return;
          dispatch(getConversations({auth}))
     },[dispatch, auth, message.firstLoad])


     useEffect(() => {
          if(message.firstLoad){
               dispatch({
                    type : "CHECK_ONLINE_OFFLINE",
                    payload : online
               })
          }
     },[dispatch, online, message.firstLoad])


  return (
      <div className="leftmessenger  h-screen border   w-[24rem]">
             <div className="leftmessenger__wrapper  ">
                   <div className="leftmessenger__header flex item-center justify-between border p-3 max-h-14">
                            <div className="leftmessenger__header__auth flex item-center gap-2 font-bold text-base ">
                                 <span>{auth.user.username}</span>
                                 <KeyboardArrowDownIcon/>

                            </div>

                            

                            <div className="leftmessenger__header__auth__adduser">
                                 <PersonAddAlt1OutlinedIcon  onClick={handleShow} />
                            </div>
                   </div>

                   <div className="leftmessenger__userlist">
                            {
                                                    users.map((user , index) => {
                                                            return (
                                                              <Link to={`/inbox/${user._id}`} className={`leftmessenger__userlist__item cursor-pointer flex items-center justify-between ${isActive(user)}`}  onClick={() => handleAddUser(user)}   >
                                                                   <UserCard className = "" key={index} user={user} msg = {true} />
                                                                   {
                                                                         user.online
                                                                         ? <FiberManualRecordIcon className = "!text-sm text-green-500 "/>
                                                                         :  <FiberManualRecordIcon className = "!text-sm"/>
                                                                   }
                                                                  
                                                              </Link>
                                                                
                                                            )
                                                    })
                              }
                         
                   </div>
             </div>

             
      </div>
  )
}

export default LeftMessenger