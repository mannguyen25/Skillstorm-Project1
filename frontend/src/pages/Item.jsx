import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Box, Typography, Stack, IconButton, Card, CardMedia, LinearProgress } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { Actions, ItemForm } from "../components";
import { useTheme } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';

export const ItemList = () => {
  const [loading, setLoading] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [rowId, setRowId] = useState(null);
  const [pageSize, setPageSize] = useState(25);
  const theme = useTheme();
  useEffect(() => {
      axios.get('http://localhost:9000/items')
          .then(res => { setItemList(res.data)})
          .catch(err => console.error(err)); 
  }, [itemList]);

  const columns = useMemo(() =>
    [
      { 
        field: '_id', 
        headerName: 'ID', 
        flex: 1,
        renderCell: (params) => (<a href={`http://localhost:9000/items`}>{params.row._id}</a>)
      },
      {
        field: 'imgUrl',
        headerName: 'Image',
        headerAlign: 'left',
        align: 'left',
        flex: 1,
        editable: true,
        renderCell: (params) => {
            return (
                <div>
                <Card sx={{borderRadius: '100%', zIndex:2, display: 'absolute', backgroundColor: theme.palette.mode === 'light'? theme.palette.primary.white : theme.palette.primary.black}}>
                    <CardMedia
                        component="img"
                        height="64"
                        width="64"
                        image={params.row.imgUrl}
                        alt={params.row.name}
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
        headerAlign: 'left',
        align: 'left',
        flex: 1,
        editable: true
      },
      {
        field: 'UPC',
        headerName: 'UPC #',
        type: 'number',
        headerAlign: 'left',
        align: 'left',
        minWidth: 140,
        flex: 1,
        editable: true
      },
      {
        field: 'component',
        headerName: 'Component',
        type: 'string',
        headerAlign: 'left',
        align: 'left',
        flex: 1,
        editable: true
      },
      {
        field: 'brand',
        headerName: 'Brand',
        type: 'string',
        headerAlign: 'left',
        align: 'left',
        flex: 1,
        editable: true
      },
      {
        field: 'cost',
        headerName: 'Costs',
        type: 'number',
        headerAlign: 'left',
        align: 'left',
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
            <Actions {...{params, rowId, setRowId}}>{'items'}</Actions>
            <IconButton onClick={() => handleDeleteRow({...{params}})}><DeleteIcon/></IconButton>
          </Stack>
        )
      }
    ],
    [rowId]
  );

    /* 
    Some event handlers
    */
  const handleDeleteRow = async ({params}) => {
    setLoading(true);
    setInterval(async() => {
      await axios.delete(`http://localhost:9000/items/${params.row._id}`)
      .then(() => {
        setItemList(itemList.filter(item => params.row._id !== item._id))
      })
      .catch(err => console.error(err));
      console.log(itemList)
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
        }}
        >
          {/* Title of Page */}
          <Typography
          variant='h3'
          component='h3'
          sx={{textAlign: 'center', ml: 2, mb:3}}
            >
            Manage Items
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
          getRowHeight={() => 'auto'}
          pageSize={pageSize}
          onPageSizeChange={(newPage) => setPageSize(newPage)}
          pagination
          columns={columns}
          getRowId={row => row._id}
          // Handle alternating table rows
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
          }
          rows={itemList}
          experimentalFeatures={{ newEditingApi: true, lazyLoading: true,}}
          onCellEditStop={(params) => setRowId(params.id)}
          columnVisibilityModel={{_id: false}}
          />
          <ItemForm setItemList={setItemList}/>
        </Box>
      </>

    )
}