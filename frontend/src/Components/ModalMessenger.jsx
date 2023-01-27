import React , {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import UserCard from "../Components/UserCard"
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const ModalMessenger = ({show , handleClose , handleSearch , search , searchUsers , handleAddUser}) => {

  
   
  
    return (
       <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton className = "flex item-center justify-between">
                   <span className="cursor-pointer text-blue-500" >Next</span>
                   <Modal.Title className = "ml-auto"  >New message</Modal.Title>
              </Modal.Header>
              
    
              
              <Modal.Body>
                      <Form>
                                  <Form.Group className="mb-3 flex gap-4 items-center" controlId="exampleForm.ControlInput1">
                                      <span className = "font-bold">To:</span>
                                      <Form.Control
                                          type="text"
                                          placeholder= "Search"
                                          autoFocus
                                          className="outline-none border-none "
                                          value = {search}
                                          onChange={(e) => handleSearch(e)}
                                          
                                      />
                                  </Form.Group>
    
    
                                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                      <span className = "font-bold">Suggest</span>
                                      <div>

                                            {
                                                searchUsers.map((user , index) => {
                                                        return (
                                                            <UserCard key={index} user={user}> 
                                                                  <RadioButtonUncheckedIcon className = "cursor-pointer" onClick = {() => handleAddUser(user)}/>
                                                            </UserCard>
                                                        )
                                                })
                                            }
                                      </div>
    
                                  </Form.Group>
                       </Form>
                       
              </Modal.Body>
              
    
              <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                  Close
              </Button>
              </Modal.Footer>
    </Modal> 
    )
}



export default ModalMessenger