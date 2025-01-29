import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
// import { Loader2, Users } from 'lucide-react'
import toast from 'react-hot-toast'
import { setSocket, signin, signup } from '@/store/userSlice'
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { Navigate, useNavigate } from 'react-router-dom'

function Login() {
    interface Iformdata {
        fullname: string,
        email: string,
        password: string,
    }

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const isSigningUp = useSelector((state: RootState) => state.userreducer.isSigningUp)
    const islogging = useSelector((state: RootState) => state.userreducer.islogging)

    const [formdata, setformData] = useState({
        fullname: '',
        email: '',
        password: '',
    })



    const SignupUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        const success = validateForm()
        if (!success) {
            dispatch(signup(formdata)).unwrap()
        }

    }
    const Signin = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const success = validateForm()

        if (!success) {
            dispatch(signin(formdata)).then(() => {
                navigate('/')
                dispatch(setSocket)
                window.location.reload()
            })
        }
    }
    useEffect(() => {
        if (isSigningUp === false) {
            setnewAcc('SignIn')
            setformData({
                fullname: '',
                email: '',
                password: ''
            })
        }

    }, [isSigningUp])


    const validateForm = () => {
        if (newAcc === 'SignUp' && !formdata.fullname?.trim()) return toast.error('Username is required')
        if (!formdata.email.trim()) return toast.error('Email is required')
        if (!/^\S+@\S+\.\S+$/i.test(formdata.email)) return toast.error('Invalid email format')
        if (formdata.password.length < 6) return toast.error('Password must be at least 6 characters long')
        if (!formdata.password.trim()) return toast.error('Password is required')

    }

    const [newAcc, setnewAcc] = useState<string>('SignUp')

    return (
        <div className="bg-[url('./src/assets/images/3137882.jpg')] h-svh bg-no-repeat  bg-center bg-cover   ">
            <div className='w-full h-full flex  bg-black bg-opacity-40'>
                <form className='w-[90%] sm:w-[60%] bg-zinc-900 bg-opacity-90 text-[#f0f0f0]   rounded-md m-auto py-16 px-10  flex flex-col gap-5'>
                    {newAcc === 'SignUp' ? <>
                        <p className='text-center text-xl md:text-2xl lato-bold '>Create Your Account </p>
                        <div>
                            <p >Username <span className='text-red-600'>*</span> </p>
                            <Input type='text' value={formdata.fullname} onChange={(e) => setformData({ ...formdata, fullname: e.target.value })} />
                        </div>
                    </> : <p className='text-center text-xl md:text-2xl lato-bold '>Welcome back!</p>}
                    <div>
                        <p >Email <span className='text-red-600'>*</span> </p>
                        <Input type='email' value={formdata.email} onChange={(e) => setformData({ ...formdata, email: e.target.value })} />
                    </div>
                    <div>
                        <p >Password <span className='text-red-600'>*</span> </p>
                        <Input type='password' value={formdata.password} onChange={(e) => setformData({ ...formdata, password: e.target.value })} />
                    </div>
                    {newAcc === 'SignUp' ? <Button disabled={!!isSigningUp} onClick={(e) => SignupUser(e)} className='bg-secondary text-black lato-bold text-lg hover:bg-zinc-400' >{isSigningUp ? <> <AiOutlineLoading3Quarters className='size-10 animate-spin' /></> : 'SignUp'}</Button> :
                        <Button disabled={!!islogging} onClick={(e) => Signin(e)} className='bg-secondary text-black lato-bold text-lg hover:bg-zinc-400' >{islogging ? <> <AiOutlineLoading3Quarters className='size-10 animate-spin' /></> : 'SignIn'}</Button>}

                    {newAcc === 'SignUp' ? <p onClick={() => setnewAcc('SignIn')} className='cursor-pointer'>Already have an account ?</p> :
                        <p onClick={() => setnewAcc('SignUp')} className='cursor-pointer'>Create an account ?</p>}
                </form>
            </div>
        </div>
    )
}

export default Login
