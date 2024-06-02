import React, { useEffect, useState } from 'react'
import DataGridComponent from '../../components/data-grid/DataGridComponent'
import BarChartComponent from '../../components/bar-chart/BarChartComponent'
import { Box, Button, CircularProgress, Container, IconButton } from '@mui/material'
import moment from 'moment'
import axios from 'axios'
import { GridColDef } from '@mui/x-data-grid'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

const Dashboard = () => {

  const [currentDate, setCurrentDate] = useState(new Date())
  const [expensesData, setExpensesData] = useState(null)
  const [expensesDescription, setExpensesDescription] = useState(null)
  const [chartData, setChartData] = useState<any>({ categories: [], values: [] })
  const [progressChartData, setProgressChartData] = useState(null)

  const [tableData, setTableData] = useState([])

  const [fetchingData, setFetchingData] = useState(false)

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
        <IconButton > <EditIcon /></IconButton>,
        <IconButton onClick={() => deleteExpense(params?.id)}> <DeleteForeverIcon /></IconButton>,
      ],
      width: 100
    }
  ]

  useEffect(() => {
    // setExpensesData(fetchExpenseData())
    fetchMonthlyExpenseData()
    // setExpensesData(fetchMonthlyExpenseData())
    // .then((res => console.log(res)))
  }, [])

  const fetchMonthlyExpenseData = async () => {

    setFetchingData(true)
    setExpensesDescription(null)

    const expenseDate = moment(new Date(currentDate)).format('DD-MM-YYYY')

    await axios.get(`https://shimmering-marsh-raisin.glitch.me/getMonthlyExpense/${expenseDate}`)
      .then((res) => {
        console.log(res)
        let count1 = 0;
        let count2 = 0;
        let count3 = 0;
        let count4 = 0;

        const dataGrid_data: any = []

        res.data.map((item: any, index: any) => {
          dataGrid_data.push({ ...item, id: item?._id ?? index })
          if (item.category === 'Social') {
            count4 = count4 + item.price
          }
          else if (item.category === 'Gas') {
            count3 = count3 + item.price
          }
          else if (item.category === 'Utilities') {
            count2 = count2 + item.price
          }
          else if (item.category === 'Groceries') {
            count1 = count1 + item.price
          }
        })
        setExpensesData(dataGrid_data)
        setChartData(
          {
            categories: ['Groceries', 'Utilities', 'Gas', 'Social'],
            values: [count1, count2, count3, count4]
          }
        )
        // buildProgressChartData(res.data)
        // buildTableData(res.data)
        setFetchingData(false)

      })
      .catch((error) => {
        console.log(error)
        setFetchingData(false)
      })

  }

  // const buildProgressChartData = (data) => {
  //   let count1 = 0;
  //   let count2 = 0;


  //   data.map(item => {
  //     if (item.category === 'Utilities') {
  //       count1 = count1 + item.price
  //     }
  //     else if (item.category === 'Social') {
  //       count2 = count2 + item.price
  //     }

  //   })

  //   let utilitiesLimit = 5000
  //   let socialLimit = 5000;

  //   setProgressChartData({
  //     categories: ['Utilities', 'Social'], // optional
  //     values: [
  //       (count1 / utilitiesLimit) <= 1 ? (count1 / utilitiesLimit) : 1,
  //       (count2 / socialLimit) <= 1 ? (count2 / socialLimit) : 1
  //     ],
  //     utilities: count1 / utilitiesLimit,
  //     utilitiesLimit,
  //     social: count2 / socialLimit,
  //     socialLimit
  //   })


  // }

  // const buildTableData = (data: any) => {
  //   let tempData: any = []
  //   data.reverse().map(({ item, index }: any) => {
  //     tempData.push([
  //       <Button
  //         onPress={() => { setExpensesDescription(item) }}
  //         // color="#00000000"
  //         title={item.category}
  //       />,
  //       // item.category,
  //       item.dateOfPurchase,
  //       item.price + '/-',
  //       <Button
  //         onPress={() => { deleteAlert(item._id, index) }}
  //         title="Delete"
  //         color="#841584"
  //         accessibilityLabel="Delete this expense"
  //       />
  //     ])
  //   })
  //   setTableData({
  //     HeadTable: ['Category', 'Date of Purchase', 'Price', 'Actions'],
  //     DataTable: tempData
  //   })
  // }

  const deleteExpense = async (id: any) => {
    setFetchingData(true)
    await axios.delete(`https://shimmering-marsh-raisin.glitch.me/deleteExpense/${id}`)
      .then((res) => {
        console.log('succefully deleted the expense')
        fetchMonthlyExpenseData()
        setFetchingData(false)
      })
      .catch((error) => {
        console.log(error)
        setFetchingData(false)
      })

  }

  return (
    <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Box>
        {fetchingData ?
          <CircularProgress />
          :
          <BarChartComponent graph_data={chartData} />
        }
      </Box>
      <DataGridComponent rows={expensesData} columns={expensesColumn} loading={fetchingData} />
    </Container>
  )
}

export default Dashboard