import React, { useEffect, useState } from 'react';
import DataGridComponent from '../../components/data-grid/DataGridComponent';
import BarChartComponent from '../../components/bar-chart/BarChartComponent';
import AlertDialog from '../../components/alert-dialog/AlertDialogComponent';
import { Box, CircularProgress, Container, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import moment from 'moment';
import axios from 'axios';
import { GridColDef } from '@mui/x-data-grid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import PieChartComponent from '../../components/pie-chart/PieChartComponent';
import EditExpenseModal from '../../components/edit-expense-modal/EditExpenseModal';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DateCalendarServerRequest from '../../components/spending-calendar/SpendingCalendar';

import CircleIcon from '@mui/icons-material/Circle';

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [expensesData, setExpensesData] = useState(null);
  const [chartData, setChartData] = useState<any>({ categories: [], values: [], spent: 0, remaining: 40000 });
  const [fetchingData, setFetchingData] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [calendarBadges, setCalendarBadges] = useState({})

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const expensesColumn: GridColDef[] = [
    {
      field: 'category',
      headerName: 'Category',
      flex: isMobile ? 0 : 1,
      width: 90,
      // editable: true,
      sortable: !isMobile,
      // renderCell: (params) => `₹${params?.value}/-`
    },
    {
      field: 'price',
      headerName: 'Amount',
      flex: isMobile ? 0 : 1,
      width: 80,
      // editable: true,
      sortable: !isMobile,
      renderCell: (params) => `₹${params?.value}/-`
    },
    {
      field: 'dateOfPurchase',
      headerName: 'Date',
      flex: isMobile ? 0 : 1,
      // type: 'date',
      sortable: !isMobile,
      valueFormatter(params) {
        return moment(new Date(params?.value)).format('DD/MM/YYYY')
      },
      // valueSetter: (params) => moment(new Date(params?.value)).format('DD/MM/YYYY'),
      width: 60,
      // editable: true,
      renderCell: (params) => `${isMobile ? moment(new Date(params?.value)).format('DD') : moment(new Date(params?.value)).format('DD/MM/YYYY')}`
    },
    {
      field: 'description',
      headerName: 'Descriptions',
      flex: 1,
      sortable: !isMobile,
      // width: 150,
      // editable: true,
    },
    // {
    //   field: 'action',
    //   headerName: 'Actions',
    //   flex: 1,
    //   hideable: true,
    //   type: 'actions',
    //   editable: true,
    //   getActions: (params: any) => [
    //     <IconButton onClick={() => handleEdit(params.row)}><EditIcon /></IconButton>,
    //     <IconButton onClick={() => handleOpenAlert(params.id)}><DeleteForeverIcon /></IconButton>,
    //   ],
    //   width: 100
    // }
  ];

  const token = localStorage.getItem('token');

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
  }, [currentDate]);

  const sortCalendarBadges = (data_arr: any) => {

    const temp_obj: any = {}
    const temp_obj_elements: any = {}

    data_arr?.map((date_obj: any) => {
      temp_obj[new Date(date_obj?.dateOfPurchase).getDate()] = (temp_obj[new Date(date_obj?.dateOfPurchase).getDate()] ?? 0) + Number(date_obj?.price)
    })
    Object.keys(temp_obj)?.map((price_date:any) => {
      console.log(temp_obj?.[price_date])
      if(temp_obj[price_date] <= 2000){
        temp_obj_elements[price_date] = <CircleIcon sx={{color:'#149d0295', fontSize:'10px'}}/>
      }
      if(temp_obj[price_date] > 2000 || temp_obj?.price_date <= 5000){
        temp_obj_elements[price_date] = <CircleIcon sx={{color: '#ff550095', fontSize:'10px'}}/>
      }
      if(temp_obj[price_date] > 5000){
        temp_obj_elements[price_date] = <CircleIcon sx={{color: '#ff0000', fontSize:'10px'}}/>
      }
    })
    setCalendarBadges(temp_obj_elements)
  }

  const fetchMonthlyExpenseData = async () => {
    setFetchingData(true);
    const expenseDate = moment(new Date(currentDate)).format('DD-MM-YYYY');

    await axios.get(`https://shimmering-marsh-raisin.glitch.me/getMonthlyExpense/${expenseDate}`, {
      headers: {
        Authorization: token
      }
    })
      .then((res) => {
        let count1 = 0;
        let count2 = 0;
        let count3 = 0;
        let count4 = 0;

        const dataGrid_data: any = [];
        sortCalendarBadges(res.data)
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
    await axios.delete(`https://shimmering-marsh-raisin.glitch.me/deleteExpense/${deleteId}`, {
      headers: {
        Authorization: token
      }
    })
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
      await axios.put(`https://your-api-url.com/updateExpense/${updatedExpense.id}`, updatedExpense, {
        headers: {
          Authorization: token
        }
      });
      fetchMonthlyExpenseData();
    } catch (error) {
      console.error(error);
      setFetchingData(false);
    }
  };

  const handleMonthChange = (direction: string) => {
    if (direction === 'next') {
      setCurrentDate(prevDate => moment(prevDate).add(1, 'month').toDate());
    } else {
      setCurrentDate(prevDate => moment(prevDate).subtract(1, 'month').toDate());
    }
  };

  const sampleSpendingData = [
    { date: '2024-06-01', amount: 800 }, // Blue dot
    { date: '2024-06-05', amount: 1200 }, // Orange dot
    { date: '2024-06-10', amount: 6000 }, // Red dot
    // Add more entries as needed
  ];

  return (
    <Container sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      padding: isMobile ? '16px' : '32px',
    }}>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mb: 2 }}>
        <IconButton onClick={() => handleMonthChange('prev')}>
          <KeyboardArrowLeftIcon />
          <Typography sx={{ fontSize: 12 }}>Prev</Typography>
        </IconButton>
        <Box sx={{ borderRadius: 1 }} style={{ backgroundColor: '#45b6f3' }}>
          <Typography variant="h6" sx={{ mx: 2, mt: 0.5 }}>{moment(currentDate).format('MMMM YYYY')}</Typography>
        </Box>
        <IconButton onClick={() => handleMonthChange('next')}>
          <Typography sx={{ fontSize: 12 }}>Next</Typography>
          <KeyboardArrowRightIcon />
        </IconButton>
      </Box>
      <EditExpenseModal open={isModalOpen} handleClose={handleModalClose} expense={selectedExpense} handleSave={handleSave} refreshExpenses={fetchMonthlyExpenseData} />
      <AlertDialog
        open={openAlert}
        handleClose={handleCloseAlert}
        handleConfirm={handleConfirmDelete}
        isLoading={fetchingData}
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
          hideToolbar={isMobile}
          pageSize={isMobile ? 10 : 5}
        />
      </Box>
      {/* <SpendingCalendar spendingData={sampleSpendingData} /> */}
      <DateCalendarServerRequest data={calendarBadges} _currentDate={currentDate} _setCurrentDate={setCurrentDate}/>
    </Container>
  );
};

export default Dashboard;
