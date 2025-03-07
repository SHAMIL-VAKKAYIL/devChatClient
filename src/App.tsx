import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import { checkAuth, setSocket } from './store/userSlice'
import { AppDispatch, RootState } from './store'
import { Toaster } from 'react-hot-toast'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
function App() {


  const dispatch = useDispatch<AppDispatch>()

  const { authUser, isCheckingAuth } = useSelector((state: RootState) => ({
    authUser: state.userreducer.authUser,
    isCheckingAuth: state.userreducer.isCheckingAuth,
    onlineUsers: state.userreducer.onlineUsers
  }))



  useEffect(() => {
    dispatch(checkAuth()).then(() => {
      dispatch(setSocket())
    })

  }, [dispatch])


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
          <Route path='/signup' element={<Signup />} />
          <Route path='/' element={authUser ? <Home /> : <Navigate to={'/signin'} />} />
          {/* <Route path='/' element={ <Home /> } /> */}
          <Route path='/signin' element={authUser ? <Navigate to={'/'} /> : <Login />} />
          <Route path='/Profile' element={authUser ? <Profile /> : <Navigate to={'/'} />} />
          {/* <Route path='/Profile' element={ <Profile />}  /> */}
        </Routes>
      </Router >
      <Toaster />
    </>
  )
}

export default App
