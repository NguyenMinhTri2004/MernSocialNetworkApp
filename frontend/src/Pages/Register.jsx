import React from 'react'
import { TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useFormik } from 'formik';
import { register } from '../Redux/actions/authAction';
import {useDispatch} from 'react-redux';
import {Link} from "react-router-dom";
import * as Yup from "yup";
import Helmet from "../Components/Helmet";
import Notify from "../Components/Notify"

const Register = () => {

  const dispatch = useDispatch()   

  const formik = useFormik({
    initialValues: {
      email: '',
      fullname : '',
      username : '',
      password : '',
      gender : 'female',
    },

    validationSchema : Yup.object({
      email: Yup.string().required("Required").matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ , "Please enter a valid email") ,
      fullname : Yup.string().required("Required").min(8 , "Must be 8 characters or more") ,
      username : Yup.string().required("Required").min(8 , "Must be 8 characters or more") ,
      password : Yup.string().required("Required").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/ , "Please enter a valid password") ,
      gender : Yup.string().required("Required") ,
    }),

  });
  
 
  const handleSubmit = () => {
    
     
     if(formik.errors.email || formik.errors.fullname || formik.errors.username || formik.errors.password || formik.errors.gender) {
           return
     }
     dispatch(register(formik.values))

  }
  

  return (
     <Helmet title="Register">
          <>
               <div className="login bg-gray-50 flex items-center justify-center ">
                    <div className="login__wrapper  flex justify-center items-center  w-96">
                         <div className="login__form h-full min-w-full   ">
                              <div className="login__form__wrapper__top bg-transparent gap-3 flex flex-col h-full w-full justify-center items-center   ">
                              <div className="login__top shadow-lg border-gray-100 px-5 py-5 h-full w-full bg-white gap-2 flex flex-col  justify-center items-center ">
                                   <div className="login__top__logo mb-3">
                                        <img src= {require("../Assets/Img/logo.png")} alt="" />
                                   </div>
                                   
                                        <div className="mb-3">
                                             <p>Sign up to see photos and videos from your friends.</p>
                                        </div>

                                        {/* <div className="login__top__facebook text-base w-full bg-blue-500 p-1 rounded-md text-white cursor-pointer flex items-center justify-center gap-1 my-2">
                                        <i className='bx bxl-facebook-square text-lg'></i>
                                        <p>Log in with Facebook</p>
                                   </div> */}

                                   {/* <div className="login__top__or flex items-center justify-center w-full gap-5 text-stone-400">
                                        <span className="login__top__or__left bg-stone-400 w-full h-px">
                                        
                                        </span>

                                        <div className="login__top__or__left__mid">
                                                  <p>OR</p>
                                        </div>

                                        <span className="login__top__or__left__right  bg-stone-400 w-full h-px">

                                        </span>
                                   </div> */}


                                   
                                   <div className="login__top__input w-full text-sm  ">
                                        <TextField id = "email" name = "email" value={formik.values.email} onChange={formik.handleChange}  className=" w-full"  label="Email" variant="outlined" />
                                        <span className="text-red-500 text-sm "   >{formik.errors.email}</span>
                                   </div>

                                   <div className="login__top__input w-full">
                                        <TextField id = "fullname" name = "fullname" value={formik.values.fullname} onChange={formik.handleChange}  className="text-sm w-full"  label="Full Name" variant="outlined" />
                                        <span className="text-red-500 text-sm " >{formik.errors.fullname}</span>
                                   </div>

                                   <div className="login__top__input w-full">
                                        <TextField id = "username" name = "username" value={formik.values.username} onChange={formik.handleChange} className="text-sm w-full"  label="Username" variant="outlined" />
                                        <span  className="text-red-500 text-sm " >{formik.errors.username}</span>
                                   </div>

                                   <div className="login__top__input w-full">
                                        <TextField id = "password" name = "password" value={formik.values.password} onChange={formik.handleChange} className="text-sm w-full"  label="Password" variant="outlined" />
                                        <span className="text-red-500 text-sm "  >{formik.errors.password}</span>
                                   </div>

                                   

                                   <div>
                                             <RadioGroup
                                                       row
                                                       aria-labelledby="demo-row-radio-buttons-group-label"
                                                       name="row-radio-buttons-group"
                                                       defaultValue="female"
                                                       >
                                                       <FormControlLabel id='gender' name = 'gender' value="female" onChange={formik.handleChange} control={<Radio />} label="Female" />
                                                       <FormControlLabel id='gender' name = 'gender' value="male" onChange={formik.handleChange} control={<Radio />} label="Male" />
                                                       <FormControlLabel id='gender' name = 'gender' value="other" onChange={formik.handleChange} control={<Radio />} label="Other" />
                                             </RadioGroup>
                                             <span className="text-red-500 text-sm "  >{formik.errors.gender}</span>
                                   </div>


                                   
                                   <div>
                                        <p>People who use our service may have uploaded your contact information to Instagram. Learn More</p>
                                   </div>

                                   <div>
                                        <p>By signing up, you agree to our Terms , Privacy Policy and Cookies Policy.</p>
                                   </div>

                                   <div className="login__top__button w-full flex items-center justify-center my-2">
                                        <button type = "submit" onClick={handleSubmit} className="w-full bg-blue-500 p-1 rounded-md text-white">Sign Up</button>
                                   </div>

                              </div>

                              <div className="login__middle shadow-lg border-gray-100 p-3 bg-white w-full flex items-center justify-center ">
                                        <p>Have an account? <span className="text-sky-700 cursor-pointer  font-semibold "><Link to = "./" >Log in</Link></span></p>
                              </div>

                              <div className="login__bottom  shadow-lg flex flex-col  justify-center items-center gap-2 w-full bg-white">
                                        <p>Get the app</p>
                                        <div className="login__bottom__dowload  flex gap-3 cursor-pointer w-full items-center justify-center p-2">
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
          <Notify/>
     </Helmet>
  )
}

export default Register