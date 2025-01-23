import { GoPerson, GoSignOut } from "react-icons/go";
import logo from '../assets/images/logo.png'
import { Link } from "react-router-dom";

function NavbarTop() {
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
                    <div className="flex text-secondary items-center gap-1 ">
                        <GoSignOut className="text-secondary" size={18} />
                        <p>Logout</p>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default NavbarTop
