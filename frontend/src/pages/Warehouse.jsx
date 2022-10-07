import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Box, Typography, Stack, IconButton } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { renderProgress, Actions } from "../components";
import { useTheme } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
// const Warehouse = ({warehouse: {_id, capacity, currCapacity}}) => {
//     return [_id, capacity, currCapacity]
// }

export const WarehouseList = () => {
  const [warehouseList, setWarehouseList] = useState([]);
  const [rowId, setRowId] = useState(null);
  const [pageSize, setPageSize] = useState(25);
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
        flex: 1,
        minWidth: 200,
        renderCell: (params) => (<a href={`http://localhost:9000/warehouses`}>{params.row._id}</a>)
      },
      {
        field: 'currCapacity',
        headerName: 'Current Capacity',
        type: 'number',
        headerAlign: 'left',
        align: 'left',
        flex: 1,
      },
      {
        field: 'capacity',
        headerName: 'Max Capacity',
        type: 'number',
        headerAlign: 'left',
        align: 'left',
        flex: 1,
        editable: true
      },
      {
        field: "filledQuantity",
        headerName: "Filled Quantity",
        renderCell: renderProgress,
        headerAlign: 'center',
        type: 'number',
        minWidth: 80,
        flex: 1,
        valueGetter: (params) => params.row.currCapacity / params.row.capacity
      },
      {
        field: "actions",
        headerName: "Actions",
        headerAlign: 'center',
        align: 'center',
        flex: 1,
        minWidth: 150,
        renderCell: params => (
          <Stack direction="row" spacing={2}>
            <Actions {...{params, rowId, setRowId}}/>
            <IconButton onClick={() => handleDeleteRow({...{params}})}><DeleteIcon/></IconButton>
          </Stack>
        )
      },
      {
        field: "inventory"
      }
    ],
    [rowId]
  );


  const handleDeleteRow = async ({params}) => {
    await axios.delete(`http://localhost:9000/warehouses/${params.row._id}`)
    .then(() => {
      setWarehouseList(warehouseList.filter(warehouse => params.row._id !== warehouse._id))
    })
    .catch(err => console.error(err));
  };

    return (
      <>
        <Box      
        sx = {{
          margin: '2rem auto',
          height: '30vh',
          width: '75%',
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
          pageSize={pageSize}
          onPageSizeChange={(newPage) => setPageSize(newPage)}
          pagination
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