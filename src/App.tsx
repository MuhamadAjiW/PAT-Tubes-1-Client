import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./views/HomePage"
import BookingPage from "./views/BookingPage"
// import PaymentPage from "./views/PaymentPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/booking" element={<BookingPage/>}/>
        {/* <Route path="/payment" element={<PaymentPage/>}/> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
