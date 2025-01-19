import { GoPerson, GoSignOut } from "react-icons/go";

function NavbarTop() {
    return (
        <div className="bg-bg2 fixed flex  py-3  w-full ">
            <div className="flex gap-7  justify-end w-[96%]  items-end text-right">
                <div className="flex text-secondary items-center gap-1 ">
                    <GoPerson className="text-secondary" size={18} />
                    <p className="">Profile</p>
                </div>
                <div className="flex text-secondary items-center gap-1 ">
                    <GoSignOut className="text-secondary" size={18} />
                    <p>Logout</p>
                </div>
            </div>
        </div>
    )
}

export default NavbarTop
