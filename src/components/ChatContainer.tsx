import avatar from '../assets/images/man.png'
import { FaCirclePlus, FaRegCircleXmark } from "react-icons/fa6";
import { Input } from './ui/input';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosSend } from "react-icons/io"
import { AppDispatch, RootState } from '@/store';
import { getMessages, removechatContainer, sendMessages, subscribeToMessage, unSubscribeMessages } from '@/store/chatSlice';
import MessageSkeleton from './ui/MessageSkelton';
import { Button } from './ui/button';
import { formatMessageTime } from '@/lib/utils';

interface IselectUser {
  _id: string;
  fullname: string;
  profilePic: string;
}
interface Imessages {
  _id: string
  senderId: string
  text: string
  createdAt: Date
  image: string | null
}
interface Ichatcontainer {
  selectedUser: IselectUser
  messages: Imessages[]
  ismessageloading: boolean | null
}

function ChatContainer({ selectedUser, messages, ismessageloading }: Ichatcontainer) {



  const dispatch = useDispatch<AppDispatch>()

  const { authUser, onlineUsers } = useSelector((state: RootState) => ({
    authUser: state.userreducer.authUser,
    onlineUsers: state.userreducer.onlineUsers

  }))

  const [text, setText] = useState<string | null>(null)
  const [imagePreview, setImagepreview] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLButtonElement | null>(null)
  const MessageEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    dispatch(getMessages(selectedUser._id))
    dispatch(subscribeToMessage())
  }, [selectedUser._id, subscribeToMessage])

  useEffect(() => {
    if (MessageEndRef.current && messages) {
      MessageEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }

  }, [messages])

  const clearChatcontainer = () => {
    dispatch(removechatContainer())
    unSubscribeMessages()
  }


  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagepreview(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  }

  const removeImage = () => {
    setImagepreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const sendMessage = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!text && !imagePreview) return;
    try {
      dispatch(sendMessages({
        UserId: selectedUser._id,
        messageData: {
          text: text,
          image: imagePreview,
        }
      })).unwrap().then(() => {

        setText('')
        setImagepreview(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
      })

    } catch (error) {

    }

  }

  console.log(onlineUsers);

  if (ismessageloading) return <div className='relative flex-2 flex-grow bg-bg2 rounded-xl rounded-t-2xl overflow-y-scroll scrollHide  hidden sm:flex sm:flex-col  '><MessageSkeleton /></div>

  return (
    <div className={`${selectedUser ? 'flex flex-col' : 'hidden sm:flex'} relative flex-2 flex-grow  bg-bg2 rounded-xl rounded-t-2xl  scrollHide overflow-y-scroll`}>
      {/* Header */}
      <div className='w-full p-3 bg-[#36353593]  rounded-t-xl flex  justify-between rounded-b-2xl '>
        <div className='flex items-center gap-2 lato-bold text-secondary'>
          <div className=''>
            <img src={selectedUser.profilePic || avatar} alt="" className='object-contain w-14 h-14 rounded-full' />
          </div>
          <div>
            <p>{selectedUser.fullname}</p>
            <p className='lato-regular text-[#939191ec]'>{onlineUsers.includes(selectedUser._id) ? 'online' : 'offline'}</p>
          </div>
        </div>
        <FaRegCircleXmark size={26} color='#f0f0f0' onClick={clearChatcontainer} />
      </div>
      {/* Messages */}
      <div className='flex-1 overflow-y-auto p-4 space-y-4 mb-10'>
        {messages?.map((msg) => (
          <div key={msg._id}
            ref={MessageEndRef}
            className={`flex ${msg.senderId === authUser._id ? 'justify-end' : 'justify-start'}`}>
            <div className="flex items-start gap-2 ">
              <img className={`${msg.senderId === authUser._id ? 'hidden' : 'w-8 h-8 rounded-full'}`} src={selectedUser.profilePic || avatar} alt="user" />
              <div className={`flex flex-col w-full max-w-[320px] leading-1.5 px-1 py-2 border-gray-200  `}>
                <div className={`${msg.senderId === authUser._id ? 'justify-end w-full flex ' : ''}flex items-center space-x-2 rtl:space-x-reverse`}>
                  <span className="text-sm lato-bold text-secondary dark:text-white">{msg.senderId === authUser._id ? 'You' : selectedUser.fullname}</span>
                  <span className="text-xs lato-regular text-secondary">{formatMessageTime(msg.createdAt)}</span>
                </div>
                <div className={` ${msg.senderId === authUser._id ? 'rounded-ee-xl rounded-s-xl' : 'rounded-e-xl rounded-es-xl'} dark:bg-gray-700 bg-[#424141b3] text-sm font-normal p-2 text-gray-900 dark:text-white`}>
                  {msg.image && <img src={msg.image} className='sm:max-w-[200px] rounded-md  mb-2' />}
                  {msg.text && <p className='text-secondary' >{msg.text}</p>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>


      {/* Footer */}
      <div className=' px-1  rounded-xl flex flex-col  w-[100%] mx-auto absolute bottom-1'>
        {imagePreview && (
          <div className="mb-3 flex items-center gap-2">
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
              />
              <Button
                onClick={removeImage}
                className="absolute  w-5 bg-transparent h-5 rounded-full hover:bg-transparent -right-3 -top-2  
              flex items-center justify-center"
                type="button"
              >
                <FaRegCircleXmark size={24} color='#f0f0f0' />
              </Button>
            </div>
          </div>
        )}

        <div className='bg-[#36353593] px-2 rounded-xl flex  w-full mx-auto justify-center items-center'>
          <Button
            className='bg-transparent ' onClick={() => fileInputRef.current?.click()} >
            <FaCirclePlus className={`hidden sm:flex ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`} size={26} color='#f0f0f0' />
          </Button>
          <Input
            className='hidden'
            type='file'
            onChange={handleImage}
            ref={fileInputRef} />

          <Input
            className='bg-transparent mx-2 outline-none border-none text-secondary h-full'
            type='text'
            onChange={(e) => setText(e.target.value)}
            value={text} />

          <Button
            className='bg-transparent '
            onClick={sendMessage}
            disabled={!text?.trim() && !imagePreview}>
            <IoIosSend size={26} color='#f0f0f0' />
          </Button>

        </div>
      </div>
    </div >
  )
}

export default ChatContainer
