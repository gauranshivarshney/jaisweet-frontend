import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function PlaceOrder() {

  const { getTotalAmountCart, cartItems, clearCart } = useContext(StoreContext)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')

  const [formFields, setFormFields] = useState({
    name: '',
    phone: '',
    address: ''
  })

  const onChangeInput = (e) => {
    setFormFields(() => ({
      ...formFields,
      [e.target.name]: e.target.value
    }))
  }

  const subtotal = getTotalAmountCart();
  const deliveryFee = subtotal > 0 ? 50 : 0;
  const totalAmount = subtotal + deliveryFee;

  const createOrder = async () => {
    const response = await axios.post('https://jai-sweet-backend.onrender.com/api/payment/create-order', {
      amount: totalAmount * 100,
      currency: 'INR',
      receipt: 'order_rcptid_' + formFields.name
    })
    return response.data
  }
  
  const checkout = async (e) => {
    e.preventDefault()
    const order = await createOrder();

    const addressInfo = {
      name: formFields.name,
      phone: formFields.phone,
      address: formFields.address
    }

    var options = {
      key: 'rzp_test_089xtzoohYrmlL',
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,
      name: 'Jai Sweets',
      description: 'Order Payment',
      handler: async function (response) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
        const paymentID = response.razorpay_payment_id
        const payLoad = {
          userId,
          name: addressInfo.name,
          phone: addressInfo.phone,
          address: addressInfo.address,
          amount: totalAmount,
          paymentId: order.id,
          products: Object.values(cartItems).map(item => ({
            id: item.id || item._id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            category: item.category,
            subcategory: item.subcategory
          })),
          paymentStatus: 'Completed'
        }
        try {
          await axios.post('https://jai-sweet-backend.onrender.com/api/order/create', payLoad, {headers: {Authorization: `Bearer ${token}`}})
          clearCart()
          navigate('/')
        }
        catch (error) {
          console.error(error)
        }
      },
      prefill: {
        name: formFields.name,
        contact: formFields.phone
      },
      theme: {
        color: "#F37254"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    rzp.on('payment.failed', async function (response) {
      alert("Payment Failed! Reason: " + response.error.description);
  
      const payLoad = {
        userId,
        name: addressInfo.name,
        phone: addressInfo.phone,
        address: addressInfo.address,
        amount: totalAmount,
        paymentId: order.id,
        products: cartItems,
        paymentStatus: 'Failed' 
      }
  
      try {
        await axios.post('https://jai-sweet-backend.onrender.com/api/order/create', payLoad, { headers: { Authorization: `Bearer ${token}` } });
      } catch (error) {
        console.error(error);
      }
    });
  }

  useEffect(() => {
    if(!token){
      navigate('/cart')
    }
    else if(getTotalAmountCart() === 0){
      navigate('/cart')
    }
  }, [token])

  return (
    <form className='place-order' onSubmit={checkout}>
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className='multi-fields'>
          <input type="text" placeholder='Name' name='name' onChange={onChangeInput} />
        </div>
        <input type="text" placeholder='Phone' name='phone' onChange={onChangeInput} />
        <textarea type="text" placeholder='Address' name='address' onChange={onChangeInput} />
      </div>
      <div className='place-order-right'>
        <div className='cart-total'>
          <h2>Cart Totals</h2>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>Rs. {subtotal.toFixed(2)}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p>Rs. {getTotalAmountCart() === 0 ? 0 : deliveryFee.toFixed(2)}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <b>Total</b>
              <b>Rs. {getTotalAmountCart() === 0 ? 0 : totalAmount.toFixed(2)}</b>
            </div>
            <button type="submit">PROCEED TO PAYMENT</button>
          </div>
        </div>
      </div>
    </form>
  )
}