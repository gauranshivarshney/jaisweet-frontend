import React, { useContext, useState } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

export default function FoodItem({ id, name, image, rate }) {
    const {cartItems, addToCart, removeFromCart, url} = useContext(StoreContext);
    const [selectedWeight, setSelectedWeight] = useState(rate[0])

    const handleAddItem = () => {
        const numericPrice = typeof selectedWeight.price === "string" ? selectedWeight.price.replace("Rs. ", "") : selectedWeight.price
        addToCart(id, selectedWeight.weight, numericPrice, name, image)
    };

    const handleRemoveItem = () => {
        removeFromCart(id, selectedWeight.weight, name)
    };

    const handleWeightChange = (e) => {
        const newWeight = rate.find(item => item.weight === e.target.value)
        setSelectedWeight(newWeight)
    };

    const key = `${id}-${selectedWeight.weight}-${name}`
    const itemCount = cartItems[key]?.quantity || 0

    return (
        <div className='food-item'>
            <div className='food-item-img-container'>
                <img className='food-item-image' src={`${url}${image}`} alt='' name='image' />
                {itemCount  > 0 ? (
                    <div className='food-item-counter'>
                        <img onClick={handleRemoveItem} src={assets.remove_icon_red} alt='' name='image' />
                        <p>{itemCount}</p>
                        <img onClick={handleAddItem} src={assets.add_icon_green} alt='' name='image' />
                    </div>
                ) : (
                    <img className='add' onClick={handleAddItem} src={assets.add_icon_white} alt='' name='image' />
                )}
            </div>

            <div className='food-item-info'>
                <div className='food-item-name'>
                    <p>{name}</p>
                </div>

                <select className='weight-selector' onChange={handleWeightChange}>
                    {rate.map((item, index) => (
                        <option key={index} value={item.weight}>
                            {item.weight} - Rs. {item.price}
                        </option>
                    ))}
                </select>
            </div>
            <div className='food-item-quantity-list'>
                {Object.entries(cartItems)
                .filter(([key, value]) => key.startsWith(`${id}-`) && value.name === name)
                .map(([key, value]) => (
                    <p key={key}>
                        {value.weight}: {value.quantity} quantity
                    </p>
                ))}
            </div>
        </div>
    );
}