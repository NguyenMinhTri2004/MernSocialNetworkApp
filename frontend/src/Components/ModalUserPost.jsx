import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const ModalUserPost = ({handleClose , show}) => {

  const ModalUserPostLink = [
    {
        display: 'Report',
        color : "red"
    },

    {
        display: 'Unfollow',
        color : "red"
    },

    {
        display: 'Add to favorites',
        color : "black"
    },

    {
        display: 'Go to post',
        color : "black"
    },

    {
        display: 'Share to...',
        color : "black"
    },


    {
        display: 'Copy link',
        color : "black"
    },

    {
        display: 'Embed',
        color : "black"
    },

    {
        display: 'Cancel',
        color : "black"
    },
  ]

  return (
    <div>
         <Modal show={show} onHide={handleClose}>
                {
                    ModalUserPostLink.map((item, index) =>{
                          return (
                            <Modal.Body className = {`text-center text-${item.color}-600 font-semibold border-y cursor-pointer`} key = {index} >{item.display}</Modal.Body>
                          )
                    })
                }
        </Modal>
    </div>
  )
}

export default ModalUserPost