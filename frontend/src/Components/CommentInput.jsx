import React , {useState} from 'react'
import Face from '@mui/icons-material/Face';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import CardOverflow from '@mui/joy/CardOverflow';
import {useSelector, useDispatch} from "react-redux"
import {createComment} from "../Redux/actions/commentAction"
import Icons from "../Components/Icons"

const CommentInput = ({post , children , onReply , setOnReply}) => {

    const [content , setContent] = useState("")

    const dispatch = useDispatch()

    const auth = useSelector(state => state.authReducer)

    const socket = useSelector(state => state.socketReducer)

    const handleComment = (post) => {
            if(!content.trim()) return 
            const newComment = {
            content,
            likes : [],
            user : auth.user,
            createdAt : new Date().toISOString(),
            reply : onReply && onReply.commentId,
            tag : onReply && onReply.user
         }

            dispatch(createComment(post , newComment , auth , socket))
            setOnReply && setOnReply(false)
            setContent(" ")
    }


    const handleChange = (e) => {
        if(e.keyCode == 13){
             handleComment(post)
        }
    }

  

  return (
    <div>
        
        <CardOverflow sx={{ p: 'var(--Card-padding)', display: 'flex' }}>
                          <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
                             <Icons  content = {content} setContent = {setContent} />
                          </IconButton>
                          
                          <Input
                            variant="plain"
                            size="sm"
                            placeholder= {children}
                            sx={{ flexGrow: 1, mr: 1, '--Input-focusedThickness': '0px' }}
                            onKeyDown={(e) =>  handleChange(e)}
                            onChange={(e) => setContent(e.target.value)}
                            value = {content}
                            className = 'bg-slate-400 !important placeholder:text-blue-500 '

                          />
                        
                          <Link  underline="none" role="button" onClick = {() => handleComment(post)} >
                                Post
                          </Link>
        </CardOverflow>
    </div>
  )
}

export default CommentInput