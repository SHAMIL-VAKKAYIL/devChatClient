import avatar from '../assets/images/man.png'
import { FaCirclePlus } from "react-icons/fa6";
import { MdOutlineClose } from "react-icons/md";
import { Input } from './ui/input';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IoIosSend } from "react-icons/io"
import { AppDispatch } from '@/store';
import { getMessages, removechatContainer } from '@/store/chatSlice';
import MessageSkeleton from './ui/MessageSkelton';


interface IselectUser {
  _id: string;
  fullname: string;
  profilePic: string;
}
interface Ichatcontainer {
  selectedUser: IselectUser
  messages: any[]
  ismessageloading: boolean | null
}
function ChatContainer({ selectedUser, messages, ismessageloading }: Ichatcontainer) {


  const dispacth = useDispatch<AppDispatch>()

  const [text, setText] = useState<string | null>(null)
  const [imagePreview, setImagepreview] = useState<string | null>(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    dispacth(getMessages(selectedUser._id))

  }, [selectedUser._id])


  const handleImage = (e) =>{

  }
  const removeImage=() =>{

  }

  const sendMessage = async () => {

  }
  if (ismessageloading) return <div className='relative flex-2 flex-grow bg-bg2 rounded-xl rounded-t-2xl overflow-y-scroll scrollHide  hidden sm:flex sm:flex-col  '><MessageSkeleton /></div>

  return (
    <div className=' relative flex-2 flex-grow bg-bg2 rounded-xl rounded-t-2xl overflow-y-scroll scrollHide  hidden sm:flex sm:flex-col  '>
      <div className='w-full p-3 bg-[#36353593]  rounded-t-xl flex  justify-between rounded-b-2xl '>
        <div className='flex items-center gap-2 lato-bold text-secondary'>
          <img src={selectedUser.profilePic || avatar} alt="" className='object-contain w-14 h-14 rounded-full' />
          <p>{selectedUser.fullname}</p>
        </div>
        <MdOutlineClose size={26} color='#f0f0f0' onClick={() => dispacth(removechatContainer())} />
      </div>
      <div className=' px-1  rounded-xl flex  w-[100%] mx-auto absolute bottom-1'>
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <MdOutlineClose size={20} />
            </button>
          </div>
        </div>
      )}F
        <div className='bg-[#36353593] px-2 rounded-xl flex  w-full mx-auto justify-center items-center'>
          <FaCirclePlus size={26} color='#f0f0f0' />
          <Input className='bg-transparent mx-2 outline-none border-none text-secondary' />
          <IoIosSend size={26} color='#f0f0f0' />
        </div>
      </div>
    </div>
  )
}

export default ChatContainer
