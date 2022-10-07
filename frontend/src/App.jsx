import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, WarehouseList } from "./pages";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState, useMemo, createContext } from "react";
import Brightness3Icon from '@mui/icons-material/Brightness3';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  const [mode, setMode] = useState('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <Box
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
          color: 'text.primary',
          borderRadius: 1,
          p: 3,
        }}
      >
        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness3Icon />}
        </IconButton>
      </Box>
        <WarehouseList/>
      </ThemeProvider>
    </ColorModeContext.Provider>
  // <BrowserRouter>
  //     <Routes>
  //     <Route path="/" element={<Home/>}/>
  //     <Route path="/warehouses" element={<Warehouses/>}/>
  //     </Routes>
  // </BrowserRouter>
  );
}

export default App;
