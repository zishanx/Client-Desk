import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import EditClient from './pages/EditClient'
import Dashboard from './pages/Dashboard'
import AddClient from './pages/AddClient'



function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/add-client' element={<AddClient />}></Route>
        <Route path='/edit-client/:id' element={<EditClient/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App