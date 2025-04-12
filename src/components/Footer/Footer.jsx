import React from 'react'
import './Footer.css'
import {assets} from '../../assets/assets'
import {Link} from 'react-router-dom'

export default function Footer() {
  
  return (
    <div className='footer' id='footer'>
      <div className='footer-content'>
        <div className='footer-content-left'>
            <img src={assets.logo} alt='' className='logo1'/>
            <p>Spreading Sweetness in Every Bite – Jai Sweets, Where Tradition Meets Taste! 🍬✨</p>
            <div className='footer-social-icons'>
                <a href='https://www.facebook.com/jai.sweets.90' target='_blank'><img src={assets.facebook_icon} alt=''/></a>
                <a href='https://www.instagram.com/jaisweets765/' target='_blank'><img className='insta' src={assets.instagram_icon} alt='' /></a>
                <a href='mailto:krishnakumarvarshney154@gmail.com' target='_black'><img className='gmail' src={assets.gmail_icon} alt='' /></a>
            </div>
        </div>
        <div className='footer-content-center'>
            <h2>QUICK LINKS</h2>
            <ul>
                <Link to='/'><li>Home</li></Link>
                <Link to='/about'><li>About</li></Link>
                <Link to='/contact-us'><li>Contact Us</li></Link>
            </ul>
        </div>
        <div className='footer-content-right'>
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+91 9045373235</li>
                <li>krishnakumarvarshney154@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className='footer-copyright'>
        Copyright 2025 © JaiSweets.com - All Right Reserved
      </p>
    </div>
  )
}