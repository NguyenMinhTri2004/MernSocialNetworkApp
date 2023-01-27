import React from 'react'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import Button from '@mui/material/Button';

const RightMessenger = ({handleShow}) => {
  return (
       <div className="rightmessenger border h-screen w-[40rem] ">
             <div className="rightmessenger__wrapper flex items-center justify-center h-full w-full">
                  <div className="rightmessenger__new flex items-center justify-center flex-col gap-3">
                         <SendOutlinedIcon  className="text-3xl"/>
                         <h3 className="text-3xl">Your Messages</h3>
                         <p>Send private photos and messages to a friend or group.</p>
                         <Button onClick={() => handleShow()} variant="contained">Send Message</Button>
                  </div>
             </div>
       </div>
  )
}

export default RightMessenger