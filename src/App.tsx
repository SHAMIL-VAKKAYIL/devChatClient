import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, UseDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
// import { checkAuth } from './store/userSlice'
import { AppDispatch, RootState } from './store'
import { Loader2 } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
function App() {

  interface IAuth {
    authUser: string | null
    isCheckingAuth: boolean
  }
  const dispacth = useDispatch<AppDispatch>()

  const { authUser, isCheckingAuth } = useSelector((state: RootState) => state.userreducer as IAuth)
  const [cookie, setCookie] = useState<string | null>(null)
  const cookiename = 'jwt'
  // if (isCheckingAuth && !authUser) {
  //   return (
  //     <div className='flex justify-center items-center h-[100vh] '>
  //       <Loader2 className='size-10 animate-spin' />
  //     </div>

  //   )
  // }


  // useEffect(() => {
  //   dispacth(checkAuth())
  // }, [dispacth])
  useEffect(() => {
    const getCookie = () => {
      const cookiearr = document.cookie.split('; ')
      for (const cookie of cookiearr) {
        const [key, value] = cookie.split('=')
        if (key === 'jwt') {
          console.log(value);
          
          return decodeURIComponent(value)
        }
      }
      return null
    }
    const valuec = getCookie()
    setCookie(valuec)
    console.log(valuec,'cookie');
    

  },[])
  console.log(cookie, 'hlo');


  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={cookie ? <Home /> : <Navigate to={'/Auth'} />} />
          <Route path='/Auth' element={<Login />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  )
}

export default App
