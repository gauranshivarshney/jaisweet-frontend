import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import {useNavigate} from 'react-router-dom'

export default function Cart() {

  const { cartItems, removeFromCart, getTotalAmountCart, url } = useContext(StoreContext)
  const navigate = useNavigate()
  const subtotal = parseFloat(getTotalAmountCart()) || 0
  const deliveryFee = 50
  const totalAmount = subtotal + deliveryFee

  const handleCheckout = () => {
    console.log(cartItems)
    if(subtotal === 0){
      alert('Amount is too low to proceed! Please add items to the cart')
      return
    }
    navigate('/order')
  }

  return (
    <div className='cart'>
      <div className='cart-items'>
        <div className='cart-items-title'>
          <p>Items</p>
          <p>Title</p>
          <p>Category</p>
          <p>Subcategory</p>
          <p>Weight</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {Object.entries(cartItems).map(([key, value]) => {
          if (value.quantity > 0) {
            return (
              <div key={value.id || key}>
                <div className='cart-items-title cart-items-item'>
                  
                  <p>{value.name}</p>
                  <p>{value.category}</p>
                  <p>{value.subcategory}</p>
                  <p>{value.weight}</p>
                  <p>{value.price}</p>
                  <p>{value.quantity}</p>
                  <p>Rs.{(value.price * value.quantity).toFixed(2)}</p>
                  <p onClick={() => removeFromCart(value.id, value.weight, value.name, value.category, value.subcategory)} className='cross'>X</p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className='cart-bottom'>
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
              <p>Rs. {subtotal === 0 ? "0.00" : deliveryFee.toFixed(2)}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <b>Total</b>
              <b>Rs. {subtotal === 0 ? "0.00" : totalAmount.toFixed(2)}</b>
            </div>
            <button onClick={handleCheckout} disabled={subtotal === 0} style={{backgroundColor: subtotal === 0 ? '#ccc' : 'red', cursor: subtotal === 0 ? 'not-allowed' : 'pointer'}}>{subtotal === 0 ? 'Amount Too Low' : 'PROCEED TO CHECKOUT'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}