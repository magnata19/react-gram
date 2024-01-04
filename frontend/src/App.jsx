import "./App.css";

//Router
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

//pages
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

// components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='register' element={<Register />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
