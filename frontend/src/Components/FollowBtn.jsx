import React , {useState , useEffect} from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { follow , unfollow } from '../Redux/actions/profileAction'

const FollowBtn = ({user}) => {

   console.log(user)

   const [followed , setFollowed] = useState(false)

   const auth = useSelector(state => state.authReducer)

   const profile = useSelector(state => state.profileReducer)

   const socket = useSelector(state => state.socketReducer)

   const dispatch = useDispatch()

   const handleUnfollow = () => {
        setFollowed(false)
        dispatch(unfollow({users : profile.users , user , auth , socket }))
   }

   const handleFollow = () => {
        setFollowed(true)
        dispatch(follow({users : profile.users , user , auth , socket}))
   }

   useEffect(() => {
      if(auth.user.following.find(item => item._id === user._id)){
        setFollowed(true)
      }
   }, [auth.user.following , user._id])

  return (
      <>

         {
            followed ? 

             <span
             className="px-4 py-2 border text-white bg-red-500 rounded-md cursor-pointer font-semibold"
             onClick={handleUnfollow}
             >
             UnFollow
            </span>

            : <span className="px-4 py-2 border text-white bg-blue-500 rounded-md cursor-pointer font-semibold"
             onClick={handleFollow}
               >
                Follow
             </span>
         }

      </>
  )
}

export default FollowBtn