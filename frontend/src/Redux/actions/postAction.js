import {imageUpload} from "../../Utils/validateFile"
import {postDataApi} from "../../Utils/fetchData"
import { getDataApi , patchDataApi  , deleteDataApi } from "../../Utils/fetchData"
import {createNotify , removeNotify} from "../actions/notifyAction"

export const TYPES = {
    CREATE_POST : 'CREATE_POST',
    LOADING_POST : 'LOADING_POST',
    GET_POSTS : 'GET_POSTS',
    UPDATE_POST : 'UPDATE_POST',
    GET_POST : 'GET_POST',
    DELETE_POST : 'DELETE_POST'
}

export const createPost = ({content , images , auth , socket}) => async (dispatch) => {
     let media = []
     try {
        dispatch({type: 'NOTIFY', payload: {loading : true}})
        if(images.length > 0 ){
            media = await imageUpload(images)
        }

        const res = await postDataApi('posts' , {
            content,
            images : media
        }, auth.token)

        console.log(res)

        dispatch({
            type: TYPES.CREATE_POST,
            payload: {
                ...res.data.newPost,
                user : auth.user
            } 
        })

        dispatch({type: 'NOTIFY', payload: {loading : false}})

        // Notify

        const msg = {
            id : res.data.newPost._id,
            text : "Add new post",
            recipients : res.data.newPost.user.followers,
            url : `/post/${res.data.newPost._id}`, 
            content,
            image : media[0].url
        }

        dispatch(createNotify({
            msg,
            auth,
            socket
        }))

     }catch (err) {
        dispatch({
            type: 'NOTIFY',
            payload: {error : err.response.data.msg}
    
        })
     }
}


export const getPosts = (token) => async (dispatch) => {
   try {
    dispatch({type: TYPES.LOADING_POST , payload  : true})
    const res = await getDataApi("posts" , token)

    dispatch({
         type: TYPES.GET_POSTS ,
         payload  : {...res.data , page : 3 }
    })

    console.log("getpost")


    dispatch({type: TYPES.LOADING_POST , payload  : false})

   }catch (err) {
        dispatch({
            type: 'NOTIFY',
            payload: {error : err.response.data.msg}

        })
   }
}

export const updatePost = ({content , images , auth , post}) => async (dispatch) => {
    let media = []
    const imgNew = images.filter(img => !img.url)
    const imgOld = images.filter(img =>  img.url)

    if(post.content === content && imgNew.length === 0 && imgOld.length === post.images.length) {
        return ;
    }

     try {
        dispatch({type: TYPES.LOADING_POST , payload  : true})

        if(imgNew.length > 0){
            media = await imageUpload(imgNew)
        }

        const res = await patchDataApi(`post/${post._id}`, {
            content,
            images : [...imgOld, ...media]
        }, auth.token)

        console.log(res)

        dispatch({type: TYPES.UPDATE_POST , payload  : res.data.newPost})

        dispatch({type: TYPES.LOADING_POST , payload  : false})

     }catch (err) {
        dispatch({
            type: 'NOTIFY',
            payload: {error : err.response.data.msg}
    
        })
     }
}

export const likePosts = ({post , auth , socket}) => async (dispatch) => {
   const newPost = {...post , likes: [...post.likes , auth.user]}
   dispatch({type: TYPES.UPDATE_POST , payload  : newPost})
   socket.emit('likePost', newPost)

   try {
      await patchDataApi(`post/${post._id}/like` , null , auth.token)

       // Notify

       const msg = {
        id : auth.user._id,
        text : "like your post",
        recipients : [post.user._id],
        url : `/post/${post._id}`, 
        content : post.content,
        image : post.images[0].url
    }

    dispatch(createNotify({
        msg,
        auth,
        socket
    }))
   }catch (err) {
        dispatch({
            type: 'NOTIFY',
            payload: {error : err.response.data.msg}

        })
   }
   
}

export const unLikePost = ({post , auth , socket}) => async (dispatch) => {
    const newPost = {...post , likes: post.likes.filter(like => like._id !== auth.user._id)}
    dispatch({type: TYPES.UPDATE_POST , payload  : newPost})
    socket.emit('unLikePost' , newPost)
   
    try {
 
       await patchDataApi(`post/${post._id}/unlike` , null , auth.token)

       const msg = {
        id : auth.user._id,
        text : "unLike your post",
        recipients : [post.user._id],
        url : `/post/${post._id}`, 

        }

        dispatch(removeNotify({
            msg,
            auth,
            socket
        }))
       
    }catch (err) {
         dispatch({
             type: 'NOTIFY',
             payload: {error : err.response.data.msg}
 
         })
    }
    
 }

 export const getPost = ({detailPost , id , auth}) => async (dispatch) => {
    console.log(detailPost)
    if(detailPost.every(post => post._id !== id)){

        try {
     
         const res =  await getDataApi(`post/${id}` , auth.token)
           dispatch({type: TYPES.GET_POST , payload  : res.data.post})
        }catch (err) {
             dispatch({
                 type: 'NOTIFY',
                 payload: {error : err.response.data.msg}
     
             })
        }
    }
 
    
} 

export const deletePost = ({post , auth , socket}) => async (dispatch) => {
      try {
           dispatch({type: TYPES.LOADING_POST , payload  : true})

           const res = await deleteDataApi(`post/${post._id}` , auth.token)

           const msg = {
            id : post._id,
            text : "Add new post",
            recipients : res.data.newPost.user.followers,
            url : `/post/${post._id}`, 
        }

            dispatch(removeNotify({
                msg,
                auth,
                socket
            }))

           dispatch({type: TYPES.DELETE_POST , payload: post})
           dispatch({type: TYPES.LOADING_POST , payload  : false})
           
      }catch (err) {
            dispatch({
                type: 'NOTIFY',
                payload: {error : err.response.data.msg}

            })
      }
} 

export const savePost = ({post , auth}) => async (dispatch) => {
    const newUser = {...auth.user, saved : [...auth.user.saved , post._id] }
    dispatch({
        type: 'AUTH',
        payload : {
            ...auth,
            user : newUser
        }
    })
    
    try {
         patchDataApi(`savePost/${post._id}`, null , auth.token)
    }catch (err) {
          dispatch({
              type: 'NOTIFY',
              payload: {error : err.response.data.msg}

          })
    }
} 


export const unSavePost = ({post , auth}) => async (dispatch) => {
    const newUser = {...auth.user, saved : auth.user.saved.filter(id => id !== post._id) }
    dispatch({
        type: 'AUTH',
        payload : {
            ...auth,
            user : newUser
        }
    })
    
    try {
         patchDataApi(`unSavePost/${post._id}`, null , auth.token)
    }catch (err) {
          dispatch({
              type: 'NOTIFY',
              payload: {error : err.response.data.msg}

          })
    }
} 