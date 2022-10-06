import { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: params =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const Warehouse = ({warehouse: {_id, capacity, currCapacity}}) => {
    return [_id, capacity, currCapacity]
}

export const warehouseList = () => {
    const [warehouseList, setWarehouseList] = useState([]);
    
    // React does NOT support making this callback asynchronous
    // So you MUST use .then()/.catch() OR have it call another async function to use await
    useEffect(() => {
        // Axios returns a fulfilled promise if the status code is < 400
        // and a rejected promise when >= to 400 
        
        // Move this to store. Get the res.data and use dispatch(setwarehouseList(res.data))
        axios.get('http://localhost:9000/warehouses')
            .then(res => { setWarehouseList(res.data); console.log(res.data) })
            .catch(err => console.error(err)); // This could easily be to render an error display
    }, []);
    return (
    <DataGrid columns={[{ field: 'name', editable: true }]} />

    )
}