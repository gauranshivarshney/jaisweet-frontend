import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

export default function RestaurantDisplay({ category }) {

  const { restaurant_list } = useContext(StoreContext);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState('');

  useEffect(() => {
    const filtered = restaurant_list.filter(item => item.category.toLowerCase() === category.toLowerCase());
    const uniqueSubCats = [...new Set(filtered.map(item => item.subcategory).filter(Boolean))];
    setSubCategories(uniqueSubCats);
    setSelectedSubCategory(uniqueSubCats[0] || '');
  }, [category, restaurant_list]);

  const displayList = restaurant_list.filter(item =>
    item.category.toLowerCase() === category.toLowerCase() && item.subcategory === selectedSubCategory
  );

  return (
    <div className="restaurant-display" id="restaurant-display">
      <h2>{category} Dishes</h2>
      <div className="subcategory-box-container">
        {subCategories.map((subcat, idx) => (
          <div
            key={idx}
            className={`subcategory-box ${selectedSubCategory === subcat ? 'active' : ''}`}
            onClick={() => setSelectedSubCategory(subcat)}
          >
            {subcat}
          </div>
        ))}
      </div>
      <div className="food-display-list">
        {displayList.map((item, index) => (
          <FoodItem
            key={`restaurant-${index}`}
            id={item._id}
            name={item.name}
            /*image={item.image}*/
            rate={[{ weight: 'Standard', price: item.price }]}
            type="restaurant"
            price={item.price}
            category={item.category}
            subcategory={item.subcategory}
          />
        ))}
      </div>
    </div>
  );
}
