import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import toast from 'react-hot-toast'
import { setSocket, signin } from '@/store/userSlice'
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { useNavigate } from 'react-router-dom'

function Login() {
    interface Iformdata {
        email: string,
        password: string,
    }

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const islogging = useSelector((state: RootState) => state.userreducer.islogging)

    const [formdata, setformData] = useState<Iformdata>({
        email: '',
        password: '',
    })




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


    const validateForm = () => {
        if (!formdata.email.trim()) return toast.error('Email is required')
        if (!/^\S+@\S+\.\S+$/i.test(formdata.email)) return toast.error('Invalid email format')
        if (formdata.password.length < 6) return toast.error('Password must be at least 6 characters long')
        if (!formdata.password.trim()) return toast.error('Password is required')

    }


    return (
        <div className="bg-[url('./src/assets/images/3137882.jpg')] h-svh bg-no-repeat  bg-center bg-cover   ">
            <div className='w-full h-full flex  bg-black bg-opacity-40'>
                <form className='w-[90%] sm:w-[60%] bg-zinc-900 bg-opacity-90 text-[#f0f0f0]   rounded-md m-auto py-16 px-10  flex flex-col gap-5'>
                    <p className='text-center text-xl md:text-2xl lato-bold '>Welcome back!</p>
                    <div>
                        <p >Email <span className='text-red-600'>*</span> </p>
                        <Input type='email' value={formdata.email} onChange={(e) => setformData({ ...formdata, email: e.target.value })} />
                    </div>
                    <div>
                        <p >Password <span className='text-red-600'>*</span> </p>
                        <Input type='password' value={formdata.password} onChange={(e) => setformData({ ...formdata, password: e.target.value })} />
                    </div>
                    <Button disabled={!!islogging} onClick={(e) => Signin(e)} className='bg-secondary text-black lato-bold text-lg hover:bg-zinc-400' >{islogging ? <> <AiOutlineLoading3Quarters className='size-10 animate-spin' /></> : 'SignIn'}</Button>

                    <p onClick={() => navigate('/Signup')} className='cursor-pointer'>Create an account ?</p>
                </form>
            </div>
        </div>
    )
}

export default Login
