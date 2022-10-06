import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, warehouseList } from "./pages";

function App() {
  return (
    <warehouseList/>
  // <BrowserRouter>
  //     <Routes>
  //     <Route path="/" element={<Home/>}/>
  //     <Route path="/warehouses" element={<Warehouses/>}/>
  //     </Routes>
  // </BrowserRouter>
  );
}

export default App;
