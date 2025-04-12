import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import {StoreContext} from '../../context/StoreContext'
import {assets} from '../../assets/assets'
import axios from 'axios'

export default function MyOrders() {

    const {url, token} = useContext(StoreContext)
    const [data, setData] = useState([])

    const fetchOrders = async () => {
        const response = await axios.post(url + '/api/order/userorders', {}, { headers: { Authorization: `Bearer ${token}` } });
        if (response.data.success) {
            const mergedOrders = response.data.data.map(order => {
                const combinedProducts = order.products.reduce((acc, item) => {
                    const existingItem = acc.find(i => String(i.productId) === String(item.productId));
                    if (existingItem) {
                        existingItem.quantity += item.quantity;
                    } else{
                        acc.push({ ...item });
                    }
                    return acc;
                }, []);
                return { ...order, products: combinedProducts };
            });
            setData(mergedOrders);
        }
    };

    useEffect(() => {
        if(token){
            fetchOrders()
        }
    },[token])

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className='container'>
        {data.map((order, index) => {
            return (
                <div key={index} className='my-orders-order'>
                    <img src={assets.parcel_icon} alt='' />
                    <p>{order.products.map((item, index) => (
                        `${item.name}(${item.category}-${item.subcategory || 'Unknown'}) x ${item.quantity}${index !== order.products.length - 1 ? ', ' : ''}`
                    ))}</p>
                    <p>Rs. {order.amount}.00</p>
                    <p>Items: {order.products.reduce((total, item) => total + item.quantity, 0)}</p>
                    <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                    <button onClick={fetchOrders}>Track Order</button>
                </div>
            )
        })}
      </div>
    </div>
  )
}