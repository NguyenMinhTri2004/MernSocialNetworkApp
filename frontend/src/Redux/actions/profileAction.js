import {getDataApi, patchDataApi} from "../../Utils/fetchData"
import {imageUpload} from "../../Utils/validateFile"
import {createNotify , removeNotify} from "./notifyAction"

export const TYPES = {
    LOADING : 'LOADING',
    GET_USER : 'GET_USER',
    FOLLOW : 'FOLLOW',
    UNFOLLOW : 'UNFOLLOW',
    GET_ID : 'GET_ID',
    GET_POSTS : 'GET_POSTS_PROFILE',
    UPDATE_POST : 'UPDATE_PROFILE_POST'
}


export const getProfileUsers = ({ id , auth}) => async (dispatch) => {

    dispatch({
        type : TYPES.GET_ID,
        payload : id
    })

    
        try {
            dispatch({type : TYPES.LOADING , payload : true})
            const res = await getDataApi(`/user/${id}`, auth.token)
            const res1 = await getDataApi(`/user_posts/${id}` , auth.token)
            const user =  res
            const posts = res1 
            dispatch({type : TYPES.GET_USER , payload : user.data})
            dispatch({type : TYPES.GET_POSTS , payload : {...posts.data , _id : id , page : 3} })
            dispatch({type : TYPES.LOADING , payload : false})

        }catch(err) {

            dispatch({
                type: 'NOTIFY',
                payload: {error : err.response?.data.msg}
     
            })
        }
 }



export const updateProfileUsers = (userData , avatar , auth) =>  async (dispatch) => {

    console.log(userData)

    if(!userData.fullname){
       return dispatch({
            type: 'NOTIFY',
            payload: {erros: "Plead add your full name"}
 
        })
    }

    if(userData.fullname.length > 25){
        return dispatch({
            type: 'NOTIFY',
            payload: {erros: "Your full name too long"}
 
        })
    }

    if(userData.story.length > 200){
        return dispatch({
            type: 'NOTIFY',
            payload: {erros: "Your story too long"}
 
        })
    }

    try {

        let media 
        dispatch({
            type: 'NOTIFY',
            payload: {loading : true}
 
        })

        if(avatar) media = await imageUpload([avatar])
        console.log(media)

        const res = await patchDataApi('user' , {
            ...userData,
            avatar: avatar ? media[0].url : auth.user.avatar
        } , auth.token)

        dispatch({
            type: 'AUTH',
            payload: {
                ...auth,
                user : {
                    ...auth.user,
                    ...userData,
                    avatar : avatar ? media[0].url : auth.user.avatar
                }
            }
 
        })

        dispatch({
            type: 'NOTIFY',
            payload: {loading : false}
 
        })

        

    }catch (err) {
        dispatch({
            type: 'NOTIFY',
            payload: {error : err.response?.data.msg}
 
        })
    }
}

export const follow = ({users , user , auth , socket} ) => async (dispatch) => {

 
    
  let newUser 

  if(users.every(item => item._id !== user._id)) {
   newUser =   {...user , followers : [...user.followers , auth.user] }
  }else {
     users.forEach(item => {
        if(item._id === user._id){
            newUser =   {...item , followers : [...item.followers , auth.user] }
        }
     })
  }

  dispatch({
    type: TYPES.FOLLOW,
    payload: newUser
  })

  dispatch({
    type: "AUTH",
    payload: {
        ...auth,
        user : {...auth.user , following : [...auth.user.following , newUser] }

    }
  })

  try {

   const res =  await patchDataApi(`user/${user._id}/follow` , null , auth.token)
   socket.emit('follow' , res.data.newU)

   // Notify

   const msg = {
    id : auth.user._id,
    text : "Has started to follow you",
    recipients : [newUser._id],
    url : `/profile/${auth.user._id}`, 
    }

    dispatch(createNotify({
        msg,
        auth,
        socket
    }))

  } catch (err) {
    dispatch({
        type: 'NOTIFY',
        payload: {error : err.response?.data.msg}

    })
  }

}

export const unfollow = ({users , user , auth , socket} ) => async (dispatch) => {

 
  let newUser 

  if(users.every(item => item._id !== user._id)) {
     newUser =   {...user , followers : user.followers.filter(item => item._id !== auth.user._id )}
  }else {
     users.forEach(item => {
        if(item._id === user._id){
            newUser =   {...item , followers : item.followers.filter(item => item._id !== auth.user._id )}
        }
     })
  }
    
  
    dispatch({
      type: TYPES.UNFOLLOW,
      payload: newUser
    })
  
    dispatch({
      type: "AUTH",
      payload: {
          ...auth,
          user : {...auth.user , following : auth.user.following.filter(item => item._id !== newUser._id)}
          
      }
    })


    try {

        const res = await patchDataApi(`user/${user._id}/unfollow` , null , auth.token)
        socket.emit('unFollow' , res.data.newUser)

        // Notify

        const msg = {
            id : auth.user._id,
            text : "Has started to follow you",
            recipients : [newUser._id],
            url : `/profile/${auth.user._id}`, 
            }
        
            dispatch(removeNotify({
                msg,
                auth,
                socket
            }))

      } catch (err) {
        dispatch({
            type: 'NOTIFY',
            payload: {error : err.response?.data.msg}
    
        })
      }
  
  
}