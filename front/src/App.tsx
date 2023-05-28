import React, { useEffect, useState } from 'react'

import './App.css'
import Home from './pages/Home'
import { Routes, Route, Navigate } from 'react-router-dom'
import AskQuestion from './pages/AskQuestion'
import QuestionDetails from './pages/QuestionDetails'
import Login from './pages/Login'
import Profil from './pages/Profil'
import Changedpassword from './pages/Changedpassword'
import Register from './pages/Register'
import UpdateQuestion from './pages/updateQuestion'

function App() {

  const [token] = useState<string>(localStorage.getItem('token') || '')

  const  [user,setUser]=useState<any>({})
  return (
    <div>
      <Routes>
        <Route path='/' element={token === '' ? <Navigate to='/login' /> : <Navigate to='/explore' />} />
        <Route path='/login' element={token === '' ? <Login /> : <Navigate to='/explore' />} />
        <Route path='/logout' Component={Login} />
        <Route path='/explore' element={token !== '' ? <Home /> : <Navigate to='/login' />} />
        <Route path='/ask' element={token !== '' ? <AskQuestion /> : <Navigate to='/login' />} />
        <Route path='/question/details/:id' element={token !== '' ? <QuestionDetails  /> : <Navigate to='/login' />} />
        <Route path='/questionuser' element={token !== '' ? <Profil/> : <Navigate to='/login' />} />
        <Route path='/changedpassword' element={token !== '' ? <Changedpassword/> : <Navigate to='/login' />} />
        <Route path='/register' element={token !== '' ? <Navigate to='/explore' />:<Register /> } />
        <Route path='/question/update/:id' element={token !== '' ? <UpdateQuestion /> : <Navigate to='/login' />} />

      </Routes>
    </div>
  )
}

export default App
