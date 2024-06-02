import React from 'react'
import DataGridComponent from '../../components/data-grid/DataGridComponent'
import BarChartComponent from '../../components/bar-chart/BarChartComponent'
import { Box, Container } from '@mui/material'

const Dashboard = () => {
  return (
    <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Box>

        <BarChartComponent />
      </Box>
      <DataGridComponent />
    </Container>
  )
}

export default Dashboard