import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, WarehouseList } from "./pages";

function App() {
  return (
    <WarehouseList/>
  // <BrowserRouter>
  //     <Routes>
  //     <Route path="/" element={<Home/>}/>
  //     <Route path="/warehouses" element={<Warehouses/>}/>
  //     </Routes>
  // </BrowserRouter>
  );
}

export default App;
