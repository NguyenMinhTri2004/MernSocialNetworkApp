import React , {useState , useEffect} from 'react'
import {useParams} from "react-router-dom"
import {useSelector , useDispatch} from 'react-redux'
import { getPost } from '../Redux/actions/postAction'
import Loading from '../Components/Loading'
import PostCard from '../Components/PostCard'
import Helmet from "../Components/Helmet"


const PostDetail = () => {
  
   const {id} = useParams()
   const [post , setPost] = useState([]) 


   const auth = useSelector(state => state.authReducer) 

   const detailPost = useSelector(state => state.detailPostReducer)

   const dispatch = useDispatch()

   useEffect(() => {
        dispatch(getPost({detailPost , id , auth}))

        if(detailPost.length > 0) {
              const newArr = detailPost.filter(post => post._id === id)
              setPost(newArr)
        }
   }, [detailPost , dispatch , id , auth])

   console.log(post)
    
  return (
    <Helmet title="Post">
        <div className="flex items-center justify-center">
            {
                post.length === 0 && <Loading/>

            }

            {
                
                  post.map((item , index) => {
                      return (
                        
                            <PostCard key = {index} post = {item}/>
                        
                      )
                  })
                
            }
        </div>
    </Helmet>
  )
}

export default PostDetail