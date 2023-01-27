import React , {useState} from 'react'
import LeftMessenger from "../Components/LeftMessenger"
import RightMessenger from "../Components/RightMessenger"
import ModalMessenger from "../Components/ModalMessenger"
import { useSelector, useDispatch } from 'react-redux'
import {getDataApi} from "../Utils/fetchData"
import { TYPES} from "../Redux/actions/messAction"
import { useHistory, useParams } from 'react-router-dom'
import SocketClient from "../SocketClient"
import Helmet  from '../Components/Helmet'

const Messenger = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);  

    const theme = useSelector(state => state.themeReducer.mode)

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
  }

  return (
    <Helmet title={"Messenger"}>
        <>
          <div  className = {`flex items-center justify-center  mx-auto ${theme === 'Dark' ? 'bg-black' : 'bg-white'} `}>
                <LeftMessenger handleShow = {handleShow} handleAddUser = {handleAddUser} searchUsers = {searchUsers}/>
                <RightMessenger show = {show} handleClose = {handleClose} handleSearch = {handleSearch} search = {search}  searchUsers = {searchUsers} handleAddUser = {handleAddUser}  handleShow = {handleShow}   />
          </div>
            <ModalMessenger show = {show} handleClose = {handleClose} handleSearch = {handleSearch} search = {search}  searchUsers = {searchUsers}  handleAddUser = {handleAddUser}   />
            {auth.token && <SocketClient/>}
        </> 
    </Helmet>
  )
}

export default Messenger