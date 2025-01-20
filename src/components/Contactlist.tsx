import avatar from '../assets/images/man.png'
import { IoMdContacts } from "react-icons/io";

function Contactlist() {
    return (
        <div className='h-screen z-10  flex flex-col rounded-xl ml-auto bg-[#363636] text-secondary py-5 overflow-y-scroll '>

            <div className='flex w-[90%] mx-auto items-center justify-start  py-3 px-3 gap-2 border-b-2 border-[#646363]'>
                <IoMdContacts size={22} />
                <p className='lato-bold'>Contacts</p>
            </div>
            <div className='flex items-center gap-2  pr-12 mt-5 px-2 hover:bg-bg2 py-2.5 transition-all duration-00 ease-in-out'>
                <img src={avatar} alt="" className='w-10 ' />
                <div>
                    <p className='text lato-bold '>MuhammedShamil</p>
                    <p className='text-sm lato-regular text-[#c0bdbdd2]'>status</p>
                </div>

            </div>
        </div>
    )
}

export default Contactlist
