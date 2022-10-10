import {useState, useMemo} from 'react';
import {Fab, Zoom, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle,
        List, ListItem, ListItemText, Paper, LinearProgress, Alert
      } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useForm } from "react-hook-form";

const Item = ({item: {_id, name, imgUrl, cost}, setInventoryCount, setError}) => {
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
          setInventoryCount(
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

export const AddItem = ({setData, warehouseID, setInventory}) => {
    const { handleSubmit, reset} = useForm({
        defaultValues: {
            inventory: []
        },
        mode: "onChange"
    });

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const [itemList, setItemList] = useState([]);
    const [inventoryCount, setInventoryCount] = useState([])
    const [error, setError] = useState(false);
    const item = useMemo(() => 
    {axios.get('http://localhost:9000/items')
      .then(res => {
            setItemList(res.data);
            setInventoryCount(res.data.map(item => {return {_id: item._id, qty:0}}))
    })
      .catch(err => console.error(err)); }, [open]
    );
    const handleClickOpen = () => {
        setError(false);
        setOpen(true);
      };
    
    const handleClose = () => {
      setError(false);
      setOpen(false);
      };
    const onSubmit = async (data) => {
        setLoading(true)
        setData(warehouse => {
            const arrays = [...warehouse.inventory, ...inventoryCount]
            const combine = arrays.reduce((acc, {_id, qty}) => {
                acc[_id] ??= {_id: _id, qty: 0};
                acc[_id].qty += qty
                return acc;
              }, {});
            warehouse.inventory = Object.values(combine);
            data.inventory = warehouse.inventory.filter(item => item.qty !== 0);
            return warehouse;
        })
        setTimeout(async () => {
            try{
                console.log(data.inventory);
                await axios.put(`http://localhost:9000/warehouses/${warehouseID}`, {
                inventory: data.inventory
                })
                await axios.get(`http://localhost:9000/warehouses/${warehouseID}/inventory`)
                .then(res => { setInventory(res.data.inventory)})
                handleClose();
          }
            catch (err) {
            // keep screen open and reset the inventory data prior to changes
            setError(true);
            setLoading(false);
            await axios.get(`http://localhost:9000/warehouses/${warehouseID}`)
            .then(res => { setData(res.data)}).catch(error => console.error(error))
            reset();
            }
        }, 1000);
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
          <DialogTitle>Add Items to Warehouse</DialogTitle>
          <DialogContent 
            sx={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly'}}>
                <Paper style={{maxHeight: 500, overflow: 'auto'}}>
                <List sx={{'.css-10hburv-MuiTypography-root' : {marginRight: '10ch', maxWidth: '50ch'},
                                    '.MuiListItem-root': {  marginBottom: 3},
                  }}>
                    {itemList.map(item => <Item item={item} setInventoryCount={setInventoryCount} setError={setError} key={item._id}/>)}
                </List>
              </Paper>
          </DialogContent>
          {loading && (<LinearProgress/>)}
          {error && (<Alert severity="error">There was something wrong with your input — change your quantities!</Alert>)}
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" onClick={handleSubmit(onSubmit)} disabled={error}>Submit</Button>
          </DialogActions>
      </Dialog>
    </>
    )
}