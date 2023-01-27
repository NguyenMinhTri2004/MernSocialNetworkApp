import React , {useState} from 'react'
import LeftMessenger from "../Components/LeftMessenger"
import ModalMessenger from "../Components/ModalMessenger"
import { useSelector, useDispatch } from 'react-redux'
import {getDataApi} from "../Utils/fetchData"
import { TYPES} from "../Redux/actions/messAction"
import { useHistory} from 'react-router-dom'
import ChatRoom from "../Components/ChatRoom"
import Helmet from "../Components/Helmet"


const MessengerRoom = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);  

    const dispatch = useDispatch()

    const history = useHistory()

    const [search, setSearch] = useState('')

    const [searchUsers, setSearchUsers] = useState([])

    const auth = useSelector(state => state.authReducer)

    const handleSearch = async e => {
      e.preventDefault()

      setSearch(e.target.value)
      
      if(!search) return setSearchUsers([]);
  
      try {
          const res = await getDataApi(`search?username=${search}`, auth.token)
          setSearchUsers(res.data.users)
      } catch (err) {
          dispatch({
              type: "NOTIFY", payload: {error: err.response.data.msg}
          })
      }
    }   


    const handleAddUser = (user) => {
      setSearch('')
      setSearchUsers([])
      dispatch({type: TYPES.ADD_USER, payload: {...user, text: '', media: []}})
      // dispatch({type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online})
      console.log("lick")
    //   return history.push(`/message/${user._id}`)

    }

    

  return (
    <Helmet title={"Messenger Room"}>
        <>
            <div  className = "flex items-center justify-center h-full  mx-auto  ">
                <LeftMessenger handleShow = {handleShow} handleAddUser = {handleAddUser} searchUsers = {searchUsers}/>
                <ChatRoom/>
            </div>
            <ModalMessenger show = {show} handleClose = {handleClose} handleSearch = {handleSearch} search = {search}  searchUsers = {searchUsers}  handleAddUser = {handleAddUser}   />
        </> 
    </Helmet>
  )
}

export default MessengerRoom