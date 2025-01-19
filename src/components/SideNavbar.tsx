import { AiOutlinePlus } from 'react-icons/ai'
import avatar from '../assets/images/man.png'
import logo from '../assets/images/logo.png'

function SideNavbar() {
  return (
    <div className='z-10 absolute top-0 bg-bg2 max-w-max h-screen p-2 text-secondary overflow-hidden'>
      <div className=''>
        <img src={logo} loading="lazy" alt="" className='w-12 m-auto rounded-full hover:rounded-xl transition-transform  ' />
      </div>
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
      <div className='border-t-2 mt-3 border-[#585656]'>
        <button className=' flex m-auto rounded-full w-14 h-14 bg-[#424040] text-[#0bba48]  hover:bg-[#0bba48]  hover:text-white transition-all duration-300 ease-in-out mt-4  '>
          <AiOutlinePlus className='m-auto' size={26} />
        </button>
      </div>
    </div>
  )
}

export default SideNavbar
