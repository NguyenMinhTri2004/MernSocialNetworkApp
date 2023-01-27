import React from 'react'
import Loading from "../Components/Loading"
import Post from "../Components/Post"
import RightSlideBar from "../Components/RightSlideBar"
import { useDispatch , useSelector } from 'react-redux';
import {useEffect} from 'react';
import {getPosts} from "../Redux/actions/postAction"
import { getSuggestions } from '../Redux/actions/suggestionsAction';
import { refreshToken } from '../Redux/actions/authAction';
import { getNotifies } from '../Redux/actions/notifyAction';
import io from "socket.io-client"
import SocketClient from "../SocketClient"
import {TYPES} from "../Redux/actions/socketAction"
import Helmet from "../Components/Helmet"

const Home = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.authReducer) 
  const postReducer = useSelector(state => state.postReducer)
  

  useEffect(() => {
    if(auth.token) {
       dispatch(getPosts(auth.token))
       dispatch(getSuggestions(auth.token))
       dispatch(getNotifies(auth.token))
    }
  } , [auth , dispatch] )

  
    useEffect(() => {
    // dispatch(refreshToken())
    const socket = io('http://localhost:3000')
    dispatch({
      type : TYPES.SOCKET,
      payload : socket
    })
   
    // return () => socket.close()
 } , [auth.user._id , dispatch ])

  return (
   <Helmet title={"Home"}>
        <div>
            {
            
              
              <div className="flex item-center gap-4 w-3/5 mx-auto  ">
                  <Post/>
                  <RightSlideBar/> 
                  {auth.token && <SocketClient/>}
                </div> 
            }


           
        </div>
   </Helmet>
  )
}

export default Home