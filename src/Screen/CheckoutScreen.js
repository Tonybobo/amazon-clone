import React from 'react';
import './CheckoutScreen.css';
import Subtotal from './../Component/Subtotal';

function checkOutScreen() {
    return (
        <div className="checkout">
              <div className="checkout__left">
                <img className="checkout__ad" src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668.jpg" alt=""/>
                <h2 className="checkout__title">
                    Your Shopping Basket
                </h2>
            </div>
            
           <div className="checkout__right">
                <Subtotal/>
            </div>
            
        </div>
    )
}

export default checkOutScreen


