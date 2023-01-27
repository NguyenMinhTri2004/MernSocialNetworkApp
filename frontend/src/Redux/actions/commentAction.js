import {postDataApi , patchDataApi , deleteDataApi } from "../../Utils/fetchData"
import {createNotify , removeNotify} from "../actions/notifyAction"

export const createComment = (post , newComment , auth , socket) => async (dispatch) => {
    const newPost = {...post , comments : [...post.comments ,  newComment]}

   

    socket.emit('createComment' , newPost)

    

    try {
        const data = {...newComment , postId : post._id , postUserId : post.user._id}
        const res = await postDataApi('comment' , data , auth.token)

        const newData = {...res.data.newComment , user : auth.user}
        const newPost = {...post , comments : [...post.comments , newData]}
        
        dispatch({type: 'UPDATE_POST' , payload : newPost})

        const msg = {
            id : res.data.newComment._id,
            text : newComment.reply ? 'Mentioned you in a comment' : 'Has commented on your post',
            recipients : newComment.reply ? [newComment.tag._id] : [post.user._id],
            url : `/post/${post._id}`, 
            content : post.content,
            image : post.images[0].url
        }
    
        dispatch(createNotify({
            msg,
            auth,
            socket
        }))

        console.log(newComment._id)

    }catch (err) {
        dispatch({
            type: 'NOTIFY',
            payload: {error : err.response.data.msg}

        })
    }
}

export const updateComment = ({comment , post , content , auth}) => async (dispatch) => {
    console.log(comment , post , content , auth)
  const newComments = post.comments.map(item => {
     return (
          item._id === comment._id ? {...item , content} : item 
     )
  })

  const newPost = {...post , comments : newComments}

  dispatch({type: 'UPDATE_POST' , payload : newPost})

    try {
         patchDataApi(`comment/${comment._id}`, {content} , auth.token)
    }catch (err) {
        dispatch({
            type: 'NOTIFY',
            payload: {error : err.response.data.msg}

        })
    }

}

export const likeComment = ({comment , post ,  auth}) => async (dispatch) => {
    const newComment = {...comment, likes : [...comment.likes , auth.user]}

    console.log(comment , post , auth)

    const newComments = post.comments.map(item => {
        return (
             item._id === comment._id ? newComment : item 
        )
     })

     const newPost = {...post , comments : newComments}

     dispatch({type: 'UPDATE_POST' , payload : newPost})
        try {
            patchDataApi(`comment/${comment._id}/like`, null , auth.token)
        }catch (err) {
            dispatch({
                type: 'NOTIFY',
                payload: {error : err.response.data.msg}

            })
        }

}

export const unLikeComment = ({comment , post ,  auth}) => async (dispatch) => {
    const newComment = {...comment, likes : comment.likes.filter(like => like._id !== auth.user._id)}

    console.log(comment , post , auth)

    const newComments = post.comments.map(item => {
        return (
             item._id === comment._id ? newComment : item 
        )
     })

     const newPost = {...post , comments : newComments}

     dispatch({type: 'UPDATE_POST' , payload : newPost})
        try {
            patchDataApi(`comment/${comment._id}/unlike`, null , auth.token)
        }catch (err) {
            dispatch({
                type: 'NOTIFY',
                payload: {error : err.response.data.msg}

            })
        }

}

export const deleteComment = ({post , auth , comment , socket}) => async (dispatch) => {
    
    const deleteArr = [...post.comments.filter(comment => comment.reply === comment._id) , comment]
    const newPost = {
        ...post,
        comments : post.comments.filter(comment => !deleteArr.find(da => comment._id === da._id))
    }
    socket.emit('deleteComment' , newPost)
     dispatch({type: 'UPDATE_POST' , payload : newPost})
        try {
            deleteArr.forEach(item => {
                deleteDataApi(`comment/${item._id}` , auth.token)

                const msg = {
                    id : item._id,
                    text : comment.reply ? 'Mentioned you in a comment' : 'Has commented on your post',
                    recipients : comment.reply ? [comment.tag._id] : [post.user._id],
                    url : `/post/${post._id}`, 
                    
                }
            
                dispatch(createNotify({
                    msg,
                    auth,
                    socket
                }))
            })
            
        }catch (err) {
            dispatch({
                type: 'NOTIFY',
                payload: {error : err.response.data.msg}

            })
        }

}