import './App.css';
import Header from './Component/Header';
import Home from './Component/Home';
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom'
import CheckoutScreen from './Screen/CheckoutScreen';
function App() {
  return (
    <Router>
    <div className="App">
      <Header/>
      <Switch>
        <Route path="/checkout">
          <CheckoutScreen/>
        </Route>
        <Route path="/">
          
          <Home/>
        </Route>
     
      </Switch>
      
    </div>
    </Router>
  );
}

export default App;
