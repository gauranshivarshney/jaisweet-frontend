import React from 'react';
import './Contact.css';
import { assets } from '../../assets/assets'

export default function Contact() {

  const onSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)

    formData.append("access_key", "f64279a1-53a3-4acd-939f-4ec5687c28db")

    const object = Object.fromEntries(formData)
    const json = JSON.stringify(object)

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json())

    if(res.success){
      console.log("Success", res)
    }
  }
  return (
    <div className="contact-container">
      <div className="contact-content">
        <div className="contact-text-container">
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-text">
            Feel free to reach out to us for any inquiries or feedback!
          </p>
          <form className="contact-form" onSubmit={onSubmit} encType='multipart/form-data'>
            <label>Name:</label>
            <input type="text" placeholder="Enter your name" required />
            <label>Email:</label>
            <input type="email" placeholder="Enter your email" required />
            <label>Message:</label>
            <textarea placeholder="Enter your message" rows="4" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
        <div className="contact-image-container">
          <img src={assets.contact} alt="Contact Us" className="contact-image" />
        </div>
      </div>
    </div>
  );
}