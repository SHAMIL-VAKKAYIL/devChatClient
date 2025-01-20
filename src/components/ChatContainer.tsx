import avatar from '../assets/images/man.png'

function ChatContainer() {
  return (
    <div className='w-full  bg-zinc-600 rounded-xl rounded-t-2xl  hidden sm:flex sm:flex-col  '>
      <div className='w-full p-3 bg-bg2  rounded-t-xl  '>
        <div className='flex items-center gap-2 lato-bold text-secondary'>
          <img src={avatar} alt="" className='object-contain w-14' />
          <p>Muhammed Shamil</p>
        </div>
      </div>
    </div>
  )
}

export default ChatContainer
