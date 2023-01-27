import React, { useState, useEffect, useRef, useCallback } from 'react'
import Modal from 'react-bootstrap/Modal'
import Avatar from '@mui/material/Avatar';
import CallIcon from '@mui/icons-material/Call';
import CallEndIcon from '@mui/icons-material/CallEnd';
import {useSelector , useDispatch} from "react-redux"
import VideoCall from '@mui/icons-material/VideoCall';
import {addMessage , getMessages} from "../Redux/actions/messAction"

const ModalCall = ({show , handleClose , id , setShow}) => {

    const [hours, setHours] = useState(0)

    const [mins, setMins] = useState(0)

    const [second, setSecond] = useState(0)

    const [total, setTotal] = useState(0)

    const youVideo = useRef()

    const otherVideo = useRef()

    const [answer, setAnswer] = useState(false)

    const call = useSelector(state => state.callReducer)

    const auth = useSelector(state => state.authReducer)

    const socket = useSelector(state => state.socketReducer)

    const peer = useSelector(state => state.peerReducer)

    const [tracks, setTracks] = useState(null)

    const [newCall, setNewCall] = useState(null)

    const dispatch = useDispatch()

    const addCallMessage = useCallback( async  (call, times , disconnect) => {
        if(call.recipient !== auth.user._id || disconnect ){
            const msg = {
                sender: call.sender,
                recipient: call.recipient,
                text: '', 
                media: [],
                call: {video: call.video, times},
                createdAt: new Date().toISOString()
            }
            await dispatch(addMessage({msg, auth, socket}))
            dispatch(getMessages({auth , id}))
        }
    },[auth, dispatch, socket])

    useEffect(() => {
        const setTime = () => {
        
                 setTotal(t => t + 1)
                 setTimeout(setTime, 1000)
          
            
        }
        setTime()
        return () => setTotal(0)
    },[])

   
    useEffect(() => {
        setSecond(total%60)
        setMins(parseInt(total/60))
        setHours(parseInt(total/3600))
    },[total])

    useEffect(() => {
       if(call?.recipient === auth.user._id){
           setShow(true)
       }
    },[call])

  
    // Stream Media
    const openStream = (video) => {
        const config = { audio: true, video }
        return navigator.mediaDevices.getUserMedia(config)
    }

    const playStream = (tag, stream) => {
        let video = tag;
        video.srcObject = stream;
        video.play()
    }

  

  const handleEndCall = async () => {
    tracks && tracks.forEach(track => track.stop())
    if(newCall) newCall.close()
    let times = answer ? total : 0
    socket.emit('endCall', {...call, times})
    addCallMessage(call, times)
    await dispatch({type: "CALL", payload: null })
    setTotal(0)
    handleClose()

}


    // useEffect(() => {
    //     if(answer){
    //         setTotal(0)
    //     }else{
    //         const timer = setTimeout(() => {
    //             socket.emit('endCall', {...call, times: 0})
    //             addCallMessage(call, 0)
    //             dispatch({type: 'CALL', payload: null })
    //         }, 15000)

    //         return () => clearTimeout(timer)
    //     }
        
    // },[dispatch, answer, call, socket , addCallMessage])


    useEffect(() => {
        if(socket.connected) {
            socket.on('callerDisconnect', () => {
                tracks && tracks.forEach(track => track.stop())
                if(newCall) newCall.close()
                let times = answer ? total : 0
                addCallMessage(call, times, true)
        
                dispatch({type: 'ÇALL', payload: null })
        
                dispatch({
                    type: 'NOTIFY', 
                    payload: {error: `The ${call.username} disconnect`} 
                })
            })
        
            return () => socket.off('callerDisconnect')
        }
      },[socket, tracks, dispatch, call , addCallMessage, newCall ])


const handleAnswer = () => {
    openStream(call.video).then(stream => {
        playStream(youVideo.current, stream)
        const track = stream.getTracks()
        setTracks(track)
        
        const newCall = peer.call(call.peerId, stream);
        newCall.on('stream', function(remoteStream) {
            playStream(otherVideo.current, remoteStream)
        });
            setNewCall(newCall)
    })

    .catch(e => {
        console.error(e)
    })
    setAnswer(true)
    setTotal(0)
}


    useEffect(() => {
        peer.on('call', newCall => {
            openStream(call.video).then(stream => {
                if(youVideo.current){
                    playStream(youVideo.current, stream)
                }
                const track = stream.getTracks()
                setTracks(track)
                
                newCall.answer(stream)
                newCall.on('stream', function(remoteStream) {
                    if(otherVideo.current){
                        playStream(otherVideo.current, remoteStream)
                    }
                });
                setAnswer(true) 
                setNewCall(newCall)
            })
        })
        return () => peer.removeListener('call')
    },[peer, call.video ])


    useEffect(() => {
        if(socket.connected){
            socket.on('endCallToClient', data => {
                tracks && tracks.forEach(track => track.stop())
                if(newCall) newCall.close()
                addCallMessage(data, data.times)
                dispatch({ type: 'CALL', payload: null })
            })
    
            return () => socket.off('endCallToClient')
        }
    },[socket, dispatch, tracks , addCallMessage, newCall])

    console.log(answer)

  return (
    <>
        {
              call &&
                <Modal show={show} onHide={handleClose} className = ""> 
                        <Modal.Body className = "bg-green-500">
                            <div className="modalcall ">
                                <div className="modalcall__wrapper flex flex-col items-center justify-center p-20 gap-2 text-white">
                                        <div className="modalcall__avt">
                                            <Avatar
                                                alt="Remy Sharp"
                                                src= {call.avatar}
                                                sx={{ width: 130, height: 130 }}
                                            />
                                        </div>

                                        <div className="modalcall__username text-2xl ">
                                                <h3>{call.username}</h3>
                                        </div>

                                        <div className="modalcall__fullname">
                                                <h3>{call.fullname}</h3>
                                        </div>

                                           <div className="modalcall__typecall mb-3">
                                           {
                                                answer 
                                                ? <div>
                                                    <span>{ hours.toString().length < 2 ? '0' + hours : hours }</span>
                                                    <span>:</span>
                                                    <span>{ mins.toString().length < 2 ? '0' + mins : mins }</span>
                                                    <span>:</span>
                                                    <span>{ second.toString().length < 2 ? '0' + second : second }</span>
                                                </div>
                                                : <div>
                                                    {
                                                        call.video
                                                        ? <span>calling video...</span>
                                                        : <span>calling audio...</span>
                                                    }
                                                </div>
                                            }
                                        </div>

                                        <div className="modal__call__time mb-3 flex items-center">
                                          {
                                                !answer && 
                                                <div className="timer">
                                                    <small>{ mins.toString().length < 2 ? '0' + mins : mins }</small>
                                                    <small>:</small>
                                                    <small>{ second.toString().length < 2 ? '0' + second : second }</small>
                                                </div>
                                           }
                                        </div>

                                        <div className="modalcall__action flex items-center justify-between  gap-14 ">
                                            {
                                                 (call.recipient === auth.user._id && !answer) &&
                                                    <div className="modalcal__action__item bg-white p-3 rounded-full text-green-700 cursor-pointer  " onClick = {() => handleAnswer()}  >
                                                        {
                                                            call.video ? <VideoCall/>
                                                            : <CallIcon/>
                                                        }
                                                            
                                                    </div>
                                            }
                                            

                                            <div className="modalcal__action__item bg-white flex items-center justify-center  p-3 rounded-full text-red-700  cursor-pointer " onClick={() => handleEndCall()}  >
                                                    <CallEndIcon />
                                            </div>
                                        </div>

                                       {
                                               call.video && 
                                                <div className="show_video flex flex-col align-center justify-center w-[30rem] h-[full">

                                                            <video ref={youVideo} className="you_video" playsInline  />
                                                            {/* <video ref={otherVideo} className="other_video" playsInline /> */}
{/* 
                                                            <div className="time_video flex items-center justify-center">
                                                                <span>{ hours.toString().length < 2 ? '0' + hours : hours }</span>
                                                                <span>:</span>
                                                                <span>{ mins.toString().length < 2 ? '0' + mins : mins }</span>
                                                                <span>:</span>
                                                                <span>{ second.toString().length < 2 ? '0' + second : second }</span>
                                                            </div> */}

                                                            {/* <div className="flex items-center justify-center">
                                                                <span  onClick={handleEndCall} className = "bg-white flex items-center justify-center  p-3 rounded-full text-red-700  cursor-pointer" >
                                                                    <CallEndIcon />
                                                                </span>
                                                            </div> */}


                                                </div>
                                             
                                             
                                       }
                                </div>
                            </div>
                    </Modal.Body>
                                    
                </Modal> 
        }
    </>
  )
}

export default ModalCall