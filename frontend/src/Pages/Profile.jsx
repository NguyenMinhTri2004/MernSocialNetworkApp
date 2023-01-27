import React , {useState , useEffect} from 'react'
import Info from '../Components/Info'
import PostList from "../Components/PostList"
import { useSelector , useDispatch } from 'react-redux'
import Loading from "../Components/Loading"
import {getProfileUsers} from "../Redux/actions/profileAction"
import {useParams} from "react-router-dom"
import TabProfile from "../Components/TabProfile"
import SavedPosts from '../Components/SavedPosts'
import Helmet from '../Components/Helmet'

const Profile = () => {

  const profile = useSelector(state => state.profileReducer)

  const {id} = useParams()


  const dispatch = useDispatch()

  const auth =  useSelector(state => state.authReducer)

  

  const [savePosts , setSavePosts] = useState(false)

  useEffect(() => {
    
      dispatch(getProfileUsers({id , auth }))
   
  }, [id , auth.user._id ])
 
  
  return (
    <Helmet title={"Profile"}>
        <div className="profile ">
          
          {
            profile.loading ? <Loading/>
            : <Info id = {id} auth = {auth} profile = {profile} dispatch = {dispatch}/>
          }

          <TabProfile savePosts = {savePosts}  setSavePosts = {setSavePosts}  />
          {
            savePosts ?   <SavedPosts auth = {auth} dispatch = {dispatch}/>
            :  <PostList id = {id} auth = {auth} profile = {profile} dispatch = {dispatch}  />
          }

        
        
        </div>
    </Helmet>
  )
}

export default Profile