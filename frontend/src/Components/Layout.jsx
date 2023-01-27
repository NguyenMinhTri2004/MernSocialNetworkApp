import React from 'react';
import { BrowserRouter , Route} from 'react-router-dom';
import Header from './Header';
import Routes from '../Routes/Routes';
import { useDispatch , useSelector } from 'react-redux';
import {useEffect} from 'react';
import Peer from 'peerjs'
import Notify from "../Components/Notify"

const Layout = () => {

  const dispatch = useDispatch()

  const alert = useSelector(state => state.alertReducer) 

  const theme = useSelector(state => state.themeReducer.mode)

  const auth = useSelector(state => state.authReducer)
   
    
    useEffect(() => {
        if (!("Notification" in window)) {
          alert("This browser does not support desktop notification");
        }
        else if (Notification.permission === "granted") {}
        else if (Notification.permission !== "denied") {
          Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {}
          });
        }
      },[])


      useEffect(() => {
        const newPeer = new Peer(undefined, {
          path: '/', secure: true
        })
        
        dispatch({ type: 'PEER' , payload: newPeer })
      },[dispatch])

  

   
   return (
    <>
       {alert && <Notify dispatch = { dispatch }/>}
       <BrowserRouter>
          <Route render = {props =>(
            <div className = {` ${theme === 'Dark' ? 'bg-black text-white' : 'bg-slate-50 text-black'} `} >
                {auth.token && <Header {...props} />}  
                  <div className={`container py-6 ${theme === 'Dark' ? 'bg-black text-white' : 'bg-slate-50 text-black'}`}>
                      <div className={`container py-6 ${theme === 'Dark' ? 'bg-black text-white' : 'bg-slate-50 text-black'} main`}>
                     
                          <Routes/>
                      </div>

                  </div>
             </div>     
          ) } />
       </BrowserRouter>
    </>
   ) 
}

export default Layout 