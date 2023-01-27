import React from 'react'
import {useState , useEffect} from 'react'
import { useDispatch , useSelector} from 'react-redux'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import {likePosts , unLikePost} from "../Redux/actions/postAction"
import { likeComment , unLikeComment } from '../Redux/actions/commentAction';
const LikeButton = ({post , comment}) => {
  
  const [like , setLike] = useState(false)

  const [likeCm , setLikeCm] = useState(false)

  const [loadLike , setLoadLike] = useState(false)

  const auth = useSelector(state => state.authReducer)

  const socket = useSelector(state => state.socketReducer)

  const dispatch = useDispatch()

  const handleLike = async () => {
      if(loadLike) {
        return
      }
     
      if(post && !comment) {
        await dispatch(likePosts({post , auth , socket}))
        setLike(true)
        setLoadLike(true)
      }else {
        await dispatch(likeComment({comment , post , auth}))
        setLikeCm(true)
        setLoadLike(true)
      }
      setLoadLike(false)
  }

  const handleUnlike = async () => {
        if(loadLike) {
          return
        }
       
        if(post && !comment){
          await dispatch(unLikePost({post , auth , socket}))
          setLike(false)
          setLoadLike(true)
        }else {
          await dispatch(unLikeComment ({comment , post , auth}))
          setLikeCm(false)
          setLoadLike(true)
        }
        setLoadLike(false)
  }

  useEffect(() => {
     if(post?.likes.find(like => like._id === auth.user._id)) {
        setLike(true)
     }
     if(comment?.likes.find(like => like._id === auth.user._id)){
      setLikeCm(true)
     }
  }, [post?.likes , auth.user._id])

  return (
    <div className = "cursor-pointer"  >
           {
               !comment && post &&
               (like ? <FavoriteIcon onClick = {() => handleUnlike()} /> : <FavoriteBorder onClick = {() => handleLike()} />) 
               
           } 

          { 
                 comment && post &&
                 (likeCm ? <FavoriteIcon onClick = {() => handleUnlike()} /> : <FavoriteBorder onClick = {() => handleLike()} />) 
               
           } 

          
    </div>
  )
}

export default LikeButton