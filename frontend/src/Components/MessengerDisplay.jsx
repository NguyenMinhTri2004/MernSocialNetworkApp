import React from 'react'
import PhoneMissedIcon from '@mui/icons-material/PhoneMissed';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import PhoneIcon from '@mui/icons-material/Phone';
import VideoCallIcon from '@mui/icons-material/VideoCall';
const MessengerDisplay = ({user , msg}) => {


  const imageShow = (src) => {
    return(
        <img src={src} alt="images" className="img-thumbnail"/>
        
    )
   }

  const  videoShow = (src) => {
        return(
            <video controls src={src} alt="images" className="img-thumbnail"/>
        )
    }

  return (
    <div className="">
      <div className = { msg?.text !== '' ? ` ` : "hidden"}>
            {
                msg?.text
            }
            
      </div>

      <div>
            {
                 msg?.media.map((item , index) => {
                     return (
                         <div key = {index} >
                               {
                                   item.url.match(/video/i)
                                   ? <div className = "max-w-xs max-h-80  " >{videoShow(item.url)}</div> 
                                   : <div className = "max-w-xs max-h-80  "  >{imageShow(item.url)}</div> 
                               }
                         </div>
                     )
                 })
            }
      </div>


        {
                    msg.call &&
                    <button className="btn d-flex align-items-center py-3"
                    style={{background: '#eee', borderRadius: '10px'}}>

                        <span className="material-icons font-weight-bold mr-1"
                        style={{ 
                            fontSize: '1rem', color: msg.call.times === 0 ? 'crimson' : 'green',
                            
                        }}>
                            {
                                msg.call.times === 0
                                ? msg.call.video ?   <VideocamOffIcon/> :  <PhoneMissedIcon/>
                                : msg.call.video ? <VideoCallIcon/> : <PhoneIcon/>
                            }
                        </span>

                        <div className="text-left">
                            <h6>{msg.call.video ? 'Video Call' : 'Audio Call'}</h6>
                            <small>
                                {/* {
                                    msg.call.times > 0 
                                    ? <Times total={msg.call.times} />
                                    : new Date(msg.createdAt).toLocaleTimeString()
                                } */}
                            </small>
                        </div>

                    </button>
                }

    
      
    </div>  
  )
}

export default MessengerDisplay