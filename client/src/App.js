import logo from './DP-Logo.png';
import './App.css';
import { Button } from 'react-bootstrap';
import {loadStripe} from '@stripe/stripe-js';




const App = ()=> {

  

const createCheckoutSession = async (e) =>{
  e.preventDefault();

  const stripe = await loadStripe('pk_test_RtoxE59B9a8VsJbYkY733GEG');

  return fetch('/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
    }),
  }).then( (result)=> {
    return result.json().then((data)=>stripe
    .redirectToCheckout({
      sessionId: data.sessionId,
    }));
  });
};



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
         Please complete Direct Debit mandate
        </p>
      
        <form onSubmit={createCheckoutSession} action="/create-checkout-session" method="POST">
      <Button variant="primary" type="submit" >Set up Direct Debit</Button>
    </form>

    
      </header>

      
    </div>
  );
}

export default App;
