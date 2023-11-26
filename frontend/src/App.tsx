import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./views/HomePage"
import BookingPage from "./views/BookingPage"
import RegisterPage from "./views/RegisterPage"
import EditUserPage from "./views/EditUserPage"
// import PaymentPage from "./views/PaymentPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/booking" element={<BookingPage/>}/>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/edit-users" element={<EditUserPage />} />
        {/* <Route path="/payment" element={<PaymentPage/>}/> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
