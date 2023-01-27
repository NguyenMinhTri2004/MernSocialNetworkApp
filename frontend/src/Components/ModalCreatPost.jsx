import React , {useState , useRef , useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { createPost , updatePost } from '../Redux/actions/postAction'
import Icons from "../Components/Icons"

const ModalCreatPost = ({show , handleClose , post}) => {

  const auth = useSelector(state => state.authReducer)

  const socket = useSelector(state => state.socketReducer)

  const dispatch = useDispatch()

  const videoRef = useRef()

  const canvasRef = useRef()

  const [content , setContent] = useState('')

  const [images , setImages] = useState([])

  const [stream , setStream] = useState(false)

  const [tracks , setTracks] = useState([])


  const handleChangeImages = (e) => {
    const files = [...e.target.files]
    let err = ''
    let newImages = []

    files.forEach(file => {
        if(!file){
            return err = "FIle does not exits"
        }

        if(file.size > 1024 * 1024 * 10){
            return err = "The image/video largest is 10mb."
        }

        return newImages.push(file)
    })

    if(err){
        
               dispatch({
                    type: 'NOTIFY',
                    payload: {error : err}
         
                })
    }

     setImages([...images, ...newImages])


  }

  const handleDeleteImages = (index) => {
      const newImages = [...images]
      newImages.splice(index, 1)
      setImages(newImages)
  }

  const handleStream = (e) => {
      e.preventDefault()
      setStream(true)
      if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
          navigator.mediaDevices.getUserMedia({video : true})
          .then(mediaStream => {
            videoRef.current.srcObject = mediaStream
            videoRef.current.play()
            const track = mediaStream.getTracks()
            setTracks(track[0])
          }).catch (err => console.log(err));
      }
  }

  const handleCapture = async () => {
                const width = videoRef.current.ClientWidth
                const height = videoRef.current.ClientHeight
                canvasRef.current.setAttribute('width', width)
                canvasRef.current.setAttribute('height', height)
                
                let ctx = canvasRef.current.getContext('2d')
                    
                        ctx.drawImage(videoRef.current , 0 , 0 , width, height)
                        let URL = canvasRef.current.toDataURL("image/png").replace("image/png", "image/octet-stream");
                        setImages([...images, {camera : URL}])
                        console.log(images)
                    
                
        
  }

  const handleSubmit = () => {
    handleClose()
    if(images.length == 0){
        return  dispatch({
            type: 'NOTIFY',
            payload: {error : "Please add your photo"}
 
        })
    }

    if(post){
        dispatch(updatePost({content , images , auth , post}))
    }else {
        dispatch(createPost({content , images , auth , socket}))
    }


    setContent('')
    setImages([])

  }
  
  useEffect(() => {
    if(post){
        setContent(post.content)
        setImages(post.images)
    }
  }, [])


  const imageShow = (src) => {
    return(
        <img src={src} alt="images" className="img-thumbnail"/>
        
    )
   }

  const  videoShow = (src) => {
        return(
            <video controls src={src} alt="images" className="img-thumbnail"/>
        )
    }

  return (
    <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Create new post</Modal.Title>
            </Modal.Header>

            
            <Modal.Body>
                    <Form>

                                

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Control
                                        type="text"
                                        placeholder= { `${auth.user?.fullname}, what are you thinking`}
                                        autoFocus
                                        onChange={(e) => setContent(e.target.value)}
                                        // value = {newuserInfo?.fullname}
                                        as="textarea" rows={5} 
                                        className="outline-none border-none "
                                        value = {content}
                                        
                                    />
                                </Form.Group>
                                
                                <Form.Group className="mb-3"  >
                                        {
                                            stream && 
                                            <div className="stream">
                                                  <video className="" autoPlay muted  ref = {videoRef} width="100%" height="100%"/>
                                                  <span>&times;</span>
                                                  <canvas className = "" ref = {canvasRef} style={{display: 'none'}}/>
                                            </div>
                                        }


                                </Form.Group>

                                <Icons content = {content} setContent = {setContent}/>

                                <Form.Group className="mb-3">
                                   <ImageList sx={{ width: 450, height: 300 }} cols={3} rowHeight={164}>
                                        
                                        {images.map((img , index) => (
                                            <ImageListItem key={index} className= "relative">
                                                <HighlightOffIcon onClick={() => handleDeleteImages(index)}  className = "absolute z-50 text-red-400 top-0 right-0 cursor-pointer"/>
                                                {
                                                        img.camera ? imageShow(img.camera)
                                                        : img.url
                                                            ?
                                                               <div>
                                                                   {
                                                                       img.url.match(/video/i)
                                                                       ? videoShow(img.url) 
                                                                       : imageShow(img.url)
                                                                   }
                                                                
                                                               </div>
                                                            
                                                            :
                                                               <div>

                                                                   {
                                                                       img.type.match(/video/i)
                                                                       ? videoShow(URL.createObjectURL(img)) 
                                                                       : imageShow(URL.createObjectURL(img))
                                                                   }
                                                               </div>
                                                            
                                                }
                                            </ImageListItem >
                                    ))}
                                  </ImageList>
                                </Form.Group>


                                <Form.Group className="mb-3 flex gap-3 items-center justify-center" controlId="exampleForm.ControlInput1">
                                    {
                                        stream ?  <i className='bx bxs-camera absolute text-4xl'onClick={() => handleCapture()} ></i>
                                        : <>
                                                  <div className="relative" >
                                                       <i className='bx bx-image-add absolute text-4xl' ></i>
                                                        <Form.Control 
                                                            type="file"
                                                            multiple accept = "image/*,video/*"
                                                            autoFocus
                                                            onChange={(e) => handleChangeImages(e)}
                                                            // value = {newuserInfo?.fullname}
                                                            // as="textarea" rows={5} 
                                                            className = "w-10 opacity-0 "
                                                            
                                                        />
                                                  </div>
                                                  
                                                 <div className="relative"   >
                                                         <i className='bx bxs-camera absolute text-4xl' ></i>
                                                        <Form.Control
                                                    
                                                            type="file"
                                                            // placeholder= { `${auth.user.fullname}, what are you thinking`}
                                                            autoFocus
                                                            // onChange={(e) => handleOnchange('fullname' , e)}
                                                            // value = {newuserInfo?.fullname}
                                                            // as="textarea" rows={5} 
                                                            className = "w-10 opacity-0  "
                                                            onClick={(e) => handleStream(e)}
                                                        />
                                              </div>
                                         </>
                                    }
                                   
                                </Form.Group>
                        
                            </Form>
            </Modal.Body>
            

            <Modal.Footer>
            <Button className = "bg-gray-900" variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button className = "bg-gray-900"  variant="primary" onClick={handleSubmit}>
                Save Changes
            </Button>
            </Modal.Footer>
</Modal> 
  )
}

export default ModalCreatPost