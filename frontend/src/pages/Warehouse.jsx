import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { renderProgress } from "../components/ProgressBar";
import { createTheme } from "@mui/material/styles";
const defaultTheme = createTheme();

const columns = [
  { field: '_id', headerName: 'ID', width: 300 },
  {
    field: 'currCapacity',
    headerName: 'Current Capacity',
    type: 'number',
    headerAlign: 'left',
    align: 'left',
    width: 150,
    editable: true,
  },
  {
    field: 'capacity',
    headerName: 'Max Capacity',
    type: 'number',
    headerAlign: 'left',
    align: 'left',
    width: 150,
    editable: true,
  },
  {
    field: "filledQuantity",
    headerName: "Filled Quantity",
    renderCell: renderProgress,
    type: 'number',
    width: 200,
    valueGetter: function name(params) {
      return params.row.currCapacity / params.row.capacity;
    }
  }
];

// const Warehouse = ({warehouse: {_id, capacity, currCapacity}}) => {
//     return [_id, capacity, currCapacity]
// }

export const WarehouseList = () => {
  const [warehouseList, setWarehouseList] = useState([]);
    
    // React does NOT support making this callback asynchronous
    // So you MUST use .then()/.catch() OR have it call another async function to use await
    useEffect(() => {
        // Axios returns a fulfilled promise if the status code is < 400
        // and a rejected promise when >= to 400 
        
        // Move this to store. Get the res.data and use dispatch(setwarehouseList(res.data))
        axios.get('http://localhost:9000/warehouses')
            .then(res => { setWarehouseList(res.data)})
            .catch(err => console.error(err)); // This could easily be to render an error display
    }, []);
    return (
      <>
        <h1 style={{
          textAlign: 'center'
        }}>Warehouses</h1>
        <Box
        sx = {{
          margin: '2rem auto',
          height: 300,
          width: '35%',
          '.root': {
            border: `1px solid ${defaultTheme.palette.primary.main}`,
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
              backgroundColor: "#088208a3"
            },
            '&.medium': {
              backgroundColor: "#efbb5aa3"
            },
            '&.high': {
              backgroundColor: "#f44336"
            }
          }
        }}
        >
          <DataGrid 
          columns={columns}
          getRowId={row => row._id}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
          }
          rows={warehouseList}
          experimentalFeatures={{ newEditingApi: true }}
          />
        </Box>
      </>

    )
}