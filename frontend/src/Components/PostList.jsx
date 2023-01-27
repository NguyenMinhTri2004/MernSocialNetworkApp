import React , {useState , useEffect} from 'react'
import PostThumb from './PostThumb'
import {getDataApi} from "../Utils/fetchData"
import {TYPES} from "../Redux/actions/profileAction"
import InfiniteScroll from 'react-infinite-scroll-component'

const PostList = ({id , auth , profile , dispatch}) => {
  const [posts , setPosts] = useState([])

  const [result , setResult] = useState(0)

  const [page , setPage] = useState(0)


  const handleLoadMore = async () => {
   
     const res = await getDataApi(`user_posts/${id}?limit=${page*4}` , auth.token)
     const newData = {...res.data , page : page + 1 , _id : id }
     dispatch({
        type : TYPES.UPDATE_POST,
        payload : newData
     })

  }

  useEffect(() => {
     profile.userposts.forEach(item =>{
        if(item._id === id){
             setPosts(item.posts)
             setResult(item.result)
             setPage(item.page)
        }
     })
  },[profile.userposts , id , result])
  return (

         <InfiniteScroll
         className = "overflow-visible w-4/6 mx-auto  "
         dataLength={posts.length} 
         next={handleLoadMore}
         hasMore={true}

         >
            {<PostThumb posts = { posts} result = { result }/>}

          
      </InfiniteScroll>
         
        
    
  )
}

export default PostList