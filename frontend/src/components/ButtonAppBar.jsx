import {useContext} from 'react';
import {AppBar, IconButton, Button, Stack} from '@mui/material';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@emotion/react';
import {ColorModeContext} from '../App'
import HomeIcon from '@mui/icons-material/Home';

export function ButtonAppBar() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  console.log(theme);
  return (
    <AppBar position="static"
      sx={{ 
        height: '4vh', 
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
      >
        <Stack sx={{ml: 4,
        }} direction="row" spacing={2}>
          <IconButton sx={{alignSelf: 'center'}} aria-label="home" color='inherit' href='/'><HomeIcon /></IconButton>
          <Button sx={{textTransform: 'capitalize'}}href='/warehouses' color="inherit"><h3>Warehouses</h3></Button>
          <Button sx={{textTransform: 'capitalize'}}href='/items' color="inherit"><h3>Items</h3></Button>
        </Stack>
        <IconButton sx={{mr: 4}} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness3Icon />}
          </IconButton>
    </AppBar>
  );
}
