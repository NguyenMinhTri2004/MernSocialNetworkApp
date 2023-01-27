import React from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import {Link} from "react-router-dom"
const PostThumb = ({posts , result}) => {

  if(result === 0){
        return <h2 className = "text-center" >No Post</h2>
  }

  return (
    <div className = " w-full gap-4 flex flex-wrap bg-black" >
      {posts.map((item) => (
        <Link to = {`/post/${item._id}`}>
            <div key={item._id} className = "w-[19rem] h-72 cursor-pointer relative">
              {
                   item.images[0].url.match(/video/i)
                    ? <video
                        controls
                        src={`${item.images[0].url}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full"
                      />
                    :  <img
                        src={`${item.images[0].url}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full"
                          />
      
              }
              
              <div className="postthumb__menu flex text-white absolute items-center justify-center w-full h-full gap-3 inset-0 bg-slate-50 bg-opacity-25  hover:bg-opacity-0">
                    <div className="postthumb__menu__item   ">
                           <FavoriteIcon/>  {item.likes.length}
                    </div>

                    <div className="postthumb__menu__item">
                           <ModeCommentIcon/>  {item.comments.length}
                    </div>
              </div>
            </div>
        </Link>
      ))}
  </div>
  )
}

export default PostThumb