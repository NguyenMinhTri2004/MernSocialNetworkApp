import React , {useState , useEffect} from 'react'
import CommentCard from "./CommentCard"
const CommentDisplay = ({comment , post , replyComments}) => {

  const [showRep , setShowRep] = useState([])
  const [next , setNext] = useState(1)

  useEffect(() => {
    setShowRep(replyComments.slice( replyComments.length - next))
},[ replyComments, next])
  
  return (
    <div className = "comment__display">
         <CommentCard comment={comment} post={post} commentId ={comment._id}  >
                 <div className = "ml-6">
                    {
                        showRep.map((item , index) => {
                          return (

                            item.reply && 
                            
                              <CommentCard
                                key = {index}
                                comment = {item}
                                post = {post}
                                commentId = {comment._id}
                                />                             
                          )
                   
                        })
                        
                    }


                    {
                         replyComments.length - next > 0
                         ? <div style={{cursor: 'pointer', color: 'crimson'}}
                         onClick={() => setNext(next + 10)}>
                             See more comments...
                         </div>
 
                         : replyComments.length > 1 &&
                         <div style={{cursor: 'pointer', color: 'crimson'}}
                         onClick={() => setNext(1)}>
                             Hide comments...
                         </div>
                    }
                 </div>

         </CommentCard>
    </div>
  )
}

export default CommentDisplay