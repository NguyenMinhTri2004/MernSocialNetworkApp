import React from 'react'
import {useDispatch , useSelector} from "react-redux"
import UserCard from './UserCard'
import FollowBtn from './FollowBtn'

 const  RightSlideBar = () => {
  
  const dispatch = useDispatch() 

  const auth = useSelector(state => state.authReducer)

  const suggestions = useSelector(state => state.suggestionsReducer)
    
  return (
    <div  className = "right__slidebar w-96 hidden lg:block">
          <div className="right__slidebar__auth">
                <UserCard user = {auth.user}>
                     <span className="text-blue-700 cursor-pointer text-xs font-bold" >Switch</span>
                </UserCard>
          </div>

          <div className="right__slidebar__suggestions  ">
              <div className="right__slidebar__suggestions__top  flex items-center justify-between p-3 ">
                     <span className ="text-gray-500  text-sm font-bold"  >Suggestions For You</span>
                     <span className = "text-black cursor-pointer text-xs font-bold">See All</span>
              </div>

              <div className="right__slidebar__suggestions__middle">
                   {
                      suggestions.users.map(user => {
                          return (
                            <UserCard key={user._id} user={user}>
                                   <FollowBtn user={user} />
                           </UserCard>
                          )
                      })
                   }
              </div>

              <div className="right__slidebar__suggestions__bottom">

              </div>
          </div>
    </div>
  )
}

export default RightSlideBar
