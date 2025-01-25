import avatar from '../assets/images/man.png'
import { IoMdContacts } from "react-icons/io";
import { Button } from './ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '@/store/chatSlice';
import { AppDispatch, RootState } from '@/store';



interface IUser {
    _id: string,
    profilePic: string,
    fullname: string
}
interface IContact {
    isuserLoading: boolean | null,
    users: IUser[]
}
function Contactlist({ isuserLoading, users }: IContact) {

    if (isuserLoading) return <div>Loading...</div>


    const selectedUser = useSelector((state: RootState) => state.chatreducer.selectedUser)

    const dispatch = useDispatch<AppDispatch>()
    return (
        <div className='  flex-1 max-w-xs flex flex-col rounded-xl ml-auto bg-[#363636] text-secondary py-5 overflow-y-scroll scrollHide'>
            <div className='flex w-[90%] mx-auto items-center justify-start  py-3 px-3 gap-2 border-b-2 border-[#646363]'>
                <IoMdContacts size={22} />
                <p className='lato-bold'>Contacts</p>
            </div>
            <div className='flex flex-col gap-1 py-5'>
                {
                    users.map((user) => (
                        <div key={user._id} onClick={() => dispatch(setSelectedUser(user._id))} className={`hover:bg-bg2 w-full py-3  ${selectedUser?._id === user._id ? 'bg-bg2' : ''}`}>
                            <Button className=' w-full flex justify-start items-center  bg-transparent  hover:bg-transparent   '>
                                <img src={user.profilePic ? user.profilePic : avatar} alt="" className='w-12  h-12  object-contain rounded-full' />
                                <div>
                                    <p className='text-base lato-bold '>{user.fullname}</p>
                                    <p className='text-sm lato-regular text-[#c0bdbdd2] text-start'>status</p>
                                </div>
                            </Button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Contactlist
