import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/HomePage'
import Login from './pages/LoginPage'
import Register from './pages/RegisterPage'
import MainNav from './components/ui/Navbar'

function App() {
  return (
    <>
        <MainNav />
        <Routes>
          <Route path = "/" element = {<Home/>}/>
          <Route path = "/login" element = {<Login/>}/>
          <Route path = "/register" element = {<Register/>}/>
        </Routes>
    </>
  )
}

export default App
