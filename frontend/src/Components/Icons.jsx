import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';

const Icons = ({content , setContent}) => {
  const reactions = [   
    '❤️', '😆', '😯', '😢', '😡', '👍', '👎', '😄',
    '😂', '😍', '😘', '😗', '😚', '😳', '😭', '😓',
    '😤', '🤤', '👻', '💀', '🤐', '😴', '😷', '😵'
]
return (
  <div className="nav-item dropdown">
      <Dropdown>
        <Dropdown.Toggle>
            
                <span style={{opacity: 0.4}}>😄</span>

        </Dropdown.Toggle>

          <Dropdown.Menu>
              <div className="reactions">
                  {
                      reactions.map(icon => (
                          <span key={icon} onClick={() => setContent(content + icon)}>
                              {icon}
                          </span>
                      ))
                  }
              </div>
          </Dropdown.Menu>
          
      </Dropdown>
          
  </div>
)
}

export default Icons