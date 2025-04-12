import React, { useState } from 'react';
import './ExploreMenu.css';
import { menu_list, foods_list } from '../../assets/assets';

export default function ExploreMenu({ category, setCategory, activeSection, setActiveSection }) {

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setCategory(''); 
  };

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our Menu</h1>
      <p className='explore-menu-text'>Choose from a diverse menu featuring a delectable array of dishes.</p>
      <div className='explore-menu-toggle'>
        <button
          className={`toggle-btn ${activeSection === 'Sweets' ? 'active' : ''}`}
          onClick={() => handleSectionChange('Sweets')}
        >
          🍬 Sweets
        </button>
        <button
          className={`toggle-btn ${activeSection === 'Restaurants' ? 'active' : ''}`}
          onClick={() => handleSectionChange('Restaurants')}
        >
          🍽️ Restaurants
        </button>
      </div>

      {activeSection === 'Sweets' && (
        <div className='explore-menu-list'>
          {menu_list.map((item, index) => (
            <div
            onClick={() => setCategory(prev => prev === item.menu_name ? 'All' : item.menu_name)}
              key={index}
              className='explore-menu-list-item'
            >
              <img
                src={item.menu_image}
                alt=''
                className={category === item.menu_name ? 'active' : ''}
              />
              <p>{item.menu_name}</p>
            </div>
          ))}
        </div>
      )}

      {activeSection === 'Restaurants' && (
        <div className='explore-menu-list'>
          {foods_list.map((item, index) => (
            <div
              onClick={() => setCategory(prev => prev === item.food_name ? 'All' : item.food_name)}
              key={index}
              className='explore-menu-list-item'
            >
              <img
                src={item.food_image}
                alt=''
                className={category === item.food_name ? 'active' : ''}
              />
              <p>{item.food_name}</p>
            </div>
          ))}
        </div>
      )}
      <hr />
    </div>
  );
}