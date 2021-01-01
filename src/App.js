import './App.css';
import React, {useEffect} from'react';
import Header from './Component/Header';
import Home from './Component/Home';
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom'
import CheckoutScreen from './Screen/CheckoutScreen';
import LoginScreen from './Screen/LoginScreen';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';

function App() {
  const [{},dispatch] = useStateValue();
  useEffect(() => {
     auth.onAuthStateChanged(authUser =>{
       if(authUser){
          dispatch({
            type:'SET_USER',
            user:authUser
          })
       }else{
          dispatch({
            type:'SET_USER',
            user:null
          })
       }
     })
  }, [dispatch])
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route path="/login">
          <LoginScreen/>
        </Route>
        <Route path="/checkout">
        <Header/>
          <CheckoutScreen/>
        </Route>
        <Route path="/">
        <Header/>
          <Home/>
        </Route>
     
      </Switch>
      
    </div>
    </Router>
  );
}

export default App;
