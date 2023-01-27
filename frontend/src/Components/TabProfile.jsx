import React from 'react'
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PostAddIcon from '@mui/icons-material/PostAdd';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import TagIcon from '@mui/icons-material/Tag';
import {useSelector } from 'react-redux';

const TabProfile = ({savePosts , setSavePosts}) => {

    const [value, setValue] = React.useState(0);

    const theme = useSelector(state => state.themeReducer.mode)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

  return (
     <Box sx={{ width: '100%', bgcolor: theme === 'Dark' ? 'bg-black text-white' : 'background.paper' }} className = "mb-5" >
      <Tabs className= {theme === 'Dark' && 'text-white'}  value={value} onChange={handleChange} centered>
            <Tab className= {theme === 'Dark' && 'text-white'} icon={<PostAddIcon />} label="POSTS" iconPosition="start" onClick={() => setSavePosts(false)}  />
            <Tab className= {theme === 'Dark' && 'text-white'} icon={<SmartDisplayIcon />} label="SAVED POSTS" iconPosition="start" onClick={() => setSavePosts(true)} />
            <Tab className= {theme === 'Dark' && 'text-white'} icon={<TagIcon/>} label="TAGGED" iconPosition="start"/>
      </Tabs>
    </Box>
  )
}

export default TabProfile