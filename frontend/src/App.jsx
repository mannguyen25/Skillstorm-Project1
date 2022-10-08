import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, WarehouseList, NotFound, ItemList } from "./pages";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState, useMemo, createContext } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import { ButtonAppBar } from "./components/ButtonAppBar";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

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
      <ButtonAppBar/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/warehouses" element={<WarehouseList/>}/>
            <Route path="/items" element={<ItemList/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
