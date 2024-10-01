import React, { useState } from 'react'
import { Box, Container, InputAdornment, Typography, useMediaQuery, useTheme } from '@mui/material'
import { CustomTextButton } from '../../components/text-button/TextButton'
import { CustomTextInput } from '../../components/text-input/TextInput'
import { useNavigate } from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

import CategoryComponent from '../../components/category-component/CategoryComponent'

import AddIcon from '@mui/icons-material/Add';
import { LoadingButton } from '@mui/lab';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { addExpenseToDB } from '../../commonMethods'
import './AddPayment.css'
import moment from 'moment'

const AddPayment = () => {
    const [formData, setFormData] = useState({ amount: 0, category: null, description: null, dateOfPurchase: new Date() })
    const [showError, setShowError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        event.stopPropagation();

        setIsLoading(true)
        if (formData?.category && formData?.description && formData?.amount) {
            const response = await addExpenseToDB({
                price: formData?.amount,
                category: formData?.category,
                description: formData?.description,
                dateOfPurchase: formData?.dateOfPurchase,
                month: (new Date().getMonth() < 9 ? '0' : '') + (new Date().getMonth() + 1),
                year: new Date().getFullYear()
            })
            if (response === 'success') {
                setFormData({ amount: 0, category: null, description: null, dateOfPurchase: new Date() })
                displaySuccessMessage()
            }
        } else {
            setShowError('Select all fields')
        }
        setIsLoading(false)
    }

    const displaySuccessMessage = () => {
        setShowError('Successfully Added the record')
        setTimeout(() => {
            setShowError('')
        }, 5000);
    }

    const handleCategoryChange = (value: string | Date, category: string) => {
        setShowError('')
        if (category) {
            setFormData(prevState => { return { ...prevState, [category]: value } })
        }
    }

    return (
        <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', padding: isMobile ? '16px' : '0' }}>
            <Typography variant='h4' style={{ color: '#333', fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>Add Expense</Typography>
            <Box component="form" onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 2,
                    gap: 2,
                    minWidth: isMobile ? '100%' : 500,
                    width: isMobile ? '100%' : 'auto'
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
                <CustomTextInput value={formData?.description ?? ''} onChange={(event: any) => handleCategoryChange(event.target.value, 'description')} size='small' label="Enter Description"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">☴</InputAdornment>,
                    }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Date of Purchase"
                        value={dayjs(formData?.dateOfPurchase)}
                        onChange={(date: any) => handleCategoryChange(new Date(date.toDate()), 'dateOfPurchase')}
                        slotProps={{ textField: { size: 'small', sx:{ width: '14.6em' }}}}
                    />
                </LocalizationProvider>
                <CategoryComponent value={formData?.category} updateCategory={handleCategoryChange} />
                <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2 }}>
                    <LoadingButton loading={isLoading} type='submit' variant="contained" sx={{ borderRadius: 5 }} color="success">
                        <AddShoppingCartIcon />
                    </LoadingButton>
                    <CustomTextButton variant="outlined" sx={{ borderRadius: 5 }} onClick={() => navigate('/dashboard')}>DashBoard</CustomTextButton>
                </Box>
            </Box>
            <Typography>{showError}</Typography>
        </Container>
    )
}

export default AddPayment
