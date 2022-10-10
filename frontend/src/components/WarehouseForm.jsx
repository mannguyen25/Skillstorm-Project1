import {useState, useMemo} from 'react';
import {Fab, Zoom, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle,
        List, ListItem, ListItemText, Paper, Typography, LinearProgress, Alert
      } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import {warehouseSchema} from '../validation/warehouseSchema'
import axios from 'axios';

const Item = ({item: {_id, name, imgUrl, cost}, setInventory, setError}) => {
  return (
    <ListItem
    secondaryAction={
      <TextField 
        label='qty'
        type='number'
        inputProps={{min: 0}}
        sx={{maxWidth: 80, m: 1}}
        onChange={e => {
          setError(false);
          setInventory(
          inventory => inventory.map(
            item => {
              return item._id === _id? {...item, qty: parseInt(e.target.value)} : item
            }
          ))}}
      />
    }
    >
       <ListItemText primary={name} />
    </ListItem>
  )
}

export const WarehouseForm = ({setWarehouseList}) => {
    const { handleSubmit, control, formState: { isValid }, reset} = useForm({
        defaultValues: {
            capacity: 0,
            inventory: []
        },
        resolver: yupResolver(warehouseSchema),
        mode: "onChange"
    });

    const onSubmit = async data => {
      setLoading(true)
      data.inventory = inventory.filter(item => item.qty != 0);
      setTimeout(async () => {
        try{
          const res = await axios.post('http://localhost:9000/warehouses', {
            capacity: data.capacity,
            inventory: data.inventory
          })
          setWarehouseList(warehouseList => [...warehouseList, res.data]);
          setLoading(false);
          handleClose();
        }
        catch (err) {
          setError(true);
          setLoading(false);
      }
    }, 1000);

    };
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [itemList, setItemList] = useState([]);
    const [inventory, setInventory] = useState([])
    const [error, setError] = useState (false) 
    const item = useMemo(() => 
    {axios.get('http://localhost:9000/items')
      .then(res => {setItemList(res.data); setInventory(res.data.map(item => {return {_id: item._id, qty:0}}))})
      .catch(err => setError(true)); }, [open]
    );
    const handleClickOpen = () => {
        setError(false)
        setOpen(true);
      };
    
    const handleClose = () => {
        setError(false)
        setOpen(false);
        reset();
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
        '& .MuiTextField-root': { m: 1, width: '25ch' },}}>
          <DialogTitle>Add Warehouse to Inventory</DialogTitle>
          <DialogContent 
            sx={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly'}}>
                <Controller
                  name='capacity'
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      label="Capacity"
                      required
                      type='number'
                      autoFocus
                      margin="normal"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      inputProps={{min: 0}}
                    />
                  )}
                />
                <Typography>Add Items</Typography>
                <Paper style={{maxHeight: 500, overflow: 'auto'}}>
                <List sx={{'.css-10hburv-MuiTypography-root' : {marginRight: '10ch', maxWidth: '50ch'},
                                    '.MuiListItem-root': {  marginBottom: 3},
                  }}>
                    {itemList.map(item => <Item item={item} setInventory={setInventory} setError={setError} key={item._id}/>)}
                </List>
              </Paper>
          </DialogContent>
          {loading && (
            <LinearProgress/>)}
          {error && (
            <Alert severity="error">Please increase capacity or decrease items.</Alert>
          )
          }
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" onClick={handleSubmit(onSubmit)} disabled={!isValid || error}>Submit</Button>
          </DialogActions>
      </Dialog>
    </>
    )
}