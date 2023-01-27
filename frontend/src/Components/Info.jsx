import React, { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import FollowBtn from "../Components/FollowBtn"
import ModalEditProfile from './ModalEditProfile'
import ModalFollowers from "./ModalFollowers"
import ModalFollowing from "./ModalFollowing"

const Info =  () => {

  const {id} = useParams()

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const handleClose = () => setShow(false);

  const [showFollowers, setShowFollowers] = useState(false)

  const handleShowFollowers = () => setShowFollowers(true)

  const handleCloseFollowers = () => setShowFollowers(false)

  const [showFollowing, setShowFollowing] = useState(false)

  const handleShowFollowing = () => setShowFollowing(true)

  const handleCloseFollowing = () => setShowFollowing(false)

  const auth =  useSelector(state => state.authReducer)

  const profile = useSelector(state => state.profileReducer)

  const dispatch = useDispatch()

  const [userInfo , setUserInfo] = useState([])


    useEffect(() => {
     
        if(id === auth.user._id){
            setUserInfo([auth.user])
        }else {
            const newProfile = profile.users.filter(user => user._id === id)
            setUserInfo(newProfile)
        }
  
    }, [id , auth , profile.users , dispatch])

    console.log(userInfo)


  return (
   <>
      <div className="info flex gap-24 items-start  border-b p-6 w-1/2 mx-auto ">
        {
          userInfo.map(user => {

             return (
             <div className="min-w-[10rem] flex items-start justify-center">
              <div className="info__avt w-40 mr-28">
                  <img className='rounded-full min-w-[8rem]' src= {user?.avatar} alt="" />
              </div>
 
              <div className="info__text flex flex-col item-start justify-start gap-5">
                  <div className="info__text__top flex item-center justify-between ">
                        <div className="info__text__top__username text-2xl">
                              <h1>{user?.username}</h1>
                        </div>
                        {
                           id === auth.user?._id ? 
                           <span className="p-1.5 border rounded-md cursor-pointer font-semibold" onClick={handleShow}>Edit profile</span>
                           : <FollowBtn user = {user}/>
                        }
                  </div>
    
                  <div className="info__text__middle flex item-center justify-between gap-10 ">
                        <div className="info__text__middle__post">
                              <h1><span className="font-semibold">0</span> post</h1>
                        </div>
    
                        <div className="info__text__middle__followers cursor-pointer flex">
                              <h1 onClick={() => handleShowFollowers()}><span className="font-semibold ">{user?.followers.length}</span> followers</h1>
                        </div>
    
                        <div className="info__text__middle__following cursor-pointe flexr">
                              <h1 onClick={() => handleShowFollowing() }  ><span className="font-semibold ">{user?.following.length}</span> following</h1>
                        </div>
                  </div>
    
                  <div className="info__text__bot flex item-center justify-between">
                          <div className="info__text__bot__fullname">
                              <h1 className="font-semibold">{user?.fullname}</h1>
                          </div>
    
                          <div className="info__text__bot__mobile">
                              <h1>0919172672</h1>
                          </div>
                  </div>
              </div>

                 <ModalFollowers show = {showFollowers} handleClose= {handleCloseFollowers} followers = {user?.followers} />  
                 
                 <ModalFollowing show = {showFollowing} handleClose= {handleCloseFollowing} following = {user?.following} />
             </div> 
             )
          })

            
        }
          
      </div>

       {
             <ModalEditProfile show = {show} auth = {auth}  userInfo = {userInfo} handleClose = {handleClose}/>
       }
   </>
  )
}

export default Info