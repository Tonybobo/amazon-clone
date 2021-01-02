import './App.css';
import React, {useEffect} from'react';
import Header from './Component/Header';
import Home from './Screen/Home';
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom'
import CheckoutScreen from './Screen/CheckoutScreen';
import LoginScreen from './Screen/LoginScreen';
import { auth } from './firebase';
import PaymentScreen from './Screen/PaymentScreen';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import OrderScreen from './Screen/OrderScreen';
import { useDispatch } from 'react-redux';

const promise = loadStripe('pk_test_51I4nW3CK505ToBVyLmlwjBGJW2Mfx6h95MTf6a5dUQcbI6WAOMBwJds7AVofxwx9eMsjMAH4xiLdMBAKUE3ckika00YpnkpY2g');

function App() {
  
  const dispatch = useDispatch();
  
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
        <Route path="/orders">
          <Header/>
          <OrderScreen/>
        </Route>
        <Route path="/login">
          <LoginScreen/>
        </Route>
        <Route path="/checkout">
        <Header/>
          <CheckoutScreen/>
        </Route>
        <Route path="/payment">
          <Header/>
          <Elements stripe = {promise}>
            <PaymentScreen/>
          </Elements>
          
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
