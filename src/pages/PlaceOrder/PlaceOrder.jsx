import { useContext, useEffect, useState } from 'react'
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
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }))
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

    const { name, phone, address } = formFields;
    if (!name || !phone || !address) {
      alert('Please fill all fields');
      return;
    }

    try {
      const order = await createOrder();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: 'Jai Sweets',
        description: 'Order Payment',
        handler: async function (response) {
          alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
          await saveOrder(response.razorpay_payment_id, 'Completed', order.id);
          clearCart();
          navigate('/');
        },
        prefill: { name, contact: phone },
        theme: {
          color: "#F37254"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on('payment.failed', async function (response) {
        alert("Payment Failed! Reason: " + response.error.description);
        await saveOrder(null, 'Failed', order.id)
      });
    }
    catch (error) {
      console.error(error);
    }
  }

  const saveOrder = async (paymentId, status, razorpayOrderId) => {
    const orderPayload = {
      userId,
      name: formFields.name,
      phone: formFields.phone,
      address: formFields.address,
      amount: totalAmount,
      paymentId: razorpayOrderId,
      products: Object.values(cartItems).map(item => ({
        id: item.id || item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        category: item.category,
        subcategory: item.subcategory
      })),
      paymentStatus: status
    };

    try {
      await axios.post(
        'https://jai-sweet-backend.onrender.com/api/order/create',
        orderPayload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/cart')
    }
    else if (getTotalAmountCart() === 0) {
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