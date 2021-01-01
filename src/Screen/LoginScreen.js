import React,{useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import './LoginScreen.css'
import {auth} from '../firebase';

function LoginScreen() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const signIn =(e)=>{
        e.preventDefault();
        auth.signInWithEmailAndPassword(email,password).then(auth=>{
            history.push('/');
        })
        .catch(error=>alert(error.message));

        

        
    }
    const register =(e) =>{
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email,password)
        .then((auth)=>{
            if(auth){
                history.push('/')
            }
        })
        .catch(error=>alert(error.message))
        
    }
    return (
        <div className="login">
            <Link to="/">
                 <img className="login__logo" alt="" src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' 
                />
            </Link>
            <div className="login__container">
                <h1>Sign In</h1>
                <form>
                    <h5>Email</h5>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"/>
                    <h5>Password</h5>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"/>
                    <button onClick={signIn} className="login__signInButton">Sign In</button>
                </form>
                <p> By signing-in you agree to the AMAZON clone conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice 
                </p>
                <button type="submit" onClick={register}  className="login__registerButton">Create Your Amazon Account</button>
            </div>    
            
        </div>
    )
}

export default LoginScreen
