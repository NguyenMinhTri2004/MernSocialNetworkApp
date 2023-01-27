import React , {useState , useEffect} from 'react'
import { getDataApi } from '../Utils/fetchData'
import PostThumb from './PostThumb' 
import InfiniteScroll from 'react-infinite-scroll-component'
const SavedPosts = ({auth , dispatch}) => {

    const [savePosts , setSavePosts] = useState([])

    const [result , setResult] = useState(0)

    const [page , setPage] = useState(2)


    const handleLoadMore = async () => {
        const res = await getDataApi(`getSavePosts?limit=${page * 3}` , auth.token)
        console.log(res)
        setSavePosts(res.data.savePosts)
        setResult(res.data.result)
        setPage(page + 1)
        console.log("load more")
        console.log(savePosts)
     }

    useEffect(() =>{
         getDataApi('getSavePosts?limit=3' , auth.token)
         .then(res => {
              setSavePosts(res.data.savePosts)
              setResult(res.data.result)
         })

         .catch(err => {
            dispatch({
                type: 'NOTIFY',
                payload: {error : err.response.data.msg}
     
            })
         })

         return () => setSavePosts([])
    },[auth.token, dispatch])

  return (
    <div>
           <InfiniteScroll
               className = "overflow-visible w-4/6 mx-auto"
              dataLength={savePosts.length} 
              next={handleLoadMore}
              hasMore={true}
            >
                  {<PostThumb posts = {savePosts} result = { result }/>}

              
      </InfiniteScroll>
    </div>
  )
}

export default SavedPosts