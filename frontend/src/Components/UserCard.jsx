import React from 'react'
import {useSelector} from "react-redux"

const UserCard = ({user , children , msg}) => {

  const {avatar , username , fullname} = user

  
  const auth = useSelector(state => state.authReducer)


  return (
    <div className="usercart flex items-center justify-between gap-3 p-3">
      <div className="usercart__left flex items-center gap-3">
            <div className="usercart__img  w-10 ">
                    <img className='rounded-full' src= {avatar} alt="" />
            </div>

            <div className="usercart__info">
                <div className="usercart__username">
                    <h4>{username}</h4>
                </div>

                <div className="usercart__fullname font-light">
                    {
                        msg ? user.text : <h4>{fullname}</h4>
                    }
                    
                </div>
            </div>
      </div>

      <div className="usercart__right">
           {
             children
           }
      </div>
    </div>
  )
}

export default UserCard