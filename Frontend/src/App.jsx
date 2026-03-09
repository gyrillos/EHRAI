import {BrowserRouter, Routes, Route} from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import "./components/Layout.css";

import Upload from "./pages/Upload";
import Review from "./pages/Review";
import Confirm from "./pages/Confirm";

function App() {
  return (
    <BrowserRouter>

    <div className="layout">
      <Navbar></Navbar>
      <div className="main-area">
        <Header></Header>
        <div className="body">
        <Routes>
          <Route path="/" element={<Upload/>}/>
          <Route path="/upload" element={<Upload/>}/>
          <Route path="/review" element={<Review/>}/>
          <Route path="/confirm" element={<Confirm/>}/>
        </Routes>
        </div>
      </div>
    </div>  
    </BrowserRouter>
  );
}

export default App;