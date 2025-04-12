import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

export default function Header() {
  
  return (
    <>
      <div className='header'>
        <div className='header-contents'>
          <h2>Order your favourite sweet here</h2>
          <p>Delicious sweets, made fresh for you!</p>
          <Link to='/explore-menu'><button>View Menu</button></Link>
        </div>
      </div>
    </>
  )
}