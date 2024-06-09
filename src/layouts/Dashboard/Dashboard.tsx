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
import EditExpenseModal from '../../components/edit-expense-modal/EditExpenseModal';

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [expensesData, setExpensesData] = useState(null);
  const [chartData, setChartData] = useState<any>({ categories: [], values: [], spent: 0, remaining: 40000 });
  const [fetchingData, setFetchingData] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const expensesColumn: GridColDef[] = [
    {
      field: 'category',
      headerName: 'Category',
      flex: 1,
      // width: 150,
      // editable: true,
      sortable: false,
      // renderCell: (params) => `₹${params?.value}/-`
    },
    {
      field: 'price',
      headerName: 'Amount',
      flex: 1,
      // width: 150,
      // editable: true,
      renderCell: (params) => `₹${params?.value}/-`
    },
    {
      field: 'dateOfPurchase',
      headerName: 'Date',
      flex: 1,
      type: 'date',
      valueFormatter(params) {
        return new Date(params?.value)
      },
      // width: 150,
      // editable: true,
      renderCell: (params) => `${isMobile ? moment(new Date(params?.value)).format('DD') : moment(new Date(params?.value)).format('DD/MM/YYYY')}`
    },
    {
      field: 'description',
      headerName: 'Descriptions',
      flex: 1,
      // width: 150,
      // editable: true,
    },
    // {
    //   field: 'action',
    //   headerName: 'Actions',
    //   flex: 1,
    //   type: 'actions',
    //   getActions: (params: any) => [
    //     <IconButton onClick={() => handleEdit(params.row)}><EditIcon /></IconButton>,
    //     <IconButton onClick={() => handleOpenAlert(params.id)}><DeleteForeverIcon /></IconButton>,
    //   ],
    //   width: 100
    // }
  ];

  if (!isMobile) {
    expensesColumn.push({
      field: 'action',
      headerName: 'Actions',
      type: 'actions',
      getActions: (params: any) => [
        <IconButton onClick={() => handleEdit(params.row)}><EditIcon /></IconButton>,
        <IconButton onClick={() => handleOpenAlert(params.id)}><DeleteForeverIcon /></IconButton>,
      ],
      flex: 1,
    });
  }

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
        setExpensesData(dataGrid_data?.reverse());
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
    await axios.delete(`https://your-api-url.com/deleteExpense/${deleteId}`)
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

  const handleEdit = (expense: any) => {
    setSelectedExpense(expense);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    console.log('changing modal state')
    setIsModalOpen(false);
    setSelectedExpense(null);
  };

  const handleSave = async (updatedExpense: any) => {
    setFetchingData(true);
    try {
      await axios.put(`https://your-api-url.com/updateExpense/${updatedExpense.id}`, updatedExpense);
      fetchMonthlyExpenseData();
    } catch (error) {
      console.error(error);
      setFetchingData(false);
    }
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
      <EditExpenseModal open={isModalOpen} handleClose={handleModalClose} expense={selectedExpense} handleSave={handleSave} refreshExpenses={fetchMonthlyExpenseData}/>
      <AlertDialog
        open={openAlert}
        handleClose={handleCloseAlert}
        handleConfirm={handleConfirmDelete}
      />
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
        <DataGridComponent 
        rows={expensesData} 
        columns={expensesColumn} 
        loading={fetchingData} 
        checkboxSelection={!isMobile} 
        disableColumnMenu={isMobile} 
        density={isMobile ? 'compact' : 'standard'}
        hideToolbar={isMobile ? true : false}
        pageSize={isMobile ? 10 : 5}
        />
      </Box>
    </Container>
  );
};

export default Dashboard;
