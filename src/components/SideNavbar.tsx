import { AiOutlinePlus } from 'react-icons/ai'
import avatar from '../assets/images/man.png'

function SideNavbar() {
  return (
    <div className='rounded-xl bg-bg2 max-w-max h-screen py-2 px-4 text-secondary overflow-hidden flex flex-col items-center '>
      <h1 className='lato-regular'>Groups</h1>
      <div className='  flex  flex-col gap-5 h-[60vh] overflow-y-scroll scroll-smooth scrollHide mt-4'>
        {/* group list */}
        <img src={avatar} loading="lazy" alt="" className='w-14 m-auto rounded-full hover:rounded-xl transition-transform ' />
        <img src={avatar} loading="lazy" alt="" className='w-14 m-auto rounded-full hover:rounded-xl transition-transform  ' />
        <img src={avatar} loading="lazy" alt="" className='w-14 m-auto rounded-full hover:rounded-xl transition-transform ' />
        <img src={avatar} loading="lazy" alt="" className='w-14 m-auto rounded-full hover:rounded-xl transition-transform ' />
        <img src={avatar} loading="lazy" alt="" className='w-14 m-auto rounded-full hover:rounded-xl transition-transform ' />
        <img src={avatar} loading="lazy" alt="" className='w-14 m-auto rounded-full hover:rounded-xl transition-transform ' />
        <img src={avatar} loading="lazy" alt="" className='w-14 m-auto rounded-full hover:rounded-xl transition-transform ' />
      </div>
      {/* create group */}
      <div className='border-t-2 mt-3 flex border-[#585656] '>
        <button className=' flex m-auto  rounded-full p-3 object-contain  bg-[#424040] text-[#0bba48]  hover:bg-[#0bba48]  hover:text-white transition-all duration-300 ease-in-out mt-4  '>
          <AiOutlinePlus className='m-auto object-contain' size={26} />
        </button>
      </div>
    </div>
  )
}

export default SideNavbar
