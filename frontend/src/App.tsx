//import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/HomePage'
import Login from './pages/LoginPage'
import Register from './pages/RegisterPage'
import MainNav from './HomeComponents/Navbar'
import Footer from './HomeComponents/Footer'
import { Toaster } from "@/components/ui/sonner"
import ProtectedRoute from './HomeComponents/ProtectedRoute'
import Search from './pages/SearchPage'
function App() {
  return (
    <>
        <MainNav />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/search" element={<Search />} />
          </Route>

          {/* Redirect for unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer/>
        <Toaster/>
    </>
  )
}

export default App
