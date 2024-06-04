import React, { useEffect, useState } from 'react';
import DataGridComponent from '../../components/data-grid/DataGridComponent';
import BarChartComponent from '../../components/bar-chart/BarChartComponent';
import { Box, CircularProgress, Container, IconButton, useMediaQuery, useTheme } from '@mui/material';
import moment from 'moment';
import axios from 'axios';
import { GridColDef } from '@mui/x-data-grid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [expensesData, setExpensesData] = useState(null);
  const [chartData, setChartData] = useState<any>({ categories: [], values: [] });
  const [fetchingData, setFetchingData] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const expensesColumn: GridColDef[] = [
    {
      field: 'category',
      headerName: 'Category',
      width: 150,
      editable: true,
    },
    {
      field: 'dateOfPurchase',
      headerName: 'Date',
      width: 150,
      editable: true,
    },
    {
      field: 'description',
      headerName: 'Descriptions',
      width: 150,
      editable: true,
    },
    {
      field: 'action',
      headerName: 'Actions',
      type: 'actions',
      getActions: (params: any) => [
        <IconButton> <EditIcon /></IconButton>,
        <IconButton onClick={() => deleteExpense(params?.id)}> <DeleteForeverIcon /></IconButton>,
      ],
      width: 100
    }
  ];

  useEffect(() => {
    fetchMonthlyExpenseData();
  }, []);

  const fetchMonthlyExpenseData = async () => {
    setFetchingData(true);
    const expenseDate = moment(new Date(currentDate)).format('DD-MM-YYYY');

    await axios.get(`https://shimmering-marsh-raisin.glitch.me/getMonthlyExpense/${expenseDate}`)
      .then((res) => {
        let count1 = 0;
        let count2 = 0;
        let count3 = 0;
        let count4 = 0;

        const dataGrid_data: any = [];

        res.data.forEach((item: any, index: any) => {
          dataGrid_data.push({ ...item, id: item?._id ?? index });
          if (item.category === 'Social') {
            count4 += item.price;
          } else if (item.category === 'Gas') {
            count3 += item.price;
          } else if (item.category === 'Utilities') {
            count2 += item.price;
          } else if (item.category === 'Groceries') {
            count1 += item.price;
          }
        });
        setExpensesData(dataGrid_data);
        setChartData({
          categories: ['Groceries', 'Utilities', 'Gas', 'Social'],
          values: [count1, count2, count3, count4]
        });
        setFetchingData(false);
      })
      .catch((error) => {
        console.log(error);
        setFetchingData(false);
      });
  };

  const deleteExpense = async (id: any) => {
    setFetchingData(true);
    await axios.delete(`https://shimmering-marsh-raisin.glitch.me/deleteExpense/${id}`)
      .then((res) => {
        console.log('Successfully deleted the expense');
        fetchMonthlyExpenseData();
        setFetchingData(false);
      })
      .catch((error) => {
        console.log(error);
        setFetchingData(false);
      });
  };

  return (
    <Container sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      padding: isMobile ? '16px' : '32px',
      overflow: 'hidden'
    }}>
      <Box sx={{ width: '100%', mb: isMobile ? 2 : 4 }}>
        {fetchingData ? <CircularProgress /> : <BarChartComponent graph_data={chartData} />}
      </Box>
      <Box sx={{ width: '100%', overflowX: 'auto' }}>
        <DataGridComponent rows={expensesData} columns={expensesColumn} loading={fetchingData} />
      </Box>
    </Container>
  );
};

export default Dashboard;
