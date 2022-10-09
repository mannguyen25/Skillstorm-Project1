import {useState} from 'react';
import {Fab, Zoom, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle,
        OutlinedInput, InputLabel, InputAdornment, FormControl, MenuItem, Select} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import {warehouseSchema} from '../validation/warehouseSchema'
import axios from 'axios';

export const WarehouseForm = ({setWarehouseList}) => {
    const { handleSubmit, control, formState: { isValid }} = useForm({
        defaultValues: {
            name: '',
            brand: '',
            UPC: '',
            cost: 0,
            component: '',
            imgUrl: ''
        },
        resolver: yupResolver(warehouseSchema),
        mode: "onChange"
    });
    const onSubmit = async data => {
      try{
        console.log(data);
        const res = await axios.post('http://localhost:9000/items', data)
        setWarehouseList(warehouseList => [...warehouseList, res.data]);
        setOpen(false);
      }
      catch (err) {
        console.error(err);
    }
    };
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
      };
    return (
    <Zoom in={true} style={{ 'transitionDuration' : '800ms' }}>
    <Fab sx={{
        position: 'absolute',
        bottom: 60,
        right: 60,}}
        color="primary" aria-label="add"
        onClick={handleClickOpen}
        >
            <AddIcon />
    </Fab>
    </Zoom>
    )
}