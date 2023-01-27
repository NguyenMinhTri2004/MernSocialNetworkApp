import React from 'react'
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import ModeCommentOutlined from '@mui/icons-material/ModeCommentOutlined';
import SendOutlined from '@mui/icons-material/SendOutlined';
import SaveBtn from './SaveBtn';
import ModalAuthPost from "./ModalAuthPost"
import moment from "moment"
import LikeButton from './LikeButton'
import Comments from "./Comments"
import CommentInput from "./CommentInput"
import {useSelector} from "react-redux"
import {useState} from "react"
import ModalShare from "./ModalShare"
import { BASE_URL } from '../Utils/config'
import Carousel from 'react-bootstrap/Carousel';
import { useHistory } from 'react-router-dom';

const PostCard = ({post , handleShow , handleClose}) => {

  const auth = useSelector(state => state.authReducer) 

  const [readMore , setReadMore] = useState(false)

  const [share , setShare] = useState(false)

  const history = useHistory()

  const handleShare = () => {
      setShare(!share)
  }

  const theme = useSelector(state => state.themeReducer.mode)


  return (
    <div>
           <div  className = {`mb-3 ${theme === 'Dark' ? 'bg-black' : 'bg-white'} min-w-full`}>
                      <Card
                        variant="outlined"
                        className = "rounded-2xl border border-solid border-slate-100"
                        sx={{
                          maxWidth: 800,
                          '--Card-radius': (theme) => theme.vars.radius.xs,
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', pb: 1.5, gap: 1 }}>
                          <Box
                            sx={{
                              position: 'relative',
                              '&:before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                m: '-2px',
                                borderRadius: '50%',
                                background:
                                  'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
                              },
                            }}
                          >
                            <Avatar
                              size="sm"
                              src= {post.user?.avatar}
                              onClick = {() => history.push(`./profile/${post.user?._id}`)}
                              className = "cursor-pointer"
                          
                            />
                          </Box>
                          <Typography   onClick = {() => history.push(`./profile/${post.user?._id}`)}  className = "cursor-pointer" fontWeight="lg">{post.user?.username}</Typography>
                          {
                              post.user._id !== auth.user._id ? 
                              <IconButton onClick={() => handleShow()} variant="plain" color="neutral" size="sm" sx={{ ml: 'auto' }}>
                                <MoreHoriz />
                              </IconButton> :
                              <ModalAuthPost variant="plain" color="neutral" size="sm" sx={{ ml: 'auto' }} post = {post} />

                          }
                        </Box>
                        <CardOverflow className = "h-80 overflow-hidden my-1">
                            <Carousel  className = "h-full" >  
                              {
                                    post.images.map((img, index) =>{
                                      return (
                                         <Carousel.Item key = {index } className = "w-full h-full">
                                             {
                                                   img.url.match(/video/i)
                                                   ? <video controls src={img.url} className="d-block w-100" alt={img.url}/>
                   
                                                   : <img src={img.url} className="d-block w-100" alt={img.url} />
                                             }
                                         </Carousel.Item>
                                      )
                                 })
                              }
                            </Carousel>  
                        </CardOverflow>
                        <Box sx={{ display: 'flex', alignItems: 'center', mx: -1, my: 1 }}>
                          <Box sx={{ width: 0, display: 'flex', gap: 0.5 }}>
                            <IconButton variant="plain" color="neutral" size="sm">
                               <LikeButton className = "!text-red-500" post = {post} />
                            </IconButton>
                            <IconButton variant="plain" color="neutral" size="sm">
                              <ModeCommentOutlined />
                            </IconButton>
                            <IconButton variant="plain" color="neutral" size="sm"  onClick = {() => handleShare()}>      
                              <SendOutlined />
                            </IconButton>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mx: 'auto' }}>
                            {[...Array(5)].map((_, index) => (
                              <Box
                                key={index}
                                sx={{
                                  borderRadius: '50%',
                                  width: `max(${6 - index}px, 3px)`,
                                  height: `max(${6 - index}px, 3px)`,
                                  bgcolor: index === 0 ? 'primary.solidBg' : 'background.level3',
                                }}
                              />
                            ))}
                          </Box>
                          <Box sx={{ width: 0, display: 'flex', flexDirection: 'row-reverse' }}>
                               <SaveBtn post = {post}/>
                          </Box>
                        </Box>
                        
                          <CardOverflow>
                              <p className="break-words flex items-center w-full max-w-xs 2xl:max-w-md" >
                              
                                <p className = "w-full break-words ">
                                <span onClick = {() => history.push(`./profile/${post.user?._id}`)} className = "font-semibold mr-1 cursor-pointer">{`${post.user?.username}`}</span>   
                                      {
                                        post.content.length < 60
                                        ? post.content
                                        : readMore  ? post.content + " " : post.content.slice(0,60) + "..."
                                      }
                                </p>
                              </p>
                          </CardOverflow>   
                        
                        <Link
                          component="button"
                          underline="none"
                          fontSize="sm"
                          // startDecorator="…"
                          sx={{ color: 'text.tertiary' }}
                          className = "mb-4"
                        >
                          {
                              post.content.length > 60
                              && <span onClick={() => setReadMore(!readMore)} >
                                   {
                                      readMore ? <p className="text-blue-500">Hide content</p> : <p className="text-blue-500">Read more</p>
                                   }
                                </span>
                          }
                          
                        </Link>
                        <Comments  post = {post}/>
                        <Link to = "/aa"
                          component="button"
                          underline="none"
                          fontSize="sm"
                          fontWeight="lg"
                          textColor="text.primary"
                        >
                          {post?.likes.length} Likes
                        </Link>

                        <Link
                          component="button"
                          underline="none"
                          fontSize="sm"
                          sx={{ color: 'text.tertiary' }}
                        >
                           {/* <span className = "font-light " >{`View all ${post.comments?.length} comments`}</span>  */}
                        </Link>

                        <Link
                          component="button"
                          underline="none"
                          fontSize="10px"
                          sx={{ color: 'text.tertiary', my: 0.5 }}
                        >
                          {moment(post.createdAt).fromNow()}
                        </Link>

                        
                        <CommentInput post = {post} />
                          

                      </Card>

                    {
                      share && <ModalShare url = {`${BASE_URL}/post/${post._id}`} />
                    } 
                     
           </div>
                  
    </div>
  )
}

export default PostCard