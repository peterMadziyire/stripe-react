const express = require('express');
const app = express();
const cors= require('cors');
const path= require('path');
require('dotenv').config();
const port= process.env.PORT||5001;
const stripe = require('stripe')(process.env.STRIPE_SK)


//middleware
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'client/build')));

// if (process.env.NODE_ENV==='production') {

//     app.use(express.static(path.join(__dirname, 'client/build')));
    
//     }

app.post('/create-checkout-session', async (req,res)=>{

   
    try {
        const customer = await stripe.customers.create(
            );
            
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['bacs_debit'],
            mode: 'setup',
            customer: customer.id,
            success_url: 'https://davidphillips.com?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'https://davidphillips.com/',
          });
          res.send({
            sessionId: session.id,
          });

    } catch (error) {
        error.message

        console.log(error)
    }

   
    
})

app.get("*", (req, res)=>{
 
    res.sendFile(path.join(__dirname, "client/build", "index.html"))
  })


app.listen(port, ()=>{console.log(`running on ${port}`)});