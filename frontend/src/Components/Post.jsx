import React from 'react'
import {useSelector, useDispatch} from "react-redux"
import {useState , useEffect} from "react"
import ModalUserPost from './ModalUserPost';
import PostCard from "./PostCard"
import {getDataApi} from "../Utils/fetchData"
import { TYPES } from '../Redux/actions/postAction'
import InfiniteScroll from 'react-infinite-scroll-component'


const Post = () => {
 
  const postList = useSelector(state => state.postReducer)


  const auth = useSelector(state => state.authReducer)


  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)

  const handleShow = () => setShow(true)


  const dispatch = useDispatch()

  const handleLoadMore = async () => {
   
    const res = await getDataApi(`posts?limit=${postList.page * 12 }` , auth.token)

    dispatch({
       type : TYPES.GET_POSTS,
       payload : {...res.data , page : postList.page + 1 }
    })

 }

 

  
  return (
    <div  className="w-[34rem]">

            <InfiniteScroll
              className = "overflow-visible "
              dataLength={postList.posts.length} 
              next={handleLoadMore}
              hasMore={true}
              > 
                  {
                          postList.posts.map((post , index) => {
                            return (
                               <div className = "w-full">
                                 <PostCard key = {index} post = {post} handleClose = {handleClose} handleShow = {handleShow} />
                               </div>
                            )
                            
                        })
                  }

                  {
                    postList.result <   (postList.page - 1) ? <>Loading</> : ""
                  }
             </InfiniteScroll> 
    
             <ModalUserPost show = {show} handleClose = {handleClose}/>
      
       
    </div>
  )
}

export default Post