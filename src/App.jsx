import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login'
import ExploreMenuPage from './pages/ExploreMenuPage'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'

export default function App() {

  const [showLogin, setShowLogin] = useState(false)
  return (
    <>
    {showLogin ? <Login setShowLogin={setShowLogin}/> : <></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/explore-menu' element={<ExploreMenuPage />} />
          <Route path='/contact-us' element={<Contact />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}