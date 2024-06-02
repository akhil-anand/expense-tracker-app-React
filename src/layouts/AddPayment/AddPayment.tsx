import React, { useState } from 'react'
import { Box, Container, Typography } from '@mui/material'
import { CustomTextButton } from '../../components/text-button/TextButton'
import { CustomTextInput } from '../../components/text-input/TextInput'
import { useNavigate } from 'react-router-dom'

const AddPayment = () => {

    const [formData, setFormData] = useState({})
    const navigate = useNavigate()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation()
    }

    return (
        <Container style={{ display: 'flex', flexDirection:'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Typography variant='h4' >Add Expense</Typography>
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
                <CustomTextInput label="Enter Amount" />
                <CustomTextInput label="Enter Description" />
                <Box sx={{display: 'flex', gap: 2}}>
                    <CustomTextButton variant="contained">Add Payment</CustomTextButton>
                    <CustomTextButton variant="contained" onClick={()=> navigate('/dashboard')}>DashBoard</CustomTextButton>
                </Box>
            </Box>
        </Container>
    )
}

export default AddPayment