import {useState} from 'react';
import {Fab, Zoom, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle,
        OutlinedInput, InputLabel, InputAdornment, FormControl, MenuItem, Select} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import {itemSchema} from '../validation/ItemSchema'
import axios from 'axios';

export const ItemForm = ({setItemList}) => {
    const { handleSubmit, control, formState: { isValid }} = useForm({
        defaultValues: {
            name: '',
            brand: '',
            UPC: '',
            cost: 0,
            component: '',
            imgUrl: ''
        },
        resolver: yupResolver(itemSchema),
        mode: "onChange"
    });
    const onSubmit = async data => {
      try{
        const res = await axios.post('http://localhost:9000/items', data)
        setItemList(itemList => [...itemList, res.data]);
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
    <>
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
    <Dialog open={open} onClose={handleClose} 
    sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
    }}>
    <DialogTitle>Add Item to Inventory</DialogTitle>
    <DialogContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly'}}>
        <div>
        <Controller
        name="name"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Item Name"
            autoFocus
            margin="normal"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
      />
        <Controller
        name="brand"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            id="brand"
            label="Brand"
            autoFocus
            margin="normal"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
      />
        </div>
        <div>
        <Controller
        name="UPC"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            id="upc"
            label="UPC #"
            autoFocus
            autoComplete='off'
            margin="normal"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
      />
      <Controller
          name="component"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <FormControl sx={{minWidth: '25ch',  m: 1}}>
            <InputLabel id="component">Component</InputLabel>
            <Select
                id="component-select"
                value={value}
                label="Component"
                onChange={onChange}
                error={!!error}
            >
                <MenuItem value='CPU'>CPU</MenuItem>
                <MenuItem value='CPU Cooler'>CPU Cooler</MenuItem>
                <MenuItem value='Motherboard'>Motherboard</MenuItem>
                <MenuItem value='Memory'>Memory</MenuItem>
                <MenuItem value='Storage'>Storage</MenuItem>
                <MenuItem value='GPU'>GPU</MenuItem>
                <MenuItem value='Case'>Case</MenuItem>
                <MenuItem value='PSU'>PSU</MenuItem>
            </Select>
            </FormControl>
          )}
      />
        </div>
        <Controller
          name="cost"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <FormControl sx={{ m: 1, minWidth: '52ch' }}>
              <InputLabel htmlFor="outlined-adornment-amount">Cost</InputLabel>
              <OutlinedInput
                autoComplete='off'
                type='number'
                id="outlined-adornment-cost"
                value={value}
                onChange={onChange}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="Amount"
                inputProps={{min: 0}}
              />
          </FormControl>
          )}
      />
      <Controller
          name="imgUrl"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField sx={{minWidth: '52ch'}}
            id="imgUrl"
            label="Image URL"
            autoFocus
            margin="normal"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            />
          )}
      />
    </DialogContent>
    <DialogActions>
    <Button onClick={handleClose}>Cancel</Button>
    <Button type="submit" onClick={handleSubmit(onSubmit)} disabled={!isValid}>Submit</Button>
    </DialogActions>
    </Dialog>
    </>
    )
}