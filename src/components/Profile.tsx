import avatar from '../assets/images/man.png'
import { MdModeEditOutline } from "react-icons/md";
import { FaCircle } from "react-icons/fa";
import { Input } from './ui/input';
import { Button } from './ui/button';
import { GoMail, GoPerson, GoSignOut, GoTrash } from "react-icons/go";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"

function Profile() {

    return (
        <div className='bg-bg2 h-screen flex flex-col justify-center items-center gap-10'>
            <div className='w-[90%] relative sm:w-[60%] xl:w-[40%]  py-10 bg-zinc-900 rounded-md'>
                <div className='absolute top-3 right-3 lato-regular text-secondary flex items-center gap-1'>
                    {/* <p className='text-xs'>Active</p> */}
                    <FaCircle color='green' className='mt-1' size={13} />
                </div>
                <div className=' flex justify-center flex-col items-center '>
                    <div className='relative w-28 '>
                        <img src={avatar} alt='Profile Pic' className='rounded-full w-28  object-contain' />
                        <div className='absolute right-2 p-1 bottom-0 bg-bg2 bg-opacity-90 cursor-pointer rounded-full hover:scale-110 hover:bg-opacity-100 transition-all duration-300 ease-in-out '>
                            <MdModeEditOutline size={20} color='#f0f0f0' />
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center  text-white lato-bold tracking-wide text-xl mt-2'>
                        <p>John Doe</p>
                    </div>
                </div>
                <div className='m-auto flex w-[80%] mt-5 flex-col gap-5'>
                    <div className='w-full text-secondary flex flex-col gap-1  '>
                        <p className='lato-bold tracking-wider flex gap-1 items-center'><GoPerson size={22} /> User Name</p>
                        <div className='flex gap-3 '>
                            <Input className='text-secondary outline-none ' />
                            <Button className='  flex items-center justify-center rounded-[2px]  bg-[#f0f0f0] text-black lato-bold  hover:bg-zinc-400'><span>Edit</span><MdModeEditOutline size={20} color='#000' /></Button>
                        </div>
                    </div>
                    <div className='w-full text-secondary flex flex-col gap-1  '>
                        <p className='lato-bold tracking-wider flex gap-1 items-center'><GoMail size={22} /> Email</p>
                        <div className='flex gap-3 '>
                            <Input className='text-secondary outline-none ' />
                            <Button className='  flex items-center justify-center rounded-[2px]  bg-[#f0f0f0] text-black lato-bold  hover:bg-zinc-400'><span>Edit</span><MdModeEditOutline size={20} color='#000' /></Button>
                        </div>
                    </div>

                </div>
            </div>
            <div className='w-[90%]  sm:w-[60%] xl:w-[40%]  py-5 px-3 text-secondary flex flex-col bg-zinc-900 rounded-md'>
                <p className='lato-bold tracking-wide text-lg'>Account Removel</p>
                <p className='lato-regular text-sm text-[#c8c5c5a9]'>Deleting your account means all your data will be permanently erased and cannot be recovered. This action is irreversible. </p>
                <div className="flex gap-5 pt-5">
                    <Button className='  flex items-center justify-center rounded-[2px] border border-red-600 hover:border-red-700   text-black lato-bold text-secondary lato-bold'><span>Delete Account</span><GoTrash size={22} color='red' /></Button>
                    <Button className='  flex items-center justify-center rounded-[2px] bg-red-600 hover:bg-red-700 text-secondary lato-bold  '><span>Logout</span><GoSignOut size={22} color='#f0f0f0' strokeWidth={2} /></Button>
                </div>
            </div>
            <AlertDialog>
                <AlertDialogTrigger ></AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    )
}

export default Profile
