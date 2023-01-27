import React , {useEffect , useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {TYPES} from "./Redux/actions/postAction"
import bell from "./Assets/Audio/client_src_audio_got-it-done-613.mp3"


const SocketClient = () => {
  
  const socket = useSelector(state => state.socketReducer)

  const auth = useSelector(state => state.authReducer)

  const notify = useSelector(state => state.notifyReducer)

  const online = useSelector(state => state.statusReducer)

  const dispatch = useDispatch()

  const audioRef = useRef()


  const spawnNotification = (body, icon, url, title) => {
    let options = {
        body, icon
    }
    let n = new Notification(title, options)

    n.onclick = e => {
        e.preventDefault()
        window.open(url, '_blank')
    }
}


  // joinUser

  useEffect(() =>{
    if (socket.connected) {
     socket.emit('joinUser', auth.user)
     console.log('socket connected')
    }  
  }, [socket , auth.user])

  // Likes


    useEffect(() =>{
      if(socket.connected){
        socket.on('likeToClient', newPost => {
              dispatch({
                  type : TYPES.UPDATE_POST,
                  payload : newPost
              })
        })
        return () => socket.off('likeToClient')
      }

    }, [socket , dispatch])

  //Unlikes

    useEffect(() =>{
      if(socket.connected){
        socket.on('unLikeToClient', newPost => {
            dispatch({
                type : TYPES.UPDATE_POST,
                payload : newPost
            })
        })
        return () => socket.off('unLikeToClient')
      }

  }, [socket , dispatch])


 // Comments

    useEffect(() =>{
      if(socket.connected){
        socket.on('createCommentToClient', newPost => {
            dispatch({
                type : TYPES.UPDATE_POST,
                payload : newPost
            })
        })
        return () => socket.off('createCommentToClient')
      }

    }, [socket , dispatch])


    useEffect(() =>{
      if(socket.connected){
        socket.on('deleteCommentToClient', newPost => {
            dispatch({
                type : TYPES.UPDATE_POST,
                payload : newPost
            })
        })
        return () => socket.off('deleteCommentToClient')
      }

    }, [socket , dispatch])

// FOLLOW

    useEffect(() =>{
      if(socket.connected){
        socket.on('followToClient', newUser => {
              dispatch({
                type: 'AUTH',
                payload : {
                  ...auth,
                  newUser
                }
            })
        })
        return () => socket.off('followToClient')
      }

    }, [socket , dispatch , auth])


    useEffect(() =>{
      if(socket.connected){
        socket.on('unFollowToClient', newUser => {
              dispatch({
                type: 'AUTH',
                payload : {
                  ...auth,
                  newUser
                }
            })
        })
        return () => socket.off('unFollowToClient')
      }

    }, [socket , dispatch , auth])

// Notification

    useEffect(() =>{
      if(socket.connected){
        socket.on('createNotifyToClient', msg => {
              dispatch({
                type: 'CREATE_NOTIFY',
                payload : msg
            })

            if(notify.sound){
                audioRef.current.play()
            }
            spawnNotification(
                msg.user.username + ' ' + msg.text,
                msg.user.avatar,
                msg.url,
                'Instagram__clone'
            )
        })
        return () => socket.off('createNotifyToClient')
      }

    }, [socket , dispatch])


    
    useEffect(() =>{
      if(socket.connected){
        socket.on('removeNotifyToClient', msg => {
              dispatch({
                type: 'REMOVE_NOTIFY',
                payload : msg
            })
        })
        return () => socket.off('removeNotifyToClient')
      }

    }, [socket , dispatch])

    // Message

    useEffect(() =>{
      if(socket.connected){
            socket.on('addMessageToClient', msg => {
              dispatch({
                type: 'ADD_MESSAGE',
                payload : msg
              })
              
              dispatch({
                 type: 'ADD_USER',
                 payload : {
                    ...msg.user,
                    text : msg.text,
                    media : msg.media
                 }
              })
        })
        return () => socket.off('addMessageToClient')
      }

    }, [socket , dispatch])


    // Online - Offline

    useEffect(() => {
      if(socket.connected) {
        socket.emit('checkUserOnline', auth.user)
      }
  },[socket, auth.user])

    useEffect(() => {
      if(socket.connected) {
        socket.on('checkUserOnlineToMe', data =>{
            data.forEach(item => {
                if(!online.includes(item.id)){
                    dispatch({type: "ONLINE", payload: item.id})
                }
            })
        })
    
        return () => socket.off('checkUserOnlineToMe')
      }
  },[socket, dispatch, online])


    useEffect(() => {
      if(socket.connected){
        socket.on('checkUserOnlineToClient', id =>{
            if(!online.includes(id)){
                dispatch({type: "ONLINE", payload: id})
            }
        })
  
        return () => socket.off('checkUserOnlineToClient')

      }
  },[socket, dispatch, online])

    useEffect(() => {
      if(socket.connected) {
        socket.on('CheckUserOffline', id =>{
            dispatch({type: 'OFFLINE', payload: id})
        })
  
        return () => socket.off('CheckUserOffline')
      }
  },[socket, dispatch])


  // Call User

    useEffect(() => {
      if(socket.connected) {
        socket.on('callUserToClient', data =>{
            dispatch({type: 'CALL', payload: data})
        })
    
        return () => socket.off('callUserToClient')
      }
  },[socket, dispatch])



  useEffect(() => {
    if(socket.connected){
      socket.on('userBusy', data =>{
          dispatch({type: 'NOTIFY', payload: {error: `User is busy!`}})
      })
  
      return () => socket.off('userBusy')
    }
},[socket, dispatch])

  
    
  return (
    <div>
            <audio controls ref = {audioRef} className="hidden">
                  <source src = {bell} type = "audio/mp3" />
            </audio>
    </div>
  )
}

export default SocketClient