import React from 'react';
import {Switch , Route} from 'react-router-dom';
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import {useSelector} from 'react-redux';
import Home from "../Pages/Home";
import Profile from '../Pages/Profile';
import PostDetail from '../Pages/PostDetail';
import Discovery from '../Pages/Discovery'; 
import Messenger from '../Pages/Messenger';
import MessengerRoom from '../Pages/MessengerRoom';

const Routes = () => {

  
  const auth = useSelector(state => state.authReducer) 

 
  return  (
   <>
      <Switch>
          <Route path='/' exact  component={auth.token ? Home : Login}/>
          <Route path='/login' exact  component={Login}/>
          <Route path='/explore' exact  component={Discovery}/>
          <Route path='/register' exact component={Register}/>
          <Route path='/profile/:id' exact   component={Profile}/>
          <Route path='/post/:id'   component={PostDetail}/>
          <Route path='/inbox' exact   component={Messenger}/>
          <Route path='/inbox/:id' exact  component={MessengerRoom}/>
      </Switch>
   </>
  )
}

export default Routes