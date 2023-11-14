import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import Login from './features/users/Login'
import Register from './features/users/Register'
import NotePage from './features/notes/NotePage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/notes' element={<NotePage/>}/>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
