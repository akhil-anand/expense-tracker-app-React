import React, { useEffect, useState } from 'react'
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import DevicesIcon from '@mui/icons-material/Devices';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { Box } from '@mui/material';

import './styles.css'

const CategoryComponent = ({ value, updateCategory }: any) => {

    const [activeCategory, setActiveCategory] = useState<null | string>(null)

    const icon_components = [
        { name: 'Groceries', component: <LocalGroceryStoreIcon /> },
        { name: 'Utilities', component: <DevicesIcon /> },
        { name: 'Gas', component: <LocalGasStationIcon /> },
        { name: 'Social', component: <FastfoodIcon /> }]

    const handleCategoryClick = (name: string): any => {
        console.log('set name', name)
        return setActiveCategory(name)
    }

    useEffect(() => {
        if (activeCategory)
            updateCategory(activeCategory, 'category')
    }, [activeCategory])

    useEffect(() => {
        setActiveCategory(value)
    }, [value])

    return (
        <Box sx={{ display: 'flex', gap: 2 }}>
            {icon_components?.map(({ name, component }, index) => <div key={name + index}
                className={`${activeCategory === name ? 'active-category' : ''} category-icon`} onClick={() => handleCategoryClick(name)}>
                {component}
            </div>)}
        </Box>
    )
}

export default CategoryComponent