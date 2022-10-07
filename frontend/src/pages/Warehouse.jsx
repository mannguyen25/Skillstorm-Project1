import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
// import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
import { Box, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { renderProgress, Actions } from "../components";
import { useTheme } from '@mui/material/styles';


// const Warehouse = ({warehouse: {_id, capacity, currCapacity}}) => {
//     return [_id, capacity, currCapacity]
// }

export const WarehouseList = () => {
  const [warehouseList, setWarehouseList] = useState([]);
  const [rowId, setRowId] = useState(null);
  const theme = useTheme();
  useEffect(() => {
      axios.get('http://localhost:9000/warehouses')
          .then(res => { setWarehouseList(res.data)})
          .catch(err => console.error(err)); 
  }, []);

  const columns = useMemo(() =>
    [
      { 
        field: '_id', 
        headerName: 'ID', 
        width: 300,
        renderCell: (params) => (<a href={`http://localhost:9000/warehouses`}>{params.row._id}</a>)
      },
      {
        field: 'currCapacity',
        headerName: 'Current Capacity',
        type: 'number',
        headerAlign: 'left',
        align: 'left',
        width: 150,
      },
      {
        field: 'capacity',
        headerName: 'Max Capacity',
        type: 'number',
        headerAlign: 'left',
        align: 'left',
        width: 150,
        editable: true
      },
      {
        field: "filledQuantity",
        headerName: "Filled Quantity",
        renderCell: renderProgress,
        headerAlign: 'center',
        type: 'number',
        width: 200,
        valueGetter: (params) => params.row.currCapacity / params.row.capacity
      },
      {
        field: "actions",
        headerName: "Actions",
        headerAlign: 'center',
        align: 'center',
        width: 200,
        renderCell: params => (
          <Actions {...{params, rowId, setRowId}}/>
        )
      },
      {
        field: "inventory"
      }
    ],
    [rowId]
  );



  // const handleDeleteRow = () => {
  //   const rowIds = apiRef.current.getAllRowIds();
  //   const rowId = randomArrayItem(rowIds);

  //   apiRef.current.updateRows([{ id: rowId, _action: 'delete' }]);
  // };

    return (
      <>
        <Box      
        sx = {{
          margin: '2rem auto',
          height: 300,
          width: '65%',
          a: {
            textDecoration: 'none',
            color: theme.palette.primary.dark,
            '&:hover': {
              color: theme.palette.secondary.dark,
           }
      
          },
          '.MuiDataGrid-columnHeaderTitleContainer': {
            color: theme.palette.primary.main,
          },
          '.odd': {
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[400]
          },
          '.root': {
            border: `1px solid ${theme.palette.primary.main}`,
            position: "relative",
            overflow: "hidden",
            width: "100%",
            height: 26,
            borderRadius: 2
          },
          '.value': {
            position: "absolute",
            lineHeight: "24px",
            width: "100%",
            display: "flex",
            justifyContent: "center"
          },
          '.bar': {
            height: "100%",
            '&.low': {
              backgroundColor: theme.palette.success.light
            },
            '&.medium': {
              backgroundColor: theme.palette.warning.light
            },
            '&.high': {
              backgroundColor: theme.palette.error.light
            }
          }
        }}
        >
          <Typography
          variant='h3'
          component='h3'
          sx={{textAlign: 'center', ml: 2, mb:3}}
            >
            Manage Warehouse
          </Typography>
          <DataGrid 
          sx={{
            boxShadow: 4,
            border: 2,
            borderColor: theme.palette.mode === 'dark'? '#fff': '#000',
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main',
            },
          }}
          columns={columns}
          checkboxSelection
          getRowId={row => row._id}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
          }
          rows={warehouseList}
          experimentalFeatures={{ newEditingApi: true }}
          onCellEditStop={(params) => setRowId(params.id)}
          columnVisibilityModel={{inventory: false}}
          />
        </Box>
      </>

    )
}