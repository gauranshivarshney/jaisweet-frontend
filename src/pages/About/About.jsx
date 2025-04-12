import React from 'react';
import './About.css';
import { assets } from '../../assets/assets';

export default function About() {
    
    return (
        <div className="container">
            <div className="about-container">
                <h1 className="about-title">About Us</h1>
                <div className="about-content">
                    <div className="about-text-container">
                        <h1 className="about-heading1">
                            Welcome to Jai Sweets - Where Tradition Meets Taste!
                        </h1>
                        <p className="about-text">
                            At Jai Sweets, we specialize in creating premium mithai, crafted with the finest ingredients and time-honored recipes passed down through generations. Whether you're indulging in the rich sweetness of laddus, the smooth delight of barfis, or the exotic flavors of kaju katlis, each treat is lovingly made to bring joy to your special moments. Experience the true essence of Indian sweets at Jai Sweets, and let us make your celebrations even sweeter!
                        </p>
                        <h2 className="about-heading">Why Choose Us?</h2>
                        <ul className="about-list">
                            <li>Authentic, handmade mithai</li>
                            <li>Made with the finest ingredients</li>
                            <li>Passionately crafted with love</li>
                            <li>A wide variety of traditional and fusion sweets</li>
                            <li>Perfect for all occasions</li>
                        </ul>
                        <h2 className="about-heading">Join Us in Celebrating Jai Sweets</h2>
                        <p className="about-text">
                            Whether you're indulging in a family favorite or exploring a new flavor, we invite you to experience the magic of our mithai. Let us be part of your celebrations, making each moment sweeter than the last!
                        </p>
                    </div>
                    <div className="about-image-container">
                        <img src={assets.about} alt="About Jai Sweets" className="about-image" />
                    </div>
                </div>
            </div>
        </div>
    );
}