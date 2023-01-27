import React from 'react'
import {useState , useEffect} from 'react'
import {useSelector , useDispatch} from 'react-redux'
import {getDataApi} from '../Utils/fetchData'
import UserCard from './UserCard'
import {useHistory} from "react-router-dom"


const Search = () => {

  const [search , setSearch] = useState('')
  const [users , setUsers] = useState([])

  const auth  = useSelector(state => state.authReducer)

  const history = useHistory()

  const dispatch = useDispatch()

  useEffect(() => {
      if(search && auth.token){
         getDataApi(`search?username=${search}` , auth.token)
         .then(res => setUsers(res.data.users))
         .catch(err => console.error(err))
      }else {
         setUsers([])
      }
  }, [search , auth.token , dispatch])

  const handleClick = (user) => {
      history.push(`/profile/${user._id}`)
      setUsers([])
      setSearch("")
  }


  return (
    <div className="header__search cursor-pointer w-64 relative hidden sm:block ">
        <input value = {search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" className="outline-none border-spacing-0 bg-stone-100 py-2 px-8 rounded-lg w-full" type="text" />
        <i className='bx bx-search absolute  bottom-3 right-3 '></i>
        <div  className='shadow-lg absolute w-72 max-h-72 overflow-y-scroll top-20 z-50 bg-white'>
            {
                users.map(user => {
                    return (
                      <div className='cursor-pointer hover:bg-slate-100' onClick = {() => handleClick(user)} >
                           <UserCard key = {user._id} user={user} />
                      </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Search