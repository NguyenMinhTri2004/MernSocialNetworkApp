import React , {useState , useEffect , useRef} from  'react'
import Avatar from '@mui/material/Avatar';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import CardOverflow from '@mui/joy/CardOverflow'
import { useHistory, useParams } from 'react-router-dom'
import {useSelector , useDispatch} from "react-redux"
import MessengerDisplay from "./MessengerDisplay"
import Icons from "./Icons"
import {imageUpload} from "../Utils/validateFile"
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import Loading from "./Loading"
import { getMessages , addMessage , deleteMessages , deleteConversation } from '../Redux/actions/messAction';
import SocketClient from "../SocketClient"
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import ModalCall from "../Components/ModalCall"

const ChatRoom = () => {

  const {id} = useParams()

  const dispatch =  useDispatch()

  const history = useHistory()

  const userList = useSelector(state => state.messReducer.users)

  const auth = useSelector(state => state.authReducer)

  const socket = useSelector(state => state.socketReducer)

  const peer = useSelector(state => state.peerReducer)

  const message = useSelector(state => state.messReducer)

  const user = userList.find(item => item._id === id)

  const [text, setText] = useState('')

  const [media, setMedia] = useState([])

  const [loadMedia, setLoadMedia] = useState(false)

  const theme = useSelector(state => state.themeReducer.mode)

  const Chatroomref = useRef(null)

  const [show, setShow] = useState(false);

  const call = useSelector(state => state.callReducer)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleSubmit = async (e) => {
    
    e && e.preventDefault()
    if(!text.trim() && media.length === 0) return;
    setText('')
    let newArr = [];
    if(media.length > 0) newArr = await imageUpload(media)

    const msg = {
        sender: auth.user._id,
        recipient: id,
        text, 
        media: newArr,
        createdAt: new Date().toISOString()
    }

    
    
    
    await dispatch(addMessage({msg, auth, socket}))
    dispatch(getMessages({auth , id}))
    setMedia([])
  }


  const handleChangeMedia = async (e) => {
       
        const files = [...e.target.files]


        let err = ""
        let newMedia = []

        files.forEach(file => {
            if(!file) return err = "File does not exist."

            if(file.size > 1024 * 1024 * 5){
                return err = "The image/video largest is 5mb."
            }

            return newMedia.push(file)
        })

        if(err) {
            dispatch({
                type: 'NOTIFY',
                payload: {error : err.response.data.msg}
     
            })
        } 
      await setMedia(newMedia)
       
  }


   useEffect( () => {
    setLoadMedia(true)
     handleSubmit()
    setLoadMedia(false)
   }, [media])

   const handleDeleteMessage = async (msg , data) => {
    await dispatch(deleteMessages(msg , data , auth))    
  }

   useEffect(() => {
           const getMessagesData =  async () => {
            if(message.data.every(item => item._id !== id)){

                await dispatch(getMessages({auth , id}))
            }
           }
           getMessagesData()
   } , [id , dispatch , auth  ])


const handleDeleteConversation = () => {
        dispatch(deleteConversation({auth , id}))
        history.push("/inbox")
}



const caller = async ({video}) => {
    const { _id, avatar, username, fullname } = user

    const msg = {
        sender: auth.user._id,
        recipient: _id, 
        avatar, username, fullname, video
    }
    await dispatch({ type: 'CALL', payload: msg })
    
}

const callUser = ({video}) => {
    const { _id, avatar, username, fullname } = auth.user

    const msg = {
        sender: _id,
        recipient: user._id, 
        avatar, username, fullname, video
    }

    if(peer.open) msg.peerId = peer._id

    socket.emit('callUser', msg)
}

const handleAudioCall = async () => {
    handleShow()
    caller({video: false})
    callUser({video: false})
}

const handleVideoCall = async () => {
    handleShow()
    caller({video: true})
    callUser({video: true})
}

   
  return (
    <div className={`chatroom border w-[40rem] h-screen ${theme === 'Dark' ? 'bg-black' : 'bg-white'}  `}>
        <div className="chatroom__wrapper flex flex-col h-full   ">
                    <div className="chatroom__header flex items-center justify-between border p-3  font-bold text-lg max-h-14 ">
                        <div className="chatroom__header__info flex items-center gap-3 text-lg ">
                                <Avatar alt="Remy Sharp" src= {user.avatar} sx={{ width: 24, height: 24 }}/>
                                <h3>{user.username}</h3>
                        </div>

                        <div className="chatroom__header__icon flex items-center gap-3 cursor-pointer text-9xl">
                                <LocalPhoneOutlinedIcon onClick = {() => handleAudioCall()} />
                                <VideocamOutlinedIcon onClick = {() => handleVideoCall()}  />
                                <DeleteSweepIcon  onClick = {() => handleDeleteConversation()} />
                        </div>
                    </div>

                    <div  className="  h-4/5 flex flex-col items-end justify-end" >
                        <div className="chatroom__content p-3 w-full h-full overflow-y-scroll" ref = {Chatroomref} >
                            {
                                
                               message.data.map((msg , index) => {
                                    return (
                                        <div key = {index} >
                                            {
                                                loadMedia ? <Loading/> :
                                                <>
                                                        {
                                                                msg.sender !== auth.user._id && 
                                                                <div className="flex items-start justify-start flex-col relative  ">
                                                                <div className="flex items-center justify-center gap-1">
                                                                        {/* <div className = "" onClick = {() => dispatch(deleteMessages(msg , message.data , auth))  }>
                                                                            <DeleteSweepIcon  />
                                                                        </div> */}
                                                                        <div className="chatroom__content__auth mb-2 mr-auto  gap-2 bg-slate-500 p-2  rounded-2xl  max-w-lg">
                                                                            <MessengerDisplay user = {user} msg = {msg} auth = {auth}/>
                                                                        </div>

                                                                </div> 
                                                                    <span className="text-sm font-thin mr-auto mb-4">
                                                                        {
                                                                                new Date(msg?.createdAt).toLocaleString()
                                                                        }
                                                                    </span>



                                                                </div>

                                                        }
                                                        
                                                        {
                                                            
                                                                msg.sender === auth.user._id && 
                                                                <div className="flex items-end justify-end flex-col  ">
                                                                    <div  className="flex items-center justify-center gap-1">
                                                                            <div className = "cursor-pointer">
                                                                                <DeleteSweepIcon msg = {msg} data = {message.data} auth = {auth} onClick = {() => handleDeleteMessage(msg , message.data)}/>
                                                                            </div>
                                                                            <div className="chatroom__content__auth mb-2 ml-auto  gap-2 bg-green-500 p-2 rounded-2xl max-w-lg">
                                                                                <MessengerDisplay user = {user} msg = {msg} />
                                                                            </div>
                                                                            

                                                                    </div>
                                                                    <span className="text-sm font-thin ml-auto mb-4">
                                                                        {
                                                                                new Date(msg?.createdAt).toLocaleString()
                                                                        }
                                                                    </span>

                                                                

                                                                </div>

                                                        }
                                                </>
                                                                                        
                                            }
                                                
                                                
                                        </div>
                                    )
                                })
                            }
                        

                            
                    </div>
                    </div>
 
                    <div className="chatroom__input mt-10  p-3 ">
                            <CardOverflow sx={{ p: 'var(--Card-padding)', display: 'flex' }}>
                                    <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
                                        <Icons  content = {text} setContent = {setText} />
                                    </IconButton>
                                    
                                    <Input
                                        variant="plain"
                                        size="sm"
                                        placeholder= "Enter your message..."
                                        sx={{ flexGrow: 1, mr: 1, '--Input-focusedThickness': '0px' }}
                                        value = {text}
                                        onChange = {(e) => setText(e.target.value)}
                                        
                                    />
                                <div className="flex items-center gap-3" >
                                            <div className="file_upload relative  ">
                                                    <AddPhotoAlternateOutlinedIcon/>
                                                    <input type="file" name="file" id="file"
                                                    multiple accept="image/*,video/*" 
                                                    className = "absolute opacity-0 left-0 w-5"
                                                    onChange={(e) => handleChangeMedia(e)}
                                                    />
                                                    
                                            </div>
                                            
                                            <Link  underline="none" role="button"  className = "flex item-center gap-3" onClick = {(e) => handleSubmit(e)} >  
                                                    Post
                                            </Link>
                                </div>

                        </CardOverflow>
                    </div>
        </div>
        {auth.token && <SocketClient/>}
       {call && <ModalCall show = {show} handleClose = {handleClose} id = {id} setShow = {setShow}/> }
    </div>
  )
}

export default ChatRoom