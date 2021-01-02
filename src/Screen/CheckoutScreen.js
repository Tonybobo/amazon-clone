import React from 'react';
import './CheckoutScreen.css';
import Subtotal from './../Component/Subtotal';
import CheckoutProduct from './../Component/CheckoutProduct';
import { Fade,Stagger } from "react-animation-components";
import { useSelector } from 'react-redux';

function CheckOutScreen() {

    const basket = useSelector(state=> state.basket);
    const user = useSelector(state => state.user);

    return (
        <div className="checkout">
              <div className="checkout__left">
                <img className="checkout__ad" src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668.jpg" alt=""/>
                <div>
                <h3>Hello {user?.email}</h3>
                <h2 className="checkout__title">
                    Your Shopping Basket</h2>
                    <Stagger in>
                    {basket.map(item=>(
                        <Fade out>
                        <CheckoutProduct
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        price={item.price}
                        image={item.image}
                        rating={item.rating}/>
                       </Fade>
                    ))}
                    </Stagger>
                    
                
                </div>
                
            </div>
            
           <div className="checkout__right">
                <Subtotal/>
            </div>
            
        </div>
    )
}

export default CheckOutScreen


