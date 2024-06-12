import axios from "axios"

export const addExpenseToDB = async (req) => {
    try {
        const token = localStorage.getItem('token');
        await axios.post('https://shimmering-marsh-raisin.glitch.me/addExpense', req, {
            headers: {
                Authorization: token
            }
        });
        console.log('Data added successfully');
        return 'success';
    } catch (error) {
        console.error('Error adding data:', error);
        return 'error';
    }
};

export const fetchExpenseData = async (req, res) => {
    await axios.get('https://shimmering-marsh-raisin.glitch.me/getExpense')
        .then((res) => console.log('data fetched successfully', res))
        .catch((error) => console.log(error))
    return
}
export const fetchMonthlyExpenseData = async (req, res) => {
    await axios.get('https://shimmering-marsh-raisin.glitch.me/getMonthlyExpense')
        .then((res) => {
            console.log('data fetched successfully', res)
            return res.data
        })
        .catch((error) => console.log(error))
    return
}