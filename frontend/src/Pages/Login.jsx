import React from 'react';
import { useHistory } from 'react-router-dom';
import { TextField } from '@mui/material';
import {useDispatch} from "react-redux";
import { useState } from 'react';
import {login} from '../Redux/actions/authAction';
import {Link} from 'react-router-dom';
import Helmet from "../Components/Helmet"

const Login = () => {

  const [values , setValues] = useState({
      email : "",
      password : "",
  })

  const history = useHistory()

  const handleOnchange = (name , e) => {
     setValues({...values , [name] : e.target.value} )
  }

  const handleSubmit = () => {
      if(!values.email || !values.password) return
      dispatch(login(values))
      history.push('/')
  }

  const dispatch = useDispatch()   
    

  return (
    <Helmet title={"Login"}>
        <>
            <div className="login bg-gray-50 ">
                <div className="login__wrapper  flex justify-center items-center p-3  ">
                    <div className="login__img hidden md:block relative ">
                        <img className="min-w-[29rem]" src= {require("../Assets/Img/login__background.png")} alt="" />
                        <img className = 'absolute top-5 right-[3.7rem]' src= {require("../Assets/Img/screenshot1.png")} alt="" />
                    </div>

                    <div className="login__form h-full w-96">
                        <div className="login__form__wrapper__top bg-transparent gap-3 flex flex-col h-full w-full justify-center items-center min-w-full  ">
                        <div className="login__top shadow-lg border-gray-100 p-5 h-full w-full bg-white gap-2 flex flex-col  justify-center items-center ">
                                <div className="login__top__logo mb-4">
                                    <img src= {require("../Assets/Img/logo.png")} alt="" />
                                </div>
                                
                        
                                <div className="login__top__input w-full   ">
                                    <TextField onChange={(e) => handleOnchange("email" , e)} className=" w-full text-xs  " id="outlined-basic" label="Phone number, username, or email" variant="outlined" />
                                </div>

                                <div className="login__top__input w-full text-xs mb-3 ">
                                    <TextField onChange={(e) => handleOnchange("password",e)}  className="text-sm w-full" id="outlined-basic" label="Password" variant="outlined"  type = "password"/>
                                </div>

                                <div className="login__top__button w-full flex items-center justify-center ">
                                    <button onClick={() => handleSubmit()} className="w-full bg-blue-500 p-1 rounded-md text-white">Log In</button>
                                </div>

                               
                               
                        </div>

                        <div className="login__middle shadow-lg border-gray-100 px-3 py-3 bg-white w-full flex items-center justify-center ">
                                <p>Don't have an account? <span className="text-sky-700 cursor-pointer  font-semibold " ><Link to = "./register" >Sign up</Link></span></p>
                        </div>

                        <div className="login__bottom  shadow-lg flex flex-col  justify-center items-center gap-2 w-full p-2 bg-white">
                                <p>Get the app</p>
                                <div className="login__bottom__dowload  flex gap-3 cursor-pointer w-full item-center justify-center ">
                                    <div className="login__bottom__dowload__item w-36 ">
                                            <img src= {require("../Assets/Img/appstore.png")} alt="" />
                                    </div>

                                    <div className="login__bottom__dowload__item w-36 gap-3 ">
                                            <img src= {require("../Assets/Img/ggplay.png")} alt="" />
                                    </div>
                                </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
       
    </Helmet>
  )
}

export default Login