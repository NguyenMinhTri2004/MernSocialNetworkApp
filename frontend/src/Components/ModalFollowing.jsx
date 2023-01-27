import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import FollowBtn from './FollowBtn'
import UserCard from "./UserCard"
import { useSelector } from 'react-redux'
import {Link} from "react-router-dom"

const ModalFollowing = ({handleClose , show , following}) => {

  const auth = useSelector(state => state.authReducer)

  console.log(following)  

  return (
    
                <Modal show={show} onHide={handleClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>Following</Modal.Title>
                          </Modal.Header>

                          
                          <Modal.Body>
                                {
                                    following.map((item , index) => {
                                      
                                        return (
                                           <Link to = {`/profile/${item._id}`}>
                                               <UserCard  key = {index}  user = {item} >
                                                   {
                                                       auth.user._id !== item._id && <FollowBtn user = {item}/>
                                                   }
                                               </UserCard>
                                           </Link>
                                        )
                                       
                                    })
                                }
                        </Modal.Body>
                          

                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose} className = "bg-slate-400"   >
                              Close
                            </Button>
                            <Button variant="primary" onClick={handleClose}  className = "bg-slate-400"  >
                              Save Changes
                            </Button>
                          </Modal.Footer>
                </Modal> 
  )
}

export default ModalFollowing