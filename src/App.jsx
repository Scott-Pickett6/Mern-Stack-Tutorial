import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import Products from './pages/Products'
import Contacts from './pages/Contacts'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<Products />} />
            <Route path='/contacts' element={<Contacts />} />
          </Routes>
      </Router>
      <ToastContainer position='top-right' autoClose={3000}/>
    </>
  )
}

export default App
