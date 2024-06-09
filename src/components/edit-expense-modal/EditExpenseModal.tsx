import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Typography, CircularProgress, InputAdornment } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import moment from 'moment';
import { LoadingButton } from '@mui/lab';

const ExpenseModal = ({ open, handleClose, expense, refreshExpenses }: any) => {

    const [formData, setFormData] = useState<any>({
        price: '',
        category: '',
        description: '',
        dateOfPurchase: null,
        month: '',
        year: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (expense) {
            const date:any = dayjs(moment(expense?.dateOfPurchase).format('MM-DD-YYYY'));
            const month:any = date ? dayjs(date).month() + 1 : '';
            setFormData({
                price: expense.price,
                category: expense.category,
                description: expense.description,
                dateOfPurchase: new Date(expense?.dateOfPurchase),
                month: Number(month) < 10 ? `0${month}` : `${month}`,
                year: date.year()
            });
        }
    }, [expense]);

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

const handleDateChange = (date:any) => {
    const month:any = date ? dayjs(date).month() + 1 : ''; // Get month (1-indexed), or empty string if date is null
    const formattedMonth = Number(month) < 10 ? `0${month}` : `${month}`; // Add leading zero if necessary
    const formattedDate = date ? `${date.toDate()}/${formattedMonth}/${date.year()}` : ''; // Format the date string
    setFormData({
        ...formData,
        dateOfPurchase: new Date(date.toDate()),
        month: formattedMonth, // Update the month in the state
        year: date ? dayjs(date).year() : '', // Update the year in the state
    });
};


    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.put(`https://shimmering-marsh-raisin.glitch.me/updateExpense/${expense._id}`, formData);
            handleClose();
            refreshExpenses();
        } catch (error) {
            console.error('Failed to update expense', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{ ...modalStyle }}>
                <Typography variant="h6" mb={2}>Edit Expense</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        fullWidth
                        size='small'
                        margin="normal"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                        }}
                    />
                    <TextField
                        label="Category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        fullWidth
                        size='small'
                        margin="normal"
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        fullWidth
                        size='small'
                        margin="normal"
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date of Purchase"
                            value={dayjs(formData.dateOfPurchase)}
                            onChange={handleDateChange}
                            slotProps={{ textField: { size: 'small', margin:"normal" } }}
                        />
                    </LocalizationProvider>
                    <TextField
                        label="Month"
                        name="month"
                        value={formData.month}
                        onChange={handleChange}
                        fullWidth
                        size='small'
                        margin="normal"
                        disabled
                    />
                    <TextField
                        label="Year"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        fullWidth
                        size='small'
                        margin="normal"
                        disabled
                    />
                    <Box mt={2} display="flex" justifyContent="flex-end">
                        <Button onClick={handleClose} color="secondary" sx={{ mr: 1 }} disabled={loading}>Cancel</Button>
                        <LoadingButton type="submit" variant="contained" color="primary" loading={loading}>Save</LoadingButton>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

export default ExpenseModal;
