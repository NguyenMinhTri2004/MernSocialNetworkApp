import React , {useState , useEffect} from 'react'
import { checkImage } from '../Utils/validateFile'
import { TYPES } from '../Redux/actions/notifyAction'
import { updateProfileUsers } from '../Redux/actions/profileAction'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import {useDispatch} from 'react-redux'

const ModalEditProfile = ({show , auth , handleClose , userInfo }) => {

 const dispatch = useDispatch()

 const [newuserInfo , setNewUserInfo] = useState({
    fullname : '',
    mobile : '',
    address : '',
    website : '',
    story : '',
    gender : '',
})

const [avatar , setAvatar] = useState('')

const changeAvatar = (e) => {
   const file = e.target.files[0]
   const err = checkImage(file)

   if(err){
      return dispatch({type : TYPES.NOTIFY , payload : {error : err}})
   }
   setAvatar(file)
}

const handleOnchange = (name , e) => {
  setNewUserInfo({...newuserInfo , [name] : e.target.value})
  console.log(newuserInfo)
}


const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateProfileUsers(newuserInfo , avatar ,auth))
    handleClose()
}


useEffect(() => {
    setNewUserInfo(userInfo[0])
   
   
} , [auth.user , userInfo])



  return (
    <Modal show={show} onHide={handleClose}>
                    <Modal.Header className="text-black bg-gradient-to-t  " closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group  className="flex item-center justify-center"  >
                            <img className="w-40 rounded-full" src= {avatar ? URL.createObjectURL(avatar) :  newuserInfo?.avatar} alt="" />
                        </Form.Group>

                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Change profile photo</Form.Label>
                            <Form.Control  onChange = {(e) => changeAvatar(e)} type="file" accept = "image/*" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type="text"
                            // placeholder="nguyen van a"
                            autoFocus
                            onChange={(e) => handleOnchange('fullname' , e)}
                            value = {newuserInfo?.fullname}
                        />
                        </Form.Group>
                        <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                        >
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control
                            type="text"
                            // placeholder="0919172672"
                            autoFocus
                            onChange={(e) => handleOnchange('mobile' , e)}
                            value = {newuserInfo?.mobile}
                        />
                        </Form.Group>

                        <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                        >
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            // placeholder="0919172672"
                            autoFocus
                            onChange={(e) => handleOnchange('address' , e)}
                            value = {newuserInfo?.address}
                        />
                        </Form.Group>

                        <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                        >
                        <Form.Label>Website</Form.Label>
                        <Form.Control
                            type="text"
                            // placeholder="0919172672"
                            autoFocus
                            onChange={(e) => handleOnchange('website' , e)}
                            value = {newuserInfo?.website}
                        />
                        </Form.Group>

                        
                        <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                        >
                        <Form.Label>Story</Form.Label>
                        <Form.Control
                        as="textarea" rows={3}
                        onChange={(e) => handleOnchange('story' , e)}
                        value = {newuserInfo?.story}
                        />
                        </Form.Group>

                        <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                        >
                        <Form.Label>Gender</Form.Label>
                        <Form.Select aria-label="Default select example" value = {newuserInfo?.gender} onChange={(e) => handleOnchange('gender' , e)}  >
                            <option>Choose gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </Form.Select>

                        </Form.Group>

                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button className="bg-red-600" variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button  onClick={(e) => handleSubmit(e)}  className="bg-blue-600" variant="primary" >
                        Save Changes
                    </Button>
                    </Modal.Footer>
  </Modal>
  )
}

export default ModalEditProfile