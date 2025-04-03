import avatar from '../assets/images/man.png'
import { IoMdContacts } from "react-icons/io";
import { Button } from './ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { features, getUsers, searchContact, setSelectedUser } from '@/store/chatSlice';
import { AppDispatch, RootState } from '@/store';
import { FaCircle } from 'react-icons/fa6';
import { Input } from './ui/input';
import { FiSearch } from "react-icons/fi";
import React, { useEffect, useState } from 'react';
// import { setOnlineUsers } from '@/store/userSlice';

interface IUser {
    _id: string,
    profilePic: string,
    userName: string
}
interface IContact {
    isuserLoading: boolean | null,
    users: IUser[] | null,
    classStyle: string
}

function Contactlist({ isuserLoading, users, classStyle }: IContact) {

    if (isuserLoading) return <div>Loading...</div>
    const { selectedUser, onlineUsers } = useSelector((state: RootState) => ({
        selectedUser: state.chatreducer.selectedUser,
        onlineUsers: state.userreducer.onlineUsers as string[],
    }))

    const dispatch = useDispatch<AppDispatch>()

    const [searchTerm, setSearchTerm] = useState<string>('')

    useEffect(() => {
        if (searchTerm?.length > 3) {
            dispatch(searchContact(searchTerm))
        }
        // dispatch(setOnlineUsers(onlineUsers.filter((userId) => users.some((user) => user._id === userId))));
    }, [searchTerm, dispatch])

    return (
        <div className={`${classStyle} flex-2 flex-grow  sm:max-w-xs flex gap-3 flex-col rounded-xl mx-auto bg-[#36353593] text-secondary py-5 overflow-y-scroll scrollHide `}>
            <div className='flex w-[80%] mx-auto items-center justify-start  py-3 px-3 gap-2 border-b-2 border-[#646363]'>
                <IoMdContacts size={22} />
                <p className='lato-bold'>Contacts</p>
            </div>
            <div className='flex w-[90%] bg-bg2 mx-auto items-center justify-start  py-1 px-3 gap-2  rounded-xl' onClick={() => features('Advance Searching')}>
                <Input placeholder='Search By Username' className='lato-regular  bg-transparent mx-2 outline-none border-none text-secondary h-full' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)} />
                <FiSearch size={24} />
            </div>
            <div className='flex flex-col gap-1 py-5 pr-5 '>
                {
                    users?.map((user) => (
                        <div key={user?._id} onClick={() => dispatch(setSelectedUser(user._id))} className={`hover:bg-bg2 w-full py-3  ${selectedUser?._id === user._id ? 'bg-bg2' : ''}`}>
                            <Button className=' w-full flex justify-start items-center  bg-transparent  hover:bg-transparent' >
                                <div className='relative'>
                                    <img src={user.profilePic ? user.profilePic : avatar} alt="" className='w-12  h-12 object-contain rounded-full' />
                                    {onlineUsers?.includes(user._id) && <FaCircle color='' className='top-0 right-0 absolute text-[#079816] border rounded-full p-[.6px]' size={10} />}
                                </div>
                                <div>
                                    <p className='text-base lato-bold text-wrap  '>{user?.userName}</p>
                                    <p className='text-sm lato-regular text-[#939191ec] text-start'>{onlineUsers?.includes(user._id) ? 'online' : 'offline'}</p>
                                </div>
                            </Button>
                        </div>
                    ))
                }
            </div>
        </div >
    )
}

export default Contactlist
