//import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/HomePage'
import Login from './pages/LoginPage'
import Register from './pages/RegisterPage'
import MainNav from './HomeComponents/Navbar'
import Footer from './HomeComponents/Footer'
import { Toaster } from "@/components/ui/sonner"
function App() {
  return (
    <>
        <MainNav />
        <Routes>
          <Route path = "/" element = {<Home/>}/>
          <Route path = "/login" element = {<Login/>}/>
          <Route path = "/register" element = {<Register/>}/>
        </Routes>
        <Footer/>
        <Toaster/>
    </>
  )
}

export default App
