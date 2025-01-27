import logo from '../assets/images/logo.png'

function NochatContainer() {
  return (
    <div className=' relative flex-2 flex-grow  bg-bg2 rounded-xl rounded-t-2xl  scrollHide  hidden sm:flex sm:flex-col overflow-y-scroll   '>
      <div className='w-full  rounded-t-xl flex  flex-col justify-center items-center h-full rounded-b-2xl '>
        <img src={logo} alt="" className='object-contain w-20 h-20 rounded-full animate-bounce' />
        <div className='flex flex-col justify-center items-center gap-5'>
          <p className='lato-bold text-xl text-[#ffffffb4]'> Welcome To Dev-Chat</p>
          <p className='text-[#ffffff9d] lato-bold text-sm text-center'>Start Conversation With Your Developer Friend</p>
        </div>
      </div>
    </div>
  )
}

export default NochatContainer
