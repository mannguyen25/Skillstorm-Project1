import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Box, Typography, Stack, IconButton, LinearProgress } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { renderProgress, Actions } from "../components";
import { useTheme } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { WarehouseForm } from "../components";

export const WarehouseList = () => {
  const [loading, setLoading] = useState(false);
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
        renderCell: (params) => (<a href={`/warehouses/${params.row._id}`}>{params.row._id}</a>)
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
            <Actions {...{params, rowId, setRowId}}>{'warehouses'}</Actions>
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
    setLoading(true);
    setTimeout(async() => {
      await axios.delete(`http://localhost:9000/warehouses/${params.row._id}`)
      .then(() => {
        setWarehouseList(warehouseList => warehouseList.filter(item => params.row._id !== item._id))
      })
      .catch(err => console.error(err));
      setLoading(false);
    }, 2000);
  };

    return (
      <>
      {loading && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
        <Box      
        sx = {{
          margin: '2rem auto',
          height: '60vh',
          minHeight: '40vh',
          width: '75%',
          display: 'flex',
          flexDirection: 'column',
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
          },
        }}
        >
          {/* Title of Page */}
          <Typography
          variant='h3'
          component='h3'
          sx={{textAlign: 'center', ml: 2, mb:3}}
            >
            Manage Warehouses
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
          getRowId={row => row._id}
          // Handle alternating table rows
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
          }
          rows={warehouseList}
          experimentalFeatures={{ newEditingApi: true, lazyLoading: true }}
          onCellEditStop={(params) => setRowId(params.id)}
          columnVisibilityModel={{inventory: false}}
          />
        <WarehouseForm setWarehouseList={setWarehouseList}/>
        </Box>
      </>

    )
}