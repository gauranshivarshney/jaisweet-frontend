import React, { useState } from 'react'
import ExploreMenu from '../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../components/FoodDisplay/FoodDisplay'

export default function ExploreMenuPage() {

    const [category, setCategory] = useState('')
    const [activeSection, setActiveSection] = useState(null)

  return (
    <div>
      <ExploreMenu category={category} setCategory={setCategory} activeSection={activeSection} setActiveSection={setActiveSection} />
      <FoodDisplay category={category} activeSection={activeSection} />
    </div>
  )
}
