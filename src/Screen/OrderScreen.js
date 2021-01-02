import React, {useEffect,useState} from 'react';
import './OrderScreen.css';
import {db} from '../firebase';
import { useStateValue } from './../StateProvider';
import Order from './../Component/Order';
function OrderScreen() {
    const [orders,setOrders] = useState([]);
    const [{user,basket},dispatch] = useStateValue();
    useEffect(() => {
        if(user){
            db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .orderBy('created', 'desc')
            .onSnapshot(snapshot => (
                setOrders(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            ))
        }else{
            setOrders([])
        }
       
    }, [user])
    return (
        <div className="orders">
            <h1>Your Orders</h1>
            <div className="orders__order">
                {orders?.map(item=>(
                    <Order order={item}/>
            ))}
            </div>
        </div>
    )
}

export default OrderScreen
