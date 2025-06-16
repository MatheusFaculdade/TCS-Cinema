import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css'
import { Navbar } from './components/Navbar'
import { AppRoutes } from './routes'
import { Toaster } from 'react-hot-toast';


function App() {

  return (
    <>
     <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <AppRoutes />
    </>
  )
}

export default App
