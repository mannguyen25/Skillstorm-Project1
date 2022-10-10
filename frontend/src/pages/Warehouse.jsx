import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Box, Typography, Stack, IconButton, Card, CardMedia, LinearProgress } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { Actions, AddItem } from "../components";
import { useTheme } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';

export const Warehouse = () => {
  const [loading, setLoading] = useState(false);
  const [inventory, setInventory] = useState([]);
  const [data, setData] = useState([]);
  const [rowId, setRowId] = useState(null);
  const [pageSize, setPageSize] = useState(25);
  const theme = useTheme();
  const warehouseID = window.location.pathname.split('/')[2];
  useEffect(() => {
        axios.get(`http://localhost:9000/warehouses/${warehouseID}/inventory`)
          .then(res => { setInventory(res.data.inventory)})
          .catch(err => console.error(err)); 
        axios.get(`http://localhost:9000/warehouses/${warehouseID}`)
          .then(res => { setData(res.data)})
          .catch(err => console.error(err)); 
  }, []);

  const columns = useMemo(() =>
    [
    {
        field: 'imgUrl',
        headerName: 'Image',
        flex: 1,
        valueGetter: (params) => {
            return params.row._id.imgUrl
        },
        renderCell: (params) => {
            return (
                <div>
                <Card sx={{borderRadius: '100%', zIndex:2, display: 'absolute', color: 'inherit'}}>
                    <CardMedia
                        component="img"
                        height="64"
                        width="64"
                        image={params.row._id.imgUrl}
                        alt={params.row._id.name}
                    />
                </Card>

                </div>
            )
        }
        },
      { 
        field: 'name', 
        headerName: 'Name', 
        type: 'string',
        flex: 1,
        valueGetter: (params) => {
            return params.row._id.name
        },
        minWidth: 200
      },
      { 
        field: 'brand', 
        headerName: 'Brand', 
        type: 'string',
        flex: 1,
        valueGetter: (params) => {
            return params.row._id.brand
        },
      },
      { 
        field: 'UPC', 
        headerName: 'UPC', 
        type: 'string',
        flex: 1,
        valueGetter: (params) => {
            return params.row._id.UPC
        },
        minWidth: 130
      },
      { 
        field: 'component', 
        headerName: 'Component', 
        type: 'string',
        flex: 1,
        valueGetter: (params) => {
            return params.row._id.component
        },
      },
      { 
        field: 'cost', 
        headerName: 'Cost', 
        type: 'number',
        flex: 1,
        valueGetter: (params) => {
            return params.row._id.cost
        },
      },
      { 
        field: 'qty', 
        type: 'number',
        headerName: 'Quantity', 
        flex: 1,
        editable: true
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
            <Actions {...{params, rowId, setRowId, setData}}>{`${warehouseID}`}</Actions>
          <IconButton onClick={() => {handleDeleteRow({...{params}})}}><DeleteIcon/></IconButton>
          </Stack>
        )
      },
      { 
        field: '_id', 
        type: 'string',
        flex: 1,
        valueGetter: (params) => {
            return params.row._id._id
        },
      },
    ],
    [rowId]
  );

    /* 
    Some event handlers
    */
//    need to fix this delete, remove from inventory set
  const handleDeleteRow = async ({params}) => {
    setLoading(true);
    setTimeout(async() => {
    try {
        await axios.delete(`http://localhost:9000/warehouses/${warehouseID}/inventory/${params.row._id._id}`)
        setInventory(items => items.filter(item => params.row._id._id !== item._id._id))
        await axios.get(`http://localhost:9000/warehouses/${warehouseID}`)
        .then(res => {setData(res.data)})
        .catch(err => console.error(err)); 
    } catch (error) {
        console.log(error)
    }
    setLoading(false);
    }, 1000);
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
        }}
        >
          {/* Title of Page */}
          <Typography
          variant='h3'
          component='h3'
          sx={{textAlign: 'center', ml: 2, mb:3}}
            >
            Manage Inventory
          </Typography>
          <Typography
          variant='h5'
          component='h5'
          sx={{textAlign: 'right', mb:1, mr: 2}}
            >
            Capacity: {data.currCapacity}/{data.capacity}
          </Typography>
          <DataGrid 
          sx={{
            boxShadow: 4,
            border: 2,
            borderColor: theme.palette.mode === 'dark'? '#fff': '#000',
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main',
            },
            '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': {
                py: 1,
              },
              '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': {
                py: 3,
              },
              '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': {
                py: '22px',
              },
          }}
          getRowHeight={() => 'auto'}
          pageSize={pageSize}
          onPageSizeChange={(newPage) => setPageSize(newPage)}
          pagination
          columns={columns}
          getRowId={row => row._id._id}
          // Handle alternating table rows
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
          }
          rows={inventory}
          experimentalFeatures={{ newEditingApi: true, lazyLoading: true }}
          onCellEditStop={(params) => setRowId(params.id)}
          columnVisibilityModel={{_id: false}}
          />
          <AddItem setData={setData} warehouseID={warehouseID} setInventory={setInventory}/>
        </Box>
      </>

    )
}