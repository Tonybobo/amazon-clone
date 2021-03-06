import React,{useEffect, useState} from 'react';
import './PaymentScreen.css';
import CheckoutProduct from '../Component/CheckoutProduct';
import { Link, useHistory } from 'react-router-dom';
import {CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from '../store';
import axios from '../axios';
import {db} from '../firebase';
import { useDispatch, useSelector } from 'react-redux';


function PaymentScreen() {
    const user = useSelector(state=>state.user);
    const basket = useSelector(state=>state.basket);
    const dispatch = useDispatch();
    const history = useHistory();
    const stripe = useStripe();
    const elements = useElements();

    const [error,setError] = useState(null);
    const [disabled, setDisabled] = useState (true);
    const [succeeded, setSucceeded] = useState (false);
    const [processing , setProcessing] = useState("");
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(()=>{
        const getClientSecret = async () =>{
            const response = await axios({
                method:'post',
                url:`payments/create?total=${getBasketTotal(basket)*100 }`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    },[basket])

    console.log(clientSecret);
    
    const handleSubmit = async (event) =>{
        event.preventDefault();
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:elements.getElement(CardElement)
            }
        }).then(({paymentIntent})=>{

            db.collection('users').doc(user?.uid).collection('orders')
            .doc(paymentIntent.id)
            .set({
                basket:basket,
                amount:paymentIntent.amount,
                created:paymentIntent.created
                
            });

            setSucceeded(true);
            setError(null);
            setProcessing(false);
            dispatch({
                type:'EMPTY_BASKET'
            })
            history.replace('/orders')
        })
    }
    const handleChange = (event) =>{
        setDisabled(event.empty);
        setError(event.error? event.error.message : "");
    }
    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout (<Link to="/checkout">{basket.length} items</Link>)
                </h1>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>Blk 32333 Jalan Bahagia #00-000</p>
                        <p>Singapore 333333</p>
                    </div>

                </div>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3> Review items and delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {basket.map((item)=>(
                            <CheckoutProduct
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            image={item.image}
                            rating={item.rating}/>
                        ))}
                    </div>
                </div>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className="payment__priceContainer">
                            <CurrencyFormat
                                    renderText={(value) => (
                                    <>
                                        <h3>
                                        {/* Part of the homework */}
                                        Order Total ({basket.length} items): <strong>{value}</strong>
                                        </h3>
                                      
                                    </>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)} // Part of the homework
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing ||disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentScreen
