import { GoPerson, GoSignOut } from "react-icons/go";
import logo from '../assets/images/logo.png'
import { Link } from "react-router-dom";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import { useDispatch } from "react-redux";
import {  disSocket, logout } from "@/store/userSlice";
import { useRef } from "react";
import { AppDispatch } from "@/store";


function NavbarTop() {
    const LogoutAccRef = useRef<HTMLButtonElement | null>(null)
    const dispatch = useDispatch<AppDispatch>()

    const LogoutAcc = () => {
        if (LogoutAccRef.current) LogoutAccRef.current.click()
    }
    const Logout = () => {
        dispatch(logout()).then(() => {
            dispatch(disSocket)

        })
    }

    return (
        <header className="bg-bg2  flex  py-1   rounded-xl  ">
            <div className="flex justify-between items-center w-[96%] lato-regular">
                <div className='pl-2 flex items-center '>
                    <img src={logo} loading="lazy" alt="" className='w-12 m-auto rounded-full hover:rounded-xl transition-transform  ' />
                    <p className="lato-bold text-lg text-secondary ">Dev-Chat</p>
                </div>
                <div className="flex gap-7  justify-end   items-end text-right">
                    <Link to={'/Profile'} className="flex text-secondary items-center gap-1 ">
                        <GoPerson className="text-secondary" size={18} />
                        <p className="">Profile</p>
                    </Link>
                    <div className="sm:flex text-secondary items-center gap-1 hidden" onClick={LogoutAcc}>
                        <GoSignOut className="text-secondary" size={18} />
                        <p>Logout</p>
                    </div>
                </div>
            </div>
            <AlertDialog>
                <AlertDialogTrigger ref={LogoutAccRef} className='flex'></AlertDialogTrigger>
                {
                    <AlertDialogContent className='bg-bg2 border-none'>
                        <AlertDialogHeader>
                            <AlertDialogTitle className='text-secondary'>Do you want to log out of this account ?</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className='bg-red-600 hover:bg-red-800' onClick={Logout} >Logout</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>}
            </AlertDialog>

        </header>
    )
}

export default NavbarTop
