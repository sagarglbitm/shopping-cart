import React from "react";
import Register from "./Components/Register/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import ClothingPage from './Components/ClothingPage/ClothingPage';
import AuthProvider from './Components/AuthProvider/AuthProvider';
import LoginPage from './Components/LoginPage/LoginPage';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Cart from './Components/Cart/Cart';
import ProductList from './Components/ProductList';
import { useState } from 'react';
import Nav from './Components/Nav';
import Navbar from './Components/Navbar/Navbar';
import JsonSession from "./Components/order/JsonSession";

const App: React.FC = () => {
  const [viewCart, setViewCart] = useState<boolean>(false)

  const pageContent = viewCart ? <Cart />: <ProductList />

  const content = (
    <>
      {/* <Navbar onGenderChange={onGenderChange}/> */}
      {/* <Navbar  viewCart={viewCart} setViewCart={setViewCart} /> */}
      {/* <Header  viewCart={viewCart} setViewCart={setViewCart} /> */}
     
      {/* <Footer viewCart = {viewCart} /> */}
    </>
  )



  return (
    <>
    {/* {content} */}
    <AuthProvider>
     
      
      
        
      <Routes>
        <Route path='/' element={<ClothingPage/>} />
        <Route  path="/login" element={<LoginPage />}></Route>
        <Route path = "/Register" element = {<Register/>}/>
        {/* <Route  path="/register" element={<LoginPage />}></Route> */}
        {/* <Route path='/' element={<ProductList/>} /> */}
      <Route path='/cart' element={<Cart/>} />
      <Route path='/order' element={<JsonSession />} ></Route>
      </Routes>
  
    
     </AuthProvider>

     </>
  );
};

export default App;



    

function handleGenderChange(gender: string): void {
  throw new Error('Function not implemented.');
}

function onGenderChange(gender: string): void {
  throw new Error('Function not implemented.');
}
    
