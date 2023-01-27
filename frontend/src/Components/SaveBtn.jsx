import React from 'react'
import IconButton from '@mui/joy/IconButton';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import {useState , useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import { savePost , unSavePost } from '../Redux/actions/postAction';

const SaveBtn = ({post}) => {

  const [save , setSave] = useState(false)

  const handleSave = () => {
    setSave(!save)
  }

  const dispatch = useDispatch()

  const auth = useSelector(state => state.authReducer) 

  useEffect(() =>{
    if(auth.user.saved.find(id => id === post._id)) {
         setSave(true)
    }
  } , [auth.user.saved , post._id , dispatch])

  return (
    <IconButton variant="plain" color="neutral" size="sm" onClick={() => handleSave()}>
               {
                        save ?   <BookmarkIcon onClick = {() => dispatch(unSavePost({post , auth}))}   /> : <BookmarkBorderRoundedIcon onClick = {() => dispatch(savePost({post , auth}))} /> 
               } 
   </IconButton>
  )
}

export default SaveBtn