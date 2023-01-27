import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';


const SlidePost = ({images}) => {

   const [index, setIndex] = useState(0);

   const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

  return (
    <Carousel className = "min-h-full  overflow-hidden" interval={null}  activeIndex={index} onSelect={handleSelect}>
        {
            images.map((image, index) =>{
                 return (
                    <Carousel.Item key = {index}>
                        <img
                        className="d-block w-100"
                        src= {image.url}
                        alt="First slide"
                        />
                    </Carousel.Item>
                 )
            })
        }
        
    </Carousel>
  )
}

export default SlidePost