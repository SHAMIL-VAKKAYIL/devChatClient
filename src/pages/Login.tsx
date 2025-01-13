import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { Link, Links } from 'react-router-dom'
import { useState } from 'react'

function Login() {
    const [name, setname] = useState<string>('')
    const [email, setemail] = useState<string>('')
    const [password, setpassword] = useState<string>('')

    const [newAcc, setnewAcc] = useState<string>('SignUp')


    return (
        <div className="bg-[url('./src/assets/images/3137882.jpg')] h-svh bg-no-repeat  bg-center bg-cover   ">
            <div className='w-full h-full flex  bg-black bg-opacity-40'>
                <div className='w-[90%] sm:w-[60%] bg-zinc-900 bg-opacity-90 text-[#f0f0f0]   rounded-md m-auto py-16 px-10  flex flex-col gap-5'>
                    {newAcc === 'SignUp' ? <>
                        <p className='text-center text-xl md:text-2xl lato-bold '>Create Your Account </p>
                        <div>
                            <p >Username <span className='text-red-600'>*</span> </p>
                            <Input type='text' value={name} onChange={(e) => setname(e.target.value)} />
                        </div>
                    </> : <p className='text-center text-xl md:text-2xl lato-bold '>Welcome back!</p>}
                    <div>
                        <p >Email <span className='text-red-600'>*</span> </p>
                        <Input type='email' value={email} onChange={(e) => setemail(e.target.value)} />
                    </div>
                    <div>
                        <p >Password <span className='text-red-600'>*</span> </p>
                        <Input type='password' value={password} onChange={(e) => setpassword(e.target.value)} />
                    </div>
                    {newAcc === 'SignUp' ? <Button  className='bg-secondary text-black lato-bold text-lg hover:bg-zinc-400' >SignUp</Button> :
                        <Button  className='bg-secondary text-black lato-bold text-lg hover:bg-zinc-400' >SignIn</Button>}

                    {newAcc === 'SignUp' ? <p onClick={() => setnewAcc('SignIn')} className='cursor-pointer'>Already have an account ?</p> :
                        <p onClick={() => setnewAcc('SignUp')} className='cursor-pointer'>Create an account ?</p>}
                </div>
            </div>
        </div>
    )
}

export default Login
