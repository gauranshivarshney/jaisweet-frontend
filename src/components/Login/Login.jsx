import React, { useContext, useState } from 'react'
import './Login.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

export default function Login({setShowLogin}) {
  
  const {url, setToken} = useContext(StoreContext)

    const [currState, setCurrState] = useState("Sign Up")
    const [data, setData] = useState({
      name: '',
      email: '',
      password: ''
    })

    const onChangeHandler = (e) => {
      const name = e.target.name
      const value = e.target.value
      setData(data => ({
        ...data,
        [name]: value
      }))
    }

    const onLogin = async (e) => {
      e.preventDefault()
      let newUrl = url
      if(currState === 'Login'){
        newUrl += '/api/user/login'
      }
      else{
        newUrl += '/api/user/register'
      }

      const response = await axios.post(newUrl, data)
      
      if(response.data.success){
        setToken(response.data.token)
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("userId", response.data.userId)
        console.log('User ID saved:', response.data.userId) 
        setShowLogin(false)
      }
      else{
        alert(response.data.message)
      }
    }

  return (
    <div className='login'>
      <form className='login-container' onSubmit={onLogin}>
        <div className='login-title'>
            <h2>{currState}</h2>
            <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt='' />
        </div>
        <div className='login-inputs'>
            {currState === "Login" ? <></> : <input type="text" placeholder='Your name' name='name' onChange={onChangeHandler} value={data.name} required />}
            <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Your email' required />
            <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder='Password' required />
        </div>
        <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className='login-condition'>
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click Here</span></p> : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login Here</span></p>}
      </form>
    </div>
  )
}