import { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css'
import { Navbar } from './components/Navbar'
import { AppRoutes } from './routes'

function App() {
  useEffect(() => {
    // Check if localStorage is empty and initialize with default values

  }, [])

  return (
    <>
      <Navbar />
      <AppRoutes />
    </>
  )
}

export default App
