import avatar from '../assets/images/man.png'
import { MdModeEditOutline } from "react-icons/md";
import { FaCircle } from "react-icons/fa";
import { Input } from './ui/input';
import { Button } from './ui/button';
import { FaRegCircleXmark } from "react-icons/fa6";
import { GoMail, GoPerson, GoSignOut, GoTrash } from "react-icons/go";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { deleteAccount, logout, updateProfile } from '@/store/userSlice';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
function Profile() {

    interface IUser {
        fullname: string
        email: string
        profilePic: string
        createdAt: string
    }
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const User = useSelector((state: RootState) => state.userreducer.authUser) as IUser
    const { isupdating, isDeleting } = useSelector((state: RootState) => ({
        isupdating: state.userreducer.isUpdatingProfile,
        isDeleting: state.userreducer.isDeleteAcc
    }))

    const [Alert, setAlert] = useState<string | null>(null)

    const ImgUpRef = useRef<HTMLInputElement | null>(null)
    const DeleteAccRef = useRef<HTMLButtonElement | null>(null)
    const LogoutAccRef = useRef<HTMLButtonElement | null>(null)

    const [editName, setEditName] = useState<boolean>(true)
    const [editEmail, setEditEmail] = useState<boolean>(true)

    const [image, setImage] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')



    const imgUp = () => {
        if (ImgUpRef.current) {
            ImgUpRef.current.click()
        }
    }

    const DeleteAcc = () => {
        setAlert('Delete')
        if (DeleteAccRef.current) {
            DeleteAccRef.current.click()
        }
    }

    const LogoutAcc = () => {
        setAlert('Logout')
        if (LogoutAccRef.current) {
            LogoutAccRef.current.click()
        }
    }

    const handleImgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()


        reader.onloadend = async () => {
            const newImage = reader.result as string;
            setImage(newImage)
            dispatch(updateProfile({ profilePic: newImage })).unwrap()
        }
        reader.readAsDataURL(file)
    }

    const NewEmail = () => {
        dispatch(updateProfile({ email: email })).unwrap()
        setEditEmail(!editEmail)
    }
    const NewName = () => {
        dispatch(updateProfile({ name: name })).unwrap()
        setEditName(!editName)
    }


    useEffect(() => {
        setName(User.fullname)
        setEmail(User.email)
        setImage(User.profilePic)
    }, [User])


    return (
        <div className='bg-bg2 h-auto  xl:h-screen flex flex-col justify-center items-center gap-5 '>
            <div className='w-[90%] py-5'>
                <FaRegCircleXmark className='' size={36} color='#f0f0f0' onClick={() => navigate(-1)} />
            </div>
            <div className='w-[90%] relative sm:w-[60%] xl:w-[40%]  py-10 mt-2 bg-zinc-900 rounded-md'>
                <div className='absolute top-3 right-3 lato-regular text-secondary flex items-center gap-1'>
                    {/* <p className='text-xs'>Active</p> */}
                    <FaCircle color='green' className='mt-1' size={13} />
                </div>
                <div className=' flex justify-center flex-col items-center '>
                    <div className='relative w-28 '>
                        <img src={User.profilePic || image || avatar} alt='Profile Pic' className='rounded-full w-28 h-28  object-contain' />
                        <div className='absolute right-2 p-1 bottom-0 bg-bg2 bg-opacity-90 cursor-pointer rounded-full hover:scale-110 hover:bg-opacity-100 transition-all duration-300 ease-in-out '>
                            {isupdating ? <AiOutlineLoading3Quarters className='animate-spin ' color='#f0f0f0' /> : <MdModeEditOutline size={20} color='#f0f0f0' onClick={imgUp} />}
                            <Input type='file' className='hidden' ref={ImgUpRef} onChange={handleImgUpload} />
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center  text-white lato-bold tracking-wide text-xl mt-2'>
                        <p>{User.fullname}</p>
                    </div>
                </div>
                <div className='m-auto flex w-[80%] mt-5 flex-col gap-5'>
                    <div className='w-full text-secondary flex flex-col gap-1  '>
                        <p className='lato-bold tracking-wider flex gap-1 items-center'><GoPerson size={22} /> User Name</p>
                        <div className='flex gap-3 '>
                            <Input disabled={editName} value={name} className='text-secondary outline-none ' onChange={(e) => setName(e.target.value)} />
                            <Button className='flex items-center justify-center rounded-[2px]  bg-[#f0f0f0] text-black lato-bold  hover:bg-zinc-400'>
                                {
                                    editName ? <div className='flex items-center gap-2 ' onClick={() => setEditName(!editName)}><span>Edit</span><MdModeEditOutline size={20} color='#000' /> </div> : <span onClick={NewName}>Change</span>
                                }
                            </Button>
                        </div>
                    </div>
                    <div className='w-full text-secondary flex flex-col gap-1  '>
                        <p className='lato-bold tracking-wider flex gap-1 items-center'><GoMail size={22} /> Email</p>
                        <div className='flex gap-3 '>
                            <Input disabled={editEmail} value={email} className='text-secondary outline-none ' onChange={(e) => setEmail(e.target.value)} />
                            <Button onClick={() => setEditEmail(!editEmail)} className='flex items-center justify-center rounded-[2px]  bg-[#f0f0f0] text-black lato-bold  hover:bg-zinc-400'>
                                {
                                    editEmail ? <div className='flex items-center gap-2 ' onClick={() => setEditEmail(!editEmail)}><span >Edit</span><MdModeEditOutline size={20} color='#000' /> </div> : <span onClick={NewEmail}>Change</span>
                                }
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
            <div className='w-[90%]  sm:w-[60%] xl:w-[40%]  py-5 px-3 text-secondary flex flex-col bg-zinc-900 rounded-md'>
                <p className='lato-bold tracking-wide text-lg' >Account Removel</p>
                <p className='lato-regular text-sm text-[#c8c5c5a9]'>Deleting your account means all your data will be permanently erased and cannot be recovered. This action is irreversible. </p>
                <div className="flex gap-5 pt-5 justify-center">
                    <Button className='  flex items-center justify-center rounded-[2px] border border-red-600 hover:border-red-700   text-black lato-bold text-secondary lato-bold' onClick={DeleteAcc}><span>Delete Account</span><GoTrash size={22} color='red' /></Button>
                    <Button className='  flex items-center justify-center rounded-[2px] bg-red-600 hover:bg-red-700 text-secondary lato-bold' onClick={LogoutAcc}><span>Logout</span><GoSignOut size={22} color='#f0f0f0' strokeWidth={2} /></Button>
                </div>
            </div>
            <AlertDialog>
                <AlertDialogTrigger ref={DeleteAccRef} className='flex'></AlertDialogTrigger>
                {Alert === 'Delete' &&
                    <AlertDialogContent className='bg-bg2 border-none'>
                        <AlertDialogHeader>
                            <AlertDialogTitle className='text-secondary'>Are you absolutely sure ?</AlertDialogTitle>
                            <AlertDialogDescription className='text-[#ffffffa4]'>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className='bg-red-600 hover:bg-red-800' onClick={() => dispatch(deleteAccount())}>{isDeleting ? <AiOutlineLoading3Quarters className='animate-spin ' color='#000' /> : 'Delete'}</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>}
            </AlertDialog>
            <AlertDialog>
                <AlertDialogTrigger ref={LogoutAccRef} className='flex'></AlertDialogTrigger>
                {Alert === 'Logout' &&
                    <AlertDialogContent className='bg-bg2 border-none'>
                        <AlertDialogHeader>
                            <AlertDialogTitle className='text-secondary'>Do you want to log out of this account ?</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className='bg-red-600 hover:bg-red-800' onClick={() => dispatch(logout())} >Logout</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>}
            </AlertDialog>

        </div>
    )
}

export default Profile
