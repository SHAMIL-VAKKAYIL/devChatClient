import avatar from '../assets/images/man.png'
import { FaCircleMinus, FaCirclePlus, FaRegCircleXmark } from "react-icons/fa6";
import { Input } from './ui/input';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosSend } from "react-icons/io"
import { AppDispatch, RootState } from '@/store';
import { addGroupMember, deleteMsg, getGroupMembers, getMessages, removechatContainer, removeGroupMember, sendMessages, subscribeToMessage, unSubscribeMessages } from '@/store/chatSlice';
import MessageSkeleton from './ui/MessageSkelton';
import { Button } from './ui/button';
import { formatMessageTime } from '@/lib/utils';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
// import { Checkbox } from './ui/checkbox';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import hljs from 'highlight.js';
import { GoTrash } from "react-icons/go";
import { IoMdMore } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface IselectUser {
  _id: string | null;
  userName: string;
  profilePic: string;
}
// interface IgroupMembers {
//   _id: string | null;
// }
interface IselectGroup {
  _id: string;
  name: string;
  profilePic: string;
  participants: [string],
  creator: string;
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
  selectedGroup: IselectGroup
  users: IselectUser[] | null
}

function ChatContainer({ selectedUser, messages, ismessageloading, selectedGroup, users }: Ichatcontainer) {


  const dispatch = useDispatch<AppDispatch>()
  const { authUser, onlineUsers, groupMembers } = useSelector((state: RootState) => ({
    authUser: state.userreducer.authUser,
    onlineUsers: state.userreducer.onlineUsers,
    groupMembers: state.chatreducer.groupMembers,

  }))



  const [text, setText] = useState<string | null>(null)
  const [imagePreview, setImagepreview] = useState<string | null>(null)
  // const [checkExUser, setCheckExUser] = useState(false)  
  const fileInputRef = useRef<HTMLButtonElement | null>(null)
  const MessageEndRef = useRef<HTMLDivElement | null>(null)
  const addMemberRef = useRef<HTMLButtonElement | null>(null)
  const deletemessageRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    (selectedUser || selectedGroup) && dispatch(getMessages({ userId: selectedUser?._id, GroupId: selectedGroup?._id }))
    dispatch(subscribeToMessage())
  }, [selectedUser?._id, subscribeToMessage, selectedGroup?._id])



  useEffect(() => {
    if (MessageEndRef.current && messages) {
      MessageEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  useEffect(() => {
    selectedGroup && dispatch(getGroupMembers({ selectedGroupId: selectedGroup?._id }))
  }, [selectedGroup])

  const clearChatcontainer = () => {
    dispatch(removechatContainer())
    unSubscribeMessages()
  }


  //? image handling
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

  //? manging the group members
  const openAddMember = () => {
    addMemberRef.current?.click()
  }
  const addmember = (selectedUserID: string | null) => {
    dispatch(addGroupMember({ selectedUserID, selectedGroupId: selectedGroup?._id }))
  }
  const removeMember = (selectedUserID: string | null) => {
    dispatch(removeGroupMember({ selectedUserID, selectedGroupId: selectedGroup?._id }))
  }

  //?del message pop up
  const opendelmessage = () => {
    // alert('clik')
    deletemessageRef.current?.click()
  }

  const sendMessage = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!text && !imagePreview) return;
    try {
      dispatch(sendMessages({
        UserId: selectedUser?._id,
        GroupId: selectedGroup?._id,
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
      console.error(error);
    }
  }


  if (ismessageloading) return <div className='relative flex-2 flex-grow bg-bg2 rounded-xl rounded-t-2xl overflow-y-scroll scrollHide  hidden sm:flex sm:flex-col  '><MessageSkeleton /></div>

  return (
    <div className={`${selectedGroup || selectedUser ? 'flex flex-col' : 'hidden sm:flex'} relative flex-2 flex-grow  bg-bg2 rounded-xl rounded-t-2xl  scrollHide overflow-y-scroll`}>
      {/* Header */}
      <div className='w-full p-3 bg-[#36353593]  rounded-t-xl flex  justify-between rounded-b-2xl '>
        <div className='flex items-center gap-2 lato-bold text-secondary'>
          <div className=''>
            <img src={selectedUser?.profilePic || selectedGroup?.profilePic || avatar} alt="" className='object-contain w-14 h-14 rounded-full' />
          </div>
          <div>
            <p>{selectedUser ? selectedUser.userName : selectedGroup ? selectedGroup.name : ''}</p>
            {selectedUser && <p className='lato-regular text-[#939191ec]'>{onlineUsers.includes(selectedUser?._id) ? 'online' : 'offline'}</p>}
            {selectedGroup && <p className='lato-regular flex text-[#939191ec]  overflow-x-scroll scrollHide monh '>{groupMembers?.length} Members on this group</p>}
          </div>
        </div>
        <FaRegCircleXmark size={26} color='#f0f0f0' onClick={clearChatcontainer} />
      </div>
      {selectedGroup?.creator === authUser?._id && <div className='flex justify-end' >
        <div className='bg-[#36353593] px-4 mb-1 gap-2  mt-1  py-2 rounded-xl flex lato-bold text-secondary cursor-pointer ' onClick={openAddMember}>
          <FaRegCircleXmark size={26} color='#0bba48b5' className='rotate-45 mx-auto' />
          <p>Manage members</p>
        </div>
      </div>}
      {/* Messages */}
      <div className='flex-1 overflow-y-auto  p-4 space-y-4 mb-10'>
        {messages?.map((msg, index) => {
          const codeRegex = /``([\s\S]*?)``/g;
          return (
            <div key={msg?._id || index}
              ref={MessageEndRef}
              className={`flex ${msg?.senderId === authUser._id ? 'justify-end' : 'justify-start'}`}>
              <div className="flex items-start gap-2 ">
                <img className={`${msg?.senderId === authUser._id ? 'hidden' : 'w-8 h-8 rounded-full'}`} src={selectedUser?.profilePic || avatar} alt="user" />
                <div className={`flex flex-col w-full max-w-[300px] lg:max-w-[500px] 2xl:max-w-[800px] leading-1.5 px-1 py-2 border-gray-200  `}>
                  <div className={`${msg?.senderId === authUser._id ? 'justify-end w-full flex ' : ''}flex items-center space-x-2 rtl:space-x-reverse`}>
                    <span className="text-sm lato-bold text-secondary dark:text-white">{msg?.senderId === authUser._id ? 'You' : selectedUser?.userName}</span>
                    <span className="text-xs lato-regular text-secondary">{formatMessageTime(msg?.createdAt)}</span>
                  </div>
                  <div className={` ${msg?.senderId === authUser._id ? 'rounded-ee-xl rounded-s-xl' : 'rounded-e-xl rounded-es-xl'} dark:bg-gray-700 bg-[#424141b3] text-sm font-normal p-2 text-gray-900 dark:text-white flex gap-2`}>

                    {msg?.image && <img src={msg?.image} className='sm:max-w-[200px] rounded-md  mb-2 mt-2' />}
                    {msg?.text && <p className='text-secondary' >{msg?.text.split(codeRegex).map((code, index) => {
                      if (index % 2 === 1) {
                        const detectedLang = hljs.highlightAuto(code).language || 'plaintext'
                        return (
                          <SyntaxHighlighter
                            key={index}
                            language={detectedLang}
                            style={dracula}
                            className="rounded-md p-2"
                          >
                            {code}
                          </SyntaxHighlighter>
                        )
                      } else {
                        return (
                          <span key={index}>{code}</span>
                        )
                      }
                    })}</p>}
                    {msg?.senderId === authUser._id && (
                      <div className="relative z-50">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-1 text-white  hover:bg-white/10 rounded-full transition">
                              <IoMdMore />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className=" border-none z-50 bg-[#f0f0f0] m-auto" side="top" align="end">
                            <DropdownMenuLabel className='flex gap-1 m-auto w-full justify-center cursor-pointer' onClick={() => dispatch(deleteMsg(msg._id))}> <GoTrash size={20} color='red' /><span> Delete</span></DropdownMenuLabel>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className=' px-1 rounded-xl flex flex-col  w-[100%] mx-auto absolute bottom-1'>
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
            <FaCirclePlus className={` sm:flex ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`} size={26} color='#f0f0f0' />
          </Button>
          <Input
            className='hidden'
            type='file'
            onChange={handleImage}
            ref={fileInputRef} />

          <textarea
            className='flex h-full w-full z-10  resize-y cursor-s-resize outline-none border-zinc-600 rounded-[2px] focus:border border-input px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-transparent mx-2  border-none text-secondary '
            onChange={(e) => setText(e.target.value)}
            value={text}
            name="" id=""></textarea>

          <Button
            className='bg-transparent '
            onClick={sendMessage}
            disabled={!text?.trim() && !imagePreview}
          >
            <IoIosSend size={26} color='#f0f0f0' />
          </Button>


        </div>
      </div>


      <AlertDialog>
        <AlertDialogTrigger ref={addMemberRef} className='flex'></AlertDialogTrigger>
        <AlertDialogContent className='bg-bg2 border-none'>
          <AlertDialogHeader className='h-[30vh] overflow-y-auto'>
            <AlertDialogTitle className='text-secondary  lato-bold'>Add your Dev friend</AlertDialogTitle>
            {users?.map((user) => (

              <AlertDialogDescription key={user._id} className='text-secondary text-lg flex items-center gap-2 py-1 lato-regular ' >
                {groupMembers?.includes(user._id) ? <FaCircleMinus className="text-zinc-400 hover:text-red-600" size={20} onClick={() => removeMember(user._id)} /> : <FaCirclePlus className="text-zinc-400 hover:text-emerald-500" size={20} onClick={() => addmember(user._id)} />}
                {user?.userName}
              </AlertDialogDescription>
            ))}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div >
  )
}

export default ChatContainer
