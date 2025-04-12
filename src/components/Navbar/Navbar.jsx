import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import {Link, NavLink, useNavigate} from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

export default function Navbar({setShowLogin}) {
  
  const {getTotalAmountCart, token, setToken, setCartItems} = useContext(StoreContext)
  const [menuOpen, setMenuOpen] = useState(false)

  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("cartItems")
    localStorage.removeItem("userId")
    setToken("")
    setCartItems({})
    navigate("/")
  }

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt='' className='logo'/></Link>
      <ul className='navbar-menu'>
        <NavLink to='/' className={({isActive}) => (isActive ? 'active' : '')}>Home</NavLink>
        <NavLink to='/about' className={({isActive}) => (isActive ? 'active' : '')}>About</NavLink>
        <NavLink to='/explore-menu' className={({isActive}) => (isActive ? 'active' : '')}>Menu</NavLink>
        <NavLink to='/contact-us' className={({isActive}) => (isActive ? 'active' : '')}>Contact Us</NavLink>
      </ul>
      <div className='navbar-right'>
        <div className='navbar-basket-icon'>
          <Link to='/cart'><img src={assets.basket_icon} alt='' /></Link>
          <div className={getTotalAmountCart() === 0 ? "" : "dot"}></div>
        </div>
        {!token
        ? <button onClick={() => setShowLogin(true)}>Sign In</button>
        : <div className='navbar-profile'>
            <img src={assets.profile_icon} alt='' />
            <ul className='nav-profile-dropdown'>
              <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt='' /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt='' /><p>Logout</p></li>
            </ul>
          </div>
        }
      </div>
      <div className='hamburger-menu'>
        <img src={assets.hamburger_icon} alt='' onClick={() => setMenuOpen(!menuOpen)} />
      </div>
      <div className={`navbar-slider ${menuOpen ? 'open' : ''}`}>
        <div className='close-icon' onClick={() => setMenuOpen(false)}>
          <img src={assets.cross_icon} alt='' />
        </div>
        <ul className='navbar-slider-menu'>
          <NavLink to='/' className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to='/about' className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setMenuOpen(false)}>About</NavLink>
          <NavLink to='/explore-menu' className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setMenuOpen(false)}>Menu</NavLink>
          <NavLink to='/contact-us' className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setMenuOpen(false)}>Contact Us</NavLink>
        </ul>
      </div>
    </div>
  )
}