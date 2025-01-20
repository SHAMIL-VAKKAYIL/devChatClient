import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, UseDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import { checkAuth } from './store/userSlice'
import { AppDispatch, RootState } from './store'
import { Toaster } from 'react-hot-toast'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import Profile from './components/Profile'
function App() {


  const dispacth = useDispatch<AppDispatch>()

  const { authUser, isCheckingAuth } = useSelector((state: RootState) => ({
    authUser: state.userreducer.authUser,
    isCheckingAuth: state.userreducer.isCheckingAuth
  }))

  useEffect(() => {
    dispacth(checkAuth())
  }, [dispacth])



  if (isCheckingAuth) {
    return (
      <div className='flex justify-center items-center h-[100vh] '>
        <AiOutlineLoading3Quarters className='size-10 animate-spin' />
      </div>

    )
  }




  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={authUser ? <Home /> : <Navigate to={'/Auth'} />} />
          {/* <Route path='/' element={ <Home /> } /> */}
          <Route path='/Auth' element={authUser ? <Navigate to={'/'} /> : <Login />} />
          <Route path='/Profile' element={authUser ? <Profile /> : <Login />} />
          {/* <Route path='/Profile' element={ <Profile />}  /> */}
        </Routes>
      </Router>
      <Toaster />
    </>
  )
}

export default App
