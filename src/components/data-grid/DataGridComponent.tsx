import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';

const DataGridComponent = ({ rows, columns, loading }: any) => {

  const [columnsData, setColumnsData] = useState<any>([
    {
      field: '_id',
      headerName: 'ID',
      width: 150,
      editable: true,
    }
  ]);

  const [rowsData, setRowsData] = useState(
    [
      {
          "id": "665c6d4ceda156a75ae39bd2",
          "price": 100,
          "category": "utilities",
          "description": "test",
          "dateOfPurchase": "02-06-2024",
          "month": "06",
          "year": "2024",
      }
  ]
  )

  useEffect(() => {
    if (columns) {
      setColumnsData(columns)
    }
  }, [columns])

  useEffect(() => {
    if (rows) {
      setRowsData(rows)
    }
  }, [rows])



  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rowsData}
        columns={columnsData}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        loading={loading}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
      />
    </Box>
  )
}

export default DataGridComponent