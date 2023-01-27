import React , {useState , useEffect} from 'react'
import Avatar from '@mui/material/Avatar';
import moment from 'moment'
import LikeButton from "./LikeButton"
import ModalAuthPost from './ModalAuthPost';
import {useDispatch , useSelector} from "react-redux"
import { updateComment } from '../Redux/actions/commentAction';
import CommentInput from './CommentInput';
import {Link} from "react-router-dom"

const CommentCard = ({comment , post , commentId , children}) => {

  const [content , setContent] = useState('')
  const [readMore , setReadMore] = useState(false)  
  const [onEdit , setOnEdit] = useState(false)

  const [onReply , setOnReply] = useState(false)


  const dispatch = useDispatch()

  const auth = useSelector(state => state.authReducer)

  useEffect(() => {
    setContent(comment.content)
    
  }, [comment])

  const handleUpdate = async () => {
      if(comment.content !== content){
          await dispatch(updateComment({comment , post ,content , auth}))
          setOnEdit(false)
      }else {
         setOnEdit(false)
      }
  }

  const handleReply = () => {
       if(onReply){
          setOnReply(false)
       }else {
         setOnReply({...comment, commentId})
       }
  }

  const theme = useSelector(state => state.themeReducer.mode)

  return (
   <>
     <div className="commentcard flex item-center justify-center gap-3  rounded-lg mb-3">
        <Link className="commentcard__avt" to = {`./profile/${comment.postUserId}`}>
           <Avatar alt="Remy Sharp" src= {comment.user?.avatar} />
        </Link>

        <div className="comment__cart__content w-full   ">
            <div className="commentcard__top flex gap-1 mb-3 item-center justify-between ">
              <>
               {
                  onEdit ? <textarea value = {content} onChange={(e) => setContent(e.target.value)} rows="5" className = {`${theme === 'Dark' ? 'bg-slate-900' : 'bg-slate-100'} w-full outline-none`}>

                          </textarea>
                  : <div className={` ${theme === 'Dark' ? 'bg-slate-900' : 'bg-slate-100'}  w-full flex gap-1 p-2 item-center rounded-lg`}>
                      <p className = "w-full ">
                            <Link className="commentcard__top__user font-semibold w-fit" to = {`./profile/${comment.postUserId}`}>
                                <h1>{comment.user?.username}</h1>
                            </Link>

                            <span className="commentcard__top__user__content ">
                                <span>
                                    {
                                        content?.length < 100 ? content : 
                                        readMore ? content + ' ' : content.slice(0,100) + '...'
                                    }
                                </span>

                                    {
                                        content?.length > 100 &&
                                        <span onClick={() => setReadMore(!readMore)}  >
                                            {
                                                readMore ? 'Hide content' : 'Read more'
                                            }
                                        </span> 
                                    }

                                
                            </span>
                      </p>
                        
                        <div className = "ml-auto flex gap-1" >
                                <LikeButton comment = {comment} post = {post}/>
                                <ModalAuthPost comment = {comment}  post = {post}  setOnEdit = {setOnEdit}/>
                        </div>
                    </div>
               }
              </>
               

            </div>

            <div className="commentcard__bottom flex gap-3 font-light cursor-pointer text-sm">
                    <span className="commentcard__bottom__creatat">
                         {moment(comment?.createdAt).fromNow()}
                    </span>

                    <span className="commentcard__bottom__like font-semibold">
                         {comment.likes?.length} likes
                    </span>

                    

                    {
                        onEdit ?
                        <>
                            <span className="commentcard__bottom__reply font-semibold" onClick = {() => handleUpdate()} >
                                Update
                            </span>

                            <span className="commentcard__bottom__reply font-semibold" onClick={() => setOnEdit(false)}>
                                Cancel
                            </span>
                        </> :
                        <span onClick={() => handleReply()}className="commentcard__bottom__reply font-semibold">
                            {
                                onReply ? 'cancel' : 'reply'
                            } 
                        </span>
                    }
            </div>

           

            {
                onReply && 
                <CommentInput  post = {post}  onReply={onReply}  setOnReply = {setOnReply}>
                       {`@${onReply.user.username}`}
                </CommentInput>
            }
        </div>

     </div>
     
        {
           children
        }
   </> 
  )
}

export default CommentCard