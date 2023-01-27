import React , {useState , useEffect} from 'react'
import CommentDisplay from './CommentDisplay'

const Comments = ({post}) => {
 
  const [comments , setComments]= useState([])
  const [replyComments , setReplyComments] = useState([])
  const [showComments , setShowComments] = useState([])
  const [next , setNext] = useState(2)

  useEffect(() => {
      const newComment = post.comments.filter(comment => !comment.reply)
      setComments(newComment)
      setShowComments(newComment.slice(newComment.length - next))

  }, [post.comments , next])


  useEffect(()=> {
    const newRep = post.comments.filter(cm => cm.reply)
    setReplyComments(newRep)
}, [post.comments])

  

  return (
  
        <div>
              {
                  showComments.map((comment , index) =>{
                    return (
                          <CommentDisplay key = {index} comment={comment} post = {post} replyComments = {replyComments.filter(item => item.reply === comment._id)}/>
                    )
                  })
              }

              {
                      comments.length - next > 0
                      ? <div className="p-2 border-top"
                      style={{cursor: 'pointer', color: 'crimson'}}
                      onClick={() => setNext(next + 10)}>
                          See more comments...
                      </div>

                      : comments.length > 2 &&
                      <div className="p-2 border-top"
                      style={{cursor: 'pointer', color: 'crimson'}}
                      onClick={() => setNext(2)}>
                          Hide comments...
                      </div>
              }
        </div>
   
  )
}

export default Comments