import React, { useEffect, useState } from 'react';
import DataGridComponent from '../../components/data-grid/DataGridComponent';
import BarChartComponent from '../../components/bar-chart/BarChartComponent';
import AlertDialog from '../../components/alert-dialog/AlertDialogComponent';
import { Box, CircularProgress, Container, IconButton, useMediaQuery, useTheme } from '@mui/material';
import moment from 'moment';
import axios from 'axios';
import { GridColDef } from '@mui/x-data-grid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import PieChartComponent from '../../components/pie-chart/PieChartComponent';

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [expensesData, setExpensesData] = useState(null);
  const [chartData, setChartData] = useState<any>({ categories: [], values: [], spent: 0, remaining: 40000 });
  const [fetchingData, setFetchingData] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

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
      field: 'price',
      headerName: 'Amount',
      width: 150,
      editable: true,
      renderCell: (params) => `₹${params?.value} /-`
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
        <IconButton><EditIcon /></IconButton>,
        <IconButton onClick={() => handleOpenAlert(params.id)}><DeleteForeverIcon /></IconButton>,
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
          values: [count1, count2, count3, count4],
          spent: count1 + count2 + count3 + count4,
          remaining: chartData?.remaining - (count1 + count2 + count3 + count4)
        });
        setFetchingData(false);
      })
      .catch((error) => {
        console.log(error);
        setFetchingData(false);
      });
  };

  const handleOpenAlert = (id: any) => {
    setDeleteId(id);
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
    setDeleteId(null);
  };

  const handleConfirmDelete = async () => {
    setFetchingData(true);
    await axios.delete(`https://shimmering-marsh-raisin.glitch.me/deleteExpense/${deleteId}`)
      .then((res) => {
        console.log('Successfully deleted the expense');
        fetchMonthlyExpenseData();
        setFetchingData(false);
        handleCloseAlert();
      })
      .catch((error) => {
        console.log(error);
        setFetchingData(false);
        handleCloseAlert();
      });
  };

  return (
    <Container sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      padding: isMobile ? '16px' : '32px',
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        width: '100%',
        // mt: isMobile ? 2 : 20,
        mb: isMobile ? 2 : 4,
      }}>
        {fetchingData ? (
          <CircularProgress />
        ) : (
          <>
            <Box sx={{ flexGrow: 1 }}>
              <BarChartComponent graph_data={chartData} height={isMobile ? 300 : 400} />
            </Box>
            <Box sx={{ flexGrow: 1, mt: isMobile ? 2 : 0 }}>
              <PieChartComponent chartData={{
                categories: ['Spent', 'Remaining'],
                values: [chartData?.spent, chartData?.remaining]
              }} />
            </Box>
          </>
        )}
      </Box>


      <Box sx={{ width: '100%', flexGrow: 1 }}>
        <DataGridComponent rows={expensesData} columns={expensesColumn} loading={fetchingData} checkboxSelection={!isMobile} />
      </Box>
      <AlertDialog
        open={openAlert}
        handleClose={handleCloseAlert}
        handleConfirm={handleConfirmDelete}
      />
    </Container>
  );
};

export default Dashboard;
