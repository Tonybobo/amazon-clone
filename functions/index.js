const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51I4nW3CK505ToBVyNefqD4ZJ2JuQXTeXtXiwcPpKd1H8xijUqXfVImenwMo1bURe5c11dDRTfoIgdjqCVyQOpnMi00rf83y3CL');

//App config

const app = express();

//middleware

app.use(cors({origin:true}));
app.use(express.json());

//API routess
app.get('/',(req,res)=>{
    res.status(200).send('It works');
})

app.post('/payments/create',async(request,response)=>{
    const total = request.query.total;
    console.log('payment request received', total);
    const paymentIntent = await stripe.paymentIntents.create({
        amount:total, //sub-unit
        currency:"usd"
    });
    response.status(201).send({
        clientSecret : paymentIntent.client_secret,
    });
});
//Listen 

exports.api = functions.https.onRequest(app)


//http://localhost:5001/clone-a04c2/us-central1/api
