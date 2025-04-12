import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import RestaurantDisplay from '../RestaurantDisplay/RestaurantDisplay';

export default function FoodDisplay({ category, activeSection }) {
  
  const { food_list } = useContext(StoreContext);

  if (!activeSection || !category) return null;

  if (activeSection === 'Sweets') {
    return (
      <div className="food-display" id="food-display">
        <h2>Top {category} near you</h2>
        <div className="food-display-list">
          {food_list
            .filter(item => item.category === category) 
            .map((item, index) => (
              <FoodItem
                key={`sweet-${index}`}
                id={item._id}
                name={item.name}
                image={item.image}
                rate={item.rate}
                category={item.category}
                type="sweet"
              />
            ))}
        </div>
      </div>
    );
  }

  if (activeSection === 'Restaurants') {
    return <RestaurantDisplay category={category} />
  }

  return null;
}