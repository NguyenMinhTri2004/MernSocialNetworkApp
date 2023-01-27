import React , { useEffect} from 'react'
import {useSelector , useDispatch} from 'react-redux'
import { getDiscoverPosts } from '../Redux/actions/discoveryAction'
import Loading from '../Components/Loading'
import PostThumb from '../Components/PostThumb'
import {getDataApi} from "../Utils/fetchData"
import {TYPES} from "../Redux/actions/discoveryAction"
import InfiniteScroll from 'react-infinite-scroll-component'
import Helmet from '../Components/Helmet'

const Discovery = () => {
  
  const auth = useSelector(state => state.authReducer)

  const discover = useSelector(state => state.discoveryReducer) 

  const dispatch = useDispatch()

  const theme = useSelector(state => state.themeReducer.mode)
  
  useEffect(() => {
   if(!discover.firstLoad){
     dispatch(getDiscoverPosts(auth.token))
   }

  }, [dispatch , auth.token , discover.firstLoad , discover.posts]);


  const handleLoadMore = async () => {
      const res = await getDataApi(`post_discover?limit=${discover.page * 9}` , auth.token)
      dispatch({
        type : TYPES.UPDATE_POST,
        payload : res.data
      })
  }
    
  return (
    <Helmet title="Discovery">
        <div >
            {
                discover.loading
                ? <Loading/>
                : 
                <InfiniteScroll
                  className = "overflow-visible w-4/6 mx-auto"
                  dataLength={discover.posts.length} 
                  next={handleLoadMore}
                  hasMore={true}
                >
                  {<PostThumb posts = {discover.posts} result = {discover.result} />}

                  {/* {
                    discover.result < 3 * (discover.page - 1)
                  } */}
                </InfiniteScroll>


            }

        </div>
    </Helmet>
  )
}

export default Discovery