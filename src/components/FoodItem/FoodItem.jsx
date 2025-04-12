import React, { useContext, useState } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

export default function FoodItem({ id, name, image, rate, type = 'sweet', price, category, subcategory }) {
    
    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

    const [selectedWeight, setSelectedWeight] = useState(() => {
        if (type === 'sweet') {
            return rate[0];
        }
        return { weight: 'Standard', price: price };
    });

    const handleAddItem = () => {
        const numericPrice = typeof selectedWeight.price === "string"
            ? selectedWeight.price.replace("Rs. ", "")
            : selectedWeight.price;
        addToCart(id, selectedWeight.weight, numericPrice, name, image, type, category, subcategory);
    };

    const handleRemoveItem = () => {
        removeFromCart(id, selectedWeight.weight, name, type, category, subcategory);
    };

    const handleWeightChange = (e) => {
        const newWeight = rate.find(item => item.weight === e.target.value);
        setSelectedWeight(newWeight);
    };

    const key = `${type}-${id}-${selectedWeight.weight}-${name}`;
    const itemCount = cartItems[key]?.quantity || 0;

    return (
        <div className={`food-item ${type === 'restaurant' ? 'restaurant-style' : ''}`}>
            {type === 'sweet' && (
                <div className='food-item-img-container'>
                    <img className='food-item-image' src={`${url}${image}`} alt='' />
                </div>
            )}
            <div className='food-item-info'>
                <div className='food-item-name'>
                    <p>{name}</p>
                </div>
                {type === 'sweet' ? (
                    <select className='weight-selector' onChange={handleWeightChange}>
                        {rate.map((item, index) => (
                            <option key={index} value={item.weight}>
                                {item.weight} - Rs. {item.price}
                            </option>
                        ))}
                    </select>
                ) : (
                    <p className='restaurant-price'>Rs. {price}</p>
                )}
                <div className='food-item-counter-row'>
                    {itemCount > 0 ? (
                        <div className='food-item-counter'>
                            <img onClick={handleRemoveItem} src={assets.remove_icon_red} alt='' className='counter-icon' />
                            <p>{itemCount}</p>
                            <img onClick={handleAddItem} src={assets.add_icon_green} alt='' className='counter-icon' />
                        </div>
                    ) : (
                        <div className='food-item-add-wrapper'>
                            <img className='add' onClick={handleAddItem} src={assets.add_icon_white} alt='' />
                        </div>
                    )}
                </div>
            </div>

            <div className='food-item-quantity-list'>
                {Object.entries(cartItems)
                    .filter(([key, value]) => key.startsWith(`${type}-${id}-`) && value.name === name)
                    .map(([key, value]) => (
                        <p key={key}>
                            {type === 'sweet' ? `${value.weight}: ` : ''}{value.quantity} quantity
                        </p>
                    ))
                }
            </div>
        </div>
    );
}
