import React, { useState } from 'react'
import { Box, Container, InputAdornment, Typography } from '@mui/material'
import { CustomTextButton } from '../../components/text-button/TextButton'
import { CustomTextInput } from '../../components/text-input/TextInput'
import { useNavigate } from 'react-router-dom'

import CategoryComponent from '../../components/category-component/CategoryComponent'

import AddIcon from '@mui/icons-material/Add';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { addExpenseToDB } from '../../commonMethods'
import './AddPayment.css'
import moment from 'moment'

const AddPayment = () => {

    const [formData, setFormData] = useState({ amount: 0, category: null, description: null })
    const [showError, setShowError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();

        if (formData?.category && formData?.description && formData?.amount) {
            const response = await addExpenseToDB({
                price: formData?.amount,
                category: formData?.category,
                description: formData?.description,
                dateOfPurchase: moment(new Date()).format('DD-MM-YYYY'),
                month: new Date().getMonth() < 10 ? ('0' + (new Date().getMonth() + 1)) : (new Date().getMonth() + 1),
                year: new Date().getFullYear()
            })
            if(response === 'success'){
                setFormData({ amount: 0, category: null, description: null })    
                displaySuccessMessage()            
            }
        } else {
            setShowError('Select all fields')
        }
    }

    const displaySuccessMessage = () => {
        setShowError('SuccessFully Added the record')
        setTimeout(() => {
            setShowError('')
        }, 5000);
    }

    const handleCategoryChange = (value: string, category: string) => {
        setShowError('')
        if (category) {
            setFormData(prevState => { return { ...prevState, [category]: value } })
        }
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
                <CustomTextInput
                    type='number'
                    value={formData?.amount ?? 0}
                    onChange={(event) => handleCategoryChange(event.target.value, 'amount')}
                    size='small'
                    label="Enter Amount"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                    }}
                />

                <CustomTextInput value={formData?.description ?? ''} onChange={(event) => handleCategoryChange(event.target.value, 'description')} size='small' label="Enter Description"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">☴</InputAdornment>,
                    }
                    }
                />
                <CategoryComponent value={formData?.category} updateCategory={handleCategoryChange} />
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <CustomTextButton type='submit' variant="contained" sx={{ borderRadius: 5 }} color="success">
                        <AddShoppingCartIcon /></CustomTextButton>
                    <CustomTextButton variant="outlined" sx={{ borderRadius: 5 }} onClick={() => navigate('/dashboard')}>DashBoard</CustomTextButton>
                </Box>
            </Box>
            <Typography>{showError}</Typography>
        </Container>
    )
}

export default AddPayment