import React, { useEffect, useState } from 'react'
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import DevicesIcon from '@mui/icons-material/Devices';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { Box } from '@mui/material';

import './styles.css'

const CategoryComponent = () => {

    const [activeCategory, setActiveCategory] = useState<null | string>(null)

    const icon_components = [
        { name: 'grocery', component: <LocalGroceryStoreIcon /> },
        { name: 'utilities', component: <DevicesIcon /> },
        { name: 'petrol', component: <LocalGasStationIcon /> },
        { name: 'hangout', component: <FastfoodIcon /> }]

        const handleCategoryClick = (name:string): any => {
            console.log('set name', name)
            return setActiveCategory(name)
        }

    return (
        <Box sx={{ display: 'flex', gap: 2 }}>
            {icon_components?.map(({ name,component }, index) => <div key={name + index}
            className={`${activeCategory === name ? 'active-category' : ''} category-icon`} onClick={() => handleCategoryClick(name)}>
                {component}
            </div>)}
        </Box>
    )
}

export default CategoryComponent