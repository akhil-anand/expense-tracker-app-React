import React, { useState } from 'react'
import { Box, Container, Typography } from '@mui/material'
import { CustomTextButton } from '../../components/text-button/TextButton'
import { CustomTextInput } from '../../components/text-input/TextInput'
import { useNavigate } from 'react-router-dom'

import CategoryComponent from '../../components/category-component/CategoryComponent'

import AddIcon from '@mui/icons-material/Add';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const AddPayment = () => {

    const [formData, setFormData] = useState({})
    const navigate = useNavigate()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation()
    }

    return (
        <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Typography variant='h4' style={{ color: '#333', fontWeight: 'bold', marginBottom: '16px' }}>Add Expense</Typography>
            <Box component="form" onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'Column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 2,
                    gap: 2,
                    minWidth: 500
                }}>
                <CustomTextInput size='small' label="Enter Amount" />
                <CustomTextInput size='small' label="Enter Description" />
                <CategoryComponent />
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <CustomTextButton variant="contained" sx={{borderRadius: 5}} color="success">
                        <AddShoppingCartIcon /></CustomTextButton>
                    <CustomTextButton variant="outlined" sx={{borderRadius: 5}} onClick={() => navigate('/dashboard')}>DashBoard</CustomTextButton>
                </Box>
            </Box>
        </Container>
    )
}

export default AddPayment